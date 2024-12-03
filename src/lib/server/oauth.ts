import { GitHub, Google } from "arctic";
import { env } from "./serverEnv";

export const github = new GitHub(
  env.GITHUB_CLIENT_ID,
  env.GITHUB_CLIENT_SECRET,
  process.env.NODE_ENV === "production"
    ? `${env.HOME_URL}/api/github/callback`
    : "http://localhost:3000/api/github/callback",
);

export const google = new Google(
  env.GOOGLE_CLIENT_ID,
  env.GOOGLE_CLIENT_SECRET,
  process.env.NODE_ENV === "production"
    ? `${env.HOME_URL}/api/google/callback`
    : "http://localhost:3000/api/google/callback",
);
