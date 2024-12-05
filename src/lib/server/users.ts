import { isUsernameTaken } from "@/drizzle/query/users";
import { getRandomDigits } from "./utils";

const RESERVED_USERNAMES = ["admin", "support", "root"];

export async function refineOAuthUsername(
  username: string,
  id: string | number,
): Promise<string> {
  let refinedUsername = username.trim().replace(/[\s._]+/g, "-");
  refinedUsername = refinedUsername.replace(/[^a-zA-Z0-9-]/g, "");
  refinedUsername = refinedUsername.toLowerCase();

  const isTaken = await isUsernameTaken(refinedUsername);
  const isReserved = RESERVED_USERNAMES.includes(refinedUsername);

  if (!isTaken && !isReserved) {
    return refinedUsername;
  }

  const suffix = typeof id === "number" ? `@git` : `@gle`;
  const maxAttempts = 10;

  for (let attempts = 0; attempts < maxAttempts; attempts++) {
    const randomDigit = getRandomDigits(8);
    const newUsername = `${refinedUsername}${randomDigit}${suffix}`;

    if (!(await isUsernameTaken(newUsername))) {
      return newUsername;
    }
  }

  const fallbackUsername = `${refinedUsername}${Date.now()}${suffix}`;
  console.error(
    `Failed to generate a unique OAuth username after ${maxAttempts} attempts. Fallback: ${fallbackUsername}`,
  );
  return fallbackUsername;
}

export async function generateDefaultUsername(email: string): Promise<string> {
  const localPart = email.split("@")[0];
  let baseUsername = localPart
    .trim()
    .replace(/[^a-zA-Z0-9-]/g, "")
    .toLowerCase();

  if (!baseUsername) {
    baseUsername = `user${getRandomDigits(8)}`;
  }

  const isTaken = await isUsernameTaken(baseUsername);
  const isReserved = RESERVED_USERNAMES.includes(baseUsername);

  if (!isTaken && !isReserved) {
    return baseUsername;
  }

  const maxAttempts = 10;

  for (let attempts = 0; attempts < maxAttempts; attempts++) {
    const randomDigits = getRandomDigits(8);
    const newUsername = `${baseUsername}${randomDigits}`;
    const isUnique = !(await isUsernameTaken(newUsername));

    if (isUnique) {
      return newUsername;
    }
  }

  const fallbackUsername = `${baseUsername}${Date.now()}`;

  console.error(
    `Failed to generate a unique default username after ${maxAttempts} attempts. Fallback: ${fallbackUsername}`,
  );
  return fallbackUsername;
}
