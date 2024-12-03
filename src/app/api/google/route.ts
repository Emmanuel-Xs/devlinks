// app/api/google/route.ts
import { generateState, generateCodeVerifier } from "arctic";
import { google } from "@/lib/server/oauth";
import { cookies } from "next/headers";

export async function GET(): Promise<Response> {
  const state = generateState();
  const codeVerifier = generateCodeVerifier();
  console.log("Generated state:", state);
  console.log("Generated codeVerifier:", codeVerifier);

  const url = google.createAuthorizationURL(state, codeVerifier, [
    "openid",
    "profile",
    "email",
  ]);

  console.log("Generated Google OAuth URL:", url.toString());

  const cookieStore = await cookies();
  cookieStore.set("google_oauth_state", state, {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 10, // 10 minutes
    sameSite: "lax",
  });
  console.log("Set cookie: google_code_verifier");

  cookieStore.set("google_code_verifier", codeVerifier, {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 10, // 10 minutes
    sameSite: "lax",
  });

  console.log("Set cookie: google_code_verifier");

  return new Response(null, {
    status: 302,
    headers: {
      Location: url.toString(),
    },
  });
}
