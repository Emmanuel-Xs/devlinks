import { CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LockKeyhole } from "lucide-react";
import Form from "next/form";
import React, {
  startTransition,
  useActionState,
  useEffect,
  useRef,
} from "react";
import AuthPassword from "../../components/auth-password";
import { resetPasswordAction } from "../server/action";
import LoadingButton from "@/components/loading-button";
import { passwordResetSchema } from "@/lib/auth-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function PasswordResetForm() {
  const [formState, formAction, isPending] = useActionState(
    resetPasswordAction,
    {
      success: false,
    },
  );

  const formRef = useRef<HTMLFormElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    setFocus,
    formState: { errors: rhfErrors, isSubmitSuccessful },
  } = useForm<z.output<typeof passwordResetSchema>>({
    resolver: zodResolver(passwordResetSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
      ...(formState?.fields ?? {}),
    },
    mode: "onTouched",
  });

  useEffect(() => {
    if (isSubmitSuccessful && formState.success) {
      reset();
    }
  }, [reset, isSubmitSuccessful, formState.success]);

  // password compromised
  useEffect(() => {
    if (formState.errors?.password) {
      setError("password", {
        message: formState.errors.password.join(", "),
      });
      setFocus("password");
    }
  }, [reset, formState.errors, setError, setFocus]);
  return (
    <div
      className={cn(
        "mx-auto max-w-[500px] space-y-12 sm:rounded-xl sm:border sm:bg-card sm:p-8 sm:text-card-foreground sm:shadow",
      )}
    >
      <CardHeader className="space-y-2 text-center">
        <h1 className="heading">Enter your new Password</h1>
        <p className="text">Enter a password you won&apos;t easily.</p>
      </CardHeader>
      <CardContent className="grid gap-6">
        {formState?.errors?.message && !formState.success && !isPending ? (
          <p className="text text-pretty text-center text-destructive">
            {formState?.errors?.message}
          </p>
        ) : null}
        <Form
          action={formAction}
          className="grid justify-center gap-6"
          ref={formRef}
          onSubmit={(evt) => {
            evt.preventDefault();
            handleSubmit(() => {
              startTransition(() => formAction(new FormData(formRef.current!)));
            })(evt);
          }}
        >
          <AuthPassword
            id="password"
            placeholder="At least 8 characters"
            icon={
              <LockKeyhole width={24} height={24} className="text-foreground" />
            }
            label="Create Password"
            error={
              rhfErrors.password?.message ||
              formState?.errors?.password?.join(", ")
            }
            defaultValue={formState.fields?.password}
            {...register("password")}
          />
          <AuthPassword
            id="confirm-password"
            placeholder="Passwords must match"
            icon={
              <LockKeyhole width={24} height={24} className="text-foreground" />
            }
            label="Confirm Password"
            error={
              rhfErrors.confirmPassword?.message ||
              formState?.errors?.confirmPassword?.join(", ")
            }
            defaultValue={formState.fields?.confirmPassword}
            {...register("confirmPassword")}
          />
          <LoadingButton text="Reset Password" />
        </Form>
      </CardContent>
    </div>
  );
}
