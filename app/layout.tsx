import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Umuzi Dreamscape",
  description:
    "A learner community app for sharing builds, collecting feedback, and turning progress into portfolio evidence.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
