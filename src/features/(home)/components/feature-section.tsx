export default function FeaturesSection() {
  const features = [
    {
      title: "Centralized Links",
      description:
        "Keep all your important developer links in one place for easy access and sharing.",
      icon: "🔗",
    },
    {
      title: "Simple Profile Customization",
      description:
        "Quickly update your avatar URL and user details—no extra fluff.",
      icon: "🎨",
    },
    {
      title: "Drag-and-Drop Organization",
      description:
        "Reorder your links in seconds for a personalized list that fits your workflow.",
      icon: "🖱️",
    },
    {
      title: "Instant Share Link",
      description:
        "Share your profile with a single click, making it easier for others to discover your curated dev links.",
      icon: "⚡",
    },
    {
      title: "Responsive & Mobile-Friendly",
      description:
        "Access and manage your links from any device—phone, tablet, or desktop—with ease.",
      icon: "📱",
    },
    {
      title: "Secure Link Management",
      description:
        "All data is handled with security in mind, ensuring peace of mind and data integrity.",
      icon: "🔒",
    },
  ];

  return (
    <section id="features" className="bg-muted py-20">
      <div className="mx-auto w-[min(100%-2.5rem,1350px)] px-4">
        <h2 className="mb-12 text-center text-3xl font-bold">Features</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="bg-background rounded-lg p-6 shadow-md">
              <div className="mb-4 text-3xl">{feature.icon}</div>
              <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
