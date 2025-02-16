import Link from "next/link";

import LogoutButton from "@/components/logout-button";
import { User } from "@/drizzle/schema";
import { formatUserDisplayName } from "@/lib/utils";

import DevlinksLogo from "../../../components/devlinks-logo";
import { Button } from "../../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import UserAvatar from "../../../components/user-avatar";

export default function LandingNavbar({ user }: { user: User | null }) {
  const fullName = formatUserDisplayName(
    user?.firstName ?? "",
    user?.lastName ?? "",
    user?.username ?? ""
  );

  return (
    <header className="mx-auto w-[min(100%_-_2.5rem,_1350px)]">
      <nav className="flex items-center justify-between py-4">
        <DevlinksLogo className="z-10" />
        {user !== null ? (
          <div className="flex flex-row items-center gap-4">
            <Link
              href="/links"
              className="z-10 font-medium text-card-foreground"
            >
              Dashboard
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger
                className="flex-shrink-0 border-0 focus-visible:border-0"
                asChild
              >
                <UserAvatar
                  avatarUrl={user.avatarUrl ?? ""}
                  fullName={fullName}
                  blurDataURL={user.blurDataUrl ?? undefined}
                  className="h-[45px] w-[45px] cursor-pointer"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mr-6 mt-1">
                <DropdownMenuLabel>
                  <h3 className="text-lg font-bold">{fullName}</h3>
                  <p className="text -mt-2">{user.email}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/settings" className="text text-card-foreground">
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="mb-2" />
                <DropdownMenuItem asChild>
                  <LogoutButton className="bg-card text-card-foreground" />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <Button size="ex" className="z-10">
            Log in
          </Button>
        )}
      </nav>
    </header>
  );
}
