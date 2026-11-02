"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Plus,
  Trash2,
  Search,
} from "lucide-react";

interface ClientItem {
  id: string;
  name: string;
  category: "Chemical" | "Manufacturing" | "Automotive" | "Healthcare" | "Textile" | "Institutions" | "Commercial";
  logo: string;
  auditsCompleted: number;
}

const INITIAL_CLIENTS: ClientItem[] = [
  { id: "telk", name: "Transformers and Electricals Kerala Ltd. (TELK)", category: "Manufacturing", logo: "/clients/telk.webp", auditsCompleted: 5 },
  { id: "aai", name: "Airports Authority of India (AAI)", category: "Institutions", logo: "/clients/airports-authority-of-india.webp", auditsCompleted: 3 },
  { id: "petronet", name: "Petronet LNG Limited", category: "Manufacturing", logo: "/clients/petronet-lng.webp", auditsCompleted: 4 },
  { id: "synthite", name: "Synthite Industries Pvt. Ltd.", category: "Chemical", logo: "/clients/synthite.webp", auditsCompleted: 6 },
  { id: "sud-chemie", name: "Süd-Chemie India Pvt. Ltd.", category: "Chemical", logo: "/clients/sud-chemie.webp", auditsCompleted: 4 },
  { id: "ksca", name: "Karnataka State Cricket Association (KSCA)", category: "Institutions", logo: "/clients/karnataka-cricket-association.webp", auditsCompleted: 2 },
  { id: "andhra-bank", name: "Andhra Bank", category: "Commercial", logo: "/clients/andhra-bank.webp", auditsCompleted: 3 },
  { id: "central-bank", name: "Central Bank of India", category: "Commercial", logo: "/clients/central-bank-of-india.webp", auditsCompleted: 4 },
  { id: "pnb", name: "Punjab National Bank", category: "Commercial", logo: "/clients/punjab-national-bank.webp", auditsCompleted: 3 },
  { id: "syndicate-bank", name: "Syndicate Bank", category: "Commercial", logo: "/clients/syndicate-bank.webp", auditsCompleted: 2 },
  { id: "union-bank", name: "Union Bank of India", category: "Commercial", logo: "/clients/union-bank-of-india.webp", auditsCompleted: 5 },
];

export default function AdminClientsPage() {
  const [clients, setClients] = useState<ClientItem[]>(INITIAL_CLIENTS);
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newClientName, setNewClientName] = useState("");
  const [newClientCat, setNewClientCat] = useState<ClientItem["category"]>("Manufacturing");

  const filtered = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName.trim()) return;

    const newLogo: ClientItem = {
      id: `c-${Date.now()}`,
      name: newClientName,
      category: newClientCat,
      logo: `https://placehold.co/220x90/053824/38ef7d?text=${encodeURIComponent(
        newClientName.toUpperCase()
      )}&font=inter`,
      auditsCompleted: 1,
    };

    setClients([newLogo, ...clients]);
    setNewClientName("");
    setShowAddModal(false);
  };

  const handleDelete = (id: string) => {
    setClients(clients.filter((c) => c.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="flex h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 rounded-full">
              Homepage Carousel &amp; Partners
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
            Our Clients Management
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Upload partner logos and manage the client marquee displayed on the homepage.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-[#053824] hover:bg-emerald-900 px-4 py-2.5 text-xs font-bold text-white shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="h-4 w-4 text-emerald-300" />
          <span>Add Client Logo</span>
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
            placeholder="Search clients by company name or sector..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-10 pr-4 py-2 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/10 transition-all"
          />
        </div>
        <div className="text-xs text-slate-500 px-2 shrink-0 font-medium">
          Showing <strong className="text-slate-800">{filtered.length}</strong> active client logos
        </div>
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((c) => (
          <div
            key={c.id}
            className="group relative rounded-2xl border border-slate-200 bg-white p-5 shadow-xs hover:border-emerald-600/30 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              {/* Logo Preview Area */}
              <div className="relative h-20 w-full overflow-hidden rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-center p-2 mb-3">
                <Image
                  src={c.logo}
                  alt={c.name}
                  width={200}
                  height={80}
                  className="max-h-full max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              </div>

              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                  {c.category}
                </span>
                <span className="text-[10.5px] font-semibold text-emerald-700">
                  {c.auditsCompleted} Audits
                </span>
              </div>

              <h2 className="text-sm font-bold text-slate-900 line-clamp-1 group-hover:text-emerald-700 transition-colors">
                {c.name}
              </h2>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-end">
              <button
                type="button"
                onClick={() => handleDelete(c.id)}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                title="Remove client"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Remove</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Client Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="relative w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xl text-slate-900 animate-in zoom-in-95">
            <h3 className="text-lg font-bold text-slate-900 mb-1">Add Client Company</h3>
            <p className="text-xs text-slate-500 mb-5">
              Enter industrial client name to generate brand logo badge.
            </p>

            <form onSubmit={handleAddClient} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Company Legal Name
                </label>
                <input
                  type="text"
                  required
                  value={newClientName}
                  onChange={(e) => setNewClientName(e.target.value)}
                  placeholder="e.g. Cochin Shipyard Ltd."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/10 transition-all"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Industry Sector
                </label>
                <select
                  value={newClientCat}
                  onChange={(e) => setNewClientCat(e.target.value as ClientItem["category"])}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/10 transition-all"
                >
                  <option value="Chemical">Chemical &amp; Petrochemical</option>
                  <option value="Manufacturing">Manufacturing &amp; Engineering</option>
                  <option value="Automotive">Automotive &amp; Tires</option>
                  <option value="Healthcare">Healthcare &amp; Hospitals</option>
                  <option value="Textile">Textile &amp; Garments</option>
                  <option value="Institutions">Colleges &amp; Universities</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#053824] hover:bg-emerald-900 px-5 py-2 text-xs font-bold text-white shadow-xs transition-colors"
                >
                  Save Logo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
