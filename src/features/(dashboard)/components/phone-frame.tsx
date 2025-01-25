import Image from "next/image";
import { ReactNode } from "react";

import { cn } from "@/lib/utils";

export default function PhoneFrame({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("relative", className)}>
      <Image
        src="/images/phone-frame.svg"
        alt="devlinks text"
        priority
        width="307"
        height="631"
        style={{ width: "auto" }}
      />
      {children}
    </div>
  );
}
