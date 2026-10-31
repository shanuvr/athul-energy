export default function AboutPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="max-w-2xl space-y-4">
        <span className="inline-block rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-800">
          Who We Are
        </span>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          About Us Page
        </h1>
        <p className="text-lg text-slate-600">
          Empaneled energy engineers providing comprehensive energy audits, statutory compliance, and sustainable solutions since 2008.
        </p>
      </div>
    </div>
  );
}
