import { cn } from "@/lib/utils";
import Image from "next/image";

export default function DevlinksLogo({ className }: { className?: string }) {
  return (
    <div className={cn("flex w-fit items-center gap-1", className)}>
      <Image
        src="/logos/devlinksLogo.svg"
        alt="icon logo of devlinks"
        width="41"
        height="40"
      />
      <Image
        src="/logos/devlinks.svg"
        alt="devlinks text"
        width="136"
        height="27"
      />
    </div>
  );
}
