import type { Metadata } from "next";
import HomeHero from "@/components/user/HomeHero";
import HomeServices from "@/components/user/HomeServices";
import HomeCredentials from "@/components/user/HomeCredentials";
import HomeTestimonials from "@/components/user/HomeTestimonials";
import HomeDownloads from "@/components/user/HomeDownloads";
import HomeCertifications from "@/components/user/HomeCertifications";
import HomeClients from "@/components/user/HomeClients";
import HomeRecentBlogs from "@/components/user/HomeRecentBlogs";
import HomeCTA from "@/components/user/HomeCTA";

export const metadata: Metadata = {
  title: "BEE-Accredited Energy Audit Consultants in Kerala",
  description:
    "BEE, EMC Kerala, GEDA & MEDA accredited energy audit and electrical safety consultants based in Thrissur, Kerala, since 2008.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "BEE-Accredited Energy Audit Consultants in Kerala",
    description:
      "BEE, EMC Kerala, GEDA & MEDA accredited energy audit and electrical safety consultants based in Thrissur, Kerala, since 2008.",
    url: "/",
    siteName: "Athul Energy Consultants",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/hero-desk.webp",
        width: 1672,
        height: 941,
        alt: "Athul Energy engineer inspecting an industrial electrical panel with a thermal imaging camera",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BEE-Accredited Energy Audit Consultants in Kerala",
    description:
      "BEE, EMC Kerala, GEDA & MEDA accredited energy audit and electrical safety consultants based in Thrissur, Kerala, since 2008.",
    images: ["/hero-desk.webp"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://www.athulenergy.com/#organization",
  name: "Athul Energy Consultants Pvt. Ltd.",
  url: "https://www.athulenergy.com",
  logo: "https://www.athulenergy.com/athul-logo.webp",
  image: "https://www.athulenergy.com/hero-desk.webp",
  description:
    "BEE, EMC Kerala, GEDA and MEDA accredited energy audit, electrical safety, power quality and green audit consultants based in Thrissur, Kerala, since 2008.",
  foundingDate: "2008",
  telephone: "+91-7356111990",
  email: "info@athulenergy.com",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-7356111990",
    email: "info@athulenergy.com",
    contactType: "customer service",
    areaServed: "Kerala",
  },
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
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Energy audit and electrical safety services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Energy audit and BEE compliance",
          areaServed: "Kerala",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Electrical safety audit",
          areaServed: "Kerala",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Power quality and harmonics study",
          areaServed: "Kerala",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Green and NAAC audit",
          areaServed: "Kerala",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Thermal imaging survey",
          areaServed: "Kerala",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Environment and carbon audit",
          areaServed: "Kerala",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Measurement and verification",
          areaServed: "Kerala",
        },
      },
    ],
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HomeHero />
      <HomeServices />
      <HomeCredentials />
      <HomeTestimonials />
      <HomeDownloads />
      <HomeCertifications />
      <HomeClients />
      <HomeRecentBlogs />
      <HomeCTA />
    </>
  );
}
