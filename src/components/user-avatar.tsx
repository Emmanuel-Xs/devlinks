import Image from "next/image";

export function AvatarSkeleton() {
  return (
    <div className="mx-auto h-[104px] w-[104px] animate-pulse rounded-full bg-background" />
  );
}

export default function UserAvatar({
  avatarUrl,
  fullName,
}: {
  avatarUrl: string;
  fullName: string;
}) {
  return (
    <div className="mx-auto flex h-[104px] w-[104px] items-center justify-center overflow-hidden rounded-full border-[4px] border-primary">
      {avatarUrl.length > 0 ? (
        //   TODO: data loader with base64 image on the db check next/image docs
        <Image
          src={avatarUrl}
          alt={`Profile image of ${fullName}`}
          width={104}
          height={104}
          priority={true}
          loading="eager"
        />
      ) : (
        <span className="text text-center text-3xl font-bold">
          {fullName.slice(0, 2).toLocaleUpperCase()}
        </span>
      )}
    </div>
  );
}
