import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions - devlinks",
  description:
    "Terms & Conditions for devlinks - A Simple Link-Sharing App for Devs",
  openGraph: {
    title: "Terms & Conditions - devlinks",
    description:
      "Terms & Conditions for devlinks - A Simple Link-Sharing App for Devs",
    url: "https://devlinks-abc.vercel.app/terms",
    siteName: "devlinks",
    type: "website",
  },
};

export default function TermsAndConditions() {
  return (
    <main className="mx-auto w-[min(100%_-_2.5rem,_1350px)] px-4 py-8">
      <section className="prose prose-sm mx-auto sm:prose lg:prose-lg xl:prose-xl">
        <h1>Terms & Conditions</h1>
        <p>Last Updated: 2/16/2025</p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing or using devlinks (“we,” “us,” or “our”), you agree to be
          bound by these Terms &amp; Conditions. If you do not agree, please
          discontinue use of the platform.
        </p>

        <h2>2. User Responsibilities</h2>
        <p>
          You agree not to misuse our services or violate any applicable laws.
          You are solely responsible for all activities under your account and
          for the content of any links you share.
        </p>

        <h2>3. Content & Intellectual Property</h2>
        <p>
          All devlinks branding, trademarks, and logos are our property. You may
          not reuse them without explicit permission. Any third-party content
          you link to remains the property of its respective owners.
        </p>

        <h2>4. Limitation of Liability</h2>
        <p>
          devlinks is provided on an “as is” basis. We are not liable for any
          damages arising from your use or inability to use our services,
          including the accuracy or reliability of any linked content.
        </p>

        <h2>5. Modifications & Discontinuation</h2>
        <p>
          We reserve the right to modify, suspend, or discontinue any part of
          devlinks at any time without prior notice. We are not liable if all or
          any part of the service is unavailable.
        </p>

        <h2>6. Governing Law</h2>
        <p>
          These Terms are governed by the laws of the jurisdiction where
          devlinks is operated or registered, without regard to conflict of law
          principles.
        </p>

        <h2>7. Termination</h2>
        <p>
          We may terminate or suspend your account at our discretion if you
          violate these Terms or engage in conduct that could harm devlinks or
          other users.
        </p>

        <h2>8. Contact Us</h2>
        <p>
          For questions regarding these Terms, please email{" "}
          {/* <a href="mailto:support@devlinks.com">support@devlinks.com</a>. */}
        </p>
      </section>
    </main>
  );
}
