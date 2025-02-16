import Link from "next/link";

import { cn } from "@/lib/utils";

import { Button } from "../../../components/ui/button";

export default function HeroSection() {
  return (
    <section className="mx-auto flex min-h-[70svh] w-[min(100%_-_2.5rem,_1350px)] flex-col items-center justify-center">
      <div className="space-y-6 text-center">
        <h1
          className={cn(
            "heading max-w-2xl text-4xl text-primary sm:text-5xl md:text-6xl"
          )}
        >
          Your Developer Social Links in One Place
        </h1>
        <p
          className={cn(
            "text mx-auto max-w-lg text-xl text-card-foreground sm:text-xl"
          )}
        >
          Effortlessly organize and share your developer portfolio and social
          links with devlinks.
        </p>
        <Button className="relative z-20" asChild>
          <Link href="/signup">Get Started</Link>
        </Button>
      </div>
    </section>
  );
}
