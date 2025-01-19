"use client";

import Form from "next/form";
import { useTransition } from "react";

import { RefreshCwIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLinksStore } from "@/store/links-store";

import { getUserLinksAction, saveLinksAction } from "../server/actions";

export default function SaveLinksButton({ userId }: { userId: number }) {
  const {
    isValid,
    hasChanges: Changes,
    getModifiedLinks,
    setLinksFromDb,
    links: linksFromUser,
  } = useLinksStore((state) => state);

  const linksToSave = getModifiedLinks();
  console.log("links to save, modified links", linksToSave);
  console.log("all user links", linksFromUser);
  const hasChanges = Changes();

  const [isPending, startTransition] = useTransition();

  const handleSave = () => {
    startTransition(async () => {
      const result = await saveLinksAction(linksFromUser, userId);

      if (!result.success) {
        const errorMessages = Object.values(result.errors || {})
          .flat()
          .join(", ");
        console.error(errorMessages);
        toast.error(result.errors?.message?.[0] || "Failed to save links");
        return;
      }

      const updatedLinks = await getUserLinksAction(userId);
      setLinksFromDb(updatedLinks);
      toast.success("Links saved successfully");
    });
  };

  return (
    <div className="flex justify-end p-6 sm:px-10">
      <Form action={handleSave}>
        <Button
          type="submit"
          disabled={!isValid || !hasChanges || isPending}
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
