"use client";
import { Label } from "@radix-ui/react-label";
import { Input, InputProps } from "../ui/input";
import { ReactNode, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

interface AuthPasswordProps extends InputProps {
  id: string;
  label: string;
  forgetPassword?: ReactNode;
}

export default function AuthPassword({
  id,
  label,
  forgetPassword,
  ...props
}: AuthPasswordProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="grid gap-1">
      <div className="flex items-center">
        <Label
          htmlFor={id}
          className="text-sm leading-[150%] text-card-foreground"
        >
          {label}
        </Label>
        {forgetPassword && forgetPassword}
      </div>
      <div className="flex items-center gap-2">
        <Input
          id={id}
          type={showPassword ? "text" : "password"}
          autoComplete={forgetPassword ? "current-password" : "new-password"}
          {...props}
        />
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
    </div>
  );
}
