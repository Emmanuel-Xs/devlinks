import "server-only";

import { getLinksByUserId } from "@/drizzle/query/links";

export const getUserLinksAction = async (userId: number) => {
  return await getLinksByUserId(userId);
};
