"use client";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@uidotdev/usehooks";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function DevlinksLogo({ className }: { className?: string }) {
  const isSmUp = useMediaQuery("only screen and (min-width : 500px)");
  return (
    <Link className={cn("flex w-fit items-center gap-1", className)} href="/">
      <Image
        src="/logos/devlinksLogo.svg"
        alt="icon logo of devlinks"
        priority
        width="32"
        height="32"
        title={isSmUp ? "" : "devlinks logo"}
      />
      {isSmUp && (
        <Image
          src="/logos/devlinks.svg"
          alt="devlinks text"
          priority
          width="108"
          height="21"
        />
      )}
    </Link>
  );
}
