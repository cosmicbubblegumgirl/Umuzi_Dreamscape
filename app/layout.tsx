import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  applicationName: "Umuzi Dreamscape",
  title: "Umuzi Dreamscape",
  description:
    "A learner community app for sharing builds, collecting feedback, and turning progress into portfolio evidence.",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/icons/desktop-192.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Umuzi Dreamscape",
  },
};

export const viewport: Viewport = {
  themeColor: "#062653",
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
