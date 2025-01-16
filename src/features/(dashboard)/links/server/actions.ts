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

  if (user === null) {
    return {
      success: false,
      errors: { message: ["Not authenticated"] },
    };
  }

  if (user.id !== userId) {
    return {
      success: false,
      errors: { message: ["Not authorized"] },
    };
  }

  const errors: Record<string, string[]> = {};
  const validatedLinks = linksToSave.filter((link) => {
    const { isValid, error } = validatePlatformUrl(link.url, link.platform);

    if (!isValid) {
      errors[link.id] = [error || "Invalid link"];
      return false;
    }

    return true;
  });

  if (Object.keys(errors).length > 0 && validatedLinks.length === 0) {
    return {
      success: false,
      errors: {
        ...errors,
        message: ["No valid links provided"],
      },
    };
  }

  if (validatedLinks.length === 0) {
    console.log("No valid links to upsert.");
    return {
      success: true,
    };
  }

  ipBucket.consume(clientIP, 1);

  // console.log("Calling upsertUserLinks with:", { validatedLinks, userId });

  await upsertUserLinks(validatedLinks);

  return { success: true };
}
