import { cn } from "@/lib/utils";

export default function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={cn(className)}
        d="M10.6667 0C11.0203 0 11.3594 0.140476 11.6095 0.390524C11.8595 0.640573 12 0.979711 12 1.33333V10.6667C12 11.0203 11.8595 11.3594 11.6095 11.6095C11.3594 11.8595 11.0203 12 10.6667 12H1.33333C0.979711 12 0.640573 11.8595 0.390524 11.6095C0.140476 11.3594 0 11.0203 0 10.6667V1.33333C0 0.979711 0.140476 0.640573 0.390524 0.390524C0.640573 0.140476 0.979711 0 1.33333 0H10.6667ZM10.3333 10.3333V6.8C10.3333 6.2236 10.1044 5.6708 9.69678 5.26322C9.2892 4.85564 8.7364 4.62667 8.16 4.62667C7.59333 4.62667 6.93333 4.97333 6.61333 5.49333V4.75333H4.75333V10.3333H6.61333V7.04667C6.61333 6.53333 7.02667 6.11333 7.54 6.11333C7.78754 6.11333 8.02493 6.21167 8.19997 6.3867C8.375 6.56173 8.47333 6.79913 8.47333 7.04667V10.3333H10.3333ZM2.58667 3.70667C2.88371 3.70667 3.16859 3.58867 3.37863 3.37863C3.58867 3.16859 3.70667 2.88371 3.70667 2.58667C3.70667 1.96667 3.20667 1.46 2.58667 1.46C2.28786 1.46 2.00128 1.5787 1.78999 1.78999C1.5787 2.00128 1.46 2.28786 1.46 2.58667C1.46 3.20667 1.96667 3.70667 2.58667 3.70667ZM3.51333 10.3333V4.75333H1.66667V10.3333H3.51333Z"
        fill="#737373"
      />
    </svg>
  );
}
