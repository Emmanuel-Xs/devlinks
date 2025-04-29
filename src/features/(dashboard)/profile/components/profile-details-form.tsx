import { useProfileStore } from "@/store/profile/profile-store";

import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";

export default function ProfileDetailsForm() {
  const { firstName, lastName, email, setField, errors } = useProfileStore(
    (state) => state
  );

  return (
    <div className="flex flex-col gap-6 rounded-xl border-input bg-background p-[20px]">
      <div className="items-center justify-between gap-4 max-[690px]:space-y-2 min-[690px]:flex">
        <Label
          htmlFor="firstName"
          className="leading-[150%] text-card-foreground"
        >
          First name*
        </Label>
        <Input
          id="firstName"
          autoComplete="given-name"
          placeholder="e.g. John"
          wrapperClassName="w-full bg-card max-w-[432px] basis-[432px]"
          defaultValue={firstName ?? ""}
          onChange={(e) => setField("firstName", e.target.value)}
          error={errors?.firstName?.join(", ") || ""}
        />
      </div>
      <div className="items-center justify-between gap-4 max-[690px]:space-y-2 min-[690px]:flex">
        <Label
          htmlFor="lastName"
          className="leading-[150%] text-card-foreground"
        >
          Last name*
        </Label>
        <Input
          id="lastName"
          autoComplete="family-name"
          placeholder="e.g. Appleseed"
          wrapperClassName="w-full bg-card max-w-[432px] basis-[432px]"
          defaultValue={lastName ?? ""}
          onChange={(e) => setField("lastName", e.target.value)}
          error={errors?.lastName?.join(", ") || ""}
        />
      </div>
      <div className="items-center justify-between gap-4 max-[690px]:space-y-2 min-[690px]:flex">
        <Label htmlFor="email" className="leading-[150%] text-card-foreground">
          Email*
        </Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="e.g. email@example.com"
          wrapperClassName="w-full bg-card max-w-[432px] basis-[432px]"
          defaultValue={email}
          onChange={(e) => setField("email", e.target.value)}
          error={errors?.email?.join(", ") || ""}
        />
      </div>
    </div>
  );
}
