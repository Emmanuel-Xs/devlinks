"use client";

import dynamic from "next/dynamic";
import { ReactNode } from "react";

import Loader from "@/components/loader";
import { User } from "@/drizzle/schema";

import ProfileDetailsForm from "./profile-details-form";
import ProfilePictureCard from "./profile-picture-card";
import SaveProfileButton from "./save-profile-button";

const ProfileStoreProvider = dynamic(
  () =>
    import("@/store/profile/profile-store-provider").then(
      (mod) => mod.ProfileStoreProvider
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

export default function ClientProfilePage({
  user,
  children,
}: {
  user: User;
  children: ReactNode;
}) {
  return (
    <ProfileStoreProvider user={user}>
      <section className="grid h-full w-full grid-rows-[1fr,_95px] divide-y divide-input rounded-xl bg-card">
        <div className="space-y-10 p-6 sm:p-10">
          {children}
          <div className="space-y-6">
            <ProfilePictureCard
              avatarUrl={user.avatarUrl}
              blurDataUrl={user.blurDataUrl}
            />
            <ProfileDetailsForm />
          </div>
        </div>
        <div className="flex justify-end p-6 sm:px-10">
          <SaveProfileButton userId={user.id} />
        </div>
      </section>
    </ProfileStoreProvider>
  );
}
