import {
  generateSessionToken,
  createSession,
  setSessionTokenCookie,
} from "@/lib/server/sessions";
import { github } from "@/lib/server/oauth";
import { cookies } from "next/headers";

import type { OAuth2Tokens } from "arctic";
import {
  createUserFromGithub,
  getUserFromGithubId,
} from "@/drizzle/query/users";

type GithubUser = {
  id: number;
  login: string;
  avatar_url: string;
};

type GithubEmail = {
  email: string;
  primary: boolean;
  verified: boolean;
  visibility: string | null;
};

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  const cookieStore = await cookies();
  const storedState = cookieStore.get("github_oauth_state")?.value ?? null;

  if (code === null || state === null || storedState === null) {
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
    tokens = await github.validateAuthorizationCode(code);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    // Invalid code or client credentials
    return new Response(null, {
      status: 400,
    });
  }

  const githubUserResponse = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${tokens.accessToken()}`,
    },
  });

  const githubUser: GithubUser = await githubUserResponse.json();

  console.log("github user object: ", githubUser);

  // Fetch user's email addresses
  const githubEmailResponse = await fetch(
    "https://api.github.com/user/emails",
    {
      headers: {
        Authorization: `Bearer ${tokens.accessToken()}`,
      },
    },
  );

  const emails: GithubEmail[] = await githubEmailResponse.json();

  console.log("github emails object: ", emails);
  const primaryEmail = emails.find((email) => email.primary)?.email ?? null;

  if (!primaryEmail) {
    return new Response("No primary email found", { status: 400 });
  }

  const githubUserId = githubUser.id;
  const githubUsername = githubUser.login;
  const githubAvatarUrl = githubUser.avatar_url;

  const existingUser = await getUserFromGithubId(githubUserId);

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

  const user = await createUserFromGithub(
    githubUserId,
    githubUsername,
    primaryEmail,
    githubAvatarUrl,
    1,
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
