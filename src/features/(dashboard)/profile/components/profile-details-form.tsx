import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";

export default function ProfileDetailsForm() {
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
        />
      </div>
      <div className="items-center justify-between gap-4 max-[690px]:space-y-2 min-[690px]:flex">
        <Label htmlFor="email" className="leading-[150%] text-card-foreground">
          Username*
        </Label>
        <Input
          id="username"
          autoComplete="username"
          placeholder="Apple001"
          wrapperClassName="w-full bg-card max-w-[432px] basis-[432px]"
        />
      </div>
    </div>
  );
}
