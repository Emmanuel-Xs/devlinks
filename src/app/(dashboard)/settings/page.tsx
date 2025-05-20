import { Metadata } from "next";
import Link from "next/link";

import GithubIcon from "@/components/Icons/github";
import LogoutButton from "@/components/logout-button";
import { ArrowRightIcon } from "@/components/ui/arrow-right-icon";
import { Button } from "@/components/ui/button";
import PageHeading from "@/features/(dashboard)/components/page-heading";
import { goToLoginOrEmailVerified } from "@/lib/server/auth-checks";

export const metadata: Metadata = {
  title: "settings",
};

export default async function SettingsPage() {
  await goToLoginOrEmailVerified();
  return (
    <section className="grid h-full w-full grid-rows-[1fr,_95px] divide-y divide-input rounded-xl bg-card">
      <div className="space-y-10 p-6 sm:p-10">
        <PageHeading
          title="Settings"
          description="Manage your account settings and preferences"
        />

        <div className="space-y-4">
          <h2 className="text-xl font-medium">Profile</h2>
          <Link
            href="/settings/usernames"
            className="group flex items-center justify-between rounded-md border border-gray-400 p-2"
          >
            Add Multiple Usernames
            <ArrowRightIcon className="text-gray-400" size={20} />
          </Link>
          <Link
            href="/settings/change-password"
            className="group flex items-center justify-between rounded-md border border-gray-400 p-2"
          >
            Change Your Password
            <ArrowRightIcon className="text-gray-400" size={20} />
          </Link>
        </div>
        <div>
          <h2 className="pb-4 text-xl font-medium">Account</h2>
          <LogoutButton className="items-center justify-center gap-4 py-2.5" />
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-medium">OAuth</h2>
          <Link
            href="/api/github"
            className="group flex items-center gap-3 rounded-md border border-gray-400 p-2"
          >
            Add Your Github Account <GithubIcon />
          </Link>
          <Link
            href="/api/google"
            className="group flex items-center gap-4 rounded-md border border-gray-400 p-2"
          >
            Add Your Google Account <GithubIcon />
          </Link>
        </div>
        <div>
          <h2 className="pb-4 text-xl font-medium">Danger Zone</h2>
          <div className="flex flex-col rounded-md border border-destructive p-4">
            <h3 className="text-lg text-destructive">Delete this account</h3>
            <p>
              Once you delete your account, all your data will be deleted and
              there is no going back. Please be certain
            </p>
            <Button
              className="ml-auto mt-4 w-fit"
              variant="destructive-outline"
              size="ex"
            >
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
