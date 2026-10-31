import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Athul Energy Consultants | Energy & Safety Auditing",
  description:
    "Leading energy conservation, electrical safety, green audit, and power quality consultancy firm based in Kerala and Gujarat.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased font-sans">
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}
