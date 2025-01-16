import { sql } from "drizzle-orm";

import { db } from "../db";
import { Link, links as linksSchema } from "../schema";

export const getLinksByUserId = async (userId: number): Promise<Link[]> => {
  return await db.query.links.findMany({
    columns: {
      id: true,
      userId: true,
      sequence: true,
      url: true,
      platform: true,
    },
    where: (links, { eq }) => eq(links.userId, userId),
  });
};

export const upsertUserLinks = async (links: Link[]) => {
  // if (!links || links.length === 0) {
  //   console.error("No links to upsert.");
  //   return;
  // }
  await db
    .insert(linksSchema)
    .values(links)
    .onConflictDoUpdate({
      target: [linksSchema.id],
      set: {
        url: sql`excluded.url`,
        platform: sql`excluded.platform`,
        sequence: sql`excluded.sequence`,
      },
    });
};
