import { Metadata } from "next";

import SettingsDropDownMenu from "@/components/settings-dropdown-menu";
import { getAllUserSessions } from "@/drizzle/query/sessions";
import PageHeading from "@/features/(dashboard)/components/page-heading";
import ClientLinkPage from "@/features/(dashboard)/links/components/client-link-page";
import { goToLoginOrEmailVerified } from "@/lib/server/auth-checks";
import { getUserLinksAction } from "@/lib/server/links";

export const metadata: Metadata = {
  title: "links",
};

export default async function Page() {
  const { user } = await goToLoginOrEmailVerified();

  const allUserSessions = await getAllUserSessions(user.id);

  const userLinks = await getUserLinksAction(user.id);

  return (
    <section className="grid h-full w-full grid-rows-[1fr_95px] divide-y divide-input rounded-xl bg-card">
      <ClientLinkPage
        user={user}
        userLinks={userLinks}
        noOfUserSessions={allUserSessions.length}
      >
        <div className="flex items-start justify-between">
          <PageHeading
            title="Customize your links"
            description="Add/edit/remove links below and then share all your profiles with the world!"
          />
          <SettingsDropDownMenu />
        </div>
      </ClientLinkPage>
    </section>
  );
}
