import Link from "next/link";
import Image from "next/image";
import { Clock, Calendar, ArrowRight } from "lucide-react";
import type { BlogPost } from "@/lib/blog-api";

interface BlogCardProps {
  post: BlogPost;
  priority?: boolean;
  compact?: boolean;
}

export default function BlogCard({
  post,
  priority = false,
  compact = false,
}: BlogCardProps) {
  return (
    <article className="group relative flex flex-row items-center gap-3.5 p-3 sm:flex-col sm:justify-between sm:p-0 overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-2xs transition-all duration-300 hover:border-emerald-400 hover:shadow-md hover:-translate-y-0.5">
      {/* Thumbnail (Horizontal square on mobile, streamlined ratio on desktop) */}
      <div
        className={`relative h-24 w-24 sm:h-auto sm:w-full shrink-0 overflow-hidden rounded-xl sm:rounded-none bg-slate-900 shadow-2xs ${
          compact ? "sm:aspect-[16/8.5]" : "sm:aspect-[16/9]"
        }`}
      >
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          sizes="(max-width: 640px) 96px, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="hidden sm:block absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Desktop-only Category Badge Overlay */}
        <div className="hidden sm:block absolute top-2.5 left-2.5">
          <span className="inline-flex items-center rounded-md bg-emerald-950/85 backdrop-blur-xs border border-emerald-400/30 px-2 py-0.5 text-[10px] font-bold text-emerald-300 shadow-xs">
            {post.categoryLabel}
          </span>
        </div>

        {/* Reading Time Overlay Pill */}
        <div className="absolute bottom-1.5 right-1.5 sm:bottom-2 sm:right-2.5 flex items-center gap-1 rounded-md bg-black/75 sm:bg-black/60 backdrop-blur-xs px-1.5 py-0.5 text-[9.5px] sm:text-[10px] font-semibold text-white sm:text-slate-200 shadow-xs">
          <Clock className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-emerald-400 shrink-0" />
          <span className="whitespace-nowrap">{post.readTime}</span>
        </div>
      </div>

      {/* Content Body */}
      <div
        className={`flex-1 min-w-0 flex flex-col justify-between py-0.5 ${
          compact ? "sm:p-4" : "sm:p-5"
        }`}
      >
        <div>
          {/* Mobile Category Label alone */}
          <div className="flex sm:hidden items-center mb-1">
            <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider truncate">
              {post.categoryLabel}
            </span>
          </div>

          {/* Desktop Date */}
          <div className="hidden sm:flex items-center gap-2 text-[10.5px] text-slate-500 mb-1.5">
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3 w-3 text-slate-400" />
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>

          {/* Title */}
          <h3
            className={`font-bold text-slate-900 group-hover:text-emerald-800 transition-colors line-clamp-2 leading-snug ${
              compact ? "text-[13px] sm:text-[14.5px]" : "text-[13px] sm:text-base"
            }`}
          >
            {post.title}
          </h3>
        </div>

        {/* Excerpt (Shortened for sleek compact layout) */}
        <p
          className={`hidden sm:block leading-relaxed text-slate-600 ${
            compact
              ? "mt-1.5 text-xs line-clamp-2"
              : "mt-2 text-xs sm:text-[13px] line-clamp-3"
          }`}
        >
          {post.excerpt}
        </p>

        {/* Mobile Author & Date */}
        <div className="flex sm:hidden items-center gap-1.5 text-[10.5px] text-slate-400 mt-2 truncate">
          <span className="text-slate-600 font-medium truncate">{post.author.name}</span>
          <span className="text-slate-300">•</span>
          <span className="shrink-0">
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
      </div>

      {/* Desktop Card Footer: Author + Read Link */}
      <div className={`hidden sm:block w-full ${compact ? "p-4 pt-0" : "p-5 pt-0"}`}>
        <div
          className={`border-t border-slate-100 flex items-center justify-between gap-3 ${
            compact ? "pt-2.5" : "pt-3.5"
          }`}
        >
          <div className="flex items-center gap-2 min-w-0">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[#15803d] font-bold text-[9.5px]">
              {post.author.name
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")}
            </div>
            <div className="min-w-0">
              <span className="block truncate text-xs font-bold text-slate-800">
                {post.author.name}
              </span>
              {!compact && (
                <span className="block truncate text-[10.5px] text-slate-500">
                  {post.author.role}
                </span>
              )}
            </div>
          </div>

          <span className="shrink-0 inline-flex items-center gap-1 text-xs font-bold text-emerald-700 group-hover:translate-x-0.5 transition-transform">
            Read Guide
            <ArrowRight className="h-3 w-3" />
          </span>
        </div>
      </div>

      {/* Full Card Clickable Overlay Link */}
      <Link
        href={`/blog/${post.slug}`}
        className="absolute inset-0 z-0"
        aria-label={`Read full article: ${post.title}`}
      />
    </article>
  );
}
