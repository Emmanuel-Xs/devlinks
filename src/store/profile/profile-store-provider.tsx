"use client";

import { PropsWithChildren, useMemo } from "react";

import { User } from "@/drizzle/schema";

import { ProfileStoreContext, createProfileStore } from "./profile-store";

type ProfileProviderProps = PropsWithChildren<{
  user: User;
}>;

export const ProfileStoreProvider = ({
  children,
  user,
}: ProfileProviderProps) => {
  const store = useMemo(() => createProfileStore({ user }), [user]);

  return <ProfileStoreContext value={store}>{children}</ProfileStoreContext>;
};
