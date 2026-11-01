import type { Metadata } from "next";
import Link from "next/link";
import HomeDownloadsClient, {
  DocumentItem,
} from "@/components/user/HomeDownloadsClient";

export const metadata: Metadata = {
  title: "Downloads & Important Documents | Athul Energy Consultants",
  description:
    "Download Athul Energy company profile, project brochures, environmental and safety policies, and official BEE and EMC Kerala accreditation certificates.",
  alternates: {
    canonical: "/downloads",
  },
  openGraph: {
    title: "Downloads & Important Documents | Athul Energy Consultants",
    description:
      "Download Athul Energy company profile, project brochures, environmental and safety policies, and official BEE and EMC Kerala accreditation certificates.",
    url: "/downloads",
    siteName: "Athul Energy Consultants",
    locale: "en_IN",
    type: "website",
  },
};

const allDocuments: DocumentItem[] = [
  {
    id: "1",
    title: "Company Profile",
    category: "Company Profile",
    format: "PDF",
    size: "2.4 MB",
    downloadUrl: "#download",
  },
  {
    id: "2",
    title: "Environmental Policy",
    category: "Policies",
    format: "PDF",
    size: "1.1 MB",
    downloadUrl: "#download",
  },
  {
    id: "3",
    title: "Project Brochure",
    category: "Project Documents",
    format: "PDF",
    size: "1.8 MB",
    downloadUrl: "#download",
  },
  {
    id: "4",
    title: "Quality Policy",
    category: "Policies",
    format: "PDF",
    size: "900 KB",
    downloadUrl: "#download",
  },
  {
    id: "5",
    title: "Safety Guidelines",
    category: "Policies",
    format: "PDF",
    size: "1.2 MB",
    downloadUrl: "#download",
  },
  {
    id: "6",
    title: "Corporate Presentation",
    category: "Company Profile",
    format: "PDF",
    size: "3.5 MB",
    downloadUrl: "#download",
  },
  {
    id: "7",
    title: "BEE Energy Auditor Accreditation",
    category: "Certificates",
    format: "PDF",
    size: "1.5 MB",
    downloadUrl: "#download",
  },
  {
    id: "8",
    title: "EMC Kerala Empanelment Certificate",
    category: "Certificates",
    format: "PDF",
    size: "1.3 MB",
    downloadUrl: "#download",
  },
];

export default function DownloadsPage() {
  return (
    <div className="bg-slate-50 pt-[calc(var(--header-h)+1.5rem)] pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-xs text-slate-500">
            <li>
              <Link href="/" className="hover:text-emerald-700 transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="font-medium text-slate-900">Downloads</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-10 max-w-2xl">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-700">
            Resource Center
          </span>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Downloads &amp; Key Documentation
          </h1>
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600">
            Access and download our verified credentials, corporate presentations,
            quality management policies, and project brochures.
          </p>
        </div>

        {/* Documents Container */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 lg:p-10 shadow-sm">
          <HomeDownloadsClient documents={allDocuments} />
        </div>
      </div>
    </div>
  );
}
