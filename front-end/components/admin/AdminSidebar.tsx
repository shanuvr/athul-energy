"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  Calendar,
  FileDown,
  BookOpen,
  Image as ImageIcon,
  Inbox,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  ExternalLink,
  Sparkles,
  X,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
  badgeColor?: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const NAV_SECTIONS: NavSection[] = [
  {
    title: "Core Operations",
    items: [
      {
        label: "Overview",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        label: "Audit Inquiries",
        href: "/dashboard/inquiries",
        icon: Inbox,
        badge: "6 New",
        badgeColor: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
      },
    ],
  },
  {
    title: "Content Management",
    items: [
      {
        label: "Our Clients",
        href: "/dashboard/clients",
        icon: Building2,
        badge: "12",
        badgeColor: "bg-slate-800 text-slate-300",
      },
      {
        label: "News & Events",
        href: "/dashboard/news-events",
        icon: Calendar,
        badge: "3",
        badgeColor: "bg-slate-800 text-slate-300",
      },
      {
        label: "Downloads Library",
        href: "/dashboard/downloads",
        icon: FileDown,
        badge: "11",
        badgeColor: "bg-slate-800 text-slate-300",
      },
      {
        label: "Technical Blog",
        href: "/dashboard/blog",
        icon: BookOpen,
        badge: "6",
        badgeColor: "bg-slate-800 text-slate-300",
      },
      {
        label: "Photo Gallery",
        href: "/dashboard/gallery",
        icon: ImageIcon,
        badge: "18",
        badgeColor: "bg-slate-800 text-slate-300",
      },
    ],
  },
  {
    title: "System Administration",
    items: [
      {
        label: "Portal Settings",
        href: "/dashboard/settings",
        icon: Settings,
      },
    ],
  },
];

interface AdminSidebarProps {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export default function AdminSidebar({
  mobileOpen = false,
  onMobileClose,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard" || pathname === "/admin/dashboard";
    }
    return pathname.startsWith(href);
  };

  const sidebarContent = (
    <div className="flex h-full flex-col justify-between bg-slate-900 border-r border-white/10 text-slate-300 select-none">
      {/* Top Section: Logo & Toggle */}
      <div>
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/10">
          <Link
            href="/dashboard"
            className="flex items-center gap-2.5 overflow-hidden focus-visible:outline-none"
            onClick={onMobileClose}
          >
            <div className="rounded-xl bg-white p-1.5 shrink-0 shadow-sm">
              <Image
                src="/athul-logo.png"
                alt="Athul Energy"
                width={120}
                height={35}
                className="h-6 w-auto object-contain"
                priority
              />
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <span className="block text-[11px] font-extrabold uppercase tracking-wider text-emerald-400 truncate">
                  Admin Command
                </span>
                <span className="block text-[9.5px] font-medium text-slate-400 truncate">
                  BEE AEA-0275 Portal
                </span>
              </div>
            )}
          </Link>

          {/* Desktop Collapse Toggle */}
          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>

          {/* Mobile Close Button */}
          {onMobileClose && (
            <button
              type="button"
              onClick={onMobileClose}
              className="lg:hidden flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
              title="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Quick Public Site Link (when expanded) */}
        {!collapsed && (
          <div className="p-3">
            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.03] px-3 py-2 text-xs text-slate-400 hover:text-emerald-300 hover:bg-white/5 transition-colors"
            >
              <span className="flex items-center gap-2 font-medium">
                <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                Live Public Website
              </span>
              <ExternalLink className="h-3 w-3 opacity-60" />
            </Link>
          </div>
        )}

        {/* Navigation Sections */}
        <nav aria-label="Admin Navigation" className="px-2.5 py-2 space-y-5 overflow-y-auto max-h-[calc(100vh-14rem)]">
          {NAV_SECTIONS.map((section, sIdx) => (
            <div key={sIdx}>
              {!collapsed && (
                <h2 className="px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500 mb-1.5">
                  {section.title}
                </h2>
              )}

              <ul className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onMobileClose}
                        title={collapsed ? item.label : undefined}
                        className={`group relative flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-semibold transition-all duration-200 ${
                          active
                            ? "bg-emerald-500/15 text-emerald-300 font-bold shadow-xs border-l-4 border-emerald-400"
                            : "text-slate-400 hover:text-white hover:bg-white/5"
                        } ${collapsed ? "justify-center px-2" : ""}`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <Icon
                            className={`h-4 w-4 shrink-0 transition-colors ${
                              active
                                ? "text-emerald-400"
                                : "text-slate-400 group-hover:text-white"
                            }`}
                          />
                          {!collapsed && (
                            <span className="truncate">{item.label}</span>
                          )}
                        </div>

                        {!collapsed && item.badge && (
                          <span
                            className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                              item.badgeColor || "bg-slate-800 text-slate-300"
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}

                        {/* Collapsed Active Indicator Dot */}
                        {collapsed && active && (
                          <span className="absolute right-1.5 top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      {/* Bottom Section: Auditor Profile & Logout */}
      <div className="p-3 border-t border-white/10 bg-slate-950/40">
        {!collapsed ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#053824] border border-emerald-500/40 text-emerald-300 font-bold text-xs shadow-xs">
                SA
              </div>
              <div className="min-w-0">
                <span className="block truncate text-xs font-bold text-white">
                  Er. Santhosh A.
                </span>
                <span className="block truncate text-[10px] text-emerald-400/90 font-medium">
                  Lead Auditor · AEA-0275
                </span>
              </div>
            </div>

            <Link
              href="/login"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
              title="Sign out of portal"
            >
              <LogOut className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#053824] border border-emerald-500/40 text-emerald-300 font-bold text-xs shadow-xs">
              SA
            </div>
            <Link
              href="/login"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
              title="Sign out"
            >
              <LogOut className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside
        className={`hidden lg:block shrink-0 h-screen sticky top-0 transition-all duration-300 z-30 ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Slide-over Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop Blur Overlay */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity animate-in fade-in"
            onClick={onMobileClose}
          />

          {/* Drawer Panel */}
          <div className="fixed inset-y-0 left-0 w-72 max-w-[85vw] shadow-2xl transition-transform animate-in slide-in-from-left">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
