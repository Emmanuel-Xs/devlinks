import React from "react";
import { Label } from "../../../../components/ui/label";
import { LinkIcon } from "lucide-react";
import { Input } from "../../../../components/ui/input";

export default function LinkInput({ link }: { link?: string }) {
  return (
    <div className="space-y-1">
      <Label htmlFor="link" className="leading-[150%] text-card-foreground">
        Link
      </Label>
      <Input
        id="link"
        defaultValue={link}
        placeholder="m@example.com"
        icon={<LinkIcon width={20} height={20} className="text-foreground" />}
      />
    </div>
  );
}
