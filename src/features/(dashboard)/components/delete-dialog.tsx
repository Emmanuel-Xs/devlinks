import { ReactNode } from "react";

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

type DeleteDialogProps = {
  title: string;
  description: string;
  triggerIcon?: ReactNode;
  onDelete: () => void;
};

export default function DeleteDialog({
  title,
  description,
  triggerIcon,
  onDelete,
}: DeleteDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild={triggerIcon !== undefined}>
        {triggerIcon ? (
          triggerIcon
        ) : (
          <XIcon size={18} className="text-red-900" />
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="heading">{title}</AlertDialogTitle>
          <AlertDialogDescription className="text">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onDelete}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/50"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
