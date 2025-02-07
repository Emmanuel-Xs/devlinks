import { CircleUserRoundIcon, LinkIcon } from "lucide-react";

import DevlinksLogo from "@/components/devlinks-logo";

import NavItem from "./nav-item";
import PreviewLinkButton from "./preview-button";

export default function Navbar() {
  return (
    <nav className="max-h-[78px] rounded-xl bg-card py-4 pl-6 pr-6">
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
        <PreviewLinkButton />
      </menu>
    </nav>
  );
}
