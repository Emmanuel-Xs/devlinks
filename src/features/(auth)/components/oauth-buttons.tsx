import React from "react";

import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Mail } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function OAuthButtons() {
  return (
    <div className="grid grid-cols-2 gap-6">
      <Button variant="outline" size="md" asChild>
        <a href="/api/google">
          <Mail className="mr-2 h-4 w-4" /> Google
        </a>
      </Button>
      <Button variant="outline" size="md" asChild>
        <a href="/api/github">
          <GitHubLogoIcon className="mr-2 h-4 w-4" /> GitHub
        </a>
      </Button>
    </div>
  );
}
