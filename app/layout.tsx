import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SiteChrome from "@/components/store/SiteChrome";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Aquacubes — Die autonome Micro-Farm für gewerbliche Fischzucht",
  description:
    "Industrielle Kreislaufanlagen-Leistung (RAS) auf kompakter Grundfläche. Bis zu ~600 kg frischer Speisefisch pro Cube und Jahr – B2B-Leasing ab €499 / Monat.",
  icons: {
    icon: "/logos/favicon.png",
    apple: "/logos/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Icon font used throughout the b2b design */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=block"
        />
      </head>
      <body className="min-h-full flex flex-col bg-surface font-sans text-on-surface" suppressHydrationWarning>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
