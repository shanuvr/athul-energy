"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  Bell,
  ChevronRight,
} from "lucide-react";

interface AdminHeaderProps {
  onMenuToggle: () => void;
}

function getBreadcrumbTitle(pathname: string) {
  if (pathname.includes("/clients")) return "Our Clients";
  if (pathname.includes("/news-events")) return "News & Events";
  if (pathname.includes("/downloads")) return "Downloads Library";
  if (pathname.includes("/blog/create")) return "Create Article";
  if (pathname.includes("/blog")) return "Technical Blog";
  if (pathname.includes("/gallery")) return "Photo Gallery";
  if (pathname.includes("/inquiries")) return "Audit Inquiries";
  return "Dashboard";
}

export default function AdminHeader({ onMenuToggle }: AdminHeaderProps) {
  const pathname = usePathname();
  const title = getBreadcrumbTitle(pathname);

  return (
    <header className="sticky top-0 z-20 h-16 shrink-0 border-b border-slate-200 bg-white/95 backdrop-blur-sm px-4 sm:px-6 flex items-center justify-between gap-4">

      {/* Left: mobile toggle + breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuToggle}
          className="lg:hidden flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors cursor-pointer"
          aria-label="Open navigation sidebar"
        >
          <Menu className="h-4.5 w-4.5" />
        </button>

        <nav aria-label="Breadcrumbs" className="flex items-center gap-1.5 text-sm">
          <Link
            href="/dashboard"
            className="hidden sm:inline text-slate-400 hover:text-emerald-700 font-medium transition-colors text-[13px]"
          >
            Dashboard
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-slate-300 hidden sm:inline" />
          <span className="font-bold text-slate-800 text-[13px]">{title}</span>
        </nav>
      </div>

      {/* Right: Live badge + notifications + avatar */}
      <div className="flex items-center gap-2 sm:gap-3">

        {/* BEE live status pill */}
        <div className="hidden md:flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-bold text-emerald-700">
          <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          BEE AEA-0275 Live
        </div>

        {/* Notifications */}
        <button
          type="button"
          className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors"
          title="6 unread audit inquiries"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-2 right-2 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
        </button>

        {/* Avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#053824] text-emerald-300 font-bold text-[11px] shadow-xs">
            SA
          </div>
          <div className="hidden xl:block leading-tight">
            <p className="text-[12px] font-bold text-slate-800">Er. Santhosh A.</p>
            <p className="text-[10px] text-emerald-700 font-medium">Lead Auditor</p>
          </div>
        </div>
      </div>
    </header>
  );
}
