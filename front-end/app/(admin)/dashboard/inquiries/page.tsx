"use client";

import { useState } from "react";
import {
  Search,
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  Zap,
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
    name: "Ananthan Nambiar",
    company: "Synthite Industries Pvt. Ltd.",
    email: "a.nambiar@synthite.com",
    phone: "+91 94470 88210",
    service: "Electrical Safety & CEA Arc Flash Audit",
    location: "Kolenchery, Ernakulam",
    load: "1500 kVA",
    message: "Mandatory statutory safety audit under Central Electricity Authority (Measures Relating to Safety and Electric Supply) Regulations for extraction units.",
    status: "Proposal Sent",
    date: "4 days ago",
  },
];

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<InquiryItem[]>(INQUIRIES);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
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

  const updateStatus = (id: string, newStatus: InquiryItem["status"]) => {
    setInquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="flex h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 rounded-full">
              Audit Scoping Desk
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
            Plant Audit Inquiries &amp; Leads
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Review incoming requests from plant managers, inspect contract demand, and dispatch statutory audit proposals.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="rounded-xl bg-white border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700 shadow-2xs">
            Total Leads: <strong className="text-emerald-700">{inquiries.length}</strong>
          </span>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-xs">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by ticket ID, company name, client or service..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-10 pr-4 py-2 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/10 transition-all"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide py-1">
          {["All", "Review Pending", "Proposal Sent", "Scheduled", "Completed"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                statusFilter === st
                  ? "bg-[#053824] text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Inquiries Table Card */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 bg-slate-50/80 text-[10.5px] uppercase font-bold text-slate-500 tracking-wider">
              <tr>
                <th className="py-3 px-4">Ticket</th>
                <th className="py-3 px-4">Plant / Client</th>
                <th className="py-3 px-4">Requested Service</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Demand</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No inquiries found matching your filters.
                  </td>
                </tr>
              ) : (
                filtered.map((inq) => (
                  <tr key={inq.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-emerald-700 whitespace-nowrap">
                      {inq.id}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="block font-bold text-slate-900">{inq.company}</span>
                      <span className="block text-[11px] text-slate-500">{inq.name}</span>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-800 max-w-xs">
                      {inq.service}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                      {inq.location}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap font-mono text-[11.5px]">
                      {inq.load}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2.5 py-0.5 rounded-full text-[10.5px] font-bold border ${
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
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => setSelectedInquiry(inq)}
                        className="rounded-lg bg-slate-100 hover:bg-[#053824] hover:text-white px-2.5 py-1 text-[11px] font-bold text-slate-700 transition-colors cursor-pointer"
                      >
                        Review Scope
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inquiry Detail Review Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="relative w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xl text-slate-900 animate-in zoom-in-95">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    {selectedInquiry.id}
                  </span>
                  <span className="text-xs text-slate-400">· {selectedInquiry.date}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 font-display">
                  {selectedInquiry.company}
                </h3>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-4">
              <div className="rounded-xl bg-slate-50 p-3 border border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                  Contact Person
                </span>
                <p className="font-bold text-slate-800">{selectedInquiry.name}</p>
                <div className="mt-1 flex items-center gap-1.5 text-slate-600">
                  <Mail className="h-3.5 w-3.5 text-slate-400" />
                  <span>{selectedInquiry.email}</span>
                </div>
                <div className="mt-1 flex items-center gap-1.5 text-slate-600">
                  <Phone className="h-3.5 w-3.5 text-slate-400" />
                  <span>{selectedInquiry.phone}</span>
                </div>
              </div>

              <div className="rounded-xl bg-slate-50 p-3 border border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                  Site &amp; Demand Specs
                </span>
                <div className="flex items-center gap-1.5 text-slate-800 font-bold mb-1">
                  <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  <span>{selectedInquiry.location}</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-800 font-mono font-bold">
                  <Zap className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>{selectedInquiry.load}</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-slate-50 p-4 border border-slate-100 mb-5">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                Requested Scope &amp; Site Notes
              </span>
              <p className="text-xs text-slate-700 leading-relaxed">
                {selectedInquiry.message}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-500">Change Status:</span>
                <select
                  value={selectedInquiry.status}
                  onChange={(e) =>
                    updateStatus(selectedInquiry.id, e.target.value as InquiryItem["status"])
                  }
                  className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
                >
                  <option value="Review Pending">Review Pending</option>
                  <option value="Proposal Sent">Proposal Sent</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <a
                  href={`mailto:${selectedInquiry.email}?subject=Athul Energy Proposal - ${selectedInquiry.id}`}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#053824] hover:bg-emerald-900 px-4 py-2 text-xs font-bold text-white shadow-xs transition-colors"
                >
                  <MessageSquare className="h-3.5 w-3.5" />
                  <span>Send Proposal</span>
                </a>
                <button
                  type="button"
                  onClick={() => setSelectedInquiry(null)}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
