import Loader from "@/components/loader";

export default function Loading() {
  return (
    <section className="bg-card flex h-full w-full items-center justify-center rounded-xl">
      <Loader />
    </section>
  );
}
