import React from "react";

import Link from "next/link";

import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Mail } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function OAuthButtons() {
  return (
    <div className="grid grid-cols-2 gap-6">
      <Button variant="outline" size="md" asChild>
        <Link href="/api/google" prefetch={false}>
          <Mail className="mr-2 h-4 w-4" /> Google
        </Link>
      </Button>
      <Button variant="outline" size="md" asChild>
        <Link href="/api/github" prefetch={false}>
          <GitHubLogoIcon className="mr-2 h-4 w-4" /> GitHub
        </Link>
      </Button>
    </div>
  );
}
