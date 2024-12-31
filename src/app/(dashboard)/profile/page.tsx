import { Metadata } from "next";

import { SettingsIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import PageHeading from "@/features/(dashboard)/components/page-heading";
import ProfileDetails from "@/features/(dashboard)/profile/components/profile-details";
import { goToLoginOrEmailVerified } from "@/lib/server/auth-checks";

export const metadata: Metadata = {
  title: "profile",
};

export default async function Page() {
  await goToLoginOrEmailVerified();

  return (
    <section className="grid h-full w-full grid-rows-[1fr,_95px] divide-y divide-input rounded-xl bg-card">
      <div className="space-y-10 p-6 sm:p-10">
        <div className="flex justify-between ring">
          <PageHeading
            title="Profile Details"
            description="Add your details to create a personal touch to your profile."
          />
          <SettingsIcon />
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
