import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { fetchRecentBlogs } from "@/lib/blog-api";
import BlogCard from "@/components/user/BlogCard";

export default async function HomeRecentBlogs() {
  // Fetch 3 latest published technical blog articles dynamically from backend
  const recentPosts = await fetchRecentBlogs(3);

  // If no blog posts exist in database, do not render empty section on homepage
  if (!recentPosts || recentPosts.length === 0) {
    return null;
  }

  return (
    <section
      id="recent-blogs"
      aria-labelledby="recent-blogs-heading"
      className="relative w-full overflow-hidden bg-slate-50/70 pt-10 pb-14 sm:pt-12 sm:pb-16 lg:pt-14 lg:pb-18 border-t border-slate-200/60"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header with Green Accent Lines */}
        <div className="flex flex-col items-center text-center">
          {/* Top Badge Flanked by Green Horizontal Lines */}
          <div className="flex items-center gap-3 text-emerald-600" aria-hidden="true">
            <div className="h-[1.5px] w-10 sm:w-14 bg-emerald-600" />
            <span className="inline-flex items-center gap-1.5 text-xs sm:text-[12.5px] font-bold uppercase tracking-[0.2em] text-emerald-600">
              <BookOpen className="h-3.5 w-3.5" />
              Technical Blog &amp; Insights
            </span>
            <div className="h-[1.5px] w-10 sm:w-14 bg-emerald-600" />
          </div>

          {/* Heading */}
          <h2
            id="recent-blogs-heading"
            className="mt-1.5 text-balance font-display text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-[2.25rem]"
          >
            <span className="text-[#002425]">Recent </span>
            <span className="text-emerald-600">Technical Articles</span>
          </h2>

          {/* Subtitle */}
          <p className="mx-auto mt-2 max-w-2xl text-pretty text-xs sm:text-sm text-slate-600 leading-relaxed">
            In-depth engineering guides and regulatory compliance insights on BEE mandatory audits,
            electrical safety, harmonic mitigation, and industrial energy efficiency.
          </p>
        </div>

        {/* 3 Compact Blog Cards Grid */}
        <div className="mt-8 sm:mt-9 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {recentPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} priority={index === 0} compact={true} />
          ))}
        </div>

        {/* Explore All Articles Button */}
        <div className="mt-8 sm:mt-10 flex justify-center">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 shadow-xs transition-all duration-200 hover:border-emerald-500 hover:bg-emerald-50/50 hover:text-emerald-800 hover:shadow-sm cursor-pointer"
          >
            <span>Explore all articles</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 text-emerald-600" />
          </Link>
        </div>
      </div>
    </section>
  );
}
