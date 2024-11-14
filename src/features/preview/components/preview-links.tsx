"use client";
import { getPlatformConfig } from "@/data/platforms";
import { validatePlatformUrl } from "@/lib/url-validation";
import { cn } from "@/lib/utils";
import { ExtendedPlatformKey } from "@/types/platform";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import UnknownPlatform from "./unknown-platform";

type PreviewLinksProps = {
  url: string;
  name: ExtendedPlatformKey;
  className?: string;
};

export default function PreviewLinks({
  url,
  name,
  className,
}: PreviewLinksProps) {
  const platform = getPlatformConfig(name);

  if (name === "unknown") {
    return <UnknownPlatform color={platform.color!} label={platform.label} />;
  }

  // Validate URL for the specific platform
  const validation = validatePlatformUrl(url, name);

  // Use the URL only if it's valid for the platform
  const validUrl = validation.isValid ? url : "#";

  const ariaLabel = validation.error
    ? `Invalid ${platform.label} profile link: ${validation.error}`
    : `Visit ${platform.label} profile`;

  return (
    <Link
      href={validUrl}
      onClick={(e) => !validation.isValid && e.preventDefault()}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group flex items-center justify-between rounded-lg p-4 py-[10px] transition-all hover:opacity-90",
        platform.color,
        className,
        !validation.isValid
          ? "cursor-not-allowed bg-gray-500 hover:opacity-50"
          : "",
      )}
      aria-label={ariaLabel}
    >
      <div className="flex items-center gap-2">
        {platform.getIcon()}
        <span className="text font-medium text-primary-foreground">
          {platform.label}
        </span>
      </div>
      {validation.isValid ? (
        <ArrowRight
          className="text-primary-foreground transition-transform group-hover:translate-x-1"
          size={16}
        />
      ) : (
        <span className="text-sm text-destructive">Invalid</span>
      )}
    </Link>
  );
}
