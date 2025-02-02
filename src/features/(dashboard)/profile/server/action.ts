"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import "server-only";
import { z } from "zod";

import { createEmailVerificationRequest } from "@/drizzle/query/email-verifcation";
import {
  isEmailTaken,
  isUsernameTaken,
  unVerifyEmail,
  updateAvatarUrl,
  updateBlurDataUrl,
  updateUserProfile,
} from "@/drizzle/query/users";
import { User } from "@/drizzle/schema";
import {
  sendVerificationEmail,
  setEmailVerificationRequestCookie,
} from "@/lib/server/email";
import { RefillingTokenBucket } from "@/lib/server/rate-limit";
import { globalPOSTRateLimit } from "@/lib/server/request";
import { getCurrentSession } from "@/lib/server/sessions";
import { utapi } from "@/lib/server/uploadthing";
import { suggestAlternativeUsernames } from "@/lib/server/users";
import { generateBlurDataURL } from "@/lib/server/utils";
import { profileSchema } from "@/lib/validation";

type FormState = {
  success: boolean;
  fields?: Record<string, string | File>;
  errors?: Record<string, string[]>;
};

const ipBucket = new RefillingTokenBucket<string>(3, 10);

type ProfileData = z.infer<typeof profileSchema>;

export async function saveProfileAction(
  profileData: ProfileData,
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

  const parsed = profileSchema.safeParse(profileData);

  const fields: Record<string, string | File> = {};

  for (const [key, value] of Object.entries(profileData)) {
    fields[key] = value instanceof File ? value : String(value ?? "");
  }

  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;

    return {
      success: false,
      fields,
      errors,
    };
  }

  const { user } = await getCurrentSession();

  if (!user || user.id !== userId) {
    return {
      success: false,
      errors: { message: [!user ? "Not authenticated" : "Not authorized"] },
    };
  }

  const {
    firstName,
    lastName,
    username,
    email: newEmail,
    croppedAvatar,
  } = parsed.data;

  const usernameTaken = await isUsernameTaken(username);

  if (usernameTaken && user.username !== username) {
    const usernameSuggestions = await suggestAlternativeUsernames(username);

    return {
      success: false,
      errors: {
        username: ["already taken"],
        usernameSuggestions: usernameSuggestions,
      },
      fields,
    };
  }
  ipBucket.consume(clientIP, 1);

  if (croppedAvatar) {
    const avatarResult = await handleAvatarUpload(croppedAvatar, user);

    if (avatarResult && avatarResult.success === false) {
      return avatarResult;
    }
  }
  await updateUserProfile(user.id, {
    firstName: firstName?.toLocaleLowerCase() ?? null,
    lastName: lastName?.toLocaleLowerCase() ?? null,
    username: username?.toLocaleLowerCase() ?? null,
  });

  const emailChangeResult = await handleEmailChange(newEmail, user, fields);
  if (emailChangeResult) return emailChangeResult;

  revalidatePath("/");
  return {
    success: true,
  };
}

async function handleAvatarUpload(croppedAvatar: File, user: User) {
  try {
    const response = await utapi.uploadFiles([croppedAvatar]);
    if (response?.[0]?.data?.url) {
      const newAvatarUrl = response[0].data.url;
      if (user.avatarUrl) {
        const key = user.avatarUrl.split("/f/")[1];
        if (key) {
          await utapi.deleteFiles(key);
        }
      }

      await updateAvatarUrl(user.id, newAvatarUrl);
      const blurDataUrl = await generateBlurDataURL(newAvatarUrl);
      await updateBlurDataUrl(user.id, blurDataUrl);
    } else {
      console.error("File upload response missing URL", response);
      return {
        success: false,
        errors: { message: ["Avatar upload failed"] },
      };
    }
  } catch (error) {
    console.error("Error during file upload", error);
    return {
      success: false,
      errors: { message: ["Avatar upload error"] },
    };
  }
}

/**
 * Handles email change verification.
 * If the new email is different from the current email:
 * - Checks if the new email is already taken.
 * - If taken, returns a FormState error.
 * - Otherwise, un-verifies the email, creates a verification request, sends an email,
 *   sets the verification cookie, and redirects the user.
 *
 * @param newEmail The new email submitted by the user.
 * @param user The current user.
 * @param fields The form fields for potential error reporting.
 * @returns A Promise that resolves to a FormState if there's an error, or void if successful.
 */
async function handleEmailChange(
  newEmail: string,
  user: User,
  fields: Record<string, string | File>
): Promise<FormState | void> {
  if (user.email !== newEmail) {
    const emailTaken = await isEmailTaken(newEmail);
    if (emailTaken) {
      return {
        success: false,
        errors: { email: ["email in db"] },
        fields,
      };
    } else {
      // Email not taken; un-verify and send a verification email.
      await unVerifyEmail(user.id);
      const emailVerificationRequest = await createEmailVerificationRequest(
        user.id,
        newEmail
      );
      await sendVerificationEmail(
        emailVerificationRequest[0].email,
        emailVerificationRequest[0].code
      );
      await setEmailVerificationRequestCookie(emailVerificationRequest[0]);
      redirect("/verify-email");
    }
  }
}
