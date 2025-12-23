import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps extends React.ComponentProps<"input"> {
  icon?: React.ReactNode;
  error?: string;
  wrapperClassName?: string;
}

const Input = ({
  className,
  wrapperClassName,
  error,
  icon,
  type = "text",
  ...props
}: InputProps) => {
  return (
    <div
      className={cn(
        "border-input focus-within:shadow-active focus-within:ring-primary flex w-full items-center gap-3 rounded-lg border px-4 py-[10px] transition-colors placeholder:font-sans focus-within:ring-1 disabled:cursor-not-allowed disabled:opacity-50",
        wrapperClassName,
        error ? "border-destructive focus-within:ring-0" : ""
      )}
    >
      {icon && <span>{icon}</span>}
      <input
        type={type}
        className={cn(
          "text-card-foreground placeholder:text-card-foreground/50 w-full border-0 bg-transparent text-sm font-normal outline-none file:text-sm file:font-medium focus:ring-0 sm:text-base",
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-destructive text-xs leading-[150%] whitespace-nowrap">
          {error}
        </p>
      )}
    </div>
  );
};
Input.displayName = "Input";

export { Input };
