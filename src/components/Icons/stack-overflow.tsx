import { cn } from "@/lib/utils";

export default function StackOverFlowIcon({
  className,
}: {
  className?: string;
}) {
  return (
    <svg
      width="14"
      height="17"
      viewBox="0 0 14 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={cn(className)}
        d="M11.656 15.0755V10.8075H13.0805V16.5H0.229004V10.8075H1.6485V15.0755H11.656ZM3.0725 13.6535H10.2345V12.2295H3.0725V13.6535ZM3.2475 10.4195L10.235 11.8775L10.5345 10.4975L3.55 9.0415L3.2475 10.4195ZM4.1535 7.0495L10.623 10.068L11.2245 8.768L4.756 5.7475L4.154 7.0395L4.1535 7.0495ZM5.9635 3.8595L11.44 8.43L12.3465 7.3485L6.87 2.781L5.9685 3.8565L5.9635 3.8595ZM9.5 0.5L8.336 1.362L12.6065 7.0985L13.7705 6.2365L9.5 0.5Z"
        fill="#737373"
      />
    </svg>
  );
}
