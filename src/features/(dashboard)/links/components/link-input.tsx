import React from "react";
import { LinkIcon } from "lucide-react";
import { Label } from "../../../../components/ui/label";
import { Input } from "../../../../components/ui/input";

type LinkInputProps = {
  url: string;
  onLinkChange: (url: string) => void;
};

export default function LinkInput({ url, onLinkChange }: LinkInputProps) {
  return (
    <div className="space-y-1">
      <Label htmlFor="link" className="leading-[150%] text-card-foreground">
        Link
      </Label>
      <Input
        id="link"
        value={url}
        onChange={(e) => onLinkChange(e.target.value)}
        placeholder="m@example.com"
        icon={<LinkIcon width={20} height={20} className="text-foreground" />}
      />
    </div>
  );
}
