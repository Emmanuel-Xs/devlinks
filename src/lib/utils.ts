import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility to combine and dedupe Tailwind class names.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Safely capitalizes each word separated by spaces or hyphens.
 * Returns an empty string if input is falsy.
 */
export function capitalize(str?: string | null): string {
  if (!str) return "";
  return str
    .split(/[-\s]+/) // split on spaces or hyphens
    .filter(Boolean) // remove empty segments
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" "); // rejoin with a single space
}

/**
 * Formats a user display name, preferring "First Last" if available,
 * otherwise falling back to their username.
 * Always returns a non-empty string.
 */
export function formatUserDisplayName(
  firstName?: string | null,
  lastName?: string | null,
  username?: string | null
): string {
  const hasFullName = firstName?.trim() && lastName?.trim();
  const base = hasFullName
    ? `${firstName!.trim()} ${lastName!.trim()}`
    : username?.trim();

  // if base is still empty or null, default to a generic placeholder
  const toCap = base || "User";
  return capitalize(toCap);
}
