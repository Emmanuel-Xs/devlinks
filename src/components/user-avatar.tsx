import Image from "next/image";

import { cn } from "@/lib/utils";

export function AvatarSkeleton() {
  return (
    <div className="mx-auto h-[104px] w-[104px] animate-pulse rounded-full bg-background" />
  );
}

export default function UserAvatar({
  avatarUrl,
  fullName,
  blurDataURL,
  className,
}: {
  avatarUrl: string;
  fullName: string;
  blurDataURL?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative mx-auto flex h-[104px] w-[104px] items-center justify-center overflow-hidden rounded-full border-[4px] border-primary",
        className
      )}
    >
      {avatarUrl.length > 0 ? (
        <Image
          src={avatarUrl}
          alt={`Profile image of ${fullName}`}
          fill
          style={{
            objectFit: "contain",
          }}
          priority={true}
          loading="eager"
          placeholder="blur"
          blurDataURL={blurDataURL}
          unoptimized
        />
      ) : (
        <span className="text text-center text-3xl font-bold">
          {fullName.slice(0, 2).toLocaleUpperCase()}
        </span>
      )}
    </div>
  );
}
