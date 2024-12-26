import { headers } from "next/headers";
import { RefillingTokenBucket } from "./rate-limit";

export const globalBucket = new RefillingTokenBucket<string>(100, 1);

export async function globalGETRateLimit(): Promise<boolean> {
  const requestHeaders = await headers();
  const clientIP = requestHeaders.get("x-forwarded-for");
  if (!clientIP) {
    return true;
  }
  return globalBucket.consume(clientIP, 1);
}

export async function globalPOSTRateLimit(): Promise<boolean> {
  const requestHeaders = await headers();
  const clientIP = requestHeaders.get("x-forwarded-for");
  if (!clientIP) {
    return true;
  }
  return globalBucket.consume(clientIP, 3);
}
