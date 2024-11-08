"use client";
import Link from "next/link";
import { Button } from "../../../components/ui/button";
import { EyeIcon } from "lucide-react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function PreviewButton() {
  const isSmUp = useMediaQuery("only screen and (min-width : 580px)");
  return (
    <Button asChild variant="outline" size="sm">
      <Link href="preview" title={isSmUp ? "" : "Preview Links"}>
        {isSmUp ? "Preview" : <EyeIcon />}
      </Link>
    </Button>
  );
}
