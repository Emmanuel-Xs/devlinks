"use client";

import Form from "next/form";
import { useRouter } from "next/navigation";
import {
  FormEvent,
  startTransition,
  useActionState,
  useCallback,
  useEffect,
  useRef,
} from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { LockKeyhole } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import LoadingButton from "@/components/loading-button";
import PasswordInput from "@/components/password-input";
import { changePasswordSchema } from "@/lib/validation";

import { changePasswordAction } from "../server/change-password-action";

export default function ChangePasswordForm() {
  const [formState, formAction, isPending] = useActionState(
    changePasswordAction,
    {
      success: false,
    }
  );
  const formRef = useRef<HTMLFormElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    setFocus,
    formState: { errors: rhfErrors, isSubmitSuccessful },
  } = useForm<z.output<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      ...(formState?.fields ?? {}),
    },
    mode: "onTouched",
  });

  const router = useRouter();

  // Effect for success state
  useEffect(() => {
    if (formState.success && !isPending) {
      reset();
      toast.success("Password changed successfully");
      router.refresh();
    }
  }, [formState.success, isPending, reset, router]);

  // Effect for general error messages
  useEffect(() => {
    if (formState.errors?.message && !formState.success && !isPending) {
      toast.error(formState.errors.message);
    }
  }, [formState.errors?.message, formState.success, isPending]);

  // 1qaz2wsxrrrrrrr100

  // Effect for field-specific errors from the server
  useEffect(() => {
    if (!formState.errors) return;
    if (formState.errors?.oldPassword) {
      setError("oldPassword", {
        type: "server",
        message: formState.errors.oldPassword.join(", "),
      });
      setFocus("oldPassword");
    }
    if (formState.errors?.newPassword) {
      setError("newPassword", {
        type: "server",
        message: formState.errors.newPassword.join(", "),
      });
      setFocus("newPassword");
    }

    if (formState.errors?.confirmPassword) {
      setError("confirmPassword", {
        type: "server",
        message: formState.errors.confirmPassword.join(", "),
      });
      setFocus("confirmPassword");
    }
  }, [reset, formState.errors, setError, setFocus]);

  const rhfSubmitHandler = useCallback(
    (evt: FormEvent<HTMLFormElement>) => {
      evt.preventDefault();
      handleSubmit(() => {
        clearErrors();
        startTransition(() => formAction(new FormData(formRef.current!)));
      })(evt);
    },
    [formAction, handleSubmit]
  );

  return (
    <Form
      className="grid gap-6"
      action={formAction}
      ref={formRef}
      onSubmit={rhfSubmitHandler}
    >
      {formState?.errors?.message && !formState.success && !isPending ? (
        <p className="text text-pretty text-center text-destructive">
          {formState?.errors?.message}
        </p>
      ) : null}
      <fieldset disabled={isPending} className="contents">
        <div>
          <PasswordInput
            id="old-password"
            label="Old Password"
            placeholder="Current password"
            autoComplete="current-password"
            icon={
              <LockKeyhole width={24} height={24} className="text-foreground" />
            }
            error={
              rhfErrors.oldPassword?.message ||
              formState?.errors?.oldPassword?.join(", ")
            }
            required
            defaultValue={formState?.fields?.oldPassword}
            {...register("oldPassword")}
          />
          <p className="pt-1 text-sm">
            if you signed in with an Oauth just put "none" as your old password
          </p>
        </div>
        <PasswordInput
          id="new-password"
          label="New Password"
          placeholder="At least 8 characters"
          autoComplete="new-password"
          icon={
            <LockKeyhole width={24} height={24} className="text-foreground" />
          }
          error={
            rhfErrors.newPassword?.message ||
            formState?.errors?.newPassword?.join(", ")
          }
          required
          defaultValue={formState?.fields?.newPassword}
          {...register("newPassword")}
        />
        <PasswordInput
          id="confirm-password"
          label="Confirm Password"
          placeholder="Must match the above"
          autoComplete="new-password"
          icon={
            <LockKeyhole width={24} height={24} className="text-foreground" />
          }
          error={
            rhfErrors.confirmPassword?.message ||
            formState?.errors?.confirmPassword?.join(", ")
          }
          required
          defaultValue={formState?.fields?.confirmPassword}
          {...register("confirmPassword")}
        />
        <LoadingButton
          text="Save New Password"
          isPending={isPending}
          className="mx-auto mt-4 sm:w-5/6"
        />
      </fieldset>
    </Form>
  );
}
