"use client";

import { useState } from "react";
import {
  FileDown,
  Plus,
  Trash2,
  Upload,
  Search,
  ExternalLink,
  FileText,
  CheckCircle2,
} from "lucide-react";

interface DownloadItem {
  id: string;
  title: string;
  category: "Government Orders" | "Standards" | "Books" | "Regulations";
  format: string;
  size: string;
  date: string;
}

const INITIAL_DOWNLOADS: DownloadItem[] = [
  { id: "d-1", title: "KSERC (Renewable Energy & Net Metering) Regulations 2020", category: "Regulations", format: "PDF", size: "2.4 MB", date: "19/02/2020" },
  { id: "d-2", title: "Kerala State Energy Conservation Building Code (ECBC Gazette)", category: "Government Orders", format: "PDF", size: "4.1 MB", date: "19/02/2020" },
  { id: "d-3", title: "CEA Regulations on Power Quality & Grid Harmonics", category: "Standards", format: "PDF", size: "1.8 MB", date: "19/02/2020" },
  { id: "d-4", title: "Electricity Act 2003 (Statutory Energy Auditing Provisions)", category: "Government Orders", format: "PDF", size: "3.2 MB", date: "19/02/2020" },
  { id: "d-5", title: "Kerala Municipality Building Rules (KMBR 2019 Energy Chapter)", category: "Government Orders", format: "PDF", size: "5.6 MB", date: "26/03/2020" },
  { id: "d-6", title: "Energy Conservation Act (Amended 2010)", category: "Government Orders", format: "PDF", size: "2.9 MB", date: "26/03/2020" },
  { id: "d-7", title: "Solid Waste Management Guidelines (Suchitwa Mission)", category: "Standards", format: "PDF", size: "3.8 MB", date: "26/03/2020" },
  { id: "d-8", title: "NAAC Criteria 7: Environmental & Green Audit Manual", category: "Standards", format: "PDF", size: "2.1 MB", date: "24/06/2020" },
  { id: "d-9", title: "BEE Guide Book 1: General Energy Management & Auditing", category: "Books", format: "PDF", size: "8.4 MB", date: "24/04/2023" },
  { id: "d-10", title: "BEE Guide Book 2: Thermal Utilities & Boiler Systems", category: "Books", format: "PDF", size: "9.2 MB", date: "24/04/2023" },
  { id: "d-11", title: "Environment Audit Rules 2025 (Statutory Guidelines)", category: "Regulations", format: "PDF", size: "3.5 MB", date: "07/09/2025" },
];

export default function AdminDownloadsPage() {
  const [docs, setDocs] = useState<DownloadItem[]>(INITIAL_DOWNLOADS);
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState<string>("All");
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCat, setNewCat] = useState<DownloadItem["category"]>("Regulations");

  const filtered = docs.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(search.toLowerCase()) ||
      doc.category.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCat === "All" || doc.category === selectedCat;
    return matchesSearch && matchesCat;
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newDoc: DownloadItem = {
      id: `d-${Date.now()}`,
      title: newTitle,
      category: newCat,
      format: "PDF",
      size: "2.8 MB",
      date: new Date().toLocaleDateString("en-GB"),
    };

    setDocs([newDoc, ...docs]);
    setNewTitle("");
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    setDocs(docs.filter((d) => d.id !== id));
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Technical Resources &amp; Regulations
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-display">
            Downloads Library Management
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-400">
            Upload and organize regulatory PDF gazettes, BEE guidebooks, and compliance standards.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-[#053824] hover:bg-emerald-900 px-4 py-2.5 text-xs font-bold text-white shadow-md transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="h-4 w-4 text-emerald-400" />
          <span>Upload Document</span>
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 rounded-2xl border border-white/10 bg-slate-900/60 p-3 shadow-xs">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search regulations, BEE codes, or KSERC orders..."
            className="w-full rounded-xl border border-white/10 bg-slate-950/70 pl-10 pr-4 py-2 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto">
          {["All", "Regulations", "Government Orders", "Standards", "Books"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                selectedCat === cat
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                  : "bg-white/5 text-slate-400 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Documents Table */}
      <div className="rounded-3xl border border-white/10 bg-slate-900/60 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-white/10 text-[10.5px] uppercase font-bold text-slate-400 tracking-wider bg-slate-950/50">
              <tr>
                <th className="py-3.5 px-4">Document Title</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Format</th>
                <th className="py-3.5 px-4">File Size</th>
                <th className="py-3.5 px-4">Upload Date</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              {filtered.map((doc) => (
                <tr key={doc.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-white max-w-md">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 font-bold text-[10px]">
                        PDF
                      </div>
                      <span className="truncate">{doc.title}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="rounded-md bg-white/5 px-2 py-0.5 text-[10.5px] font-medium text-slate-300">
                      {doc.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-400 font-mono">{doc.format}</td>
                  <td className="py-3.5 px-4 text-slate-400">{doc.size}</td>
                  <td className="py-3.5 px-4 text-slate-500">{doc.date}</td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      type="button"
                      onClick={() => handleDelete(doc.id)}
                      className="p-1.5 rounded-lg hover:bg-red-500/20 hover:text-red-400 text-slate-500 transition-colors"
                      title="Remove document"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upload Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-2xl">
            <h2 className="text-lg font-bold text-white">Upload Technical Document</h2>
            <p className="mt-1 text-xs text-slate-400">
              Add a regulation or guidebook to the public downloads section.
            </p>

            <form onSubmit={handleAdd} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Document Title *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. KSERC Net Metering Guidelines 2026"
                  className="w-full rounded-xl border border-white/10 bg-slate-950 p-2.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Category Type
                </label>
                <select
                  value={newCat}
                  onChange={(e) =>
                    setNewCat(e.target.value as DownloadItem["category"])
                  }
                  className="w-full rounded-xl border border-white/10 bg-slate-950 p-2.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
                >
                  <option value="Regulations">Regulations &amp; Acts</option>
                  <option value="Government Orders">Government Orders</option>
                  <option value="Standards">Standards &amp; Codes</option>
                  <option value="Books">BEE Books &amp; Textbooks</option>
                </select>
              </div>

              <div className="rounded-xl border border-dashed border-white/20 bg-slate-950/60 p-4 text-center">
                <Upload className="mx-auto h-6 w-6 text-slate-400 mb-1" />
                <span className="block text-xs font-semibold text-slate-300">
                  Select PDF Document
                </span>
                <span className="text-[10px] text-slate-500">
                  Max file size: 25 MB
                </span>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#053824] hover:bg-emerald-900 px-4 py-2 text-xs font-bold text-white shadow-sm"
                >
                  Save &amp; Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
