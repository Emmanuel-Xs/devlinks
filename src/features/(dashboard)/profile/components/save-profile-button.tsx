"use client";

import Form from "next/form";
import { useTransition } from "react";

import { RefreshCwIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { getUserProfileDataAction } from "@/lib/server/users";
import { cn } from "@/lib/utils";
import { useProfileStore } from "@/store/profile/profile-store";

import { saveProfileAction } from "../server/action";

export default function SaveProfileButton({ userId }: { userId: number }) {
  const {
    firstName,
    lastName,
    email,
    croppedAvatar,
    username,
    isDirty,
    setErrors,
    resetFromDb,
  } = useProfileStore((state) => state);

  const newAvatarFile = croppedAvatar
    ? new File([croppedAvatar], `avatar_${userId}.webp`)
    : null;

  const [isPending, startTransition] = useTransition();

  const handleSave = () => {
    startTransition(async () => {
      const result = await saveProfileAction(
        {
          firstName,
          lastName,
          username,
          email,
          croppedAvatar: newAvatarFile,
        },
        userId
      );

      if (!result.success) {
        const errorMessages = Object.values(result.errors || {})
          .flat()
          .join(", ");
        console.error(errorMessages);
        setErrors(result.errors);
        toast.error(
          result.errors?.message?.join(", ") || "Failed to save profile"
        );
        return;
      }

      const user = await getUserProfileDataAction(userId);

      resetFromDb({ ...user[0] });
      toast.success("Profile Saved Successfully");
    });
  };

  console.log(isDirty);

  return (
    <div className="flex justify-end p-6 sm:px-10">
      <Form action={handleSave}>
        <Button
          type="submit"
          disabled={!isDirty || isPending}
          className="tabular-nums max-sm:w-full"
        >
          {isPending ? (
            <>
              <RefreshCwIcon
                className={cn("animate-spin text-card")}
                size={25}
              />
              <span className="pl-1">Saving...</span>
            </>
          ) : (
            "Save"
          )}
        </Button>
      </Form>
    </div>
  );
}
