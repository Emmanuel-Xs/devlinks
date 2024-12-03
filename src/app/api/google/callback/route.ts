import {
  generateSessionToken,
  setSessionTokenCookie,
} from "@/lib/server/sessions";
import { google } from "@/lib/server/oauth";
import { cookies } from "next/headers";
import { decodeIdToken } from "arctic";

import type { OAuth2Tokens } from "arctic";
import {
  createUserFromGoogle,
  getUserByEmail,
  updateGoogleId,
} from "@/drizzle/query/users";
import { createSession } from "@/drizzle/query/sessions";
import { refineOAuthUsername } from "@/lib/server/users";

type GoogleIdTokenClaims = {
  sub: string;
  name: string;
  email: string;
  email_verified: boolean;
  picture?: string;
};

export async function GET(request: Request): Promise<Response> {
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
    return new Response("Missing required parameters", { status: 400 });
  }

  if (state !== storedState) {
    return new Response("Invalid state parameter", { status: 400 });
  }

  let tokens: OAuth2Tokens;

  try {
    tokens = await google.validateAuthorizationCode(code, codeVerifier);
  } catch (e) {
    console.error("Error validating authorization code:", e);
    return new Response("Failed to validate authorization code", {
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

    const user = await createUserFromGoogle(
      googleUserId,
      refinedUserName,
      email,
      avatarUrl,
      emailVerified,
    );

    if (!user[0]) {
      console.error("Failed to create user:", { username, email });
      return new Response("Failed to create user", { status: 500 });
    }

    const sessionToken = generateSessionToken();
    const session = await createSession(sessionToken, user[0].id);
    await setSessionTokenCookie(sessionToken, session.expiresAt);

    return new Response(null, {
      status: 302,
      headers: {
        Location: "/links",
      },
    });
  }

  if (!existingUser[0].googleId) {
    await updateGoogleId(existingUser[0].id, googleUserId);
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
