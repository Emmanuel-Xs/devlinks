"use server";
import { loginSchema } from "@/lib/auth-validation";
import "server-only";

type FormState = {
  success: boolean;
  fields?: Record<string, string>;
  errors?: Record<string, string[]>;
};

export async function loginAction(
  prevState: FormState,
  data: FormData,
): Promise<FormState> {
  console.log("data received", data);

  if (!(data instanceof FormData)) {
    return {
      success: false,
      errors: { error: ["Invalid Form Data"] },
    };
  }
  const formData = Object.fromEntries(data);
  console.log("form data", formData);

  const parsed = loginSchema.safeParse(formData);

  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    const fields: Record<string, string> = {};

    for (const key of Object.keys(formData)) {
      fields[key] = formData[key].toString();
    }
    console.log("error returned data", data);
    console.log("error returned error", errors);
    return {
      success: false,
      fields,
      errors,
    };
  }

  if (parsed.data.email.includes("a")) {
    return {
      success: false,
      errors: { email: ["Invalid email"] },
      fields: parsed.data,
    };
  }

  console.log("parsed data", parsed.data);
  return {
    success: true,
    fields: undefined,
  };
}
