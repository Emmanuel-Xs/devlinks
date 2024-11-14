import { Button } from "@/components/ui/button";
import BackToEditorButton from "./back-2-editor-button";
import { cn } from "@/lib/utils";

export default function PreviewNavbar({ className }: { className?: string }) {
  return (
    <nav
      className={cn(
        "mx-auto flex w-[min(100%_-_2rem,_1392px)] items-center justify-between rounded-xl bg-card p-4",
        className,
      )}
    >
      <BackToEditorButton />
      <Button size="sm">Share Link</Button>
    </nav>
  );
}
