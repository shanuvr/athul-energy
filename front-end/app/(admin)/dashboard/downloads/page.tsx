"use client";

import { useState } from "react";
import {
  Plus,
  Trash2,
  Search,
  FileText,
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

  const handleDelete = (id: string) => {
    setDocs(docs.filter((d) => d.id !== id));
  };

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

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="flex h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 rounded-full">
              Gazette &amp; Standards Archive
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
            Downloads Library Management
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Publish government orders, statutory gazette notifications, and BEE study textbooks.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-[#053824] hover:bg-emerald-900 px-4 py-2.5 text-xs font-bold text-white shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="h-4 w-4 text-emerald-300" />
          <span>Upload PDF Document</span>
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-xs">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search regulations, building codes, or government orders..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-10 pr-4 py-2 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/10 transition-all"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide">
          {["All", "Government Orders", "Standards", "Regulations", "Books"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCat === cat
                  ? "bg-[#053824] text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Documents Table */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 border-b border-slate-200 text-[10.5px] uppercase font-bold text-slate-500 tracking-wider">
              <tr>
                <th className="py-3 px-5">Document Title</th>
                <th className="py-3 px-5">Category</th>
                <th className="py-3 px-5">Format</th>
                <th className="py-3 px-5">File Size</th>
                <th className="py-3 px-5">Gazette Date</th>
                <th className="py-3 px-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filtered.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-5 font-bold text-slate-900 max-w-md">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-emerald-700 shrink-0" />
                      <span className="line-clamp-1">{doc.title}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-5 whitespace-nowrap">
                    <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600">
                      {doc.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 font-mono font-bold text-slate-600">
                    {doc.format}
                  </td>
                  <td className="py-3.5 px-5 text-slate-500 whitespace-nowrap">
                    {doc.size}
                  </td>
                  <td className="py-3.5 px-5 text-slate-500 whitespace-nowrap">
                    {doc.date}
                  </td>
                  <td className="py-3.5 px-5 text-right whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => handleDelete(doc.id)}
                      className="text-[11px] font-semibold text-slate-400 hover:text-red-600 transition-colors cursor-pointer inline-flex items-center gap-1"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>Remove</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Document Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="relative w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xl text-slate-900 animate-in zoom-in-95">
            <h3 className="text-lg font-bold text-slate-900 mb-1">Add Document</h3>
            <p className="text-xs text-slate-500 mb-4">
              Add new PDF guidelines or statutory rules to the public downloads section.
            </p>

            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Document Title
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Kerala ECBC Implementation Rules 2026"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/10"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Category
                </label>
                <select
                  value={newCat}
                  onChange={(e) => setNewCat(e.target.value as DownloadItem["category"])}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:bg-white focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/10"
                >
                  <option value="Government Orders">Government Orders</option>
                  <option value="Regulations">Regulations &amp; Gazettes</option>
                  <option value="Standards">Standards &amp; Codes</option>
                  <option value="Books">BEE Guide Books</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#053824] hover:bg-emerald-900 px-5 py-2 text-xs font-bold text-white shadow-xs transition-colors"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
