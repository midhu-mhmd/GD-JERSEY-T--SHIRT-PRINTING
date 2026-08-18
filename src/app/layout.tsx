import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/providers/LenisProvider";

const oswald = Oswald({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "GD Jersey — T-Shirt Printing | Custom Printing & Branding",
  description:
    "Graphica Designers — your one-stop custom printing & branding shop. T-shirt printing, jersey printing, mugs, caps, corporate gifts, banners, business cards & more. Fast turnaround, in-house design team.",
  keywords: [
    "t-shirt printing",
    "jersey printing",
    "custom printing",
    "mug printing",
    "cap printing",
    "corporate gifts",
    "business cards",
    "banners",
    "graphic design",
    "GD Jersey",
    "Graphica Designers",
  ],
  openGraph: {
    title: "GD Jersey — Custom Printing & Branding",
    description:
      "One-stop custom printing & branding shop. Fast turnaround, in-house design team, wide product range.",
    type: "website",
    locale: "en_US",
    siteName: "GD Jersey",
  },
  twitter: {
    card: "summary_large_image",
    title: "GD Jersey — Custom Printing & Branding",
    description:
      "One-stop custom printing & branding shop. Fast turnaround, in-house design team, wide product range.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${oswald.variable} ${inter.variable} antialiased`}
    >
      <body className="bg-gd-black text-gd-cream">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
