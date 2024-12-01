import { eq } from "drizzle-orm";
import { db } from "../db";
import { usersTable } from "../schema";

export const getUserFromGithubId = async (id: number) => {
  return db
    .select(returningUserData)
    .from(usersTable)
    .where(eq(usersTable.githubId, id));
};

export const getUserFromGoogleId = async (id: string) => {
  return db
    .select({
      id: usersTable.id,
      firstName: usersTable.firstName,
      lastName: usersTable.lastName,
      username: usersTable.username,
      email: usersTable.email,
    })
    .from(usersTable)
    .where(eq(usersTable.googleId, id));
};

export const createUserFromGithub = async (
  githubId: number,
  username: string,
  email: string,
  avatarUrl: string | null,
  emailVerified: number,
) => {
  return db
    .insert(usersTable)
    .values({ githubId, username, email, avatarUrl, emailVerified })
    .returning(returningUserData);
};

export const createUserFromGoogle = async (
  googleId: string,
  username: string,
  email: string,
  avatarUrl: string | null,
  emailVerified: number,
) => {
  return db
    .insert(usersTable)
    .values({ googleId, username, email, avatarUrl, emailVerified })
    .returning(returningUserData);
};

const returningUserData = {
  id: usersTable.id,
  firstName: usersTable.firstName,
  lastName: usersTable.lastName,
  username: usersTable.username,
  email: usersTable.email,
  avatarUrl: usersTable.avatarUrl,
  emailVerified: usersTable.emailVerified,
};
