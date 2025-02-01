"use server";

import { eq } from "drizzle-orm";
import "server-only";

import { db } from "@/drizzle/db";
import { usersTable } from "@/drizzle/schema";

import { generateBlurDataURL } from "./utils";

export async function updateUsersWithBlurDataUrl() {
  try {
    // Fetch all users
    const users = await db.select().from(usersTable);

    for (const user of users) {
      if (!user.avatarUrl) {
        console.warn(`Skipping user ${user.id}, no avatar URL found.`);
        continue;
      }

      const blurDataUrl = await generateBlurDataURL(user.avatarUrl);
      if (!blurDataUrl) {
        console.warn(
          `Skipping user ${user.id}, failed to generate blurDataUrl.`
        );
        continue;
      }

      // Update user in the database
      await db
        .update(usersTable)
        .set({ blurDataUrl })
        .where(eq(usersTable.id, user.id));

      console.log(`Updated user ${user.id} with blurDataUrl.`);
    }

    console.log("All users updated successfully.");
  } catch (error) {
    console.error("Error updating users:", error);
  }
}
