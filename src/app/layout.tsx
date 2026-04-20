import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import RootLayoutClient from "./RootLayoutClient";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Machina Tracker — Client Pulse",
  description: "Machina Tracker's pulse on client and club performance.",
  openGraph: {
    title: "Machina Tracker — Client Pulse",
    description: "Machina Tracker's pulse on client and club performance.",
    images: [
      {
        url: "/machina-logo-dark.svg",
        width: 800,
        height: 600,
        alt: "Machina Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
