"use client";

import { useEffect, useState } from "react";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { ShareDialog } from "./share-dialog";

export default function ShareButton({ username }: { username: string }) {
  const [isSharing, setIsSharing] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(`${window.location.origin}/${username}`);
    }
  }, [username]);

  const handleShare = async () => {
    setIsSharing(true);

    try {
      if (navigator.share) {
        await navigator.share({
          title: `${username}'s Links`,
          url: shareUrl,
        });
        toast.success("Thanks for sharing!");
      } else {
        setShowDialog(true);
      }
    } catch (error) {
      console.error("Error sharing:", error);
      toast.error("Failed to share link");
    }

    setIsSharing(false);
  };

  return (
    //   TODO: micro interaction when the button is clicked using motion
    <>
      <Button size="ex" onClick={handleShare} disabled={isSharing}>
        <span className="ml-2">Share Link</span>
      </Button>
      <ShareDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        shareUrl={shareUrl}
      />
    </>
  );
}
