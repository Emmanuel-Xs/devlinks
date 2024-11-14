import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function BackToEditorButton() {
  return (
    <Button variant="outline" size="sm" asChild>
      <Link href="/links">Back to Editor</Link>
    </Button>
  );
}
