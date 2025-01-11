import { cn } from "@/lib/utils";

export default function Loader() {
  return (
    <div className={cn("heading text-4xl font-black text-primary")}>
      <span className="inline-flex">&lt;</span>
      <span className="animate-reveal inline-flex overflow-hidden tracking-[-1em]">
        loading
      </span>
      <span className="inline-flex">/&gt;</span>
    </div>
  );
}
