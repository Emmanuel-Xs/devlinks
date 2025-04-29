import DevlinksLogo from "@/components/devlinks-logo";
import { LinkIcon } from "@/components/ui/link-icon";
import { UserIcon } from "@/components/ui/user-icon";

import NavItem from "./nav-item";
import PreviewLinkButton from "./preview-button";

export default function Navbar() {
  return (
    <nav className="max-h-[78px] rounded-xl bg-card py-4 pl-6 pr-6">
      <menu className="flex items-center justify-between">
        <DevlinksLogo />
        <div className="flex items-center gap-4">
          <NavItem href="/links" label="Links" icon={<LinkIcon size={20} />} />
          <NavItem
            href="/profile"
            icon={<UserIcon size={20} />}
            label="Profile Details"
          />
        </div>
        <PreviewLinkButton />
      </menu>
    </nav>
  );
}
