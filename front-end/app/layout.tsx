import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Script from "next/script";
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
    default: "Athul Energy Consultants | BEE Accredited Energy & Safety Audits",
    template: "%s | Athul Energy Consultants",
  },
  description:
    "BEE, EMC Kerala, GEDA & MEDA accredited energy audit and electrical safety consultants based in Thrissur, Kerala, since 2008. Accredited Energy Auditor AEA-0275.",
  applicationName: "Athul Energy Consultants",
  authors: [{ name: "Athul Energy Consultants Pvt. Ltd.", url: "https://www.athulenergy.com" }],
  creator: "Athul Energy Consultants Pvt. Ltd.",
  publisher: "Athul Energy Consultants Pvt. Ltd.",
  keywords: [
    "energy audit kerala",
    "BEE accredited energy auditor",
    "accredited energy auditor AEA-0275",
    "electrical safety audit CEA 2010",
    "power quality audit IEEE 519",
    "harmonics study kerala",
    "thermal imaging survey FLIR",
    "green audit NAAC",
    "emc kerala empanelled energy auditor",
    "mandatory energy audit EC Act 2001",
    "PAT scheme M&V verification",
    "industrial energy consultants thrissur",
  ],
  alternates: {
    canonical: "./",
  },
  openGraph: {
    type: "website",
    siteName: "Athul Energy Consultants",
    title: "Athul Energy Consultants | BEE Accredited Energy & Safety Audits",
    description:
      "BEE Accredited Energy Auditor (AEA-0275), EMC Kerala, GEDA & MEDA empanelled consultants. Comprehensive industrial energy audits, electrical safety, harmonics, and NAAC green audits since 2008.",
    locale: "en_IN",
    url: "https://www.athulenergy.com",
    images: [
      {
        url: "/hero-desk.webp",
        width: 1672,
        height: 941,
        alt: "Athul Energy Consultants - BEE Accredited Energy & Electrical Safety Audits",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Athul Energy Consultants | BEE Accredited Energy & Safety Audits",
    description:
      "BEE Accredited Energy Auditor (AEA-0275), EMC Kerala, GEDA & MEDA empanelled engineering consultancy in Kerala.",
    images: ["/hero-desk.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const globalSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.athulenergy.com/#organization",
      name: "Athul Energy Consultants Pvt. Ltd.",
      legalName: "Athul Energy Consultants Private Limited",
      url: "https://www.athulenergy.com",
      logo: {
        "@type": "ImageObject",
        url: "https://www.athulenergy.com/athul-logo.webp",
      },
      foundingDate: "2008",
      foundingLocation: "Thrissur, Kerala, India",
      telephone: "+91-7356111990",
      email: "info@athulenergy.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Capital Legend Building, Korappath Lane, Thrissur North",
        addressLocality: "Thrissur",
        addressRegion: "Kerala",
        postalCode: "680020",
        addressCountry: "IN",
      },
      sameAs: [
        "https://www.facebook.com/athulenergy/",
        "https://www.linkedin.com/company/athul-energy-consultants/",
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://www.athulenergy.com/#service",
      name: "Athul Energy Consultants",
      parentOrganization: {
        "@id": "https://www.athulenergy.com/#organization",
      },
      image: "https://www.athulenergy.com/hero-desk.webp",
      telephone: "+91-7356111990",
      email: "info@athulenergy.com",
      url: "https://www.athulenergy.com",
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Capital Legend Building, Korappath Lane, Thrissur North",
        addressLocality: "Thrissur",
        addressRegion: "Kerala",
        postalCode: "680020",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 10.5276,
        longitude: 76.2144,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "18:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Saturday"],
          opens: "09:00",
          closes: "14:00",
        },
      ],
      areaServed: [
        { "@type": "State", name: "Kerala" },
        { "@type": "State", name: "Tamil Nadu" },
        { "@type": "State", name: "Karnataka" },
        { "@type": "State", name: "Gujarat" },
        { "@type": "State", name: "Maharashtra" },
        { "@type": "Country", name: "India" },
      ],
      knowsAbout: [
        "Bureau of Energy Efficiency (BEE) Accredited Energy Audits (AEA-0275)",
        "Energy Management Centre (EMC) Kerala Statutory Compliance",
        "Central Electricity Authority (CEA) Safety Regulations 2010",
        "IEEE 519 Power Quality and Harmonic Resonance Analysis",
        "FLIR Thermal Infrared Thermography",
        "Perform Achieve and Trade (PAT) Scheme M&V",
        "NAAC Criteria 7 Green, Environmental and Energy Audits",
      ],
    },
  ],
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
      <head>
        <Script
          id="global-schema-ld"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 font-sans">
        {children}
      </body>
    </html>
  );
}
