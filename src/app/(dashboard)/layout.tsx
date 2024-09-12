import Navbar from "@/components/Navigation/Navbar";
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="grid min-h-svh grid-rows-[78px,_1fr] gap-4 pt-4">
      <Navbar />
      <section className="m-4 mx-auto mt-0 flex w-[min(100%_-_2rem,_1392px)] gap-4">
        <Sidebar />
        {children}
      </section>
    </main>
  );
}
