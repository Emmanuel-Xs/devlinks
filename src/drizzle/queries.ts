import { eq } from "drizzle-orm";
import { db } from "./db";
import { usersTable } from "./schema";

export const getUserFromGithubId = async (id: number) => {
  return db.select().from(usersTable).where(eq(usersTable.githubId, id));
};

export const createUserFromGithub = async (
  githubId: number,
  username: string,
) => {
  return db.insert(usersTable).values({ githubId, username }).returning({
    id: usersTable.id,
    firstName: usersTable.firstName,
    lastName: usersTable.lastName,
    username: usersTable.username,
    email: usersTable.email,
  });
};

/* {
    id: usersTable.id,
    firstName: usersTable.firstName,
    lastName: usersTable.lastName,
    username: usersTable.username,
    email: usersTable.email,
  } */
