"use client";

import { useState } from "react";
import {
  Plus,
  Trash2,
  Search,
  MapPin,
  Clock,
} from "lucide-react";

interface NewsItem {
  id: string;
  type: "EVENT" | "NEWS" | "TRAINING";
  title: string;
  excerpt: string;
  date: string;
  meta: string;
}

const INITIAL_NEWS: NewsItem[] = [
  {
    id: "ne-1",
    type: "EVENT",
    title: "Industrial Energy Conservation & BEE Compliance Seminar 2026",
    excerpt:
      "Athul Energy led an intensive technical seminar on ISO 50001 energy management frameworks and thermal efficiency optimization for manufacturing plant heads in Kerala.",
    date: "Oct 28, 2026",
    meta: "Kochi, Kerala",
  },
  {
    id: "ne-2",
    type: "NEWS",
    title: "Completion of Comprehensive Energy Audit for 25+ Industrial Units",
    excerpt:
      "Our accredited auditing team successfully finalized deep-dive electrical and thermal assessments, projecting over 4.2 GWh in cumulative annual energy savings.",
    date: "Oct 14, 2026",
    meta: "Energy Auditing",
  },
  {
    id: "ne-3",
    type: "TRAINING",
    title: "Hands-on Power Quality Analysis & Harmonic Mitigation Session",
    excerpt:
      "Specialized training module for electrical engineers covering IEEE 519 compliance, active harmonic filter sizing, and power factor penalty prevention.",
    date: "Sep 30, 2026",
    meta: "Thrissur Tech Hall",
  },
];

export default function AdminNewsEventsPage() {
  const [items, setItems] = useState<NewsItem[]>(INITIAL_NEWS);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newExcerpt, setNewExcerpt] = useState("");
  const [newType, setNewType] = useState<NewsItem["type"]>("EVENT");
  const [newMeta, setNewMeta] = useState("");

  const filtered = items.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === "ALL" || item.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const handleDelete = (id: string) => {
    setItems(items.filter((i) => i.id !== id));
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newItem: NewsItem = {
      id: `ne-${Date.now()}`,
      type: newType,
      title: newTitle,
      excerpt: newExcerpt || "Accredited technical audit briefing.",
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      meta: newMeta || "Kerala, India",
    };

    setItems([newItem, ...items]);
    setNewTitle("");
    setNewExcerpt("");
    setNewMeta("");
    setShowModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="flex h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 rounded-full">
              Press &amp; Industry Seminars
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
            News &amp; Events Management
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Publish technical workshops, statutory compliance events, and corporate milestones.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-[#053824] hover:bg-emerald-900 px-4 py-2.5 text-xs font-bold text-white shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="h-4 w-4 text-emerald-300" />
          <span>Publish Event / News</span>
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
            placeholder="Search news or workshop events..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-10 pr-4 py-2 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/10 transition-all"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide">
          {["ALL", "EVENT", "NEWS", "TRAINING"].map((type) => (
            <button
              key={type}
              onClick={() => setTypeFilter(type)}
              className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                typeFilter === type
                  ? "bg-[#053824] text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Event Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-xs hover:border-emerald-600/30 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span
                  className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                    item.type === "EVENT"
                      ? "bg-purple-50 text-purple-800 border-purple-200"
                      : item.type === "TRAINING"
                      ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                      : "bg-blue-50 text-blue-800 border-blue-200"
                  }`}
                >
                  {item.type}
                </span>
                <span className="text-[11px] text-slate-400 flex items-center gap-1 font-medium">
                  <Clock className="h-3 w-3" />
                  {item.date}
                </span>
              </div>

              <h2 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2">
                {item.title}
              </h2>

              <p className="mt-2 text-xs text-slate-500 line-clamp-3 leading-relaxed">
                {item.excerpt}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 flex items-center gap-1 font-medium truncate max-w-[180px]">
                <MapPin className="h-3 w-3 text-slate-400 shrink-0" />
                <span className="truncate">{item.meta}</span>
              </span>

              <button
                type="button"
                onClick={() => handleDelete(item.id)}
                className="text-[11px] font-semibold text-slate-400 hover:text-red-600 transition-colors cursor-pointer flex items-center gap-1"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Remove</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Publish Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="relative w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xl text-slate-900 animate-in zoom-in-95">
            <h3 className="text-lg font-bold text-slate-900 mb-1">Publish News or Event</h3>
            <p className="text-xs text-slate-500 mb-4">
              Item will be featured on the public homepage and training bulletin.
            </p>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Type
                </label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as NewsItem["type"])}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:bg-white focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/10"
                >
                  <option value="EVENT">Industry Seminar / Conference</option>
                  <option value="NEWS">Accreditation / Company News</option>
                  <option value="TRAINING">Engineer Training Program</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Workshop on BEE Energy Auditor Certification"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/10"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Location / Topic Meta
                </label>
                <input
                  type="text"
                  value={newMeta}
                  onChange={(e) => setNewMeta(e.target.value)}
                  placeholder="e.g. Ernakulam / Online Webinar"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/10"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Summary / Excerpt
                </label>
                <textarea
                  rows={3}
                  value={newExcerpt}
                  onChange={(e) => setNewExcerpt(e.target.value)}
                  placeholder="Brief description of the event, learning objectives, or audit milestones..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/10"
                />
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
                  Publish Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
