import { Metadata } from "next";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import PageHeading from "@/features/(dashboard)/components/page-heading";
import LinksList from "@/features/(dashboard)/links/components/links-list";
import { getUserLinksAction } from "@/features/(dashboard)/links/server/actions";
import { goToLoginOrEmailVerified } from "@/lib/server/auth-checks";
import { getCurrentSession } from "@/lib/server/sessions";
import { LinksStoreProvider } from "@/store/links-store-provider";

export const metadata: Metadata = {
  title: "links",
};

export default async function Page() {
  await goToLoginOrEmailVerified();

  const { user } = await getCurrentSession();

  if (!user) redirect("/login");

  const userLinks = await getUserLinksAction(user.id);

  return (
    <section className="grid h-full w-full grid-rows-[1fr,_95px] divide-y divide-input rounded-xl bg-card">
      <div className="space-y-10 p-6 sm:p-10">
        <PageHeading
          title="Customize your links"
          description="Add/edit/remove links below and then share all your profiles with
            the world!"
        />
        <LinksStoreProvider userLinks={userLinks}>
          <LinksList user={user} />
        </LinksStoreProvider>
      </div>
      <div className="flex justify-end p-6 sm:px-10">
        <Button disabled className="max-sm:w-full">
          Save
        </Button>
      </div>
    </section>
  );
}
