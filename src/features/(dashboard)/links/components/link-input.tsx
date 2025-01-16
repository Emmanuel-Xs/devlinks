import { RefObject } from "react";

import { LinkIcon } from "lucide-react";

import { Input, InputProps } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type LinkInputProps = {
  id: string;
  url: string;
  ref?: RefObject<HTMLInputElement | null>;
  // eslint-disable-next-line no-unused-vars
  onLinkChange: (url: string) => void;
} & InputProps;

export default function LinkInput({
  id,
  url,
  error,
  onLinkChange,
  ref,
}: LinkInputProps) {
  return (
    <div className="space-y-1">
      <Label
        htmlFor={`link-${id}`}
        className="leading-[150%] text-card-foreground"
      >
        Link
      </Label>
      <Input
        id={`link-${id}`}
        ref={ref}
        value={url}
        onChange={(e) => onLinkChange(e.target.value)}
        placeholder="m@example.com"
        icon={<LinkIcon width={20} height={20} className="text-foreground" />}
        error={error}
      />
    </div>
  );
}
