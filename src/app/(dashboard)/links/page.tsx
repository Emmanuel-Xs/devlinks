import { Metadata } from "next";
import { redirect } from "next/navigation";

import PageHeading from "@/features/(dashboard)/components/page-heading";
import ClientLinkPage from "@/features/(dashboard)/links/components/client-link-page";
import { getUserLinksAction } from "@/features/(dashboard)/links/server/actions";
import { goToLoginOrEmailVerified } from "@/lib/server/auth-checks";
import { getCurrentSession } from "@/lib/server/sessions";

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
      <ClientLinkPage user={user} userLinks={userLinks}>
        <PageHeading
          title="Customize your links"
          description="Add/edit/remove links below and then share all your profiles with the world!"
        />
      </ClientLinkPage>
    </section>
  );
}
