"use client";

import dynamic from "next/dynamic";
import { ReactNode } from "react";

import Loader from "@/components/loader";
import { Link, User } from "@/drizzle/schema";
import { useLinksSyncWarning } from "@/hooks/use-links-sync-warning";

import LinksList from "./links-list";

const SaveLinksButton = dynamic(() => import("./save-links-button"), {
  ssr: false,
});

const LinksStoreProvider = dynamic(
  () =>
    import("@/store/links/links-store-provider").then(
      (mod) => mod.LinksStoreProvider
    ),
  {
    ssr: false,
    loading: () => (
      <div className="grid h-full w-full place-items-center">
        <Loader />
      </div>
    ),
  }
);

export default function ClientLinkPage({
  user,
  userLinks,
  noOfUserSessions,
  children,
}: {
  user: User;
  userLinks: Link[];
  noOfUserSessions: number;
  children: ReactNode;
}) {
  useLinksSyncWarning(noOfUserSessions);
  return (
    <LinksStoreProvider userLinks={userLinks}>
      <div className="space-y-10 p-6 sm:p-10">
        {children}
        <LinksList user={user} />
      </div>
      <SaveLinksButton userId={user.id} />
    </LinksStoreProvider>
  );
}
