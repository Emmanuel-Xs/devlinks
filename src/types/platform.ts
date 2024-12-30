// types/platform.ts
import { ReactNode } from "react";

import { PlatformKey } from "@/drizzle/schema";

export interface Platform {
  key: string;
  label: string;
  getIcon: (className?: string) => ReactNode;
  color?: string;
}

export type ExtendedPlatformKey = PlatformKey | "unknown";

export type PlatformConfig = {
  [K in PlatformKey]: Platform;
};
