// utils/url-validation.ts
import { PlatformKey } from "@/drizzle/schema";

// Platform-specific URL patterns
const PLATFORM_URL_PATTERNS: Record<PlatformKey, RegExp> = {
  github:
    /^https?:\/\/(www\.)?github\.com\/[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}\/?$/i,
  frontendmentor:
    /^https?:\/\/(www\.)?frontendmentor\.io\/profile\/[\w-]+\/?$/i,
  twitter: /^https?:\/\/(www\.)?(twitter|x)\.com\/[a-zA-Z0-9_]{1,15}\/?$/i,
  linkedin: /^https?:\/\/(www\.)?linkedin\.com\/in\/[\w-]{3,100}\/?$/i,
  youtube: /^https?:\/\/(www\.)?youtube\.com\/(c\/|channel\/|@)?[\w-]+\/?$/i,
  facebook: /^https?:\/\/(www\.)?facebook\.com\/[a-zA-Z0-9.]{5,}\/?$/i,
  twitch: /^https?:\/\/(www\.)?twitch\.tv\/[a-zA-Z0-9][\w]{3,24}\/?$/i,
  "dev.to": /^https?:\/\/(www\.)?dev\.to\/[a-zA-Z0-9_]{2,}\/?$/i,
  codewars: /^https?:\/\/(www\.)?codewars\.com\/users\/[\w-]+\/?$/i,
  codepen: /^https?:\/\/(www\.)?codepen\.io\/[a-zA-Z0-9_-]+\/?$/i,
  freecodecamp: /^https?:\/\/(www\.)?freecodecamp\.org\/[a-zA-Z0-9_-]+\/?$/i,
  gitlab: /^https?:\/\/(www\.)?gitlab\.com\/[a-zA-Z0-9_.-]+\/?$/i,
  hashnode: /^https?:\/\/(www\.)?hashnode\.com\/@[a-zA-Z0-9_-]+\/?$/i,
  stackoverflow:
    /^https?:\/\/(www\.)?stackoverflow\.com\/users\/\d+\/[\w-]+\/?$/i,
};

interface UrlValidationResult {
  isValid: boolean;
  error?: string;
}

export const validatePlatformUrl = (
  url: string,
  platform: PlatformKey
): UrlValidationResult => {
  // Return early if URL is empty
  if (!url.trim()) {
    return {
      isValid: false,
      error: "Please enter a URL",
    };
  }

  // Basic URL validation
  //   let urlObj: URL;
  try {
    new URL(url);
  } catch {
    return {
      isValid: false,
      error: "Please enter a valid URL (including https://)",
    };
  }

  // Get the pattern for the platform
  const pattern = PLATFORM_URL_PATTERNS[platform];

  if (!pattern) {
    return {
      isValid: false,
      error: `Platform ${platform} is not supported`,
    };
  }

  // Check if URL matches the platform pattern
  if (!pattern.test(url)) {
    return {
      isValid: false,
      error: `Invalid ${platform} profile URL format`,
    };
  }

  return {
    isValid: true,
  };
};

// Helper function to extract username from valid platform URL
export const extractUsername = (
  url: string,
  platform: PlatformKey
): string | null => {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname.replace(/\/$/, ""); // Remove trailing slash

    switch (platform) {
      case "github":
      case "twitter":
      case "twitch":
      case "dev.to":
      case "codepen":
      case "gitlab":
        return pathname.split("/")[1] || null;

      case "frontendmentor":
        return pathname.split("/profile/")[1] || null;

      case "linkedin":
        return pathname.split("/in/")[1] || null;

      case "youtube":
        const path = pathname.split("/");
        return path[path.length - 1] || null;

      case "facebook":
        return pathname.substring(1) || null;

      case "codewars":
        return pathname.split("/users/")[1] || null;

      case "freecodecamp":
        return pathname.substring(1) || null;

      case "hashnode":
        return pathname.substring(2) || null; // Remove @ symbol

      case "stackoverflow":
        const matches = pathname.match(/\/users\/\d+\/([\w-]+)/);
        return matches ? matches[1] : null;

      default:
        return null;
    }
  } catch {
    return null;
  }
};
