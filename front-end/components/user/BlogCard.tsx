import Link from "next/link";
import Image from "next/image";
import { Clock, Calendar, ArrowRight, User } from "lucide-react";
import type { BlogPost } from "@/lib/blog-data";

interface BlogCardProps {
  post: BlogPost;
  priority?: boolean;
}

export default function BlogCard({ post, priority = false }: BlogCardProps) {
  return (
    <article className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-2xs transition-all duration-300 hover:border-emerald-400 hover:shadow-lg hover:-translate-y-1">
      <div>
        {/* Cover Image Container */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={priority}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Category Badge Overlay */}
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center rounded-lg bg-emerald-950/85 backdrop-blur-xs border border-emerald-400/30 px-2.5 py-1 text-[10.5px] font-bold text-emerald-300 shadow-sm">
              {post.categoryLabel}
            </span>
          </div>

          {/* Reading Time Overlay */}
          <div className="absolute bottom-2.5 right-3 flex items-center gap-1 rounded-md bg-black/50 backdrop-blur-xs px-2 py-0.5 text-[10.5px] font-medium text-slate-200">
            <Clock className="h-3 w-3 text-emerald-400" />
            <span>{post.readTime}</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5">
          {/* Date & Tags */}
          <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-2">
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
          <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition-colors line-clamp-2 leading-snug">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="mt-2 text-xs sm:text-[13px] leading-relaxed text-slate-600 line-clamp-3">
            {post.excerpt}
          </p>
        </div>
      </div>

      {/* Card Footer: Author + Read Link */}
      <div className="p-5 pt-0">
        <div className="border-t border-slate-100 pt-3.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[#15803d] font-bold text-[10px]">
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
              <span className="block truncate text-[10.5px] text-slate-500">
                {post.author.role}
              </span>
            </div>
          </div>

          <span className="shrink-0 inline-flex items-center gap-1 text-xs font-bold text-emerald-700 group-hover:translate-x-0.5 transition-transform">
            Read Guide
            <ArrowRight className="h-3.5 w-3.5" />
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
