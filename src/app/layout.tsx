import type { Metadata } from "next";
import { Archivo, Archivo_Black } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";

export const runtime = "edge";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const archivoblack = Archivo_Black({
  subsets: ["latin"],
  variable: "--font-archivo-black",
  display: "swap",
  weight: "400",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "500", "600"],
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
    <html
      lang="en"
      className={`${archivo.variable} ${archivoblack.variable} ${jetbrains.variable}`}
    >
      <body className="font-sans bg-ink-0 text-fg-0 antialiased">
        <Reveal />
        <SiteHeader />
        <main className="min-h-[calc(100vh-64px)]">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
