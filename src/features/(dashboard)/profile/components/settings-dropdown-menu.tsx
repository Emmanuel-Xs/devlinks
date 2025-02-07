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

import LogoutButton from "../../../../components/logout-button";

export default function SettingsDropDownMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="flex-shrink-0">
        <Button size="icon" className="rounded-full" variant="outline">
          <SettingsIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mx-2 w-32">
        <DropdownMenuLabel>Quick Settings</DropdownMenuLabel>
        <DropdownMenuItem>
          <Link href="/forgot-password">Reset Password</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/settings">Other Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="mb-3" />
        <DropdownMenuItem asChild>
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
