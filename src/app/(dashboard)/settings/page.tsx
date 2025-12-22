import { Metadata } from "next";

import LogoutButton from "@/components/logout-button";
import { getUserByEmail } from "@/drizzle/query/users";
import PageHeading from "@/features/(dashboard)/components/page-heading";
import { DangerZone } from "@/features/(dashboard)/settings/components/danger-zone";
import { OAuthLinks } from "@/features/(dashboard)/settings/components/oauth-links";
import { ProfileLinks } from "@/features/(dashboard)/settings/components/profile-links";
import { SettingsToast } from "@/features/(dashboard)/settings/components/settings-toast";
import { goToLoginOrEmailVerified } from "@/lib/server/auth-checks";

export const metadata: Metadata = {
  title: "settings",
};

export default async function SettingsPage() {
  const {
    user: { email },
  } = await goToLoginOrEmailVerified();

  const [user] = await getUserByEmail(email);

  const oauthConnections = {
    github: Boolean(user.githubId),
    google: Boolean(user.googleId),
  };

  return (
    <section className="grid h-full w-full grid-rows-[1fr_95px] divide-y divide-input rounded-xl bg-card">
      <div className="space-y-10 p-6 sm:p-10">
        <SettingsToast />
        <PageHeading
          title="Settings"
          description="Manage your account settings and preferences"
        />
        <ProfileLinks />
        <div className="space-y-4">
          <h2 className="text-xl font-medium">Account</h2>
          <OAuthLinks connections={oauthConnections} />
          <LogoutButton className="mt-8 items-center justify-center gap-4 py-2.5" />
        </div>
        <DangerZone />
      </div>
    </section>
  );
}
