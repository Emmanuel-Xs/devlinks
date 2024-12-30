import type { Metadata } from "next";
import { ReactNode } from "react";

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
      <body className={`${insSans.variable} antialiased`}>{children}</body>
    </html>
  );
}
