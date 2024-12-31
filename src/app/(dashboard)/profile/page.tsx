import { Metadata } from "next";

import { Button } from "@/components/ui/button";
import PageHeading from "@/features/(dashboard)/components/page-heading";
import ProfileDetails from "@/features/(dashboard)/profile/components/profile-details";
import SettingsDropDownMenu from "@/features/(dashboard)/profile/components/settings-dropdown-menu";
import { goToLoginOrEmailVerified } from "@/lib/server/auth-checks";

export const metadata: Metadata = {
  title: "profile",
};

export default async function ProfilePage() {
  await goToLoginOrEmailVerified();

  return (
    <section className="grid h-full w-full grid-rows-[1fr,_95px] divide-y divide-input rounded-xl bg-card">
      <div className="space-y-10 p-6 sm:p-10">
        <div className="flex items-start justify-between">
          <PageHeading
            title="Profile Details"
            description="Add your details to create a personal touch to your profile."
          />
          <SettingsDropDownMenu />
        </div>
        <ProfileDetails />
      </div>
      <div className="flex justify-end p-6 sm:px-10">
        <Button disabled className="max-sm:w-full">
          Save
        </Button>
      </div>
    </section>
  );
}
