import Loader from "@/components/loader";

export default function Loading() {
  return (
    <main className="bg-card flex h-svh items-center justify-center rounded-xl">
      <Loader />
    </main>
  );
}
