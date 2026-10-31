import type { Metadata } from "next";
import HomeHero from "@/components/user/HomeHero";

export const metadata: Metadata = {
  title: "Energy Audit Consultants in Kerala",
  description:
    "BEE, EMC Kerala, GEDA & MEDA accredited energy audit and electrical safety consultants based in Thrissur, Kerala, since 2008.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Energy Audit Consultants in Kerala",
    description:
      "BEE, EMC Kerala, GEDA & MEDA accredited energy audit and electrical safety consultants based in Thrissur, Kerala, since 2008.",
    url: "/",
    siteName: "Athul Energy Consultants",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/hero-desk.png",
        width: 1672,
        height: 941,
        alt: "Athul Energy engineer inspecting an industrial electrical panel with a thermal imaging camera",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Energy Audit Consultants in Kerala",
    description:
      "BEE, EMC Kerala, GEDA & MEDA accredited energy audit and electrical safety consultants based in Thrissur, Kerala, since 2008.",
    images: ["/hero-desk.png"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://www.athulenergy.com/#organization",
  name: "Athul Energy Consultants Pvt. Ltd.",
  url: "https://www.athulenergy.com",
  logo: "https://www.athulenergy.com/athul-logo.png",
  image: "https://www.athulenergy.com/hero-desk.png",
  description:
    "BEE, EMC Kerala, GEDA and MEDA accredited energy audit, electrical safety, power quality and green audit consultants based in Thrissur, Kerala, since 2008.",
  foundingDate: "2008",
  telephone: "+91-7356111990",
  email: "info@athulenergy.com",
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "Capital Legend Building, Korappath Lane, Thrissur North",
    addressLocality: "Thrissur",
    addressRegion: "Kerala",
    postalCode: "680020",
    addressCountry: "IN",
  },
  areaServed: ["Kerala"],
  sameAs: ["https://www.facebook.com/athulenergy/"],
  knowsAbout: [
    "Energy audit",
    "Electrical safety audit",
    "Power quality audit",
    "Harmonics audit",
    "Green audit",
    "NAAC green audit",
    "Thermal imaging survey",
    "Energy conservation",
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HomeHero />
    </>
  );
}
