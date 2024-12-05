import React from "react";
import { Button, buttonVariants } from "./ui/button";
import { Loader } from "lucide-react";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";

interface LoadingButtonProps extends VariantProps<typeof buttonVariants> {
  className?: string;
  text: string;
}

export default function LoadingButton({
  className,
  text,
  variant,
  size,
}: LoadingButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className={cn("w-full", className)}
      variant={variant}
      size={size}
      disabled={pending}
    >
      {pending ? (
        <Loader className="animate-spin text-foreground" size={25} />
      ) : (
        text
      )}
    </Button>
  );
}
