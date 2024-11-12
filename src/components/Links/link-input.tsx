import React from "react";
import { LinkIcon } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

type LinkInputProps = {
  link: string;
  onLinkChange: (link: string) => void;
};

export default function LinkInput({ link, onLinkChange }: LinkInputProps) {
  return (
    <div className="space-y-1">
      <Label htmlFor="link" className="leading-[150%] text-card-foreground">
        Link
      </Label>
      <Input
        id="link"
        value={link}
        onChange={(e) => onLinkChange(e.target.value)}
        placeholder="m@example.com"
        icon={<LinkIcon width={20} height={20} className="text-foreground" />}
      />
    </div>
  );
}
