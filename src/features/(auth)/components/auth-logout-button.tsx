"use client";

import Form from "next/form";
import { useActionState } from "react";

import { LoaderIcon, LogOutIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { logoutAction } from "../logout/server/action";

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
        <span className="font-semibold text-card-foreground">Logout</span>
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
