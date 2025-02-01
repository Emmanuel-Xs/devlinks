import { redirect } from "next/navigation";

import { Skeleton } from "@/components/ui/skeleton";
import UserAvatar from "@/components/user-avatar";
import { getUserLinksAction } from "@/lib/server/links";
import { getCurrentSession } from "@/lib/server/sessions";
import { generateBlurDataURL } from "@/lib/server/utils";
import { formatUserDisplayName } from "@/lib/utils";

import PhoneFrame from "./phone-frame";
import SideBarLinksList from "./sidebar-links-list";

export default async function Sidebar() {
  const { user } = await getCurrentSession();

  if (!user) redirect("/login");

  const userLinks = await getUserLinksAction(user.id);

  const fullName = formatUserDisplayName(
    user.firstName,
    user.lastName,
    user.username
  );

  const avatarUrl = user.avatarUrl ?? "";
  const blurDataURL = await generateBlurDataURL(avatarUrl);

  const email = user.email;

  return (
    <aside className="hidden h-full w-full max-w-[560px] justify-center rounded-xl bg-card p-6 pt-14 min-[1200px]:grid">
      <PhoneFrame className="space-y-10">
        <div className="space-y-4">
          <UserAvatar
            avatarUrl={avatarUrl}
            fullName={fullName}
            blurDataURL={blurDataURL}
          />
          <div className="text-center">
            {fullName.length <= 0 ? (
              <Skeleton className="mx-auto h-4 w-40 animate-none" />
            ) : (
              <h2 className="heading">{fullName}</h2>
            )}
            {email.length <= 0 ? (
              <Skeleton className="mx-auto mt-0.5 h-3 w-20 animate-none" />
            ) : (
              <p className="text -mt-1 sm:-mt-2">{email}</p>
            )}
          </div>
        </div>
        <SideBarLinksList links={userLinks} />
      </PhoneFrame>
    </aside>
  );
}
