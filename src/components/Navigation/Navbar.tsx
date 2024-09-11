import React from "react";
import DevlinksLogo from "../ui/devlinks-logo";
import { CircleUserRoundIcon, LinkIcon } from "lucide-react";
import NavItem from "./NavItem";
import PreviewButton from "./PreviewButton";

export default function Navbar() {
  return (
    <nav className="mx-auto max-h-[78px] w-[min(100%_-_2rem,_1392px)] rounded-xl bg-card py-4 pl-6 pr-6">
      <menu className="flex items-center justify-between">
        <DevlinksLogo />
        <div className="flex items-center gap-4">
          <NavItem
            href="/links"
            label="Links"
            icon={<LinkIcon width={20} height={20} />}
          />
          <NavItem
            href="/profile"
            icon={<CircleUserRoundIcon width={20} height={20} />}
            label="Profile Details"
          />
        </div>
        <PreviewButton />
      </menu>
    </nav>
  );
}
