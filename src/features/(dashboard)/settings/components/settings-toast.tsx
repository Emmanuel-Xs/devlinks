"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { toast } from "sonner";

const successMessages: Record<string, string> = {
  "github-linked": "GitHub account linked successfully.",
  "google-linked": "Google account linked successfully.",
};

const errorMessages: Record<string, string> = {
  "github-already-linked":
    "This GitHub account is already linked to another user.",
  "google-already-linked":
    "This Google account is already linked to another user.",
  "session-expired": "Your session expired. Please log in again.",
};

export function SettingsToast() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const success = searchParams.get("success");
    const error = searchParams.get("error");

    if (success && successMessages[success]) {
      toast.success(successMessages[success]);
    }

    if (error && errorMessages[error]) {
      toast.error(errorMessages[error]);
    }
    // Clean query params
    if (success || error) {
      const url = new URL(window.location.href);
      url.searchParams.delete("success");
      url.searchParams.delete("error");
      router.replace(url.pathname);
    }
  }, [searchParams, router]);

  return null;
}
