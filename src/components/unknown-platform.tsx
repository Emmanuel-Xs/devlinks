import React from "react";

import { cn } from "@/lib/utils";

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
      <span className="text text-primary-foreground font-medium">{label}</span>
    </div>
  );
}
