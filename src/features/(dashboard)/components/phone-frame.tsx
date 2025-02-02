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
    <div className="relative h-[631px] overflow-y-hidden">
      <Image
        src="/images/phone-frame.svg"
        alt="Phone frame"
        priority
        width={307}
        height={631}
      />
      <div className={cn("absolute inset-0 px-8 py-16", className)}>
        {children}
      </div>
    </div>
  );
}
