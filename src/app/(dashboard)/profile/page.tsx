import { Metadata } from "next";

import SettingsDropDownMenu from "@/components/settings-dropdown-menu";
import PageHeading from "@/features/(dashboard)/components/page-heading";
import ClientProfilePage from "@/features/(dashboard)/profile/components/client-profile-page";
import { goToLoginOrEmailVerified } from "@/lib/server/auth-checks";

export const metadata: Metadata = {
  title: "profile",
};

export default async function ProfilePage() {
  const { user } = await goToLoginOrEmailVerified();

  return (
    <ClientProfilePage user={user}>
      <div className="flex items-start justify-between">
        <PageHeading
          title="Profile Details"
          description="Add your details to create a personal touch to your profile."
        />
        <SettingsDropDownMenu />
      </div>
    </ClientProfilePage>
  );
}
