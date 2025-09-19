import { Toaster } from "sonner";
import { ReactNode } from "react";
import type { Metadata } from "next";

import "./globals.css";
import { insSans } from "@/lib/font";

export const metadata: Metadata = {
  title: {
    template: "%s | devlinks",
    default: "devlinks",
  },
  description:
    "Effortlessly organize and share your developer portfolio, and social links in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning suppressContentEditableWarning>
      <body className={`${insSans.variable} antialiased`}>
        {children}
        <Toaster
          toastOptions={{
            style: {
              borderRadius: "8px",
              padding: "16px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              fontSize: "1rem",
            },
            classNames: {
              success: "bg-green-500 text-white",
              error: "bg-red-500 text-white",
            },
          }}
        />
      </body>
    </html>
  );
}
