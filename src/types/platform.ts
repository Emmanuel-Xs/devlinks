import { ReactNode } from "react";

import { PlatformKey } from "@/drizzle/schema";

export interface Platform {
  key: string;
  label: string;
  // eslint-disable-next-line no-unused-vars
  getIcon: (className?: string) => ReactNode;
  color?: string;
}

export type ExtendedPlatformKey = PlatformKey | "unknown";

export type PlatformConfig = {
  // eslint-disable-next-line no-unused-vars
  [K in PlatformKey]: Platform;
};
