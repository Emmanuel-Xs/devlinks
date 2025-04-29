import { redirect } from "next/navigation";
import { ReactNode } from "react";

import { getUserDefaultUsername } from "@/drizzle/query/usernames";
import Footer from "@/features/(home)/components/footer";
import LandingNavbar from "@/features/(home)/components/landing-navbar";
import { getCurrentSession } from "@/lib/server/sessions";

export default async function LegalLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
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
    <>
      <LandingNavbar user={user} username={username} />
      {children}
      <Footer />
    </>
  );
}
