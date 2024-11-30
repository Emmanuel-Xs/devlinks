import React from "react";

export default function DashWith({ what }: { what: string }) {
  return (
    <div className="relative flex items-center">
      <span className="w-full border-t"></span>
      <p className="text absolute -bottom-[10px] left-1/2 -translate-x-1/2 bg-card px-2">
        {what}
      </p>
    </div>
  );
}
