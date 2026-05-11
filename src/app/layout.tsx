import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";

export const runtime = "edge";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Elevated Customs — Premium LED Rock Lights",
    template: "%s · Elevated Customs",
  },
  description:
    "Premium IP68 waterproof LED rock lights for trucks at honest prices. Same quality as the big sellers, half the cost.",
  openGraph: {
    title: "Elevated Customs — Premium LED Rock Lights",
    description:
      "Same premium IP68 LED rock lights as the big sellers, at honest prices. Built for trucks.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans bg-paper text-ink antialiased">
        <Reveal />
        <SiteHeader />
        <main className="min-h-[calc(100vh-64px)]">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
