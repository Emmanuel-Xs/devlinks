import { useMemo } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@/drizzle/schema";
import PreviewLinks from "@/features/preview/components/preview-links";

export default function SideBarLinksList({ links }: { links: Link[] }) {
  const linkslist = useMemo(() => {
    const totalItems = Math.max(5, links.length);
    return Array.from(
      { length: totalItems },
      (_, index) => links[index] || null
    );
  }, [links]);

  return (
    <ScrollArea className="h-80 pb-4">
      <div className="w-full space-y-4">
        {linkslist.map((link, i) =>
          link ? (
            <PreviewLinks
              name={link.platform}
              url={link.url}
              key={`link-${i}`}
              className="h-[46px] w-full"
            />
          ) : (
            <Skeleton
              key={`skeleton-${i}`}
              className="h-[46px] w-full animate-none rounded-lg"
            />
          )
        )}
      </div>
    </ScrollArea>
  );
}
