"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  Bell,
  Search,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
  Sparkles,
} from "lucide-react";

interface AdminHeaderProps {
  onMenuToggle: () => void;
}

function getBreadcrumbTitle(pathname: string) {
  if (pathname.includes("/clients")) return "Our Clients";
  if (pathname.includes("/news-events")) return "News & Events";
  if (pathname.includes("/downloads")) return "Downloads Library";
  if (pathname.includes("/blog")) return "Technical Blog & Whitepapers";
  if (pathname.includes("/gallery")) return "Photo Gallery Archive";
  if (pathname.includes("/inquiries")) return "Audit Inquiries & Leads";
  if (pathname.includes("/settings")) return "Portal Settings";
  return "Overview & Command";
}

export default function AdminHeader({ onMenuToggle }: AdminHeaderProps) {
  const pathname = usePathname();
  const title = getBreadcrumbTitle(pathname);

  return (
    <header className="sticky top-0 z-20 h-16 border-b border-white/10 bg-slate-900/95 backdrop-blur-md px-4 sm:px-6 lg:px-8 flex items-center justify-between">
      {/* Left: Mobile Toggle & Breadcrumbs */}
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={onMenuToggle}
          className="lg:hidden flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Open mobile navigation sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Breadcrumb Path */}
        <nav aria-label="Breadcrumbs" className="flex items-center gap-2 text-xs">
          <Link
            href="/dashboard"
            className="text-slate-400 hover:text-emerald-300 transition-colors font-medium hidden sm:inline"
          >
            Dashboard
          </Link>
          <ChevronRight className="h-3 w-3 text-slate-600 hidden sm:inline" />
          <span className="text-sm font-bold text-white tracking-tight">
            {title}
          </span>
        </nav>
      </div>

      {/* Right: Search, Live Status, Public Link, User */}
      <div className="flex items-center gap-3">
        {/* Live Accreditation Badge */}
        <div className="hidden sm:flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300 font-medium">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-bold">BEE AEA-0275 Online</span>
        </div>

        {/* View Public Website */}
        <Link
          href="/"
          target="_blank"
          className="hidden md:inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
        >
          <span>View Site</span>
          <ExternalLink className="h-3 w-3 opacity-60" />
        </Link>

        {/* Notifications Icon with Indicator */}
        <button
          type="button"
          className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          title="6 unread audit inquiries"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
        </button>

        {/* User Avatar */}
        <div className="flex items-center gap-2 border-l border-white/10 pl-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#053824] border border-emerald-500/40 text-emerald-300 font-bold text-xs shadow-xs">
            SA
          </div>
          <span className="hidden xl:inline text-xs font-bold text-white">
            Er. Santhosh A.
          </span>
        </div>
      </div>
    </header>
  );
}
