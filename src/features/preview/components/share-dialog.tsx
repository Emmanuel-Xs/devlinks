/* eslint-disable no-unused-vars */
// components/ShareDialog.tsx
import { Copy } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface ShareDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  shareUrl: string;
}

export function ShareDialog({
  open,
  onOpenChange,
  shareUrl,
}: ShareDialogProps) {
  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl);
    toast.success("Link copied to clipboard!");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-lg">
        <DialogHeader>
          <DialogTitle>Share profile</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <Input
            readOnly
            value={shareUrl}
            className="flex-1 selection:bg-transparent"
          />
          <Button size="icon" onClick={handleCopy}>
            <Copy className="h-4 w-4" />
            <span className="sr-only">Copy link</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
