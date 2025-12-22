import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - devlinks",
  description:
    "Privacy Policy for devlinks - A Simple Link-Sharing App for Devs",
  openGraph: {
    title: "Privacy Policy - devlinks",
    description:
      "Privacy Policy for devlinks - A Simple Link-Sharing App for Devs",
    url: "https://devlinks-abc.vercel.app/privacy",
    siteName: "devlinks",
    type: "website",
  },
};

export default function PrivacyPolicy() {
  return (
    <main className="mx-auto w-[min(100%-2.5rem,1350px)] px-4 py-8">
      <section className="prose prose-sm mx-auto sm:prose lg:prose-lg xl:prose-xl">
        <h1>Privacy Policy</h1>
        <p>Last Updated: 2/16/2025</p>

        <h2>1. Introduction</h2>
        <p>
          Welcome to devlinks, a simple link-sharing platform for developers.
          Your privacy is important to us. This policy outlines what information
          we collect, how we use it, and your rights regarding your data.
        </p>

        <h2>2. Information We Collect</h2>
        <ul>
          <li>
            <strong>Account Information:</strong> We collect your email address
            and any user details (e.g., avatar URL) you choose to provide when
            creating or updating your profile.
          </li>
          <li>
            <strong>Links You Share:</strong> We store the links you add to your
            profile to make them available for sharing.
          </li>
          <li>
            <strong>Basic Logs:</strong> Our servers may automatically record
            minimal data (e.g., IP address) for security, error tracking, or
            debugging. We do <em>not</em> use advanced analytics.
          </li>
        </ul>

        <h2>3. How We Use Your Information</h2>
        <p>
          We use your information to provide and maintain the link-sharing
          functionality, personalize your experience (e.g., displaying your
          avatar), and handle support requests. We do not sell or share your
          personal data for marketing.
        </p>

        <h2>4. Cookies</h2>
        <p>
          We may use essential cookies or similar technologies to keep you
          logged in and remember your preferences. We do not use cookies for
          advanced analytics or advertising.
        </p>

        <h2>5. Data Security</h2>
        <p>
          We implement standard security measures to protect your data.
          Nevertheless, no online platform can be guaranteed 100% secure. We
          encourage you to use a strong password and keep it confidential.
        </p>

        <h2>6. Third-Party Services</h2>
        <p>
          We may rely on reputable third-party providers (e.g., hosting,
          database) to operate devlinks. These third parties only process data
          on our behalf and under confidentiality obligations.
        </p>

        <h2>7. Your Rights</h2>
        <p>
          You have the right to access, update, or delete your data (such as
          your email or avatar) at any time via your account settings. For any
          data-related requests, please email{" "}
          {/* <a href="mailto:support@devlinks.com">support@devlinks.com</a>. */}
        </p>

        <h2>8. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. If we make
          material changes, we will notify you via email or by posting a notice
          on our site. Your continued use of devlinks means you accept these
          updates.
        </p>

        <h2>9. Contact Us</h2>
        <p>
          For questions or concerns about this Privacy Policy, reach out at{" "}
          {/* <a href="mailto:support@devlinks.com">support@devlinks.com</a>. */}
        </p>
      </section>
    </main>
  );
}
