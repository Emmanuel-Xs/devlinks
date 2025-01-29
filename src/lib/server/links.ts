"use server";

import { cache } from "react";

import "server-only";

import { getLinksByUserId } from "@/drizzle/query/links";

export const getUserLinksAction = cache(async (userId: number) => {
  return await getLinksByUserId(userId);
});
