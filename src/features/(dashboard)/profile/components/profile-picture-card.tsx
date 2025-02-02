"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import Resizer from "react-image-file-resizer";

import { cn } from "@/lib/utils";
import { useProfileStore } from "@/store/profile/profile-store";

import CropImageDialog from "./crop-image-dialog";
import ImageIcon from "./image-icon";

/* eslint-disable n/no-unsupported-features/node-builtins */

export default function ProfilePictureCard({
  avatarUrl,
  blurDataUrl,
}: {
  avatarUrl: string | null;
  blurDataUrl: string | null;
}) {
  const { croppedAvatar, setField } = useProfileStore((state) => state);
  const [imageToCrop, setImageToCrop] = useState<File>();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const onImageSelected = (image: File | undefined) => {
    if (!image) return;

    Resizer.imageFileResizer(
      image,
      1024,
      1024,
      "WEBP",
      100,
      0,
      (uri) => setImageToCrop(uri as File),
      "file"
    );
  };

  return (
    <div className="flex flex-col justify-between gap-6 rounded-xl border-input bg-background p-[20px] sm:flex-row sm:items-center">
      <p className="text">Profile picture</p>
      <div className="flex max-w-[432px] flex-col gap-6 sm:flex-row sm:items-center">
        <div
          className={cn(
            "relative flex h-48 w-48 shrink-0 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl bg-active-link",
            avatarUrl && "border-2 border-primary"
          )}
          onClick={() => fileInputRef.current?.click()}
        >
          {avatarUrl ? (
            <Image
              src={
                croppedAvatar ? URL.createObjectURL(croppedAvatar) : avatarUrl
              }
              alt="Profile picture"
              priority
              width={192}
              height={192}
              loading="eager"
              placeholder="blur"
              blurDataURL={blurDataUrl ?? undefined}
              unoptimized
            />
          ) : (
            <>
              <ImageIcon />
              <p className="text-center font-semibold text-primary">
                + Upload Image
              </p>
            </>
          )}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="sr-only hidden"
            onChange={(e) => onImageSelected(e.target.files?.[0])}
          />
        </div>
        <p className="text text-xs sm:max-w-44 md:max-w-52">
          Image will be converted to WEBP format.
        </p>
      </div>
      {imageToCrop && (
        <CropImageDialog
          src={URL.createObjectURL(imageToCrop)}
          cropAspectRatio={1}
          onCropped={(blob) => setField("croppedAvatar", blob)}
          onClose={() => {
            setImageToCrop(undefined);
            if (fileInputRef.current) {
              fileInputRef.current.value = "";
            }
          }}
        />
      )}
    </div>
  );
}
