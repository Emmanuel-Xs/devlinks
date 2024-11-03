import { Label } from "@radix-ui/react-label";
import { Input } from "../../../components/ui/input";

import { InputProps } from "../../../components/ui/input";

interface AuthEmailProps extends InputProps {}

export default function AuthEmail({ ...props }: AuthEmailProps) {
  return (
    <div className="grid gap-1">
      <Label htmlFor="email" className="leading-[150%] text-card-foreground">
        Email
      </Label>
      <Input id="email" type="email" autoComplete="email" {...props} />
    </div>
  );
}
