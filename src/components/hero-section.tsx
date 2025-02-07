import Link from "next/link";

import { cn } from "@/lib/utils";

import { Button } from "./ui/button";

export default function HeroSection() {
  return (
    <section className="flex h-full w-full flex-col items-center justify-center">
      <div className="max-w-xl text-center">
        <h1 className={cn("heading text-3xl text-primary sm:text-5xl")}>
          All Your Dev Links, One Easy-to-Share Hub
        </h1>
        <p
          className={cn(
            "text mx-auto max-w-lg pb-6 pt-4 text-lg text-card-foreground sm:text-xl"
          )}
        >
          Effortlessly organize and share your developer portfolio, and social
          links in one place.
        </p>
        <Button className="relative z-20" asChild>
          <Link href="/signup">Get Started</Link>
        </Button>
      </div>
    </section>
  );
}
