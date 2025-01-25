import { useState } from "react";

import { OctagonAlertIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import LogoutOfOtherDevices from "./logout-of-other-devices";

export default function LinkSyncWarningToast({
  onUnderstood,
}: {
  onUnderstood: () => void;
}) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  return (
    <div className="space-y-2">
      <OctagonAlertIcon className="mx-auto text-destructive" />
      <h4 className="text-center text-lg font-bold text-card-foreground sm:text-left">
        Links won&apos;t sync across devices
      </h4>
      <p className="pb-4 text-center text-base text-foreground sm:text-left">
        Changes made here will overwrite those in other devices. Please log out
        of other devices.
      </p>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Button
          size="ex"
          variant="outline"
          onClick={onUnderstood}
          disabled={isLoggingOut}
        >
          Understood
        </Button>
        <LogoutOfOtherDevices
          onSuccess={onUnderstood}
          setIsLoggingOut={setIsLoggingOut}
        />
      </div>
    </div>
  );
}
