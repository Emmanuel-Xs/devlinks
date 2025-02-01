import { notFound } from "next/navigation";
import { use } from "react";

import PreviewLinks from "@/components/preview-links";
import { ScrollArea } from "@/components/ui/scroll-area";
import UserAvatar from "@/components/user-avatar";
import { getUserByUsername } from "@/drizzle/query/users";
import PreviewNavbar from "@/features/preview/components/preview-navbar";
import { getUserLinksAction } from "@/lib/server/links";
import { generateBlurDataURL } from "@/lib/server/utils";
import { formatUserDisplayName } from "@/lib/utils";

export default function Page({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = use(params);
  const user = use(getUserByUsername(username.toLocaleLowerCase()));

  if (user.length <= 0) notFound();

  const links = use(getUserLinksAction(user[0].id));

  const fullName = formatUserDisplayName(
    user[0].firstName,
    user[0].lastName,
    user[0].username
  );

  const avatarUrl = user[0].avatarUrl ?? "";
  const blurDataURL = use(generateBlurDataURL(avatarUrl));

  const email = user[0].email;

  return (
    <main className="relative min-h-svh bg-card sm:bg-none">
      <div className="hidden h-[357px] rounded-b-[32px] bg-primary pt-4 sm:block">
        <PreviewNavbar userId={user[0].id} username={username} />
      </div>
      <PreviewNavbar
        className="px-0 sm:hidden"
        userId={user[0].id}
        username={username}
      />
      <div className="inset-x-1/2 top-[208px] mx-auto h-[560px] w-full max-w-[430px] px-10 py-12 pb-4 text-center sm:absolute sm:w-[349px] sm:-translate-x-1/2 sm:rounded-3xl sm:bg-card sm:py-9 sm:shadow-active">
        <UserAvatar
          avatarUrl={avatarUrl}
          fullName={fullName}
          blurDataURL={blurDataURL}
        />
        <div className="mb-5">
          <h1 className="heading">{fullName}</h1>
          <p className="text -mt-1 sm:-mt-2">{email}</p>
        </div>
        <ScrollArea className="h-[370px] sm:h-[300px]">
          <div className="flex flex-col gap-3">
            {links.length > 0 ? (
              links.map((link) => (
                <PreviewLinks
                  name={link.platform}
                  url={link.url}
                  key={link.id}
                  className="h-[48px] sm:h-[46px]"
                />
              ))
            ) : (
              <p className="text pt-4 text-lg">User is yet to add links</p>
            )}
          </div>
        </ScrollArea>
      </div>
    </main>
  );
}
