"use client";

import { useEffect } from "react";

import { toast } from "sonner";

import LinkSyncWarningToast from "@/features/(dashboard)/links/components/link-sync-warning-toast";

const toastId = "link-sync-toast";

export function useLinksSyncWarning(noOfUserSessions: number) {
  const dismissHandler = () => {
    localStorage.setItem("links-sync-warning", "true");
    toast.dismiss(toastId);
  };

  useEffect(() => {
    const hasSeenWarning = localStorage.getItem("links-sync-warning");

    if (!hasSeenWarning && noOfUserSessions > 1) {
      requestAnimationFrame(() => {
        toast(<LinkSyncWarningToast onUnderstood={dismissHandler} />, {
          id: toastId,
          unstyled: true,
          style: {
            border: "1px solid yellow",
            right: "1px",
          },
          classNames: {
            toast: "p-2 bg-card",
          },
          duration: Number.POSITIVE_INFINITY,
          onDismiss: () => dismissHandler(),
          dismissible: false,
        });
      });
    }

    return () => {
      toast.dismiss(toastId);
    };
  }, [noOfUserSessions]);
}
