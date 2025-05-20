"use client";

import { ReactNode, useState } from "react";

import { Eye, EyeOff } from "lucide-react";

import { Label } from "@/components/ui/label";

import { Input, InputProps } from "./ui/input";

interface PasswordInputProps extends InputProps {
  id: string;
  label: string;
  forgetPassword?: ReactNode;
}

export default function PasswordInput({
  id,
  label,
  forgetPassword,
  ...props
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="grid gap-1">
      <Label
        htmlFor={id}
        className="text-sm leading-[150%] text-card-foreground"
      >
        {label}
      </Label>
      <div className="flex items-center gap-2">
        <Input id={id} type={showPassword ? "text" : "password"} {...props} />
        {showPassword ? (
          <Eye
            onClick={() => setShowPassword(false)}
            width={20}
            height={20}
            className="cursor-pointer select-none"
          />
        ) : (
          <EyeOff
            onClick={() => setShowPassword(true)}
            width={20}
            height={20}
            className="cursor-pointer select-none"
          />
        )}
      </div>
      {forgetPassword && forgetPassword}
    </div>
  );
}
