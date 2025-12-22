export default function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "devlinks has revolutionized how I share my work and connect with other developers.",
      author: "Jane Doe, Full Stack Developer",
    },
    {
      quote:
        "I love how easy it is to keep all my professional links organized with devlinks.",
      author: "John Smith, UX Designer",
    },
  ];

  return (
    <section className="py-20">
      <div className="mx-auto w-[min(100%-2.5rem,1350px)] px-4">
        <h2 className="mb-12 text-center text-3xl font-bold">
          What Developers Say
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="rounded-lg bg-muted p-6">
              <blockquote className="mb-4 text-lg">
                &#34;{testimonial.quote}&rdquo;
              </blockquote>
              <p className="font-semibold">- {testimonial.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
