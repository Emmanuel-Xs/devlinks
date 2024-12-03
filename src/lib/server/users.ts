import { isUsernameTaken } from "@/drizzle/query/users";

const RESERVED_USERNAMES = ["admin", "support", "root"];

function getRandomDigits(length = 8) {
  const randomValues = new Uint8Array(length);
  crypto.getRandomValues(randomValues);

  return Array.from(randomValues, (value) => value % 10).join("");
}

export async function refineOAuthUsername(
  username: string,
  id: string | number,
): Promise<string> {
  let refined = username.trim().replace(/[\s._]+/g, "-");
  refined = refined.replace(/[^a-zA-Z0-9-]/g, "");
  refined = refined.toLowerCase();

  const isTaken = await isUsernameTaken(refined);
  const isReserved = RESERVED_USERNAMES.includes(refined);

  if (isTaken || isReserved) {
    const suffix = typeof id === "number" ? `@git` : `@gle`;
    let attempts = 0;
    const maxAttempts = 10;
    let isUnique = false;
    // Initialize newUsername with a fallback value
    let newUsername = `user${id}${suffix}`;

    while (!isUnique && attempts < maxAttempts) {
      const randomDigit = getRandomDigits(8);
      newUsername = `user${randomDigit}${suffix}`;
      isUnique = !(await isUsernameTaken(newUsername));
      attempts++;
    }

    if (!isUnique) {
      console.error("Failed to generate a unique username after 10 attempts.");
      newUsername = `user${id}${suffix}`;
    }

    return newUsername;
  }

  return refined;
}
