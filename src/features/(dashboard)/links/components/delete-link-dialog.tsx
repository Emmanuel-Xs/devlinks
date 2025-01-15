import { XIcon } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type DeleteLinkDialogProps = {
  handleRemoveLink: () => void;
};

export default function DeleteLinkDialog({
  handleRemoveLink,
}: DeleteLinkDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <XIcon size={18} className="text-red-900" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="heading">
            Do you want to delete this link?
          </AlertDialogTitle>
          <AlertDialogDescription className="text">
            You cannot recover this link after deletion
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleRemoveLink}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/50"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
