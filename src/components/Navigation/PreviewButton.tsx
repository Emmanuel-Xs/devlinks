"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { EyeIcon } from "lucide-react";
// import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function PreviewButton() {
  // const isSmUp = useMediaQuery("only screen and (min-width : 580px)");
  return (
    <Button asChild variant="outline" size="sm">
      <Link href="preview" title="Preview Links">
        <EyeIcon className="inline min-[580px]:hidden" />
        {/* Text shown on larger screens */}
        <span className="hidden min-[580px]:inline">Preview</span>
      </Link>
    </Button>
  );
}
