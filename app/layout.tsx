import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import SiteChrome from "@/components/store/SiteChrome";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Aquacubes — Smart Indoor Aquaculture Systems",
  description: "Grow fresh food at home with self-cleaning, app-connected aquaculture systems. Fish and greens, zero garden required.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
