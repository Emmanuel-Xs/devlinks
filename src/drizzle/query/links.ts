import { db } from "../db";
import { Link } from "../schema";

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
