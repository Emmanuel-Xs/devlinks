import PageHeading from "@/features/(dashboard)/components/page-heading";
import { Button } from "@/components/ui/button";
import ProfileDetails from "@/features/(dashboard)/profile/profile-details";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "user profile",
};

export default function Page() {
  return (
    <section className="grid h-full w-full grid-rows-[1fr,_95px] divide-y divide-input rounded-xl bg-card">
      <div className="space-y-10 p-6 sm:p-10">
        <PageHeading
          title="Profile Details"
          description="Add your details to create a personal touch to your profile."
        />
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
