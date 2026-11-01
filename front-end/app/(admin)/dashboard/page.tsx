import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  Zap,
  Activity,
  FileText,
  ImageIcon,
  Users,
  LogOut,
  Sparkles,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertTriangle,
  FolderOpen,
  Settings,
  Bell,
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
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
    },
    {
      label: "Pending Scoping Requests",
      value: "6",
      subtext: "24h SLA proposal dispatch",
      icon: FileText,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
    },
    {
      label: "Calibrated Instruments",
      value: "18",
      subtext: "Fluke, FLIR, Ultrasonic active",
      icon: Activity,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
    },
    {
      label: "Engineering Team",
      value: "12",
      subtext: "Field specialists deployed",
      icon: Users,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
      border: "border-purple-500/20",
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
      company: "FCI OEN Connectors",
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

  return (
    <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
      {/* Welcome Banner */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-[#053824] via-emerald-950 to-slate-900 p-6 sm:p-8 text-white shadow-lg">
          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-0.5 text-[11px] font-bold text-emerald-300 uppercase tracking-wider mb-2">
              <Sparkles className="h-3 w-3" />
              System Status: Normal
            </span>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight font-display">
              Operations &amp; Audit Command Overview
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
              Welcome back, Er. Santhosh. Here is the operational status of active
              statutory audit filings, site inspections, and client proposals.
            </p>
          </div>
        </div>

        {/* 4 Metric Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-xs shadow-sm hover:border-white/20 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {s.label}
                  </span>
                  <div className={`p-2 rounded-xl ${s.bg} ${s.color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                </div>
                <div className="mt-3 text-3xl font-black text-white font-display">
                  {s.value}
                </div>
                <div className="mt-1 text-xs text-slate-400">{s.subtext}</div>
              </div>
            );
          })}
        </div>

        {/* Action Modules Hub */}
        <div>
          <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
            <FolderOpen className="h-4 w-4 text-emerald-400" />
            Administrative Modules
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Gallery Module */}
            <Link
              href="/dashboard/gallery"
              className="group rounded-2xl border border-white/10 bg-slate-900/50 p-5 hover:border-emerald-500/50 hover:bg-slate-900 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400">
                    <ImageIcon className="h-5 w-5" />
                  </div>
                  <span className="text-[10.5px] font-bold text-purple-300 uppercase tracking-wider bg-purple-500/20 px-2 py-0.5 rounded-full">
                    Active
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                  Gallery &amp; Media Management
                </h3>
                <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                  Upload, organize, and categorize field audit photos, thermal images, and equipment certification media.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-emerald-400">
                <span>Manage Photos</span>
                <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </Link>

            {/* Audit Scoping Module */}
            <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
                    <FileText className="h-5 w-5" />
                  </div>
                  <span className="text-[10.5px] font-bold text-emerald-300 uppercase tracking-wider bg-emerald-500/20 px-2 py-0.5 rounded-full">
                    6 Inquiries
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white">
                  Audit Scoping &amp; Inquiries
                </h3>
                <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                  Review incoming plant inquiries from `/contact`, inspect attached Single Line Diagrams (SLDs), and dispatch quotations.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                <span>Auto-sync with WhatsApp desk</span>
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              </div>
            </div>

            {/* Technical Downloads Module */}
            <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400">
                    <FolderOpen className="h-5 w-5" />
                  </div>
                  <span className="text-[10.5px] font-bold text-blue-300 uppercase tracking-wider bg-blue-500/20 px-2 py-0.5 rounded-full">
                    Library
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white">
                  Downloads &amp; Regulations
                </h3>
                <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                  Manage downloadable KSERC regulations, BEE guidebook PDFs, and ECBC compliance gazettes.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                <span>11 Documents live</span>
                <CheckCircle2 className="h-3.5 w-3.5 text-blue-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Audit Inquiries Table */}
        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-sm overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            <div>
              <h2 className="text-base font-bold text-white">
                Recent Audit Scoping Submissions
              </h2>
              <p className="text-xs text-slate-400">
                Live inquiries routed through website scoping desk
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs text-slate-400 bg-white/5 border border-white/10 px-3 py-1 rounded-xl w-fit">
              <Clock className="h-3 w-3 text-emerald-400" />
              Updated Real-Time
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-white/10 text-[10.5px] uppercase font-bold text-slate-400 tracking-wider">
                <tr>
                  <th className="py-3 px-3">Ticket ID</th>
                  <th className="py-3 px-3">Plant / Client</th>
                  <th className="py-3 px-3">Service Discipline</th>
                  <th className="py-3 px-3">Location</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300">
                {recentInquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-emerald-400">
                      {inq.id}
                    </td>
                    <td className="py-3 px-3 font-bold text-white">
                      {inq.company}
                    </td>
                    <td className="py-3 px-3">{inq.service}</td>
                    <td className="py-3 px-3 text-slate-400">{inq.location}</td>
                    <td className="py-3 px-3">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          inq.status === "Review Pending"
                            ? "bg-amber-500/20 text-amber-300"
                            : inq.status === "Proposal Sent"
                            ? "bg-blue-500/20 text-blue-300"
                            : inq.status === "Scheduled"
                            ? "bg-purple-500/20 text-purple-300"
                            : "bg-emerald-500/20 text-emerald-300"
                        }`}
                      >
                        {inq.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-500">{inq.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
    </div>
  );
}
