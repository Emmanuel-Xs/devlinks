import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

export default function DevlinksLogo({ className }: { className?: string }) {
  return (
    <div className={cn("flex w-fit items-center gap-1", className)}>
      <Image
        src="/logos/devlinksLogo.svg"
        alt="icon logo of devlinks"
        priority
        width="32"
        height="32"
      />
      <Image
        src="/logos/devlinks.svg"
        alt="devlinks text"
        priority
        width="108"
        height="21"
      />
    </div>
  );
}
