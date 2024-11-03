import { cn } from "@/lib/utils";

export default function TwitchIcon({ className }: { className?: string }) {
  return (
    <svg
      width="12"
      height="14"
      viewBox="0 0 12 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={cn(className)}
        d="M5.75995 2.9535H6.71329V5.80683H5.75995M8.37995 2.9535H9.33329V5.80683H8.37995M2.66662 0.333496L0.286621 2.7135V11.2868H3.13995V13.6668L5.52662 11.2868H7.42662L11.7133 7.00016V0.333496M10.76 6.52683L8.85995 8.42683H6.95329L5.28662 10.0935V8.42683H3.13995V1.28683H10.76V6.52683Z"
        fill="#737373"
      />
    </svg>
  );
}
