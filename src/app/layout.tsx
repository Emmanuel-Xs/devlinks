import type { Metadata } from "next";
import { ReactNode } from "react";

import { Toaster } from "sonner";

import { insSans } from "@/lib/font";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | devlinks",
    default: "devlinks",
  },
  description: "All social links about you in one app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
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
