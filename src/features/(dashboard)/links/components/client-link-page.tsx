"use client";

import dynamic from "next/dynamic";

import Loader from "@/components/loader";
import { Link, User } from "@/drizzle/schema";

// import { LinksStoreProvider } from "@/store/links-store-provider";

// import { LinksStoreProvider } from "@/store/links-store-provider";

import PageHeading from "../../components/page-heading";

import LinksList from "./links-list";

const SaveLinksButton = dynamic(() => import("./save-links-button"), {
  ssr: false,
});

const LinksStoreProvider = dynamic(
  () =>
    import("@/store/links-store-provider").then(
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
}: {
  user: User;
  userLinks: Link[];
}) {
  return (
    <LinksStoreProvider userLinks={userLinks}>
      <div className="space-y-10 p-6 sm:p-10">
        <PageHeading
          title="Customize your links"
          description="Add/edit/remove links below and then share all your profiles with the world!"
        />
        <LinksList user={user} />
      </div>
      <SaveLinksButton userId={user.id} />
    </LinksStoreProvider>
  );
}
