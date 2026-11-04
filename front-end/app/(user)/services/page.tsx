import type { Metadata } from "next";
import ServicesDirectory from "@/components/user/ServicesDirectory";
import Breadcrumbs from "@/components/user/Breadcrumbs";

export const metadata: Metadata = {
  title: "Comprehensive Energy & Engineering Services",
  description:
    "BEE Accredited Energy Audits (AEA-0275), CEA 2010 Electrical Safety Inspections, IEEE 519 Power Quality studies, and NAAC Green Audits across Kerala and India since 2008.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Comprehensive Energy & Engineering Services | Athul Energy Consultants",
    description:
      "BEE Accredited Energy Audits, CEA Electrical Safety, Power Quality, and Green Building Compliance services.",
    url: "https://www.athulenergy.com/services",
    type: "website",
    siteName: "Athul Energy Consultants",
    locale: "en_IN",
    images: [
      {
        url: "/hero-desk.webp",
        width: 1672,
        height: 941,
        alt: "Athul Energy Consultants - Engineering Services Directory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Comprehensive Energy & Engineering Services | Athul Energy Consultants",
    description:
      "BEE Accredited Energy Audits, Electrical Safety, Power Quality and Sustainability services.",
    images: ["/hero-desk.webp"],
  },
};

const servicesJsonLd = {
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
          name: "Services",
          item: "https://www.athulenergy.com/services",
        },
      ],
    },
    {
      "@type": "CollectionPage",
      "@id": "https://www.athulenergy.com/services#webpage",
      name: "Engineering & Energy Audit Services",
      description:
        "Complete catalog of statutory energy audits, electrical safety inspections, thermography surveys, and environmental compliance studies.",
      url: "https://www.athulenergy.com/services",
      provider: {
        "@type": "ProfessionalService",
        "@id": "https://www.athulenergy.com/#organization",
        name: "Athul Energy Consultants Pvt. Ltd.",
      },
    },
  ],
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#f4f7f5] pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
      />
      {/* Hero Header Banner (Matches User Desktop & Mobile Mockup References) */}
      <section className="relative overflow-hidden bg-[#042d1b] py-6 sm:py-10 lg:py-14 text-white shadow-xs">
        {/* Abstract Green Curved Wave Graphic (as seen in Mockup right side) */}
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-full sm:w-2/3 lg:w-1/2 opacity-25 lg:opacity-35 select-none"
          aria-hidden="true"
        >
          <svg
            className="h-full w-full object-cover"
            viewBox="0 0 600 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path
              d="M100 300C220 220 280 80 600 40V300H100Z"
              fill="url(#wave-grad-1)"
              opacity="0.5"
            />
            <path
              d="M0 300C180 200 320 120 600 110V300H0Z"
              fill="url(#wave-grad-2)"
              opacity="0.3"
            />
            <path
              d="M200 300C320 250 420 160 600 170"
              stroke="#4ade80"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              opacity="0.4"
            />
            <path
              d="M150 300C290 230 380 130 600 90"
              stroke="#22c55e"
              strokeWidth="2"
              opacity="0.5"
            />
            <path
              d="M80 300C240 210 350 90 600 30"
              stroke="#86efac"
              strokeWidth="1.5"
              opacity="0.3"
            />
            <defs>
              <linearGradient id="wave-grad-1" x1="100" y1="40" x2="600" y2="300" gradientUnits="userSpaceOnUse">
                <stop stopColor="#15803d" />
                <stop offset="1" stopColor="#042d1b" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="wave-grad-2" x1="0" y1="110" x2="600" y2="300" gradientUnits="userSpaceOnUse">
                <stop stopColor="#22c55e" />
                <stop offset="1" stopColor="#042d1b" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Hero Content */}
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[{ label: "Services" }]}
            className="px-0 pt-0 pb-3 text-slate-300 [&_a]:text-slate-300 [&_span]:text-white"
          />
          <div className="max-w-3xl">
            {/* Tagline Strip: OUR SERVICES — */}
            <div className="flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-[0.14em] text-[#4ade80] mb-2 sm:mb-2.5">
              <span>OUR SERVICES</span>
              <span className="w-6 sm:w-8 h-px bg-[#4ade80]/60 inline-block" aria-hidden="true" />
            </div>

            {/* Main Title: Comprehensive Energy & Engineering Services */}
            <h1 className="text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Comprehensive <span className="text-[#4ade80]">Energy &amp; Engineering</span> Services
            </h1>

            {/* Subtitle */}
            <p className="mt-2 sm:mt-3 text-[11.5px] sm:text-xs lg:text-sm leading-relaxed text-slate-200/90 max-w-2xl">
              BEE-accredited audits, statutory compliance, safety inspections and specialized engineering studies for industries, buildings and institutions.
            </p>
          </div>
        </div>
      </section>

      {/* Main Services Master-Detail Directory (Sidebar + Horizontal Cards) */}
      <ServicesDirectory />
    </div>
  );
}
