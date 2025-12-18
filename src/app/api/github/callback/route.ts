import { cookies } from "next/headers";

import type { OAuth2Tokens } from "arctic";

import { createSession } from "@/drizzle/query/sessions";
import {
  createUserFromGithub,
  getUserByEmail,
  getUserFromGithubId,
  updateAvatarUrl,
  updateBlurDataUrl,
  updateGithubId,
} from "@/drizzle/query/users";
import { github } from "@/lib/server/oauth";
import { globalGETRateLimit } from "@/lib/server/request";
import {
  generateSessionToken,
  getCurrentSession,
  setSessionTokenCookie,
} from "@/lib/server/sessions";
import { refineOAuthUsername } from "@/lib/server/users";
import { generateBlurDataURL } from "@/lib/server/utils";

type GithubUser = {
  id: number;
  login: string;
  avatar_url: string;
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
  const storedState = cookieStore.get("github_oauth_state")?.value ?? null;
  const mode = cookieStore.get("github_oauth_mode")?.value ?? null;

  if (code === null || state === null || storedState === null) {
    return new Response("Please restart the process.", { status: 400 });
  }

  if (state !== storedState) {
    return new Response("Please restart the process.", { status: 400 });
  }

  let tokens: OAuth2Tokens;

  try {
    tokens = await github.validateAuthorizationCode(code);
  } catch (e) {
    console.error("Error validating authorization code:", e);
    return new Response("Please restart the process.", {
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

  //handle linking flow
  if (mode === "link") {
    cookieStore.delete("github_oauth_mode");

    const { user: currentUser } = await getCurrentSession();

    if (!currentUser) {
      return new Response(null, {
        status: 302,
        headers: { Location: "/login?error=session-expired" },
      });
    }

    const existingUserWithGithub = await getUserFromGithubId(githubUserId);

    if (existingUserWithGithub) {
      return new Response(null, {
        status: 302,
        headers: { Location: "/settings?error=github-already-linked" },
      });
    }

    await updateGithubId(currentUser.id, githubUserId);

    return new Response(null, {
      status: 302,
      headers: { Location: "/settings?success=github-linked" },
    });
  }

  const existingUser = await getUserByEmail(email);
  console.log("Existing user from email:", existingUser);

  if (!existingUser.length) {
    const refinedUserName = await refineOAuthUsername(
      githubUsername,
      githubUserId
    );

    const blurDataUrl = await generateBlurDataURL(githubAvatarUrl);

    const user = await createUserFromGithub(
      githubUserId,
      refinedUserName,
      email,
      githubAvatarUrl,
      blurDataUrl,
      1
    );

    if (!user) {
      console.error("Failed to create user:", { githubUsername, email });
      return new Response("Failed to create user", { status: 500 });
    }

    const sessionToken = generateSessionToken();
    const session = await createSession(sessionToken, user.id);
    await setSessionTokenCookie(sessionToken, session.expiresAt);

    return new Response(null, { status: 302, headers: { Location: "/links" } });
  }

  //if there's an existing user without oauth
  if (!existingUser[0].githubId) {
    await updateGithubId(existingUser[0].id, githubUserId);
  }

  if (!existingUser[0].avatarUrl) {
    await updateAvatarUrl(existingUser[0].id, githubAvatarUrl);
    const blurDataUrl = await generateBlurDataURL(githubAvatarUrl);
    await updateBlurDataUrl(existingUser[0].id, blurDataUrl);
  }

  const sessionToken = generateSessionToken();
  const session = await createSession(sessionToken, existingUser[0].id);
  await setSessionTokenCookie(sessionToken, session.expiresAt);

  return new Response(null, { status: 302, headers: { Location: "/links" } });
}
