"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function StorageCleaner({ hasSession }: { hasSession: boolean }) {
  const router = useRouter();

  useEffect(() => {
    if (!hasSession) {
      try {
        localStorage.clear();
        sessionStorage.clear();

        document.cookie.split(";").forEach((cookie) => {
          const name = cookie.split("=")[0].trim();
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}`;
        });

        router.refresh();
      } catch (error) {
        console.error("Error clearing storage:", error);
      }
    }
  }, [hasSession, router]);

  return null;
}
