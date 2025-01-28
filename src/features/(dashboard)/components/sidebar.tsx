import { redirect } from "next/navigation";

import { Avatar } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { getCurrentSession } from "@/lib/server/sessions";

import { getUserLinksAction } from "../links/server/actions";

import PhoneFrame from "./phone-frame";
import SideBarLinksList from "./sidebar-links-list";

export default async function Sidebar() {
  const { user } = await getCurrentSession();

  if (!user) redirect("/login");

  const userLinks = await getUserLinksAction(user.id);

  return (
    <aside className="hidden h-full w-full max-w-[560px] justify-center rounded-xl bg-card p-6 pt-14 min-[1200px]:grid">
      <PhoneFrame className="space-y-10">
        <div className="space-y-6">
          <Avatar className="mx-auto h-28 w-28">
            <Skeleton className="h-full w-full animate-none rounded-full" />
          </Avatar>
          <div className="space-y-3 text-center">
            <Skeleton className="mx-auto h-4 w-40 animate-none" />
            <Skeleton className="mx-auto h-3 w-20 animate-none" />
          </div>
        </div>
        <SideBarLinksList links={userLinks} />
      </PhoneFrame>
    </aside>
  );
}
