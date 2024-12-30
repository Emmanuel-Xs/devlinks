import { cookies } from "next/headers";

import type { OAuth2Tokens } from "arctic";

import { createSession } from "@/drizzle/query/sessions";
import {
  createUserFromGithub,
  getUserByEmail,
  updateAvatarUrl,
  updateGithubId,
} from "@/drizzle/query/users";
import { github } from "@/lib/server/oauth";
import {
  generateSessionToken,
  setSessionTokenCookie,
} from "@/lib/server/sessions";
import { refineOAuthUsername } from "@/lib/server/users";

type GithubUser = {
  id: number;
  login: string;
  avatar_url: string;
};

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  const cookieStore = await cookies();
  const storedState = cookieStore.get("github_oauth_state")?.value ?? null;

  if (code === null || state === null || storedState === null) {
    return new Response("Missing required parameters", { status: 400 });
  }

  if (state !== storedState) {
    return new Response("Invalid state parameter", { status: 400 });
  }

  let tokens: OAuth2Tokens;

  try {
    tokens = await github.validateAuthorizationCode(code);
  } catch (e) {
    console.error("Error validating authorization code:", e);
    return new Response("Failed to validate authorization code", {
      status: 400,
    });
  }

  const githubUserResponse = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${tokens.accessToken()}`,
    },
  });

  if (!githubUserResponse.ok) {
    return new Response("Failed to fetch GitHub user", { status: 500 });
  }

  const githubUser: GithubUser = await githubUserResponse.json();

  const githubUserId = githubUser.id;
  const githubUsername = githubUser.login;
  const githubAvatarUrl = githubUser.avatar_url;

  const githubEmailResponse = await fetch(
    "https://api.github.com/user/emails",
    {
      headers: {
        Authorization: `Bearer ${tokens.accessToken()}`,
      },
    }
  );

  if (!githubEmailResponse.ok) {
    return new Response("Failed to fetch GitHub emails", { status: 500 });
  }

  const emails = await githubEmailResponse.json();

  const email: string = emails.find(
    (email: { primary: boolean }) => email.primary
  )?.email;

  const existingUser = await getUserByEmail(email);
  console.log("Existing user from email:", existingUser);

  if (!existingUser.length) {
    const refinedUserName = await refineOAuthUsername(
      githubUsername,
      githubUserId
    );

    const user = await createUserFromGithub(
      githubUserId,
      refinedUserName,
      email,
      githubAvatarUrl,
      1
    );

    if (!user[0]) {
      console.error("Failed to create user:", { githubUsername, email });
      return new Response("Failed to create user", { status: 500 });
    }

    const sessionToken = generateSessionToken();
    const session = await createSession(sessionToken, user[0].id);
    await setSessionTokenCookie(sessionToken, session.expiresAt);

    return new Response(null, { status: 302, headers: { Location: "/links" } });
  }

  //if there's an existing user without oauth
  if (!existingUser[0].githubId) {
    await updateGithubId(existingUser[0].id, githubUserId);
  }

  if (!existingUser[0].avatarUrl) {
    await updateAvatarUrl(existingUser[0].id, githubAvatarUrl);
  }

  const sessionToken = generateSessionToken();
  const session = await createSession(sessionToken, existingUser[0].id);
  await setSessionTokenCookie(sessionToken, session.expiresAt);

  return new Response(null, { status: 302, headers: { Location: "/links" } });
}
