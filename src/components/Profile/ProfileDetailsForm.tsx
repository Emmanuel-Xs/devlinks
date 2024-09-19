import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function ProfileDetailsForm() {
  return (
    <div className="flex flex-col gap-6 rounded-xl border-input bg-background p-[20px]">
      <div className="items-center justify-between gap-4 max-sm:space-y-2 sm:flex">
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
        />
      </div>
      <div className="items-center justify-between gap-4 max-sm:space-y-2 sm:flex">
        <Label
          htmlFor="lastName"
          className="leading-[150%] text-card-foreground"
        >
          Last name*
        </Label>
        <Input
          id="firstName"
          autoComplete="family-name"
          placeholder="e.g. Appleseed"
          wrapperClassName="w-full bg-card max-w-[432px] basis-[432px]"
        />
      </div>
      <div className="items-center justify-between gap-4 max-sm:space-y-2 sm:flex">
        <Label htmlFor="email" className="leading-[150%] text-card-foreground">
          Email*
        </Label>
        <Input
          id="firstName"
          type="email"
          autoComplete="email"
          placeholder="e.g. email@example.com"
          wrapperClassName="w-full bg-card max-w-[432px] basis-[432px]"
        />
      </div>
    </div>
  );
}
