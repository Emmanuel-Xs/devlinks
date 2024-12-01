import {
  generateSessionToken,
  createSession,
  setSessionTokenCookie,
} from "@/lib/server/sessions";
import { google } from "@/lib/server/oauth";
import { cookies } from "next/headers";
import { decodeIdToken } from "arctic";

import type { OAuth2Tokens } from "arctic";
import {
  createUserFromGoogle,
  getUserFromGoogleId,
} from "@/drizzle/query/users";

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
    return new Response(null, {
      status: 400,
    });
  }

  if (state !== storedState) {
    return new Response(null, {
      status: 400,
    });
  }

  let tokens: OAuth2Tokens;

  try {
    tokens = await google.validateAuthorizationCode(code, codeVerifier);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    // Invalid code or client credentials
    return new Response(null, {
      status: 400,
    });
  }
  const claims = decodeIdToken(tokens.idToken()) as GoogleIdTokenClaims;

  const googleUserId = claims.sub;
  const username = claims.name;
  const email = claims.email;
  const avatarUrl = claims.picture || null;
  const emailVerified = claims.email_verified ? 1 : 0;

  console.log("google claims object: ", claims);

  const existingUser = await getUserFromGoogleId(googleUserId);

  if (existingUser !== null) {
    const sessionToken = generateSessionToken();
    const session = await createSession(sessionToken, existingUser[0].id);
    await setSessionTokenCookie(sessionToken, session.expiresAt);
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/",
      },
    });
  }

  const user = await createUserFromGoogle(
    googleUserId,
    username,
    email,
    avatarUrl,
    emailVerified,
  );

  const sessionToken = generateSessionToken();
  const session = await createSession(sessionToken, user[0].id);
  await setSessionTokenCookie(sessionToken, session.expiresAt);
  return new Response(null, {
    status: 302,
    headers: {
      Location: "/",
    },
  });
}
