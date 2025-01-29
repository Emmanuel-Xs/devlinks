import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { User } from "@/drizzle/schema";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const capitalize = (str: string) =>
  str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export const formatUserDisplayName = (user: User[]) => {
  // Helper function to capitalize first letter of each word
  const capitalize = (str: string) => {
    return str
      .split(" ")
      .map((word) => {
        // Handle hyphenated words
        if (word.includes("-")) {
          return word
            .split("-")
            .map(
              (part) =>
                part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
            )
            .join("-");
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(" ");
  };

  // Check if user has both first and last name
  if (user[0].firstName && user[0].lastName) {
    return capitalize(`${user[0].firstName} ${user[0].lastName}`);
  }

  return capitalize(user[0].username);
};
