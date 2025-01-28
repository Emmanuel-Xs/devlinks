import Image from "next/image";
import { notFound } from "next/navigation";
import { use } from "react";

import PreviewLinks from "@/components/preview-links";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getLinksByUserId } from "@/drizzle/query/links";
import { getUserByUsername } from "@/drizzle/query/users";
import PreviewNavbar from "@/features/preview/components/preview-navbar";
import { capitalize } from "@/lib/utils";

export default function Page({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = use(params);
  const user = use(getUserByUsername(username));

  if (user.length <= 0) notFound();

  const links = use(getLinksByUserId(user[0].id));

  const fullName =
    user[0].firstName && user[0].lastName
      ? capitalize(`${user[0].firstName} ${user[0].lastName}`)
      : capitalize(user[0].username);

  const avatarUrl = user[0].avatarUrl ?? "";

  const email = user[0].email;

  return (
    <main className="relative min-h-svh bg-card sm:bg-none">
      <div className="hidden h-[357px] rounded-b-[32px] bg-primary pt-4 sm:block">
        <PreviewNavbar userId={user[0].id} />
      </div>
      <PreviewNavbar className="px-0 sm:hidden" userId={user[0].id} />
      <div className="inset-x-1/2 top-[208px] mx-auto h-[560px] w-full max-w-[430px] px-12 py-12 pb-4 text-center sm:absolute sm:w-[349px] sm:-translate-x-1/2 sm:rounded-3xl sm:bg-card sm:py-9 sm:shadow-active">
        {/* TODO:  Image loading or PreLoading */}
        <Image
          src={avatarUrl}
          alt={`Profile image of ${fullName}`}
          width={104}
          height={104}
          className="mx-auto rounded-full border-[4px] border-primary bg-primary"
          priority
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
