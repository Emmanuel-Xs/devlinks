/* eslint-disable no-unused-vars */
import Form from "next/form";
import { useActionState, useEffect } from "react";

import { LoaderIcon, LogOutIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { logoutOfOtherDevicesAction } from "@/features/(auth)/logout/server/actions";
import { cn } from "@/lib/utils";

export default function LogoutOfOtherDevices({
  onSuccess,
  setIsLoggingOut,
}: {
  onSuccess: () => void;
  setIsLoggingOut: (success: boolean) => void;
}) {
  const [formState, formAction, isPending] = useActionState(
    logoutOfOtherDevicesAction,
    {
      success: false,
    }
  );

  useEffect(() => {
    setIsLoggingOut(isPending);
  }, [isPending, setIsLoggingOut]);

  useEffect(() => {
    if (formState.success) {
      toast.success("Successfully logged out of other devices");
      onSuccess();
    }
  }, [formState.success, onSuccess]);

  return (
    <Form action={formAction}>
      <Button
        disabled={isPending}
        size="ex"
        className="flex w-full items-center gap-1 rounded-sm bg-primary font-semibold text-primary-foreground hover:bg-accent hover:text-foreground focus:bg-accent focus:text-foreground"
      >
        <LogOutIcon size={20} />
        <span className="font-semibold">Logout of other devices</span>
        {isPending ? (
          <LoaderIcon
            className={cn("animate-spin text-card-foreground")}
            size={20}
          />
        ) : null}
      </Button>
    </Form>
  );
}
