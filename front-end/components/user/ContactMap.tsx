import { Navigation, ExternalLink, Train, Plane, Car } from "lucide-react";

export default function ContactMap() {
  const directionsUrl =
    "https://www.google.com/maps/search/?api=1&query=Athul+Energy+Consultants+Capital+Legend+Building+Korappath+Lane+Thrissur";

  return (
    <section className="rounded-3xl border border-slate-200/90 bg-white shadow-sm overflow-hidden">
      {/* Map Header with Direct Directions CTA */}
      <div className="p-6 sm:p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
              Registered Head Office Location
            </span>
          </div>
          <h2 className="mt-1 text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Find Us on Google Maps
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Capital Legend Building, Korappath Lane, Thrissur North, Kerala 680020
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-[#053824] px-4 py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-emerald-900 transition-colors shadow-2xs"
          >
            <Navigation className="h-4 w-4 text-emerald-400" />
            <span>Get Directions</span>
            <ExternalLink className="h-3 w-3 opacity-70" />
          </a>
        </div>
      </div>

      {/* Embedded Google Map */}
      <div className="relative w-full h-[360px] sm:h-[460px] bg-slate-100">
        <iframe
          src="https://www.google.com/maps/d/embed?mid=1MXCO6Rn6hzZyCCr7kQzwcqy7yr8"
          title="Athul Energy Consultants Pvt. Ltd. Official Location Map"
          className="absolute inset-0 w-full h-full border-0"
          loading="lazy"
          allowFullScreen
          aria-hidden="false"
        />
      </div>

      {/* Access & Transit Points Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 bg-slate-50/70 p-4 sm:p-6 text-slate-700">
        <div className="p-3 sm:px-4 flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white border border-slate-200 text-emerald-700 shadow-2xs">
            <Train className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-900">Thrissur Railway Station (TCR)</h3>
            <p className="mt-0.5 text-[11px] text-slate-500">
              ~2.5 km (8–10 mins drive via Swaraj Round North)
            </p>
          </div>
        </div>

        <div className="p-3 sm:px-4 flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white border border-slate-200 text-emerald-700 shadow-2xs">
            <Car className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-900">NH 544 Highway Access</h3>
            <p className="mt-0.5 text-[11px] text-slate-500">
              ~6 km from Mannuthy Bypass for regional industrial clients
            </p>
          </div>
        </div>

        <div className="p-3 sm:px-4 flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white border border-slate-200 text-emerald-700 shadow-2xs">
            <Plane className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-900">Cochin International Airport (COK)</h3>
            <p className="mt-0.5 text-[11px] text-slate-500">
              ~55 km (approx. 60–75 mins via NH 544)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
