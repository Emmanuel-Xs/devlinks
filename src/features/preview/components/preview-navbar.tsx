import Link from "next/link";
import { use } from "react";

import { Button } from "@/components/ui/button";
import { getCurrentSession } from "@/lib/server/sessions";
import { cn } from "@/lib/utils";

import ShareButton from "./share-button";

export default function PreviewNavbar({
  className,
  userId,
  username,
}: {
  className?: string;
  userId: number;
  username: string;
}) {
  const { session } = use(getCurrentSession());

  const loggedInUserId = session?.userId;

  return (
    <nav
      className={cn(
        "mx-auto flex w-[min(100%_-_2rem,_1392px)] items-center justify-between rounded-xl bg-card p-4",
        className
      )}
    >
      {loggedInUserId === userId ? (
        <Button variant="outline" size="ex" asChild>
          <Link href="/links">Back to Editor</Link>
        </Button>
      ) : (
        <Button variant="outline" size="ex" asChild>
          <Link href="/login">Login</Link>
        </Button>
      )}
      <ShareButton username={username} />
    </nav>
  );
}
