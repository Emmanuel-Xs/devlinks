import { GitHub, Google } from "arctic";
import { env } from "./serverEnv";

export const github = new GitHub(
  process.env.NODE_ENV === "production"
    ? env.GITHUB_CLIENT_ID
    : env.GITHUB_CLIENT_ID_DEV,
  process.env.NODE_ENV === "production"
    ? env.GITHUB_CLIENT_SECRET
    : env.GITHUB_CLIENT_SECRET_DEV,
  null,
);

export const google = new Google(
  env.GOOGLE_CLIENT_ID,
  env.GOOGLE_CLIENT_SECRET,
  process.env.NODE_ENV === "production"
    ? `${env.HOME_URL}${env.OAUTH_CALLBACK}`
    : `${env.LOCALHOST}${env.OAUTH_CALLBACK}`,
);
