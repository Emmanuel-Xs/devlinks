"use client";

import Form from "next/form";
import { useActionState } from "react";

import { LoaderIcon, LogOutIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { logoutAction } from "../server/action";

export default function LogoutButton() {
  const [, formAction, isPending] = useActionState(logoutAction, {
    success: false,
  });

  return (
    <Form action={formAction}>
      <button
        disabled={isPending}
        className="flex w-full items-center gap-1 rounded-sm bg-primary px-2 py-1 font-semibold text-primary-foreground hover:bg-accent hover:text-foreground focus:bg-accent focus:text-foreground"
      >
        <LogOutIcon size={20} />
        <span className="font-semibold">Logout</span>
        {isPending ? (
          <LoaderIcon
            className={cn("animate-spin text-card-foreground")}
            size={20}
          />
        ) : null}
      </button>
    </Form>
  );
}

/* <Button
      type="submit"
      className={cn("w-full tabular-nums", className)}
      variant={variant}
      size={size}
      disabled={itIsPending || disabled}
    >
      {itIsPending ? (
        <Loader
          className={cn(
            "animate-spin text-card",
            outline ? "text-primary" : ""
          )}
          size={25}
        />
      ) : (
        text
      )}
    </Button> */
