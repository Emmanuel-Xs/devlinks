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
    orderBy: (links, { desc }) => [desc(links.sequence)],
  });
};

export const upsertUserLinks = async (links: Link[], userId: number) => {
  return await db.transaction(async (tx) => {
    if (!userId) return;

    await tx.delete(linksSchema).where(sql`${linksSchema.userId} = ${userId}`);

    if (links && links.length > 0) {
      await tx.insert(linksSchema).values(
        links.map((link, index) => ({
          ...link,
          userId, // ensure userId is set
          sequence: links.length - index,
        }))
      );
    }
  });
};
