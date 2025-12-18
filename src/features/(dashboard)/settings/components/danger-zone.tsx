import { Button } from "@/components/ui/button";

export function DangerZone() {
  return (
    <div>
      <h2 className="pb-4 text-xl font-medium">Danger Zone</h2>
      <div className="flex flex-col rounded-md border border-destructive p-4">
        <h3 className="text-lg text-destructive">Delete this account</h3>
        <p>
          Once you delete your account, all your data will be deleted and there
          is no going back. Please be certain
        </p>
        <Button
          className="ml-auto mt-4 w-fit"
          variant="destructive-outline"
          size="ex"
        >
          Delete Account
        </Button>
      </div>
    </div>
  );
}
