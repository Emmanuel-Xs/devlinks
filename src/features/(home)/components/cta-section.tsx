import Link from "next/link";

export default function CTASection() {
  return (
    <section className="bg-primary py-20 pt-16 text-primary-foreground">
      <div className="mx-auto w-[min(100%-2.5rem,1350px)] px-4 text-center">
        <h2 className="mb-6 text-3xl font-bold">
          Ready to Showcase Your Developer Profile?
        </h2>
        <p className="mb-8 text-xl">
          Join devlinks today and start sharing your links with the world.
        </p>
        <Link
          href="/signup"
          className="inline-flex h-10 items-center justify-center rounded-md bg-background px-8 text-sm font-medium text-primary shadow transition-colors hover:bg-active-link"
        >
          Sign Up Now
        </Link>
      </div>
    </section>
  );
}
