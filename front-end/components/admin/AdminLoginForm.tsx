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

  // Demo auto-fill helper
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

    // Basic email format check
    if (!email.includes("@")) {
      setErrorMessage("Please enter a valid official email address.");
      return;
    }

    setErrorMessage("");

    startTransition(async () => {
      // Simulate enterprise authentication network latency
      await new Promise((res) => setTimeout(res, 900));

      // For demonstration / development: accept any valid input or demo credentials
      if (password.length < 4) {
        setErrorMessage("Invalid credentials. Password must be at least 4 characters.");
        return;
      }

      setAuthSuccess(true);

      // Smooth transition to dashboard
      setTimeout(() => {
        router.push("/dashboard");
      }, 800);
    });
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Demo Credentials Helper Pill */}
      <div className="mb-6 rounded-2xl border border-emerald-200/80 bg-emerald-50/70 p-3.5 shadow-2xs">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-emerald-950 font-medium">
            <Sparkles className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>Developer / Quick Demo Access</span>
          </div>
          <button
            type="button"
            onClick={handleAutoFillDemo}
            className="shrink-0 rounded-lg bg-emerald-600 hover:bg-emerald-700 px-2.5 py-1 text-[11px] font-bold text-white shadow-2xs transition-colors cursor-pointer"
          >
            Auto-fill Credentials
          </button>
        </div>
      </div>

      {/* Main Login Card */}
      <div className="relative rounded-3xl border border-slate-200/90 bg-white p-7 sm:p-9 shadow-xl shadow-slate-200/60 ring-1 ring-slate-900/5">
        {/* Top Accent Strip */}
        <div className="absolute top-0 inset-x-0 h-1.5 rounded-t-3xl bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-400" />

        {/* Card Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 border border-slate-200 px-2.5 py-0.5 text-[10.5px] font-bold text-slate-700 uppercase tracking-wider">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              Restricted Staff Portal
            </span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight font-display">
            Administrative Login
          </h2>
          <p className="mt-1 text-xs sm:text-[13px] text-slate-500 leading-relaxed">
            Enter your accredited credentials to access the central energy audit &amp; operations command.
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-5 flex items-center gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3.5 text-xs text-red-800 animate-in fade-in">
            <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Success Alert */}
        {authSuccess && (
          <div className="mb-5 flex items-center gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50 p-3.5 text-xs text-emerald-900 animate-in fade-in">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
            <span className="font-bold">
              Access Granted. Redirecting to Audit Dashboard...
            </span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email / Username Field */}
          <div>
            <label
              htmlFor="admin-email"
              className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5"
            >
              Work Email / Auditor ID
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
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
                className="w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-10 pr-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-emerald-600 focus:outline-none focus:ring-4 focus:ring-emerald-600/10 transition-all"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="admin-password"
                className="block text-[11px] font-bold uppercase tracking-wider text-slate-700"
              >
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowHelpModal(true)}
                className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 transition-colors cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
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
                className="w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-10 pr-10 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-emerald-600 focus:outline-none focus:ring-4 focus:ring-emerald-600/10 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded cursor-pointer"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Remember Me & 2FA Indicator */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-xs text-slate-600 font-medium">
                Remember session
              </span>
            </label>

            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400">
              <KeyRound className="h-3 w-3 text-emerald-600" />
              256-Bit TLS
            </span>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isPending || authSuccess}
              className="w-full inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#053824] px-5 text-sm font-bold text-white shadow-md shadow-emerald-950/20 hover:bg-emerald-900 hover:shadow-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 disabled:opacity-60 cursor-pointer"
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
          </div>
        </form>

        {/* Security Notice Footer */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            Statutory Audit Operations
          </span>
          <span>v2.4 Enterprise</span>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="relative w-full max-w-sm rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800 mb-4">
              <HelpCircle className="h-5 w-5" />
            </div>

            <h3 className="text-base font-bold text-slate-900">
              Password Reset Assistance
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-600">
              For security compliance with statutory client audits (BEE / EMC),
              administrative passwords are reset by the System Administrator.
            </p>

            <div className="mt-4 rounded-xl bg-slate-50 p-3 border border-slate-100 text-xs text-slate-700 space-y-1">
              <p>
                <strong>Desk Email:</strong> admin@athulenergy.com
              </p>
              <p>
                <strong>Helpline:</strong> +91 73561 11990 / 11991
              </p>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => setShowHelpModal(false)}
                className="rounded-xl bg-[#053824] px-4 py-2 text-xs font-bold text-white hover:bg-emerald-900 transition-colors"
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
