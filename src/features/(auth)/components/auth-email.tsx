import { Label } from "@/components/ui/label";

import { Input } from "../../../components/ui/input";
import { InputProps } from "../../../components/ui/input";

export default function AuthEmail({ ...props }: InputProps) {
  return (
    <div className="grid gap-1">
      <Label htmlFor="email" className="leading-[150%] text-card-foreground">
        Email
      </Label>
      <Input id="email" type="email" autoComplete="email" {...props} />
    </div>
  );
}
