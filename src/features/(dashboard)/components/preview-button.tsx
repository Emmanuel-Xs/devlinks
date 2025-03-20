import Link from "next/link";
import { redirect } from "next/navigation";
import { use } from "react";

import { EyeIcon } from "lucide-react";

import { getCurrentSession } from "@/lib/server/sessions";

import { Button } from "../../../components/ui/button";

export default function PreviewLinksButton() {
  const { user } = use(getCurrentSession());

  if (!user) redirect("/login");

  return (
    <Button asChild variant="outline" size="sm">
      <Link
        href={`/${encodeURIComponent(user.username.toLocaleLowerCase())}`}
        title="Preview Links"
      >
        <EyeIcon className="inline min-[580px]:hidden" />
        <span className="hidden min-[580px]:inline">Preview</span>
      </Link>
    </Button>
  );
}
