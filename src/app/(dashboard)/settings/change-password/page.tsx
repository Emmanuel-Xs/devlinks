import { Metadata } from "next";

import SettingsDropDownMenu from "@/components/settings-dropdown-menu";
import PageHeading from "@/features/(dashboard)/components/page-heading";
import ChangePasswordForm from "@/features/(dashboard)/settings/components/change-password-form";
import { goToLoginOrEmailVerified } from "@/lib/server/auth-checks";

export const metadata: Metadata = {
  title: "Change Password",
  description: "Change Your Password",
};

export default async function ChangePasswordPage() {
  await goToLoginOrEmailVerified();
  return (
    <section className="grid h-full w-full rounded-xl bg-card">
      <div className="space-y-10 p-6 sm:p-10">
        <div className="flex items-center justify-between">
          <PageHeading title="Change Your Password" description="" />
          <SettingsDropDownMenu />
        </div>
        <ChangePasswordForm />
      </div>
    </section>
  );
}
