import type { Metadata } from "next";
import Link from "next/link";
import {
  Zap,
  Activity,
  FileText,
  ImageIcon,
  Users,
  ArrowUpRight,
  FolderOpen,
  Calendar,
  Building2,
  BookOpen,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Admin Dashboard | Athul Energy Consultants",
  description: "Operations and audit command overview for accredited engineers.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminDashboardPage() {
  const stats = [
    {
      label: "Active Plant Audits",
      value: "14",
      subtext: "BEE & EMC Statutory cycles",
      icon: Zap,
      color: "text-amber-700",
      bg: "bg-amber-50",
      border: "border-amber-200/80",
    },
    {
      label: "Pending Scoping Requests",
      value: "6",
      subtext: "24h SLA proposal dispatch",
      icon: FileText,
      color: "text-emerald-700",
      bg: "bg-emerald-50",
      border: "border-emerald-200/80",
    },
    {
      label: "Calibrated Instruments",
      value: "18",
      subtext: "Fluke, FLIR, Ultrasonic active",
      icon: Activity,
      color: "text-blue-700",
      bg: "bg-blue-50",
      border: "border-blue-200/80",
    },
    {
      label: "Engineering Team",
      value: "12",
      subtext: "Field specialists deployed",
      icon: Users,
      color: "text-purple-700",
      bg: "bg-purple-50",
      border: "border-purple-200/80",
    },
  ];

  const recentInquiries = [
    {
      id: "AEC-INQ-8492",
      company: "Sud-Chemie India Pvt. Ltd.",
      service: "Detailed Energy Audit (Electrical & Thermal)",
      location: "Ernakulam / Kochi",
      status: "Review Pending",
      time: "25 mins ago",
    },
    {
      id: "AEC-INQ-7821",
      company: "FCI OEN Connectors Ltd.",
      service: "Harmonics & Power Quality Study (IEEE 519)",
      location: "Thrissur North",
      status: "Proposal Sent",
      time: "2 hours ago",
    },
    {
      id: "AEC-INQ-6310",
      company: "Carborundum Universal Ltd.",
      service: "Infrared Thermography Inspection",
      location: "Palakkad Kanjikode",
      status: "Scheduled",
      time: "Yesterday",
    },
    {
      id: "AEC-INQ-5190",
      company: "St. Thomas College Autonomous",
      service: "Green Audit & NAAC Criteria 7",
      location: "Thrissur",
      status: "Completed",
      time: "2 days ago",
    },
  ];

  const quickModules = [
    {
      title: "Audit Inquiries & Leads",
      desc: "Review incoming plant scoping requests, check connected load, and dispatch quotation PDFs.",
      href: "/dashboard/inquiries",
      icon: FileText,
      badge: "6 New",
      color: "text-emerald-700 bg-emerald-50",
    },
    {
      title: "Our Client Marquee",
      desc: "Manage trusted manufacturing partners, industry categories, and homepage display order.",
      href: "/dashboard/clients",
      icon: Building2,
      badge: "12 Logos",
      color: "text-blue-700 bg-blue-50",
    },
    {
      title: "News & Technical Events",
      desc: "Publish upcoming BEE seminars, engineer training sessions, and energy conservation milestones.",
      href: "/dashboard/news-events",
      icon: Calendar,
      badge: "3 Events",
      color: "text-purple-700 bg-purple-50",
    },
    {
      title: "Downloads Library",
      desc: "Manage statutory Gazette notifications, ECBC building codes, and BEE audit manuals.",
      href: "/dashboard/downloads",
      icon: FolderOpen,
      badge: "11 PDFs",
      color: "text-amber-700 bg-amber-50",
    },
    {
      title: "Technical Blog & Insights",
      desc: "Draft and publish technical whitepapers on harmonics, FLIR thermography, and motor audits.",
      href: "/dashboard/blog",
      icon: BookOpen,
      badge: "6 Articles",
      color: "text-teal-700 bg-teal-50",
    },
    {
      title: "Photo Gallery Archive",
      desc: "Curate verified field inspection photographs, calibrated instrument photos, and plant audits.",
      href: "/dashboard/gallery",
      icon: ImageIcon,
      badge: "18 Photos",
      color: "text-rose-700 bg-rose-50",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs">
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-400" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="flex h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 rounded-full">
                Accredited Operations Command
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
              Welcome back, Er. Santhosh A.
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-500 max-w-2xl">
              Lead Auditor (BEE Reg: AEA-0275). Central administrative desk for coordinating
              statutory audit filings, site inspections, and client proposals.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/inquiries"
              className="inline-flex items-center gap-2 rounded-xl bg-[#053824] hover:bg-emerald-900 px-4 py-2.5 text-xs font-bold text-white shadow-xs transition-colors"
            >
              <span>Review Inquiries</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* 4 Metric Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  {s.label}
                </span>
                <div className={`p-2.5 rounded-xl border ${s.bg} ${s.color} ${s.border}`}>
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-3 text-3xl font-black text-slate-900 font-display">
                {s.value}
              </div>
              <div className="mt-1 text-xs text-slate-500">{s.subtext}</div>
            </div>
          );
        })}
      </div>

      {/* Action Modules Hub */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <FolderOpen className="h-4 w-4 text-emerald-700" />
            Administrative Modules
          </h2>
          <span className="text-xs text-slate-500">6 active services</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickModules.map((mod, idx) => {
            const Icon = mod.icon;
            return (
              <Link
                key={idx}
                href={mod.href}
                className="group rounded-2xl border border-slate-200 bg-white p-5 hover:border-emerald-600/40 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2.5 rounded-xl ${mod.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-[10.5px] font-bold text-slate-600 uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded-full">
                      {mod.badge}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {mod.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                    {mod.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
                  <span>Open Module</span>
                  <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Inquiries Quick Table */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-sm sm:text-base font-bold text-slate-900">
              Latest Scoping Enquiries
            </h2>
            <p className="text-xs text-slate-500">Direct requests dispatched from the public website</p>
          </div>
          <Link
            href="/dashboard/inquiries"
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
          >
            View all 6 inquiries →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-[10.5px] uppercase font-bold text-slate-500 tracking-wider">
              <tr>
                <th className="py-3 px-5">Ticket</th>
                <th className="py-3 px-5">Company / Client</th>
                <th className="py-3 px-5">Service Category</th>
                <th className="py-3 px-5">Location</th>
                <th className="py-3 px-5">Status</th>
                <th className="py-3 px-5 text-right">Received</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {recentInquiries.map((inq) => (
                <tr key={inq.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-5 font-mono font-bold text-emerald-700 whitespace-nowrap">
                    {inq.id}
                  </td>
                  <td className="py-3.5 px-5 font-bold text-slate-900">
                    {inq.company}
                  </td>
                  <td className="py-3.5 px-5 font-medium text-slate-700">
                    {inq.service}
                  </td>
                  <td className="py-3.5 px-5 text-slate-500 whitespace-nowrap">
                    {inq.location}
                  </td>
                  <td className="py-3.5 px-5 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                        inq.status === "Review Pending"
                          ? "bg-amber-50 text-amber-800 border-amber-200"
                          : inq.status === "Proposal Sent"
                          ? "bg-blue-50 text-blue-800 border-blue-200"
                          : inq.status === "Scheduled"
                          ? "bg-purple-50 text-purple-800 border-purple-200"
                          : "bg-emerald-50 text-emerald-800 border-emerald-200"
                      }`}
                    >
                      {inq.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-right text-slate-400 whitespace-nowrap">
                    {inq.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
