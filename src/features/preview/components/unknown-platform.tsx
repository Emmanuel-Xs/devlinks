import { cn } from "@/lib/utils";
import React from "react";

export default function UnknownPlatform({
  color,
  label,
}: {
  color: string;
  label: string;
}) {
  return (
    <div
      className={cn("flex items-center rounded-lg p-4 py-[9.5px]", color)}
      aria-label="Unknown Platform"
    >
      <span className="text font-medium text-primary-foreground">{label}</span>
    </div>
  );
}
