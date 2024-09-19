import { cn } from "@/lib/utils";

export default function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg
      width="14"
      height="12"
      viewBox="0 0 14 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={cn(className)}
        d="M13.9733 1.99984C13.4599 2.23317 12.9066 2.3865 12.3333 2.45984C12.9199 2.1065 13.3733 1.5465 13.5866 0.873171C13.0333 1.2065 12.4199 1.43984 11.7733 1.57317C11.2466 0.999837 10.5066 0.666504 9.66661 0.666504C8.09995 0.666504 6.81994 1.9465 6.81994 3.5265C6.81994 3.75317 6.84661 3.97317 6.89328 4.17984C4.51995 4.05984 2.40661 2.91984 0.999945 1.19317C0.753278 1.61317 0.613278 2.1065 0.613278 2.6265C0.613278 3.61984 1.11328 4.49984 1.88661 4.99984C1.41328 4.99984 0.973278 4.8665 0.586611 4.6665V4.6865C0.586611 6.07317 1.57328 7.23317 2.87994 7.49317C2.46043 7.60798 2.02001 7.62395 1.59328 7.53984C1.77435 8.10816 2.12897 8.60544 2.60729 8.96179C3.08561 9.31814 3.66358 9.51563 4.25994 9.5265C3.24903 10.3268 1.99594 10.7594 0.706611 10.7532C0.479945 10.7532 0.253278 10.7398 0.0266113 10.7132C1.29328 11.5265 2.79994 11.9998 4.41328 11.9998C9.66661 11.9998 12.5533 7.63984 12.5533 3.85984C12.5533 3.73317 12.5533 3.61317 12.5466 3.4865C13.1066 3.0865 13.5866 2.57984 13.9733 1.99984Z"
        fill="#737373"
      />
    </svg>
  );
}