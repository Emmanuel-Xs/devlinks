import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "user profile",
};

export default function Page() {
  return (
    <section className="max-h-[834px] w-full rounded-xl bg-card p-6">
      profile Page
    </section>
  );
}
