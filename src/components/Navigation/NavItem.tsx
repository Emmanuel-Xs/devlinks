"use client";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@uidotdev/usehooks";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function NavItem({
  icon,
  href,
  label,
}: {
  icon: ReactNode;
  href: string;
  label: string;
}) {
  const isSmUp = useMediaQuery("only screen and (min-width : 720px)");
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li>
      <Link
        href={href}
        className={cn(
          "text flex gap-1 rounded-lg px-6 py-2 font-semibold tracking-wide transition-colors",
          isActive
            ? "bg-active-link text-primary"
            : "text-card-foreground hover:text-primary",
        )}
        title={isSmUp ? "" : label}
      >
        {icon}
        {isSmUp && label}
      </Link>
    </li>
  );
}
