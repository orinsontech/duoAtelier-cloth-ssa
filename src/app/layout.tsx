import type { Metadata } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Willy-Nilly — Customised Couple Tshirts, Order on WhatsApp",
    template: "%s — Willy-Nilly",
  },
  description:
    "Design and order your bespoke matching couple tshirts. Honeymoon, Trip, Pre-Wedding & Love collections in 180–280 GSM premium cotton. Order on WhatsApp.",
  authors: [{ name: "Willy-Nilly" }],
  openGraph: {
    title: "Willy-Nilly — Customised Couple Tshirts",
    description: "Bespoke matching couple tshirts, ordered directly on WhatsApp.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${instrumentSerif.variable} ${inter.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
