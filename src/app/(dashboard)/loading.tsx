import Loader from "@/components/loader";

export default function Loading() {
  return (
    <section className="flex h-full w-full items-center justify-center rounded-xl bg-card">
      <Loader />
    </section>
  );
}
