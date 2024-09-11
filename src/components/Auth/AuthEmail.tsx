import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { ReactNode } from "react";

import { InputProps } from "../ui/input";

interface AuthEmailProps extends InputProps {}

export default function AuthEmail({ ...props }: AuthEmailProps) {
  return (
    <div className="grid gap-1">
      <Label htmlFor="email" className="leading-[150%] text-card-foreground">
        Email
      </Label>
      <Input
        id="email"
        placeholder="m@example.com"
        autoComplete="email"
        {...props}
      />
    </div>
  );
}
