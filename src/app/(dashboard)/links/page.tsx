import LinksList from "@/components/Links/links-list";
import PageHeading from "@/components/PageHeading";
import { Button } from "@/components/ui/button";
import LinksList from "@/features/(dashboard)/links/components/links-list";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "user links",
};

export default function Page() {
  return (
    <section className="grid h-full w-full grid-rows-[1fr,_95px] divide-y divide-input rounded-xl bg-card">
      <div className="space-y-10 p-6 sm:p-10">
        <PageHeading
          title="Customize your links"
          description="Add/edit/remove links below and then share all your profiles with
            the world!"
        />
        <LinksList />
      </div>
      <div className="flex justify-end p-6 sm:px-10">
        <Button disabled className="max-sm:w-full">
          Save
        </Button>
      </div>
    </section>
  );
}
