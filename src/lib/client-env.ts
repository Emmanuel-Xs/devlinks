import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  emptyStringAsUndefined: true,
  client: {
    NEXT_PUBLIC_PASSWORD_RESET_EXPIRES_IN_MINS: z.string(),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_PASSWORD_RESET_EXPIRES_IN_MINS:
      process.env.NEXT_PUBLIC_PASSWORD_RESET_EXPIRES_IN_MINS,
  },
});
