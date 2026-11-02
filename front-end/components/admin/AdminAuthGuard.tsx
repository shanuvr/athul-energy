"use client";

import { useEffect, useState, createContext, useContext } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Loader2, ShieldCheck } from "lucide-react";
import { api, AUTH_TOKEN_KEY } from "@/lib/api";

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface AdminAuthContextType {
  admin: AdminUser | null;
  loading: boolean;
  refreshAdmin: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextType>({
  admin: null,
  loading: true,
  refreshAdmin: async () => {},
});

export const useAdminAuth = () => useContext(AdminAuthContext);

export default function AdminAuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const verifySession = async () => {
    if (typeof window === "undefined") return;

    const token = localStorage.getItem(AUTH_TOKEN_KEY);

    // If no token exists, immediately redirect to login
    if (!token) {
      router.replace("/login");
      return;
    }

    try {
      // Validate token with backend /api/auth/me
      // (If expired, Axios interceptor will automatically refresh it via cookie)
      const res = await api.get("/auth/me");
      if (res.data?.success && res.data?.admin) {
        setAdmin(res.data.admin);
        setLoading(false);
      } else {
        throw new Error("Invalid admin profile response");
      }
    } catch {
      // Auth failed or token cannot be refreshed
      localStorage.removeItem(AUTH_TOKEN_KEY);
      router.replace(`/login?redirect=${encodeURIComponent(pathname || "/dashboard")}`);
    }
  };

  useEffect(() => {
    verifySession();
  }, [pathname]);

  // Loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white px-4">
        <div className="relative flex items-center justify-center mb-6">
          <div className="absolute h-16 w-16 rounded-full bg-emerald-500/20 animate-ping" />
          <div className="relative h-14 w-14 rounded-2xl bg-slate-800 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-xl">
            <ShieldCheck className="h-7 w-7" />
          </div>
        </div>
        <div className="flex items-center gap-2 text-slate-300 font-medium text-sm">
          <Loader2 className="h-4 w-4 animate-spin text-emerald-400" />
          <span>Verifying secure admin session...</span>
        </div>
        <p className="mt-2 text-[11px] text-slate-500 uppercase tracking-widest">
          Athul Energy Consultants
        </p>
      </div>
    );
  }

  return (
    <AdminAuthContext.Provider
      value={{
        admin,
        loading,
        refreshAdmin: verifySession,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

