import { PlatformKey } from "./platform";

export type LinkCardProps = {
  id: number;
  order: number;
  platform: PlatformKey;
  link: string;
};
