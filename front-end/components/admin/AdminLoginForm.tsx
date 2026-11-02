"use client";

import { useState, useTransition } from "react";
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
  KeyRound,
  Sparkles,
  HelpCircle,
} from "lucide-react";

export default function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [authSuccess, setAuthSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showHelpModal, setShowHelpModal] = useState(false);

  const handleAutoFillDemo = () => {
    setEmail("admin@athulenergy.com");
    setPassword("Athul@Audit2026");
    if (errorMessage) setErrorMessage("");
  };

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

    startTransition(async () => {
      await new Promise((res) => setTimeout(res, 900));
      if (password.length < 4) {
        setErrorMessage("Invalid credentials. Password must be at least 4 characters.");
        return;
      }
      setAuthSuccess(true);
      setTimeout(() => {
        router.push("/dashboard");
      }, 800);
    });
  };

  return (
    <div className="w-full max-w-md mx-auto">

      {/* Demo credentials pill */}
      <div className="mb-4 rounded-xl border border-emerald-200/80 bg-emerald-50/70 px-3.5 py-2.5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-[11px] text-emerald-950 font-medium">
          <Sparkles className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
          <span>Developer / Quick Demo Access</span>
        </div>
        <button
          type="button"
          onClick={handleAutoFillDemo}
          className="shrink-0 rounded-lg bg-emerald-600 hover:bg-emerald-700 px-2.5 py-1 text-[10.5px] font-bold text-white transition-colors cursor-pointer"
        >
          Auto-fill
        </button>
      </div>

      {/* Main card */}
      <div className="relative rounded-2xl border border-slate-200/90 bg-white shadow-lg shadow-slate-200/50 ring-1 ring-slate-900/5 overflow-hidden">
        {/* Accent strip */}
        <div className="h-1 bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-400" />

        <div className="px-6 py-5 sm:px-7">
          {/* Header */}
          <div className="mb-4">
            <div className="flex items-center gap-1.5 mb-1.5">
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 border border-slate-200 px-2 py-0.5 text-[10px] font-bold text-slate-700 uppercase tracking-wider">
                <ShieldCheck className="h-3 w-3 text-emerald-600" />
                Restricted Staff Portal
              </span>
            </div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight font-display leading-tight">
              Administrative Login
            </h2>
            <p className="mt-1 text-[11.5px] text-slate-500 leading-relaxed">
              Enter your accredited credentials to access the audit &amp; operations command.
            </p>
          </div>

          {/* Error */}
          {errorMessage && (
            <div className="mb-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-xs text-red-800 animate-in fade-in">
              <AlertCircle className="h-3.5 w-3.5 shrink-0 text-red-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Success */}
          {authSuccess && (
            <div className="mb-4 flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-xs text-emerald-900 animate-in fade-in">
              <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
              <span className="font-bold">Access Granted. Redirecting to Dashboard...</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-3.5">
            {/* Email */}
            <div>
              <label htmlFor="admin-email" className="block text-[10.5px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                Work Email / Auditor ID
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                <input
                  id="admin-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errorMessage) setErrorMessage("");
                  }}
                  placeholder="name@athulenergy.com"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-9 pr-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-emerald-600 focus:outline-none focus:ring-4 focus:ring-emerald-600/10 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="admin-password" className="block text-[10.5px] font-bold uppercase tracking-wider text-slate-700">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowHelpModal(true)}
                  className="text-[10.5px] font-semibold text-emerald-700 hover:text-emerald-800 transition-colors cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errorMessage) setErrorMessage("");
                  }}
                  placeholder="••••••••••••"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-9 pr-9 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-emerald-600 focus:outline-none focus:ring-4 focus:ring-emerald-600/10 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 rounded cursor-pointer"
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>

            {/* Remember + TLS badge */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-3.5 w-3.5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-[11px] text-slate-600 font-medium">Remember session</span>
              </label>
              <span className="inline-flex items-center gap-1 text-[10.5px] font-medium text-slate-400">
                <KeyRound className="h-3 w-3 text-emerald-600" />
                256-Bit TLS
              </span>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending || authSuccess}
              className="w-full inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#053824] px-5 text-sm font-bold text-white shadow-md shadow-emerald-950/20 hover:bg-emerald-900 hover:shadow-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 disabled:opacity-60 cursor-pointer"
            >
              {isPending ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>Verifying Credentials...</span>
                </>
              ) : authSuccess ? (
                <>
                  <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                  <span>Entering Dashboard...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="h-4 w-4 text-emerald-400" />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-[10.5px] text-slate-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="h-3 w-3 text-emerald-600" />
              Statutory Audit Operations
            </span>
            <span>v2.4 Enterprise</span>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="relative w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800 mb-3">
              <HelpCircle className="h-4.5 w-4.5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Password Reset Assistance</h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-600">
              Administrative passwords are reset by the System Administrator for security compliance with statutory client audits (BEE / EMC).
            </p>
            <div className="mt-3 rounded-xl bg-slate-50 p-3 border border-slate-100 text-xs text-slate-700 space-y-1">
              <p><strong>Desk Email:</strong> admin@athulenergy.com</p>
              <p><strong>Helpline:</strong> +91 73561 11990 / 11991</p>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setShowHelpModal(false)}
                className="rounded-xl bg-[#053824] px-4 py-2 text-xs font-bold text-white hover:bg-emerald-900 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
