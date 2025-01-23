import { useEffect } from "react";

import { OctagonAlertIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

export function useLinksSyncWarning() {
  useEffect(() => {
    const hasSeenWarning = localStorage.getItem("links-sync-warning");
    if (!hasSeenWarning) {
      toast.warning("Links won't sync across devices", {
        style: {
          border: "1px solid yellow",
          fontSize: "1rem",
        },
        classNames: {
          toast: "flex flex-col shadow-md shadow-active ",
          title: "py-2",
          description: "pb-4",
        },
        description: (
          <p className="text-sm">
            Changes made here will overwrite those in other devices. Please log
            out of other devices.
          </p>
        ),
        icon: <OctagonAlertIcon className="text-destructive" />,
        duration: Number.POSITIVE_INFINITY,
        action: (
          <Button
            size="ex"
            onClick={() => {
              localStorage.setItem("links-sync-warning", "true");
              toast.dismiss();
            }}
            className="ml-auto"
          >
            Understood
          </Button>
        ),
      });
    }
  }, []);
}
