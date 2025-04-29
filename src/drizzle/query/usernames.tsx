import { eq } from "drizzle-orm";

import { db } from "../db";
import {
  UserUsername,
  returningUserData,
  returningUsernames,
  userUsernamesTable,
  usersTable,
} from "../schema";

export const getUserUsernames = async (userId: number) => {
  return db
    .select(returningUsernames)
    .from(userUsernamesTable)
    .where(eq(userUsernamesTable.userId, userId));
};

export const getUserDefaultUsername = async (userId: number) => {
  return db
    .select(returningUsernames)
    .from(userUsernamesTable)
    .where(eq(userUsernamesTable.userId, userId))
    .limit(1)
    .then((rows) => rows[0] ?? null);
};

// New helper in your server code:
export async function getUserWithDefaultUsername(userId: number) {
  // 1) fetch base user
  const [user] = await db
    .select(returningUserData)
    .from(usersTable)
    .where(eq(usersTable.id, userId))
    .limit(1);
  if (!user) return null;

  // 2) fetch default username
  const [uu] = await db
    .select(returningUsernames) // { username }
    .from(userUsernamesTable)
    .where(eq(userUsernamesTable.userId, userId))
    .limit(1);

  return {
    ...user,
    username: uu?.username ?? null,
  };
}

export async function getUserByUsername(username: string) {
  return db.transaction(async (tx) => {
    const [usernameEntry] = await tx
      .select()
      .from(userUsernamesTable)
      .where(eq(userUsernamesTable.username, username))
      .limit(1);

    if (!usernameEntry) return null;

    const [user] = await tx
      .select({
        ...returningUserData,
        googleId: usersTable.googleId,
        githubId: usersTable.githubId,
      })
      .from(usersTable)
      .where(eq(usersTable.id, usernameEntry.userId))
      .limit(1);

    if (!user) {
      return null;
    }

    return {
      user,
      usernameEntry,
    };
  });
}

export const upsertUserUsernames = async (
  userId: number,
  usernames: UserUsername[]
) => {
  return db.transaction(async (tx) => {
    if (!userId || usernames.length <= 0) return [];

    await tx
      .delete(userUsernamesTable)
      .where(eq(userUsernamesTable.userId, userId));

    await tx.insert(userUsernamesTable).values(
      usernames.map((u) => ({
        userId,
        username: u.username,
      }))
    );
  });
};

export async function isUsernameTaken(username: string) {
  const result = await db
    .select()
    .from(userUsernamesTable)
    .where(eq(userUsernamesTable.username, username))
    .limit(1);

  return result.length > 0;
}
