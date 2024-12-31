import { Metadata } from "next";

import PageHeading from "@/features/(dashboard)/components/page-heading";

export const metadata: Metadata = {
  title: "settings",
};

export default function SettingsPage() {
  return (
    <section className="grid h-full w-full grid-rows-[1fr,_95px] divide-y divide-input rounded-xl bg-card">
      <div className="space-y-10 p-6 sm:p-10">
        <PageHeading
          title="Additional Settings"
          description="Other settings not found in profile page"
        />
      </div>
    </section>
  );
}
