import React from "react";
import PhoneFrame from "./phone-frame";

export default function Sidebar() {
  return (
    <aside className="hidden h-[834px] w-full max-w-[560px] place-items-center rounded-xl bg-card p-6 min-[1200px]:grid">
      <PhoneFrame />
    </aside>
  );
}
