"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import "server-only";

import {
  getUserUsernames,
  isUsernameTaken,
  upsertUserUsernames,
} from "@/drizzle/query/usernames";
import { UserUsername } from "@/drizzle/schema";
import { RefillingTokenBucket } from "@/lib/server/rate-limit";
import { globalPOSTRateLimit } from "@/lib/server/request";
import { getCurrentSession } from "@/lib/server/sessions";
import { suggestAlternativeUsernames } from "@/lib/server/users";
import { usernameSchema } from "@/lib/validation";

// Keys for form fields and suggestion entries
type FieldKey = `usernames.${number}.username`;
type SuggestionKey = `usernameSuggestions.${number}`;
type ErrorKey = FieldKey | SuggestionKey | "message";

type ErrorType = Partial<Record<ErrorKey, string[]>>;

// Structure returned to the frontend
interface FormState {
  success: boolean;
  fields?: Record<FieldKey, string>;
  errors?: ErrorType;
}

// Simple rate-limiter per IP
const ipBucket = new RefillingTokenBucket<string>(3, 10);

export const saveUserUsernames = async (
  usernamesInput: UserUsername[],
  userId: number
): Promise<FormState> => {
  // ----- 1. Rate limiting -----
  if (!globalPOSTRateLimit()) {
    return fail(["Too many requests"]);
  }
  const clientIP = (await headers()).get("x-forwarded-for") ?? "unknown";
  if (!ipBucket.check(clientIP, 1)) {
    return fail(["Too many requests"]);
  }

  // Echo back raw inputs for form repopulation
  const fields = buildFields(usernamesInput);

  // ----- 2. Schema validation -----
  const parsed = usernameSchema.safeParse({ usernames: usernamesInput });
  if (!parsed.success) {
    return zodError(parsed.error.flatten().fieldErrors, fields);
  }

  // ----- 3. Authentication -----
  const session = await getCurrentSession();
  if (!session?.user || session.user.id !== userId) {
    return fail([!session ? "Not authenticated" : "Not authorized"]);
  }

  const validated = parsed.data.usernames;
  const dbUsernames = await getUserUsernames(userId);

  // ----- 4. Business rules -----
  // 4a. At least one username
  if (!hasAtLeastOne(validated)) {
    return fail(["You must provide at least one username."], fields);
  }

  // 4b. Detect no-change vs DB
  if (!hasChanges(validated, dbUsernames)) {
    return fail(["No changes made."], fields);
  }

  // ----- 5. Field-level validations -----
  const errors: ErrorType = {};
  collectDuplicateErrors(validated, errors);
  await collectUniquenessErrors(validated, dbUsernames, errors);

  if (Object.keys(errors).length > 0) {
    return { success: false, fields, errors };
  }

  // ----- 6. Persist changes -----
  ipBucket.consume(clientIP, 1);
  await upsertUserUsernames(
    userId,
    validated.map((u) => ({ username: u.username.toLowerCase() }))
  );

  revalidatePath("/");
  return { success: true };
};

// Helpers
function buildFields(input: UserUsername[]) {
  const f: Record<FieldKey, string> = {};
  input.forEach((u, i) => {
    f[`usernames.${i}.username`] = u.username || "";
  });
  return f;
}

function fail(msgs: string[], fields?: Record<FieldKey, string>): FormState {
  return { success: false, fields, errors: { message: msgs } };
}

function zodError(
  zodErrors: Record<string, string[]>,
  fields: Record<FieldKey, string>
): FormState {
  const errors: Record<FieldKey, string[]> = {};
  Object.entries(zodErrors).forEach(([key, msgs]) => {
    if (key.startsWith("usernames.")) {
      errors[key as FieldKey] = msgs;
    }
  });
  return { success: false, fields, errors };
}

function hasAtLeastOne(input: UserUsername[]) {
  return input.some((u) => u.username.trim() !== "");
}

function hasChanges(input: UserUsername[], db: UserUsername[]) {
  const norm = (s: string) => s.toLowerCase().trim();
  const a = input.map((u) => norm(u.username));
  const b = db.map((u) => norm(u.username));
  if (a.length !== b.length) return true;
  return !a.every((name, i) => name === b[i]);
}

function collectDuplicateErrors(input: UserUsername[], errors: ErrorType) {
  const seen = new Set<string>();
  input.forEach((u, i) => {
    const name = u.username.toLowerCase();
    if (seen.has(name)) {
      errors[`usernames.${i}.username`] = [
        `Duplicate entry "${u.username}" detected.`,
      ];
    } else {
      seen.add(name);
    }
  });
}

async function collectUniquenessErrors(
  input: UserUsername[],
  db: UserUsername[],
  errors: ErrorType
) {
  const dbNames = db.map((u) => u.username.toLowerCase());
  await Promise.all(
    input.map(async (u, i) => {
      const name = u.username.toLowerCase();
      if (dbNames.includes(name)) return;
      if (await isUsernameTaken(name)) {
        errors[`usernames.${i}.username`] = [
          `"${u.username}" is already taken.
        `,
        ];
        const sug = await suggestAlternativeUsernames(name);
        if (sug.length) {
          errors[`usernameSuggestions.${i}`] = [
            `Suggestions: ${sug.join(", ")}`,
          ];
        }
      }
    })
  );
}
