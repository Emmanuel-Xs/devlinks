import { Metadata } from "next";

import PageHeading from "@/features/(dashboard)/components/page-heading";
import { goToLoginOrEmailVerified } from "@/lib/server/auth-checks";

export const metadata: Metadata = {
  title: "Change Password",
  description: "Change Your Password",
};

export default async function ChangePasswordPage() {
  await goToLoginOrEmailVerified();
  return (
    <section className="grid h-full w-full grid-rows-[1fr,_95px] divide-y divide-input rounded-xl bg-card">
      <div className="space-y-10 p-6 sm:p-10">
        <PageHeading title="Change Your Password" description="" />
      </div>
    </section>
  );
}
