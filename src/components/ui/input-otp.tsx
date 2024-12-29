"use client";

import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { cn } from "@/lib/utils";
import { MinusIcon } from "@radix-ui/react-icons";

const InputOTP = ({
  ref,
  className,
  containerClassName,
  ...props
}: React.ComponentPropsWithoutRef<typeof OTPInput> & {
  ref?: React.RefObject<React.ComponentRef<typeof OTPInput>>;
}) => (
  <OTPInput
    ref={ref}
    containerClassName={cn(
      "flex items-center gap-2 has-[:disabled]:opacity-50 justify-center",
      containerClassName,
    )}
    className={cn("disabled:cursor-not-allowed", className)}
    {...props}
  />
);
InputOTP.displayName = "InputOTP";

const InputOTPGroup = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & {
  ref?: React.RefObject<React.ComponentRef<"div">>;
}) => (
  <div ref={ref} className={cn("flex items-center", className)} {...props} />
);
InputOTPGroup.displayName = "InputOTPGroup";

const InputOTPSlot = ({
  ref,
  index,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & {
  index: number;
  ref?: React.RefObject<React.ComponentRef<"div">>;
}) => {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-[48px] w-[46px] items-center justify-center border-y-2 border-r-2 border-input text-sm shadow-sm transition-all first:rounded-l-md first:border-l-2 last:rounded-r-md max-[450px]:h-11 max-[450px]:w-[38px] max-[400px]:h-10 max-[400px]:w-[32px] max-[330px]:w-[30px]",
        isActive && "z-10 border-none ring-2 ring-primary",
        className,
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-caret-blink h-4 w-px bg-foreground duration-1000" />
        </div>
      )}
    </div>
  );
};
InputOTPSlot.displayName = "InputOTPSlot";

const InputOTPSeparator = ({
  ref,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & {
  ref?: React.RefObject<React.ComponentRef<"div">>;
}) => (
  <div ref={ref} role="separator" {...props}>
    <MinusIcon />
  </div>
);
InputOTPSeparator.displayName = "InputOTPSeparator";

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
