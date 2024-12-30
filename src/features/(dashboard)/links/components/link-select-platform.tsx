"use client";

import { Fragment, useState } from "react";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { platformsArray } from "@/data/platforms";
import { PlatformKey } from "@/drizzle/schema";

type LinkSelectPlatformProps = {
  platform: PlatformKey;
  // eslint-disable-next-line no-unused-vars
  onPlatformChange: (platform: PlatformKey) => void;
};

export default function LinkSelectPlatform({
  platform,
  onPlatformChange,
}: LinkSelectPlatformProps) {
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const handleSelectOpen = () => {
    setIsSelectOpen((prev) => !prev);
  };

  return (
    <div className="space-y-1">
      <Label htmlFor="platform" className="leading-[150%] text-card-foreground">
        Platform
      </Label>
      <Select
        // defaultValue={platform}
        value={platform}
        onValueChange={onPlatformChange}
        onOpenChange={handleSelectOpen}
      >
        <SelectTrigger id="platform" isOpen={isSelectOpen} className="">
          <SelectValue placeholder="" />
        </SelectTrigger>
        <SelectContent>
          {platformsArray.map((platform, index) => (
            <Fragment key={platform.key}>
              <SelectItem value={platform.key} className="group/item">
                <div className="flex items-center gap-3">
                  {platform.getIcon("group-hover/item:fill-primary")}
                  {platform.label}
                </div>
              </SelectItem>
              {index < platformsArray.length - 1 && <SelectSeparator />}
            </Fragment>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
