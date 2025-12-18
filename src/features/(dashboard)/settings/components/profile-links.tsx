import Link from "next/link";

import { ArrowRightIcon } from "@/components/ui/arrow-right-icon";

export function ProfileLinks() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-medium">Profile</h2>
      <Link
        href="/settings/usernames"
        className="group flex items-center justify-between rounded-md border border-gray-400 p-2 hover:border-primary"
      >
        Add Multiple Usernames
        <ArrowRightIcon className="text-gray-400" size={20} />
      </Link>
      <Link
        href="/settings/change-password"
        className="group flex items-center justify-between rounded-md border border-gray-400 p-2 hover:border-primary"
      >
        Change Your Password
        <ArrowRightIcon className="text-gray-400" size={20} />
      </Link>
    </div>
  );
}
