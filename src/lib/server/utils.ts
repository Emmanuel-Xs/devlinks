import {
  encodeBase32LowerCaseNoPadding,
  encodeBase32UpperCaseNoPadding,
} from "@oslojs/encoding";
import sharp from "sharp";

export function getRandomDigits(length = 5) {
  const randomValues = new Uint8Array(length);
  crypto.getRandomValues(randomValues);

  return encodeBase32LowerCaseNoPadding(randomValues);
}

export function generateRandomOTP(): string {
  const bytes = new Uint8Array(5);
  crypto.getRandomValues(bytes);
  const code = encodeBase32UpperCaseNoPadding(bytes);
  return code;
}

export async function generateBlurDataURL(imageUrl: string): Promise<string> {
  const res = await fetch(imageUrl);
  if (!res.ok) {
    throw new Error(`Failed to fetch image: ${res.statusText}`);
  }

  const arrayBuffer = await res.arrayBuffer();
  const imageBuffer = Buffer.from(arrayBuffer);

  const resizedBuffer = await sharp(imageBuffer).resize(10).toBuffer();

  return `data:image/jpeg;base64,${resizedBuffer.toString("base64")}`;
}
