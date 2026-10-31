import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.athulenergy.com"),
  title: {
    default: "Athul Energy Consultants | Energy & Safety Audits",
    template: "%s | Athul Energy",
  },
  description:
    "BEE, EMC Kerala, GEDA & MEDA accredited energy audit and electrical safety consultants based in Thrissur, Kerala, since 2008.",
  applicationName: "Athul Energy Consultants",
  authors: [{ name: "Athul Energy Consultants Pvt. Ltd." }],
  keywords: [
    "energy audit",
    "energy auditor",
    "energy audit consultants",
    "energy audit services",
    "electrical safety audit",
    "power quality audit",
    "green audit",
    "naac green audit",
    "energy audit kerala",
  ],
  openGraph: {
    type: "website",
    siteName: "Athul Energy Consultants",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
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
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 font-sans">
        {children}
      </body>
    </html>
  );
}
