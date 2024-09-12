import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "user links",
};

export default function Page() {
  return (
    <section className="grid max-h-[834px] w-full grid-rows-[1fr,_95px] divide-y divide-input rounded-xl bg-card">
      <div className="flex flex-col gap-10 p-6 sm:p-10">
        <div className="space-y-2">
          <h1 className="heading">Customize your links</h1>
          <p className="text">
            Add/edit/remove links below and then share all your profiles with
            the world!
          </p>
        </div>
        <div>
          <Button size="sm" variant="outline" className="w-full">
            + Add new link
          </Button>
        </div>
      </div>
      <div className="p-6 sm:px-10">
        <Button disabled className="w-full">
          Save
        </Button>
      </div>
    </section>
  );
}
