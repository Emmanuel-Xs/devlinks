import { Metadata } from "next";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import PageHeading from "@/features/(dashboard)/components/page-heading";
import LinksList from "@/features/(dashboard)/links/components/links-list";
import { goToLoginOrEmailVerified } from "@/lib/server/auth-checks";
import { getCurrentSession } from "@/lib/server/sessions";

export const metadata: Metadata = {
  title: "links",
};

export default async function Page() {
  await goToLoginOrEmailVerified();

  const { user } = await getCurrentSession();

  if (!user) redirect("/login");

  return (
    <section className="grid h-full w-full grid-rows-[1fr,_95px] divide-y divide-input rounded-xl bg-card">
      <div className="space-y-10 p-6 sm:p-10">
        <PageHeading
          title="Customize your links"
          description="Add/edit/remove links below and then share all your profiles with
            the world!"
        />
        <LinksList user={user} />
      </div>
      <div className="flex justify-end p-6 sm:px-10">
        <Button disabled className="max-sm:w-full">
          Save
        </Button>
      </div>
    </section>
  );
}
