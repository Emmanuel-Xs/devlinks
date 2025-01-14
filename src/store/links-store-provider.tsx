"use client";

import { PropsWithChildren, useMemo } from "react";

import { Link } from "@/drizzle/schema";

import { LinksStoreContext, createLinksStore } from "./links-store";

type LinksStoreProviderProps = PropsWithChildren<{
  userLinks: Link[];
}>;

export const LinksStoreProvider = ({
  children,
  userLinks,
}: LinksStoreProviderProps) => {
  const store = useMemo(() => createLinksStore({ userLinks }), [userLinks]);

  return <LinksStoreContext value={store}>{children}</LinksStoreContext>;
};
