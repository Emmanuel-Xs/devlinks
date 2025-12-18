"use client";

import Link from "next/link";

import { GlobeIcon, GlobeLockIcon } from "lucide-react";

import GithubIcon from "@/components/Icons/github";
import GoogleIcon from "@/components/Icons/google";
import { cn } from "@/lib/utils";

type OAuthConnections = {
  github: boolean;
  google: boolean;
};

const providers = [
  { name: "github", label: "Github", icon: <GithubIcon /> },
  { name: "google", label: "Google", icon: <GoogleIcon className="size-5" /> },
];

export function OAuthLinks({ connections }: { connections: OAuthConnections }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg">Connect OAuth Accounts</h3>
      {providers.map((provider) => {
        const connected = connections[provider.name as keyof OAuthConnections];
        const href = connected ? "#" : `/api/${provider.name}/link`;
        return (
          <Link
            key={provider.name}
            href={href}
            className={cn(
              "group flex items-center rounded-md border p-2",
              connected
                ? "cursor-not-allowed border-gray-300 opacity-50"
                : "border-gray-400 hover:border-primary",
              provider.name === "google" ? "gap-2" : "gap-3"
            )}
            onClick={(e) => connected && e.preventDefault()}
            aria-disabled={connected}
          >
            {provider.icon}
            {provider.label}
            {connected ? (
              <GlobeLockIcon className="ml-auto" size={20} />
            ) : (
              <GlobeIcon className="ml-auto" size={20} />
            )}
          </Link>
        );
      })}
    </div>
  );
}
