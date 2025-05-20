import { eq } from "drizzle-orm";

import { db } from "../db";
import { returningUserData, userUsernamesTable, usersTable } from "../schema";

export async function getUserByEmail(email: string) {
  return db
    .select({
      ...returningUserData,
      googleId: usersTable.googleId,
      githubId: usersTable.githubId,
    })
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .limit(1);
}

export async function isEmailTaken(email: string) {
  const result = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .limit(1);

  return result.length > 0;
}

export const getUserFromGithubId = async (id: number) => {
  return db
    .select(returningUserData)
    .from(usersTable)
    .where(eq(usersTable.githubId, id));
};

export const getUserFromGoogleId = async (id: string) => {
  return db
    .select(returningUserData)
    .from(usersTable)
    .where(eq(usersTable.googleId, id));
};

export const createUserFromGithub = async (
  githubId: number,
  username: string,
  email: string,
  avatarUrl: string | null,
  blurDataUrl: string | null,
  emailVerified: number
) => {
  return db.transaction(async (tx) => {
    const [user] = await tx
      .insert(usersTable)
      .values({
        githubId,
        email,
        avatarUrl,
        blurDataUrl,
        emailVerified,
      })
      .returning(returningUserData);

    await tx.insert(userUsernamesTable).values({
      userId: user.id,
      username,
    });

    return { ...user, username };
  });
};

export const createUserFromGoogle = async (
  googleId: string,
  username: string,
  email: string,
  avatarUrl: string | null,
  blurDataUrl: string | null,
  emailVerified: number
) => {
  return db.transaction(async (tx) => {
    const [user] = await tx
      .insert(usersTable)
      .values({
        googleId,
        email,
        avatarUrl,
        blurDataUrl,
        emailVerified,
      })
      .returning(returningUserData);

    await tx.insert(userUsernamesTable).values({
      userId: user.id,
      username,
    });

    return { ...user, username };
  });
};

export const createUser = async (
  username: string,
  email: string,
  passwordHash: string,
  emailVerified = 0
) => {
  return await db.transaction(async (tx) => {
    const [user] = await tx
      .insert(usersTable)
      .values({ email, password: passwordHash, emailVerified })
      .returning(returningUserData);

    await tx.insert(userUsernamesTable).values({
      userId: user.id,
      username,
    });

    return { ...user, username };
  });
};

export async function updateGithubId(userId: number, githubId: number) {
  await db
    .update(usersTable)
    .set({ githubId })
    .where(eq(usersTable.id, userId));
}

export async function updateGoogleId(userId: number, googleId: string) {
  await db
    .update(usersTable)
    .set({ googleId })
    .where(eq(usersTable.id, userId));
}

export async function updateAvatarUrl(
  userId: number,
  avatarUrl: string | null
) {
  await db
    .update(usersTable)
    .set({ avatarUrl })
    .where(eq(usersTable.id, userId));
}

export async function updateBlurDataUrl(
  userId: number,
  blurDataUrl: string | null
) {
  await db
    .update(usersTable)
    .set({ blurDataUrl })
    .where(eq(usersTable.id, userId));
}

export async function updateUserEmailAndSetEmailAsVerified(
  userId: number,
  email: string
) {
  await db
    .update(usersTable)
    .set({ email, emailVerified: 1 })
    .where(eq(usersTable.id, userId));
}

export async function getUserPasswordHash(userId: number) {
  return await db
    .select({ password: usersTable.password })
    .from(usersTable)
    .where(eq(usersTable.id, userId));
}

export async function updateUserPassword(
  userId: number,
  password: string
): Promise<void> {
  await db
    .update(usersTable)
    .set({ password })
    .where(eq(usersTable.id, userId));
}

export async function updateUserProfile(
  userId: number,
  data: {
    firstName: string | null;
    lastName: string | null;
  }
) {
  await db
    .update(usersTable)
    .set({
      firstName: data.firstName,
      lastName: data.lastName,
    })
    .where(eq(usersTable.id, userId));
}

export async function getUserProfileData(userId: number) {
  return await db
    .select({
      firstName: usersTable.firstName,
      lastName: usersTable.lastName,
      email: usersTable.email,
      avatarUrl: usersTable.avatarUrl,
    })
    .from(usersTable)
    .where(eq(usersTable.id, userId));
}

export async function unVerifyEmail(userId: number) {
  await db
    .update(usersTable)
    .set({
      emailVerified: 0,
    })
    .where(eq(usersTable.id, userId));
}
