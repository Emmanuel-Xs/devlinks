import { Button } from "@/components/ui/button";

export function DangerZone() {
  return (
    <div>
      <h2 className="pb-4 text-xl font-medium">Danger Zone</h2>
      <div className="border-destructive flex flex-col rounded-md border p-4">
        <h3 className="text-destructive text-lg">Delete this account</h3>
        <p>
          Once you delete your account, all your data will be deleted and there
          is no going back. Please be certain
        </p>
        <Button
          className="mt-4 ml-auto w-fit"
          variant="destructive-outline"
          size="ex"
        >
          Delete Account
        </Button>
      </div>
    </div>
  );
}
