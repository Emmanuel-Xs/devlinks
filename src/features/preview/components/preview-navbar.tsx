import Link from "next/link";
import { use } from "react";

import { Button } from "@/components/ui/button";
import { getCurrentSession } from "@/lib/server/sessions";
import { cn } from "@/lib/utils";

export default function PreviewNavbar({
  className,
  userId,
}: {
  className?: string;
  userId: number;
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
      <Button size="ex">Share Link</Button>
    </nav>
  );
}
