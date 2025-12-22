import { notFound } from "next/navigation";
import { cache, use } from "react";

import PreviewNavbar from "@/features/preview/components/preview-navbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import PreviewLinks from "@/components/preview-links";
import { getUserByUsername } from "@/drizzle/query/usernames";
import UserAvatar from "@/components/user-avatar";
import { getUserLinksAction } from "@/lib/server/links";
import { cn, formatUserDisplayName } from "@/lib/utils";

const getUserByUsernameCached = cache(getUserByUsername);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username: rawUsername } = await params;

  const lookup = await getUserByUsernameCached(
    decodeURIComponent(rawUsername.toLocaleLowerCase())
  );

  if (!lookup) {
    return {
      title: "User Not Found",
      description: "The user you're looking for does not exist on devlinks.",
    };
  }

  const { user, usernameEntry } = lookup;

  // Extract user details;
  const fullName = formatUserDisplayName(
    user.firstName,
    user.lastName,
    usernameEntry.username
  );
  const description = `Explore ${fullName}'s curated list of developer links and social profiles on devlinks.`;

  const images = user.avatarUrl
    ? [
        {
          url: user.avatarUrl,
          width: 1200,
          height: 630,
          alt: "user avatar",
        },
      ]
    : [
        {
          url: "https://devlinks-abc.vercel.app/og-image-home.png",
          width: 1200,
          height: 630,
          alt: "devlinks homepage preview",
        },
      ];

  return {
    title: `${fullName}`,
    description,
    openGraph: {
      title: `${fullName} | devlinks`,
      description,
      url: `https://devlinks-abc.vercel.app/${rawUsername}`,
      siteName: "devlinks",
      type: "profile",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: `${fullName} | devlinks`,
      description,
      images,
      site: "devlinks",
    },
  };
}

export default function Page({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username: rawUsername } = use(params);
  const lookup = use(
    getUserByUsernameCached(decodeURIComponent(rawUsername.toLocaleLowerCase()))
  );

  if (!lookup) notFound();
  const { user, usernameEntry } = lookup;

  const displayName = formatUserDisplayName(
    user.firstName,
    user.lastName,
    usernameEntry.username
  );

  const links = use(getUserLinksAction(user.id));

  const avatarUrl = user.avatarUrl ?? "";
  const email = user.email;
  const blurDataURL = user.blurDataUrl ?? undefined;

  return (
    <main className="mb-16 min-h-svh">
      <section className="relative h-full bg-card sm:bg-none">
        <div className="hidden h-89.25 rounded-b-4xl bg-primary pt-4 sm:block">
          <PreviewNavbar userId={user.id} username={rawUsername} />
        </div>
        <PreviewNavbar
          className="px-0 sm:hidden"
          userId={user.id}
          username={rawUsername}
        />
        <div className="inset-x-1/2 top-52 mx-auto w-full max-w-107.5 px-10 py-12 pb-8 text-center sm:absolute sm:w-87.25 sm:-translate-x-1/2 sm:rounded-3xl sm:bg-card sm:shadow-active">
          <UserAvatar
            avatarUrl={avatarUrl}
            fullName={displayName}
            blurDataURL={blurDataURL}
          />
          <div className="mb-5 mt-2">
            <h1 className={cn("heading leading-tight sm:text-3xl")}>
              {displayName}
            </h1>
            <p className="text">{email}</p>
          </div>
          <ScrollArea
            className={cn(
              "h-92.5 sm:h-75",
              links.length <= 0 && "sm:h-67.5"
            )}
          >
            <div className="flex flex-col gap-3">
              {links.length > 0 ? (
                links.map((link) => (
                  <PreviewLinks
                    name={link.platform}
                    url={link.url}
                    key={link.id}
                    className="h-12 sm:h-11.5"
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
