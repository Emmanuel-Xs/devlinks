import {
  encodeBase32LowerCaseNoPadding,
  encodeBase32UpperCaseNoPadding,
} from "@oslojs/encoding";

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
