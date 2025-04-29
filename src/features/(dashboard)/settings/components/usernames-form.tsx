"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon, RefreshCwIcon, TrashIcon } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserUsername } from "@/drizzle/schema";
import { cn } from "@/lib/utils";
import { usernameSchema } from "@/lib/validation";

import DeleteDialog from "../../components/delete-dialog";
import { saveUserUsernames } from "../server/actions";

type FormValues = z.infer<typeof usernameSchema>;

export default function UsernamesForm({
  usernames,
  userId,
}: {
  usernames: UserUsername[];
  userId: number;
}) {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    control,
    formState: { errors, isSubmitting: isPending, isDirty },
  } = useForm<FormValues>({
    defaultValues: {
      usernames,
    },
    resolver: zodResolver(usernameSchema),
    mode: "onTouched",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "usernames",
  });

  // State to store suggestions
  const [usernameSuggestions, setUsernameSuggestions] = useState<
    Record<number, string[]>
  >({});

  const onSubmit = async (data: FormValues) => {
    console.log("Submitting data");
    clearErrors();
    setUsernameSuggestions({});

    // Check if the current usernames are different from the submitted data
    const usernamesExist =
      usernames.length === data.usernames.length &&
      usernames.every(
        (username, index) =>
          username.username.toLowerCase() ===
          data.usernames[index]?.username?.toLowerCase()
      );

    if (usernamesExist) {
      toast.warning("No changes made.", {
        icon: "⚠️",
        className:
          "bg-yellow-100 border border-yellow-400 text-yellow-900 rounded-md shadow-md px-4 py-2",
        duration: 2500,
      });

      return;
    }

    const result = await saveUserUsernames(data.usernames, userId);

    if (!result.success && result.errors) {
      if (result.errors.message) {
        toast.error(result.errors.message.join("\n"));
        return;
      }
      Object.entries(result.errors).forEach(([key, messages]) => {
        if (key.startsWith("usernameSuggestions.")) {
          const indexMatch = key.match(/usernameSuggestions\.(\d+)/);
          const index = indexMatch ? parseInt(indexMatch[1], 10) : null;

          // Store suggestions for the specific index
          if (index !== null) {
            setUsernameSuggestions((prev) => ({
              ...prev,
              [index]: messages || [],
            }));
          }
        } else {
          setError(key as `usernames.${number}.username`, {
            type: "server",
            message: messages?.join(" "),
          });
        }
      });
    }
    if (result.success) {
      console.log("Saved successfully!", result);
      toast.success("Saved successfully!");
    }
  };

  const addUsername = () => {
    if (fields.length < 4) {
      append({ username: "" });
    }
  };

  const handleDeleteUsername = (index: number) => {
    remove(index);
    toast.success("Username has been removed!");
  };

  console.log("errors from backend", errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id}>
            <Label
              htmlFor={`username-${index}`}
              className="mb-1 block text-sm font-medium"
            >
              Username {index + 1} {index === 0 && "(Default)"}
            </Label>
            <div>
              <div className="flex items-center gap-2.5">
                <Input
                  id={`username-${index}`}
                  placeholder={
                    index === 0
                      ? "Enter your default username"
                      : `Enter username ${index + 1}`
                  }
                  error={errors.usernames?.[index]?.username?.message}
                  {...register(`usernames.${index}.username`)}
                  disabled={index === 0}
                />

                {index > 0 && (
                  <DeleteDialog
                    title="Do you want to delete this username?"
                    description=" You cannot recover this username after deletion"
                    onDelete={() => handleDeleteUsername(index)}
                    triggerIcon={
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="flex items-center justify-center gap-2 border-destructive max-sm:h-10 max-sm:w-10"
                      >
                        <TrashIcon className="h-4 w-4 text-destructive" />
                        <span className="sr-only">
                          Remove username {index + 1}
                        </span>
                      </Button>
                    }
                  />
                )}
              </div>
              {usernameSuggestions[index] &&
                usernameSuggestions[index].length > 0 && (
                  <p className="py-2 text-sm text-destructive">
                    Suggestions: {usernameSuggestions[index].join(", ")}
                  </p>
                )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-4 max-sm:flex-col sm:gap-2">
        {fields.length < 4 && (
          <Button
            type="button"
            variant="outline"
            size="ex"
            onClick={addUsername}
            className="flex items-center gap-2"
          >
            <PlusIcon className="h-4 w-4" />
            Add Username
          </Button>
        )}

        <Button
          type="submit"
          size="ex"
          disabled={isPending || !isDirty}
          className="tabular-nums"
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
            "Save Usernames"
          )}
        </Button>
      </div>
    </form>
  );
}
