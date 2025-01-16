import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  error?: string;
  wrapperClassName?: string;
}

const Input = ({
  ref,
  className,
  wrapperClassName,
  error,
  icon,
  type = "text",
  ...props
}: InputProps & {
  ref?: React.RefObject<HTMLInputElement | null>;
}) => {
  return (
    <div
      className={cn(
        "flex w-full items-center gap-3 rounded-lg border border-input px-4 py-[10px] transition-colors placeholder:font-sans focus-within:shadow-active focus-within:ring-1 focus-within:ring-primary disabled:cursor-not-allowed disabled:opacity-50",
        wrapperClassName,
        error ? "border-destructive focus-within:ring-0" : ""
      )}
    >
      {icon && <span>{icon}</span>}
      <input
        type={type}
        className={cn(
          "w-full border-0 bg-transparent text-sm font-normal text-card-foreground outline-none file:text-sm file:font-medium placeholder:text-card-foreground/50 focus:ring-0 sm:text-base",
          className
        )}
        ref={ref}
        {...props}
      />
      {error && (
        <p className="whitespace-nowrap text-xs leading-[150%] text-destructive">
          {error}
        </p>
      )}
    </div>
  );
};
Input.displayName = "Input";

export { Input };
