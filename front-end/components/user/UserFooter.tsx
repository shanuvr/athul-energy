import Link from "next/link";

export default function UserFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-300 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company info */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600 text-white font-bold text-lg">
                ⚡
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Athul <span className="text-emerald-400">Energy</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-md">
              Athul Energy Consultants Pvt. Ltd. — Accredited Energy Auditing firm empaneled with EMC Kerala, BEE, and state energy development agencies.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-emerald-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-emerald-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-emerald-400 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-400 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-3">
              Head Office
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              <strong className="text-slate-200">Thrissur:</strong> Capital Legend Bldg, Round North, Kerala - 680020
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          © 2026 Athul Energy Consultants Pvt. Ltd. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

