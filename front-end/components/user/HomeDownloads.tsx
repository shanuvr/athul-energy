import Image from "next/image";
import desktopBg from "@/public/new-download-bg.webp";
import mobileBg from "@/public/downloads-mobile-bg-v2.webp";
import HomeDownloadsClient, {
  DocumentItem,
} from "./HomeDownloadsClient";

const documents: DocumentItem[] = [
  {
    id: "1",
    title: "BEE Guide Book 1: General Energy Management & Auditing",
    category: "Books",
    format: "PDF",
    size: "8.4 MB",
    downloadUrl: "/downloads#book-1",
  },
  {
    id: "2",
    title: "Kerala State Energy Conservation Building Code (ECBC Gazette)",
    category: "Government Orders",
    format: "PDF",
    size: "4.1 MB",
    downloadUrl: "/downloads#go-1",
  },
  {
    id: "3",
    title: "CEA Regulations on Power Quality & Grid Harmonics",
    category: "Standards",
    format: "PDF",
    size: "1.8 MB",
    downloadUrl: "/downloads#std-1",
  },
  {
    id: "4",
    title: "Electricity Act 2003 (Statutory Energy Auditing Provisions)",
    category: "Government Orders",
    format: "PDF",
    size: "3.2 MB",
    downloadUrl: "/downloads#go-2",
  },
  {
    id: "5",
    title: "BEE Guide Book 2: Thermal Utilities & Boiler Systems",
    category: "Books",
    format: "PDF",
    size: "9.2 MB",
    downloadUrl: "/downloads#book-2",
  },
  {
    id: "6",
    title: "CEA Safety and Electric Supply Regulations 2010",
    category: "Standards",
    format: "PDF",
    size: "3.4 MB",
    downloadUrl: "/downloads#std-2",
  },
];

export default function HomeDownloads() {
  return (
    <section
      id="downloads"
      aria-labelledby="downloads-heading"
      className="relative w-full overflow-hidden bg-[#002425] text-white"
    >
      {/* Mobile Unified Background Image (Smaller proportioned 3D folder at top, laser curves at bottom) */}
      <div className="absolute inset-0 block lg:hidden pointer-events-none select-none z-0">
        <Image
          src={mobileBg}
          alt="Athul Energy Documents Background"
          fill
          priority
          sizes="(max-width: 1023px) 100vw, 0px"
          className="object-cover object-top"
        />
      </div>

      {/* Desktop Background Image (One single cohesive background with compact 3D folder) */}
      <div className="absolute inset-0 hidden lg:block pointer-events-none select-none z-0">
        <Image
          src={desktopBg}
          alt="Athul Energy Documents Background"
          fill
          priority
          sizes="(min-width: 1024px) 100vw, 0px"
          className="object-cover object-left-center"
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-4 pb-10 sm:px-6 sm:pb-12 lg:px-8 lg:pt-6 lg:pb-8">
        {/* Mobile Top Spacer - perfectly calibrated so text sits cleanly below the compact folder & ring */}
        <div
          className="block lg:hidden h-[155px] sm:h-[185px]"
          aria-hidden="true"
        />

        {/* Section Heading */}
        <div className="text-center mb-5 sm:mb-6 lg:mb-5">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.25em] text-emerald-400">
            Downloads
          </span>
          <h2
            id="downloads-heading"
            className="mt-1 text-balance font-display text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-[2rem] lg:leading-tight"
          >
            Important Documents
          </h2>
          <p className="mx-auto mt-1 max-w-xl text-pretty text-xs leading-relaxed text-emerald-100/75 sm:text-sm">
            Access our key documents including company profile, project details,
            policies and certifications.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Desktop Left Spacer (lets the single cohesive background folder show through) */}
          <div
            className="hidden lg:block lg:col-span-5"
            aria-hidden="true"
          />

          {/* Right Column: Search, Category Tabs, Cards & Action */}
          <div className="min-w-0 lg:col-span-7">
            <HomeDownloadsClient documents={documents} />
          </div>
        </div>
      </div>
    </section>
  );
}
