import { ScrollArea } from "@/components/ui/scroll-area";

import PhoneFrame from "./phone-frame";

export default function Sidebar() {
  return (
    <aside className="hidden h-full w-full max-w-[560px] justify-center rounded-xl bg-card p-6 pt-14 min-[1200px]:grid">
      <PhoneFrame className="relative">
        <div></div>
        <ScrollArea></ScrollArea>
      </PhoneFrame>
    </aside>
  );
}
