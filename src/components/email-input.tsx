import { Label } from "@/components/ui/label";

import { Input, InputProps } from "./ui/input";

export default function EmailInput({ ...props }: InputProps) {
  return (
    <div className="grid gap-1">
      <Label htmlFor="email" className="leading-[150%] text-card-foreground">
        Email
      </Label>
      <Input id="email" type="email" autoComplete="email" {...props} />
    </div>
  );
}
