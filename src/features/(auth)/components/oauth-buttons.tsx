import { Button } from "@/components/ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Mail } from "lucide-react";
import React from "react";

export default function OAuthButtons() {
  return (
    <div className="grid grid-cols-2 gap-6">
      <Button variant="outline" size="md">
        <Mail className="mr-2 h-4 w-4" /> Google
      </Button>
      <Button variant="outline" size="md">
        <GitHubLogoIcon className="mr-2 h-4 w-4" /> GitHub
      </Button>
    </div>
  );
}
