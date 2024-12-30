import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <main className="relative grid h-svh place-items-center bg-[url('/images/broken-chain.svg')] bg-cover bg-center bg-no-repeat p-6 min-[375px]:p-8 sm:p-0">
      <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-white/90 to-white/20"></div>

      <div className="isolate text-center">
        <h1 className={cn("heading text-9xl font-extrabold text-primary")}>
          404
        </h1>
        <h2 className="heading mb-4">Not Found</h2>
        <p className={cn("text mb-8 text-xl font-medium text-gray-700")}>
          Oops! The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Button asChild>
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </main>
  );
}
