import { ReactNode } from "react";

import Footer from "@/features/(home)/components/footer";
import LandingNavbar from "@/features/(home)/components/landing-navbar";
import { goToEmailVerified } from "@/lib/server/auth-checks";

export default async function LegalLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const { user } = await goToEmailVerified();
  return (
    <>
      <LandingNavbar user={user} />
      {children}
      <Footer />
    </>
  );
}
