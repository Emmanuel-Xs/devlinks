import Link from "next/link";

import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { SettingsIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import LogoutButton from "./logout-button";

export default function SettingsDropDownMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="flex-shrink-0">
        <Button size="icon" className="rounded-full" variant="outline">
          <SettingsIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mx-2 w-40">
        <DropdownMenuLabel>Quick Settings</DropdownMenuLabel>
        <DropdownMenuItem>
          <Link href="/change-password">Change Password</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/settings/usernames">Change Usernames</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/settings">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="mb-3" />
        <DropdownMenuItem asChild>
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
