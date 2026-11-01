"use client";

import { useState } from "react";
import {
  Inbox,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Building,
  Phone,
  Mail,
  FileText,
  MapPin,
  ExternalLink,
  MessageSquare,
} from "lucide-react";

interface InquiryItem {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  location: string;
  load: string;
  message: string;
  status: "Review Pending" | "Proposal Sent" | "Scheduled" | "Completed";
  date: string;
}

const INQUIRIES: InquiryItem[] = [
  {
    id: "AEC-INQ-8492",
    name: "S. Santhosh Bhatt",
    company: "Sud-Chemie India Pvt. Ltd.",
    email: "santhosh.bhatt@sud-chemie.com",
    phone: "+91 94471 22334",
    service: "Detailed Energy Audit (Electrical & Thermal)",
    location: "Ernakulam Industrial Belt",
    load: "1250 kVA · 11 kV HT",
    message: "Require comprehensive electrical distribution loss evaluation and steam boiler efficiency optimization for annual BEE statutory compliance report.",
    status: "Review Pending",
    date: "25 mins ago",
  },
  {
    id: "AEC-INQ-7821",
    name: "Salil Kumar G.",
    company: "FCI OEN Connectors Ltd.",
    email: "salil.kumar@fciconnect.com",
    phone: "+91 98460 55432",
    service: "Harmonics & Power Quality Study (IEEE 519)",
    location: "Thrissur North",
    load: "800 kVA",
    message: "Experiencing capacitor bank heating and voltage distortion on busbar B. Need on-site Class-A power quality analyzer logging and active harmonic filter sizing.",
    status: "Proposal Sent",
    date: "2 hours ago",
  },
  {
    id: "AEC-INQ-6310",
    name: "Ramesh Chandran",
    company: "Carborundum Universal Ltd.",
    email: "r.chandran@cumi.murugappa.com",
    phone: "+91 97450 11987",
    service: "Infrared Thermography Inspection",
    location: "Palakkad (Kanjikode Industrial Area)",
    load: "2000 kVA",
    message: "Annual predictive maintenance infrared scan required for HT switchyard, 4 dry-type transformers, and main distribution panel boards.",
    status: "Scheduled",
    date: "Yesterday",
  },
  {
    id: "AEC-INQ-5190",
    name: "Dr. Fr. Martin K. A.",
    company: "St. Thomas College Autonomous",
    email: "principal@stthomas.ac.in",
    phone: "+91 94460 33211",
    service: "Green Audit & NAAC Criteria 7",
    location: "Thrissur",
    load: "160 kVA",
    message: "Statutory green campus audit, energy conservation baseline, carbon footprint assessment, and water balancing report for upcoming NAAC peer team accreditation visit.",
    status: "Completed",
    date: "2 days ago",
  },
  {
    id: "AEC-INQ-4420",
    name: "K. V. Mohanan",
    company: "Apollo Tyres Perambra Plant",
    email: "kv.mohanan@apollotyres.com",
    phone: "+91 98950 44123",
    service: "Boiler & Steam System Efficiency Study",
    location: "Chalakudy, Thrissur",
    load: "3.5 MW Steam Utility",
    message: "Steam trap leakage survey, boiler blowdown heat recovery assessment, and flue gas oxygen trim review across vulcanizing presses.",
    status: "Review Pending",
    date: "3 days ago",
  },
  {
    id: "AEC-INQ-3891",
    name: "Priya Varma",
    company: "Aster Medcity Kochi",
    email: "priya.varma@asterhospital.com",
    phone: "+91 97440 66889",
    service: "Hospital Electrical Safety Audit (CEA & NABH)",
    location: "Kochi, Kerala",
    load: "1500 kVA + 2x DG Backup",
    message: "Full compliance audit for ICU isolated power systems, earthing grid resistance measurements, and arc flash safety verification for NABH re-certification.",
    status: "Proposal Sent",
    date: "4 days ago",
  },
];

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<InquiryItem[]>(INQUIRIES);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryItem | null>(null);

  const filtered = inquiries.filter((inq) => {
    const matchesSearch =
      inq.company.toLowerCase().includes(search.toLowerCase()) ||
      inq.name.toLowerCase().includes(search.toLowerCase()) ||
      inq.id.toLowerCase().includes(search.toLowerCase()) ||
      inq.service.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || inq.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Audit Scoping Desk
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-display">
            Plant Audit Inquiries &amp; Leads
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-400">
            Review incoming requests from plant managers, inspect contract demand, and prepare statutory audit proposals.
          </p>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 rounded-2xl border border-white/10 bg-slate-900/60 p-3 shadow-xs">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by ticket ID, company name, client or service..."
            className="w-full rounded-xl border border-white/10 bg-slate-950/70 pl-10 pr-4 py-2 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto">
          {["All", "Review Pending", "Proposal Sent", "Scheduled", "Completed"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                statusFilter === st
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                  : "bg-white/5 text-slate-400 hover:text-white"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="rounded-3xl border border-white/10 bg-slate-900/60 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-white/10 text-[10.5px] uppercase font-bold text-slate-400 tracking-wider bg-slate-950/50">
              <tr>
                <th className="py-3.5 px-4">Ticket</th>
                <th className="py-3.5 px-4">Plant / Client</th>
                <th className="py-3.5 px-4">Requested Service</th>
                <th className="py-3.5 px-4">Location</th>
                <th className="py-3.5 px-4">Demand</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              {filtered.map((inq) => (
                <tr key={inq.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-emerald-400 whitespace-nowrap">
                    {inq.id}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="block font-bold text-white">{inq.company}</span>
                    <span className="block text-[11px] text-slate-400">{inq.name}</span>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-200 max-w-xs">
                    {inq.service}
                  </td>
                  <td className="py-3.5 px-4 text-slate-400 whitespace-nowrap">
                    {inq.location}
                  </td>
                  <td className="py-3.5 px-4 text-slate-400 whitespace-nowrap font-mono">
                    {inq.load}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
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
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => setSelectedInquiry(inq)}
                      className="rounded-xl border border-white/10 bg-white/5 hover:bg-emerald-500/20 hover:text-emerald-300 px-3 py-1.5 text-xs font-semibold text-slate-300 transition-colors cursor-pointer"
                    >
                      View Scope
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="relative w-full max-w-xl rounded-3xl border border-white/10 bg-slate-900 p-6 sm:p-7 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-emerald-400">
                  {selectedInquiry.id}
                </span>
                <h2 className="text-lg font-bold text-white mt-0.5">
                  {selectedInquiry.company}
                </h2>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300">
                {selectedInquiry.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-xl bg-slate-950 p-3 border border-white/5 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-500">
                  Client Contact
                </span>
                <p className="font-bold text-white">{selectedInquiry.name}</p>
                <p className="text-slate-400">{selectedInquiry.phone}</p>
                <p className="text-slate-400 break-all">{selectedInquiry.email}</p>
              </div>

              <div className="rounded-xl bg-slate-950 p-3 border border-white/5 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-500">
                  Plant Specifics
                </span>
                <p className="font-bold text-white">{selectedInquiry.location}</p>
                <p className="text-slate-400">Demand: {selectedInquiry.load}</p>
                <p className="text-emerald-400 font-semibold">{selectedInquiry.service}</p>
              </div>
            </div>

            <div className="rounded-xl bg-slate-950 p-4 border border-white/5">
              <span className="text-[10.5px] uppercase font-bold text-slate-500 block mb-1">
                Scoping Requirement / Issue Description
              </span>
              <p className="text-xs leading-relaxed text-slate-300">
                {selectedInquiry.message}
              </p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <a
                href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#25D366] px-4 py-2 text-xs font-bold text-white hover:bg-[#20ba5a] transition-colors"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Open WhatsApp Chat</span>
              </a>

              <button
                type="button"
                onClick={() => setSelectedInquiry(null)}
                className="rounded-xl bg-white/10 hover:bg-white/20 px-4 py-2 text-xs font-semibold text-white transition-colors cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
