"use client";

import Form from "next/form";
import { useActionState } from "react";

import { LoaderIcon, LogOutIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { logoutAction } from "../logout/server/actions";

export default function AuthLogoutButton() {
  const [, formAction, isPending] = useActionState(logoutAction, {
    success: false,
  });

  return (
    <Form action={formAction}>
      <button
        disabled={isPending}
        className="mx-auto flex items-center justify-center gap-2"
      >
        <LogOutIcon size={20} />
        <span className="text-card-foreground font-semibold">Logout</span>
        {isPending ? (
          <LoaderIcon
            className={cn("text-card-foreground animate-spin")}
            size={20}
          />
        ) : null}
      </button>
    </Form>
  );
}
