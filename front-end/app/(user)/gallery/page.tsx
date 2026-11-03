import type { Metadata } from "next";
import GalleryClient from "@/components/user/GalleryClient";

export const metadata: Metadata = {
  title: "Field Archive & Photo Gallery | Athul Energy Consultants",
  description:
    "Field photographs from Athul Energy Consultants — verified energy audits, infrared thermal imaging surveys, electrical safety audits, and technical workshops across Kerala.",
  keywords: [
    "Athul Energy gallery",
    "Energy audit field photos",
    "Thermal imaging survey Kerala",
    "Electrical safety inspection",
    "BEE energy auditor training photos",
  ],
  alternates: {
    canonical: "/gallery",
  },
  openGraph: {
    title: "Field Archive & Photo Gallery | Athul Energy Consultants",
    description:
      "Field photographs from verified energy audits, infrared thermography surveys, and safety inspections across Kerala.",
    url: "https://www.athulenergy.com/gallery",
    type: "website",
    siteName: "Athul Energy Consultants",
    locale: "en_IN",
    images: [
      {
        url: "/hero-desk.webp",
        width: 1672,
        height: 941,
        alt: "Athul Energy Consultants - Field Inspection Gallery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Field Archive & Photo Gallery | Athul Energy Consultants",
    description:
      "Field photographs from verified energy audits and electrical safety inspections across Kerala.",
    images: ["/hero-desk.webp"],
  },
};

const galleryJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.athulenergy.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Gallery",
          item: "https://www.athulenergy.com/gallery",
        },
      ],
    },
    {
      "@type": "ImageGallery",
      "@id": "https://www.athulenergy.com/gallery#webpage",
      name: "Athul Energy Technical Field Archive",
      description:
        "Verified photographic archive of industrial site visits, thermal imaging, power quality analysis, and statutory audits.",
      url: "https://www.athulenergy.com/gallery",
    },
  ],
};

export default function GalleryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(galleryJsonLd) }}
      />
      <GalleryClient />
    </>
  );
}
