import { redirect } from "next/navigation";
import { Metadata } from "next";

import TestimonialsSection from "@/features/(home)/components/testimonials-section";
import FeaturesSection from "@/features/(home)/components/feature-section";
import { StorageCleaner } from "@/features/(home)/components/storage-cleaner";
import LandingNavbar from "@/features/(home)/components/landing-navbar";
import HeroSection from "@/features/(home)/components/hero-section";
import CTASection from "@/features/(home)/components/cta-section";
import { InteractiveGridPattern } from "@/components/interactive-grid-pattern";
import Footer from "@/features/(home)/components/footer";
import { getUserDefaultUsername } from "@/drizzle/query/usernames";
import { getCurrentSession } from "@/lib/server/sessions";
import { cn } from "@/lib/utils";

const images = [
  {
    url: "https://devlinks-abc.vercel.app/og-image-home.png",
    width: 1200,
    height: 630,
    alt: "devlinks homepage preview",
  },
];

export const metadata: Metadata = {
  title: {
    absolute: "devlinks - Your Developer Social Links in One Place",
  },
  description:
    "Effortlessly organize and share your developer portfolio, and social links in one place.",
  keywords: [
    "developer links",
    "social links",
    "developer profile",
    "GitHub links",
    "portfolio links",
    "share dev links",
    "developer showcase",
    "dev links",
  ],
  openGraph: {
    title: "devlinks - Your Developer Social Links in One Place",
    description:
      "Effortlessly organize and share your developer portfolio, and social links in one place.",
    url: "https://devlinks-abc.vercel.app",
    siteName: "devlinks",
    type: "website",
    images,
  },
  twitter: {
    card: "summary_large_image",
    title: "devlinks - Your Developer Social Links in One Place",
    description:
      "Effortlessly organize and share your developer portfolio, and social links in one place.",
    images,
    site: "devlinks",
  },
  alternates: {
    canonical: "https://devlinks-abc.vercel.app",
  },
};

export default async function Home() {
  const { user } = await getCurrentSession();

  let username: string | undefined;

  if (user) {
    const data = await getUserDefaultUsername(user.id);
    if (!data) {
      redirect("/settings/usernames");
    }
    username = data.username;
  }

  return (
    <main>
      <StorageCleaner hasSession={!!user} />
      <div className="relative isolate overflow-hidden">
        <InteractiveGridPattern
          className={cn(
            "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
            "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
          )}
          width={40}
          height={40}
          squares={[80, 80]}
          squaresClassName="hover:fill-primary"
        />
        <LandingNavbar user={user} username={username} />
        <HeroSection />
      </div>
      <div>
        <FeaturesSection />
        <TestimonialsSection />
        <CTASection />
      </div>
      <Footer />
    </main>
  );
}
