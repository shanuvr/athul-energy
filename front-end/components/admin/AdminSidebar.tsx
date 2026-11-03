"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { logoutAdmin } from "@/lib/api";
import { fetchInquiryStats } from "@/lib/inquiry-api";
import { usePathname } from "next/navigation";
import {
  Building2,
  FileDown,
  BookOpen,
  Image as ImageIcon,
  Inbox,
  LogOut,
  ChevronLeft,
  ChevronRight,
  X,
  Zap,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const NAV_SECTIONS: NavSection[] = [
  {
    title: "Operations",
    items: [
      {
        label: "Audit Inquiries",
        href: "/dashboard/inquiries",
        icon: Inbox,
      },
    ],
  },
  {
    title: "Content",
    items: [
      {
        label: "Our Clients",
        href: "/dashboard/clients",
        icon: Building2,
      },
      {
        label: "Downloads",
        href: "/dashboard/downloads",
        icon: FileDown,
      },
      {
        label: "Technical Blog",
        href: "/dashboard/blog",
        icon: BookOpen,
      },
      {
        label: "Photo Gallery",
        href: "/dashboard/gallery",
        icon: ImageIcon,
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
  const [pendingInquiries, setPendingInquiries] = useState<number>(0);

  useEffect(() => {
    fetchInquiryStats()
      .then((res) => {
        if (res.data?.pending !== undefined) {
          setPendingInquiries(res.data.pending);
        }
      })
      .catch(() => {});
  }, [pathname]);

  const isActive = (href: string) =>
    pathname.startsWith(href) ||
    (href === "/dashboard/inquiries" &&
      (pathname === "/dashboard" || pathname === "/dashboard/"));

  const sidebarContent = (
    <div
      className={`flex h-full flex-col bg-white border-r border-slate-200 select-none transition-all duration-300 ${
        collapsed ? "w-[70px]" : "w-64"
      }`}
    >
      {/* ── Logo bar ── */}
      <div className="flex h-16 shrink-0 items-center justify-between px-4 border-b border-slate-100">
        <Link
          href="/dashboard/inquiries"
          onClick={onMobileClose}
          className="flex items-center gap-2.5 overflow-hidden focus-visible:outline-none group"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#053824] shadow-sm">
            <Zap className="h-4.5 w-4.5 text-emerald-300" strokeWidth={2.2} />
          </div>
          {!collapsed && (
            <div className="min-w-0 leading-tight">
              <span className="block text-[12px] font-extrabold text-slate-900 tracking-tight truncate">
                Athul Energy
              </span>
              <span className="block text-[10px] font-semibold text-emerald-700 truncate">
                Admin Portal
              </span>
            </div>
          )}
        </Link>

        {/* Desktop collapse toggle */}
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="h-3.5 w-3.5" />
          ) : (
            <ChevronLeft className="h-3.5 w-3.5" />
          )}
        </button>

        {/* Mobile close */}
        {onMobileClose && (
          <button
            type="button"
            onClick={onMobileClose}
            className="lg:hidden flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        )}
      </div>

      {/* ── Navigation ── */}
      <nav
        aria-label="Admin navigation"
        className="flex-1 overflow-y-auto overscroll-contain px-3 py-4 space-y-6 scrollbar-hide"
        style={{ scrollbarWidth: "none" }}
      >
        {NAV_SECTIONS.map((section) => (
          <div key={section.title}>
            {!collapsed && (
              <p className="mb-2 px-2 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                {section.title}
              </p>
            )}
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onMobileClose}
                      title={collapsed ? item.label : undefined}
                      className={`group relative flex items-center rounded-xl transition-all duration-150 ${
                        collapsed
                          ? "h-10 w-10 mx-auto justify-center"
                          : "gap-3 px-3 py-2.5"
                      } ${
                        active
                          ? "bg-emerald-50 text-emerald-800"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      {/* Icon */}
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ${
                          active
                            ? "bg-emerald-600 text-white shadow-sm shadow-emerald-200"
                            : "bg-slate-100 text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-700"
                        }`}
                      >
                        <Icon className="h-4 w-4" strokeWidth={active ? 2.2 : 1.8} />
                      </span>

                      {/* Label (expanded) */}
                      {!collapsed && (
                        <span
                          className={`truncate text-[13px] font-semibold ${
                            active ? "text-emerald-800" : "text-slate-700 group-hover:text-slate-900"
                          }`}
                        >
                          {item.label}
                        </span>
                      )}

                      {/* Pending Inquiries Badge */}
                      {item.href === "/dashboard/inquiries" && pendingInquiries > 0 && !collapsed && (
                        <span className="ml-auto inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                          {pendingInquiries}
                        </span>
                      )}

                      {/* Active indicator dot (collapsed) */}
                      {collapsed && active && (
                        <span className="absolute -right-0.5 top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* ── Bottom Section: Logout Only ── */}
      <div className="shrink-0 border-t border-slate-100 p-3">
        {!collapsed ? (
          <button
            type="button"
            onClick={() => logoutAdmin()}
            className="group flex items-center gap-2.5 w-full rounded-xl px-3 py-2.5 text-xs font-bold text-slate-600 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
            title="Logout of portal"
          >
            <LogOut className="h-4 w-4 shrink-0 text-slate-400 group-hover:text-red-600 transition-colors" />
            <span>Logout</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => logoutAdmin()}
            className="group flex h-10 w-10 items-center justify-center rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors mx-auto cursor-pointer"
            title="Logout"
          >
            <LogOut className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sticky sidebar */}
      <aside
        className={`hidden lg:block shrink-0 h-screen sticky top-0 z-30 transition-all duration-300 ${
          collapsed ? "w-[70px]" : "w-64"
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile slide-over drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in"
            onClick={onMobileClose}
          />
          <div className="fixed inset-y-0 left-0 w-64 shadow-2xl animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
