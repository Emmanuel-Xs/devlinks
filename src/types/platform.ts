// types/platform.ts
import { ReactNode } from "react";

export interface Platform {
  key: string;
  label: string;
  getIcon: (className?: string) => ReactNode;
  color?: string;
}

export type PlatformKey =
  | "github"
  | "frontendmentor"
  | "twitter"
  | "linkedin"
  | "youtube"
  | "facebook"
  | "twitch"
  | "dev.to"
  | "codewars"
  | "codepen"
  | "freecodecamp"
  | "gitlab"
  | "hashnode"
  | "stackoverflow";

export type ExtendedPlatformKey = PlatformKey | "unknown";

export type PlatformConfig = {
  [K in PlatformKey]: Platform;
};
