import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const capitalize = (str: string) =>
  str
    .split(/[-\s]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

export const formatUserDisplayName = (
  firstName: string | null,
  lastName: string | null,
  username: string
) => {
  return capitalize(
    (firstName?.trim() && lastName?.trim()
      ? `${firstName} ${lastName}`
      : username) ?? username
  );
};
