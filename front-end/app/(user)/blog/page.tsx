export default function BlogPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="max-w-2xl space-y-4">
        <span className="inline-block rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-800">
          Insights
        </span>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Blog Page
        </h1>
        <p className="text-lg text-slate-600">
          Practical notes on energy efficiency, electrical safety, power quality, and sustainability from our audit team.
        </p>
      </div>
    </div>
  );
}
