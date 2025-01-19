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

export const upsertUserLinks = async (links: Link[]) => {
  return await db.transaction(async (tx) => {
    const userId = links[0]?.userId;
    if (!userId) return;

    await tx.delete(linksSchema).where(sql`${linksSchema.userId} = ${userId}`);

    if (links.length > 0) {
      await tx.insert(linksSchema).values(
        links.map((link, index) => ({
          ...link,
          sequence: links.length - index,
        }))
      );
    }
  });
};
