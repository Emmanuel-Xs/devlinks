import { notFound } from "next/navigation";
import { cache, use } from "react";

import PreviewLinks from "@/components/preview-links";
import { ScrollArea } from "@/components/ui/scroll-area";
import UserAvatar from "@/components/user-avatar";
import { getUserByUsername } from "@/drizzle/query/users";
import PreviewNavbar from "@/features/preview/components/preview-navbar";
import { getUserLinksAction } from "@/lib/server/links";
import { cn, formatUserDisplayName } from "@/lib/utils";

const getUserByUsernameCached = cache(getUserByUsername);

export async function generateMetadata({
  params,
}: {
  params: { username: string };
}) {
  const username = params.username.toLowerCase();
  const user = await getUserByUsernameCached(username);

  if (!user || user.length === 0) {
    return {
      title: "User Not Found",
      description: "The user you're looking for does not exist on devlinks.",
    };
  }

  // Extract user details
  const currentUser = user[0];
  const fullName = formatUserDisplayName(
    currentUser.firstName,
    currentUser.lastName,
    currentUser.username
  );
  const description = `Explore ${fullName}'s curated list of developer links and social profiles on devlinks.`;

  return {
    title: `${fullName}`,
    description,
    openGraph: {
      title: `${fullName} | devlinks`,
      description,
      images: currentUser.avatarUrl
        ? [currentUser.avatarUrl]
        : ["https://devlinks-abc.vercel.app/og-image-home.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: `${fullName} | devlinks`,
      description,
      images: currentUser.avatarUrl
        ? [currentUser.avatarUrl]
        : ["https://devlinks-abc.vercel.app/og-image-home.png"],
    },
  };
}

export default function Page({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = use(params);
  const user = use(getUserByUsernameCached(username.toLocaleLowerCase()));

  if (user.length <= 0) notFound();

  const links = use(getUserLinksAction(user[0].id));

  const fullName = formatUserDisplayName(
    user[0].firstName,
    user[0].lastName,
    user[0].username
  );

  const avatarUrl = user[0].avatarUrl ?? "";
  const email = user[0].email;
  const blurDataURL = user[0].blurDataUrl ?? undefined;

  return (
    <main className="mb-16 min-h-svh">
      <section className="relative h-full bg-card sm:bg-none">
        <div className="hidden h-[357px] rounded-b-[32px] bg-primary pt-4 sm:block">
          <PreviewNavbar userId={user[0].id} username={username} />
        </div>
        <PreviewNavbar
          className="px-0 sm:hidden"
          userId={user[0].id}
          username={username}
        />
        <div className="inset-x-1/2 top-[208px] mx-auto w-full max-w-[430px] px-10 py-12 pb-8 text-center sm:absolute sm:w-[349px] sm:-translate-x-1/2 sm:rounded-3xl sm:bg-card sm:shadow-active">
          <UserAvatar
            avatarUrl={avatarUrl}
            fullName={fullName}
            blurDataURL={blurDataURL}
          />
          <div className="mb-5">
            <h1 className={cn("heading leading-tight sm:text-3xl")}>
              {fullName}
            </h1>
            <p className="text">{email}</p>
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
      </section>
    </main>
  );
}
