import { cookies } from "next/headers";

import type { OAuth2Tokens } from "arctic";
import { decodeIdToken } from "arctic";

import { createSession } from "@/drizzle/query/sessions";
import {
  createUserFromGoogle,
  getUserByEmail,
  updateAvatarUrl,
  updateBlurDataUrl,
  updateGoogleId,
} from "@/drizzle/query/users";
import { google } from "@/lib/server/oauth";
import { globalGETRateLimit } from "@/lib/server/request";
import {
  generateSessionToken,
  setSessionTokenCookie,
} from "@/lib/server/sessions";
import { refineOAuthUsername } from "@/lib/server/users";
import { generateBlurDataURL } from "@/lib/server/utils";

type GoogleIdTokenClaims = {
  sub: string;
  name: string;
  email: string;
  email_verified: boolean;
  picture?: string;
};

export async function GET(request: Request): Promise<Response> {
  if (!globalGETRateLimit()) {
    return new Response("Too many requests", {
      status: 429,
    });
  }

  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  const cookieStore = await cookies();
  const storedState = cookieStore.get("google_oauth_state")?.value ?? null;

  const codeVerifier = cookieStore.get("google_code_verifier")?.value ?? null;

  if (
    code === null ||
    state === null ||
    storedState === null ||
    codeVerifier === null
  ) {
    return new Response("Please restart the process.", { status: 400 });
  }

  if (state !== storedState) {
    return new Response("Please restart the process.", { status: 400 });
  }

  let tokens: OAuth2Tokens;

  try {
    tokens = await google.validateAuthorizationCode(code, codeVerifier);
  } catch (e) {
    console.error("Error validating authorization code:", e);
    return new Response("Please restart the process.", {
      status: 400,
    });
  }
  const claims = decodeIdToken(tokens.idToken()) as GoogleIdTokenClaims;

  const googleUserId = claims.sub;
  const username = claims.name;
  const email = claims.email;
  const avatarUrl = claims.picture || null;
  const emailVerified = claims.email_verified ? 1 : 0;

  const existingUser = await getUserByEmail(email);

  if (!existingUser.length) {
    const refinedUserName = await refineOAuthUsername(username, googleUserId);

    const blurDataUrl =
      avatarUrl === null ? null : await generateBlurDataURL(avatarUrl);

    const user = await createUserFromGoogle(
      googleUserId,
      refinedUserName,
      email,
      avatarUrl,
      blurDataUrl,
      emailVerified
    );

    if (!user) {
      console.error("Failed to create user:", { username, email });
      return new Response("Failed to create user", { status: 500 });
    }

    const sessionToken = generateSessionToken();
    const session = await createSession(sessionToken, user.id);
    await setSessionTokenCookie(sessionToken, session.expiresAt);

    return new Response(null, {
      status: 302,
      headers: {
        Location: "/links",
      },
    });
  }

  //if there's an existing user without oauth
  if (!existingUser[0].googleId) {
    await updateGoogleId(existingUser[0].id, googleUserId);
  }

  if (!existingUser[0].avatarUrl) {
    await updateAvatarUrl(existingUser[0].id, avatarUrl);

    const blurDataUrl =
      avatarUrl === null ? null : await generateBlurDataURL(avatarUrl);
    await updateBlurDataUrl(existingUser[0].id, blurDataUrl);
  }

  const sessionToken = generateSessionToken();
  const session = await createSession(sessionToken, existingUser[0].id);
  await setSessionTokenCookie(sessionToken, session.expiresAt);

  return new Response(null, {
    status: 302,
    headers: {
      Location: "/links",
    },
  });
}
