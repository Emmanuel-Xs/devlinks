"use server";

import { headers } from "next/headers";

import "server-only";

import { getLinksByUserId, upsertUserLinks } from "@/drizzle/query/links";
import { Link } from "@/drizzle/schema";
import { RefillingTokenBucket } from "@/lib/server/rate-limit";
import { globalPOSTRateLimit } from "@/lib/server/request";
import { getCurrentSession } from "@/lib/server/sessions";
import { validatePlatformUrl } from "@/lib/url-validation";

type FormState = {
  success: boolean;
  errors?: Record<string, string[]>;
};

const ipBucket = new RefillingTokenBucket<string>(3, 10);

export const getUserLinksAction = async (userId: number) => {
  return await getLinksByUserId(userId);
};

export async function saveLinksAction(
  linksToSave: Link[],
  userId: number
): Promise<FormState> {
  if (!globalPOSTRateLimit()) {
    return {
      success: false,
      errors: { message: ["Too many requests"] },
    };
  }

  const requestHeaders = await headers();
  const clientIP = requestHeaders.get("x-forwarded-for") ?? "unknown";

  if (!ipBucket.check(clientIP, 1)) {
    return {
      success: false,
      errors: { message: ["Too many requests"] },
    };
  }

  const { user } = await getCurrentSession();

  if (!user || user.id !== userId) {
    return {
      success: false,
      errors: { message: [!user ? "Not authenticated" : "Not authorized"] },
    };
  }

  // Validate all links
  const errors: Record<string, string[]> = {};
  const validatedLinks = linksToSave
    .map((link) => {
      const { isValid, error } = validatePlatformUrl(link.url, link.platform);
      if (!isValid) {
        errors[link.id] = [error || "Invalid link"];
      }
      return { ...link, isValid };
    })
    .filter((link) => link.isValid);

  // Return errors if no valid links
  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      errors: {
        ...errors,
        message: ["Some links were invalid"],
      },
    };
  }

  // if (validatedLinks.length === 0) {
  //   console.log("No valid links to upsert.");
  //   return {
  //     success: true,
  //   };
  // }

  ipBucket.consume(clientIP, 1);

  try {
    await upsertUserLinks(validatedLinks);
    return { success: true };
  } catch (error) {
    console.error("Error saving links:", error);
    return {
      success: false,
      errors: { message: ["Failed to save links"] },
    };
  }
}
