import React from "react";
import { Button, buttonVariants } from "./ui/button";
import { Loader } from "lucide-react";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";

interface LoadingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  className?: string;
  text: string;
  isPending?: boolean;
  outline?: boolean;
}

export default function LoadingButton({
  className,
  text,
  isPending,
  variant,
  outline,
  disabled,
  size,
}: LoadingButtonProps) {
  const { pending } = useFormStatus();
  const itIsPending = isPending || pending;
  return (
    <Button
      type="submit"
      className={cn("w-full tabular-nums", className)}
      variant={variant}
      size={size}
      disabled={itIsPending || disabled}
    >
      {itIsPending ? (
        <Loader
          className={cn(
            "animate-spin text-card",
            outline ? "text-primary" : "",
          )}
          size={25}
        />
      ) : (
        text
      )}
    </Button>
  );
}
