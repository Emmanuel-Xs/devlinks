import { ReactNode } from "react";

import Navbar from "@/features/(dashboard)/components/navbar";
import Sidebar from "@/features/(dashboard)/components/sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <main className="mx-auto my-4 grid min-h-svh w-[min(100%_-_2rem,_1392px)] grid-rows-[78px,_1fr] gap-4 rounded-xl">
      <Navbar />
      <section className="flex gap-4">
        <Sidebar />
        {children}
      </section>
    </main>
  );
}
