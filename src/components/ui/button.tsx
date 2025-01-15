import * as React from "react";

import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-base font-semibold tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-25",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-active hover:shadow-active focus-visible:bg-active focus-visible:shadow-active",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-primary bg-transparent text-primary hover:bg-active-link focus-visible:bg-active-link",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "px-[27px] py-[11px]",
        sm: "box-border px-[11px] py-[5.5px] min-[580px]:px-6",
        md: "px-[27px] py-[9px]",
        ex: "h-10 rounded-md px-5 py-2",
        lg: "h-10 rounded-md px-8",
        icon: "h-8 w-8 sm:h-9 sm:w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = ({
  ref,
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps & {
  ref?: React.RefObject<HTMLButtonElement>;
}) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
};
Button.displayName = "Button";

export { Button, buttonVariants };
