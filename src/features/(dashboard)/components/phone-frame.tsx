import Image from "next/image";
import React from "react";

import { cn } from "@/lib/utils";

export default function PhoneFrame({ className }: { className?: string }) {
  return (
    <Image
      src="/images/phone-frame.svg"
      alt="devlinks text"
      priority
      width="307"
      height="631"
      className={cn("", className)}
      style={{ width: "auto" }}
    />
  );
}
