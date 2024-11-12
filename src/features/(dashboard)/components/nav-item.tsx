"use client";

// import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";
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
  // const isSmUp = useMediaQuery("only screen and (min-width : 720px)");
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li>
      <Link
        href={href}
        className={cn(
          "text flex gap-1 rounded-lg px-6 py-2 font-semibold tracking-wide transition-colors max-[350px]:px-4",
          isActive
            ? "bg-active-link text-primary"
            : "text-card-foreground hover:text-primary",
        )}
        title={label}
      >
        {icon}
        <span className="hidden min-[720px]:inline">{label}</span>
      </Link>
    </li>
  );
}
