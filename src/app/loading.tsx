import Loader from "@/components/loader";

export default function Loading() {
  return (
    <main className="flex h-svh items-center justify-center rounded-xl bg-card">
      <Loader />
    </main>
  );
}
