"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="relative h-svh bg-[url('/images/broken-computer.webp')] bg-cover bg-center bg-no-repeat p-6 min-[375px]:p-8 sm:p-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-white/90 via-white/80 to-primary/60"></div>
      <div className="isolate grid h-full place-content-center text-center">
        <h1 className="mb-4 text-pretty text-5xl font-bold text-primary">
          Oops! Something went wrong
        </h1>
        <p className="mb-8 text-xl leading-tight text-card-foreground">
          We apologize for the inconvenience. Our team has been notified of this
          issue.
        </p>
        <div className="mx-auto w-max space-x-4">
          <Button onClick={() => reset()} variant="default">
            Try again
          </Button>
          <Button
            onClick={() => (window.location.href = "/")}
            variant="outline"
          >
            Go Home
          </Button>
        </div>
      </div>
    </main>
  );
}
