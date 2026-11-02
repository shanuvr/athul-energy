"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Clock,
} from "lucide-react";
import { api, AUTH_TOKEN_KEY } from "@/lib/api";

export default function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [authSuccess, setAuthSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [expiredNotice, setExpiredNotice] = useState(false);
  const [redirectPath, setRedirectPath] = useState("/dashboard/inquiries");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("expired") === "true") {
        setExpiredNotice(true);
      }
      const redirect = params.get("redirect");
      if (redirect && redirect.startsWith("/dashboard")) {
        setRedirectPath(redirect);
      }
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setErrorMessage("Please enter both your work email and password.");
      return;
    }
    if (!email.includes("@")) {
      setErrorMessage("Please enter a valid official email address.");
      return;
    }

    setErrorMessage("");
    setExpiredNotice(false);

    startTransition(async () => {
      try {
        const res = await api.post("/auth/login", {
          email: email.trim(),
          password,
        });

        const token = res.data?.accessToken || res.data?.token;

        if (res.data?.success && token) {
          // Save JWT Access Token and admin info in localStorage
          if (typeof window !== "undefined") {
            localStorage.setItem(AUTH_TOKEN_KEY, token);
            if (res.data.admin) {
              localStorage.setItem(
                "athul_admin_user",
                JSON.stringify(res.data.admin)
              );
            }
          }

          setAuthSuccess(true);

          setTimeout(() => {
            router.push(redirectPath);
          }, 600);
        }
      } catch (err: unknown) {
        const msg =
          (err as { response?: { data?: { message?: string } } })?.response
            ?.data?.message ||
          "Authentication failed. Please check server connection.";
        setErrorMessage(msg);
      }
    });
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Session Expired Notice */}
      {expiredNotice && (
        <div className="mb-4 rounded-xl border border-amber-300 bg-amber-50 p-3.5 flex items-start gap-3">
          <Clock className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-900">
            <p className="font-bold">Session Expired</p>
            <p className="text-amber-700 mt-0.5">
              Your previous session has timed out. Please sign in again to access the admin dashboard.
            </p>
          </div>
        </div>
      )}

      {/* Main card */}
      <div className="relative rounded-2xl border border-slate-200/90 bg-white shadow-lg shadow-slate-200/50 ring-1 ring-slate-900/5 overflow-hidden">
        {/* Accent strip */}
        <div className="h-1 bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-400" />

        <div className="p-7 sm:p-9 text-slate-900">
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              Sign in to portal
            </h2>
            <p className="mt-1 text-xs text-slate-500 leading-relaxed">
              Enter your credentials to access the management dashboard.
            </p>
          </div>

          {/* Feedback messages */}
          {errorMessage && (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50/90 p-3.5 text-xs text-red-700 flex items-start gap-2.5 animate-in fade-in">
              <AlertCircle className="h-4 w-4 shrink-0 text-red-600 mt-0.5" />
              <div className="leading-relaxed">{errorMessage}</div>
            </div>
          )}

          {authSuccess && (
            <div className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 p-3.5 text-xs text-emerald-800 flex items-center gap-2.5 animate-in fade-in">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
              <div className="font-medium">
                Authentication verified. Redirecting to dashboard...
              </div>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email input */}
            <div>
              <label
                htmlFor="email"
                className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5"
              >
                Work Email
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@athulenergy.com"
                  disabled={isPending || authSuccess}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/60 pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/10 transition-all disabled:opacity-60"
                />
              </div>
            </div>

            {/* Password input */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="password"
                  className="block text-[11px] font-bold uppercase tracking-wider text-slate-700"
                >
                  Password
                </label>
              </div>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  disabled={isPending || authSuccess}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/60 pl-10 pr-10 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/10 transition-all disabled:opacity-60"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-3.5 w-3.5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 accent-emerald-600 cursor-pointer"
                />
                <span>Remember this device</span>
              </label>
            </div>

            {/* Submit button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isPending || authSuccess}
                className="group relative flex w-full items-center justify-center gap-2 rounded-xl bg-[#053824] hover:bg-emerald-900 px-4 py-3 text-xs sm:text-sm font-bold text-white shadow-md shadow-emerald-950/15 transition-all duration-200 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-emerald-300" />
                    <span>Verifying Credentials...</span>
                  </>
                ) : authSuccess ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                    <span>Verified!</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to Dashboard</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Security badge footer */}
          <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              <span>JWT Signed Session</span>
            </span>
            <span className="text-slate-300">·</span>
            <span>256-bit SSL</span>
          </div>
        </div>
      </div>
    </div>
  );
}
