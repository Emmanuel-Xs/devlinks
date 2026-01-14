"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { deleteUserAccount } from "../server/delete-user-account-action";

export function DangerZone({ username }: { username: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = () => {
    if (inputValue !== username) return;

    startTransition(async () => {
      const result = await deleteUserAccount();
      if (result.success) {
        toast.success("Account deleted successfully");
        setIsOpen(false);
        router.push("/login");
      } else {
        toast.error(result.error || "Failed to delete account");
      }
    });
  };

  return (
    <div>
      <h2 className="pb-4 text-xl font-medium">Danger Zone</h2>
      <div className="border-destructive flex flex-col rounded-md border p-4">
        <h3 className="text-destructive text-lg">Delete this account</h3>
        <p>
          Once you delete your account, all your data will be deleted and there
          is no going back. Please be certain
        </p>
        <Dialog
          open={isOpen}
          onOpenChange={(open) => {
            setIsOpen(open);
            if (!open) setInputValue("");
          }}
        >
          <DialogTrigger asChild>
            <Button
              className="mt-4 ml-auto w-fit"
              variant="destructive-outline"
              size="ex"
            >
              Delete Account
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="confirm-username">
                  Type <span className="font-bold">{username}</span> to confirm.
                </Label>
                <Input
                  id="confirm-username"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={username}
                  autoComplete="off"
                  onPaste={(e) => {e.preventDefault(); return false;}}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsOpen(false)}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={inputValue !== username || isPending}
              >
                {isPending ? "Deleting..." : "Delete Account"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
