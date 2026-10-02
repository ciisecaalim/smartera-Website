"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Pagination } from "@/components/ui/pagination";
import { PAGE_SIZES } from "@/config/pagination";
import { blogCategories } from "@/features/blogs/data/blogs.data";
import type { BlogCategory, BlogPost } from "@/features/blogs/types/blogs.types";
import { filterBlogPosts, formatPublishedDate } from "@/features/blogs/utils/blogs.utils";
import { paginateItems } from "@/lib/pagination";
import { BlogCard } from "./blog-card";

export default function BlogsBrowser({ posts }: { posts: BlogPost[] }) {
  const [category, setCategory] = useState<BlogCategory | "all">("all");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const results = useMemo(() => filterBlogPosts(posts, { category, query }), [posts, category, query]);
  const paginated = useMemo(() => paginateItems(results, page, PAGE_SIZES.blogs), [results, page]);
  const featured = posts.filter((post) => post.featured).slice(0, 3);
  const tabs: [BlogCategory | "all", string][] = [["all", "All Posts"], ...blogCategories.map((item) => [item, item] as [BlogCategory, string])];
  const count = (value: BlogCategory | "all") => value === "all" ? posts.length : posts.filter((post) => post.category === value).length;
  const select = (value: BlogCategory | "all") => { setCategory(value); setPage(1); };
  const clear = () => { setCategory("all"); setQuery(""); setPage(1); };
  const changePage = (nextPage: number) => {
    setPage(nextPage);
    document.getElementById("blog-results")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  };

  return <>
    <div className="rounded-2xl border border-brand-border bg-white p-4 shadow-[0_12px_32px_rgba(27,81,159,.07)]">
      <div className="grid gap-4 lg:grid-cols-[1fr_340px] lg:items-center">
        <div role="group" aria-label="Filter blog posts by category" className="flex gap-2 overflow-x-auto pb-1">
          {tabs.map(([value, label]) => <button key={value} type="button" aria-pressed={category === value} onClick={() => select(value)} className={`h-10 shrink-0 rounded-lg border px-4 text-[11px] font-black transition ${category === value ? "border-brand-blue bg-brand-blue text-white shadow-md" : "border-brand-border bg-white text-slate-700 hover:border-brand-blue"}`}>{label}</button>)}
        </div>
        <div className="relative"><label htmlFor="blog-search" className="sr-only">Search blogs</label><input id="blog-search" type="search" value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} placeholder="Search blogs..." className="h-10 w-full rounded-lg border border-brand-border px-4 pr-11 text-sm outline-none focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10" /><span aria-hidden="true" className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-blue">⌕</span></div>
      </div>
    </div>
    <div className="mt-6 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_290px]">
      <main id="blog-results" className="scroll-mt-24">
        {results.length ? <>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{paginated.items.map((post) => <BlogCard key={post.id} post={post} />)}</div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 [&>nav]:mt-0">
            <p aria-live="polite" className="text-center text-sm font-bold text-slate-500">Current {paginated.items.length} / {paginated.pageSize}</p>
            <Pagination currentPage={paginated.page} totalPages={paginated.totalPages} onPageChange={changePage} ariaLabel="Blog posts pagination" alwaysShow />
          </div>
        </> : <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center"><h2 className="font-black text-brand-heading">No posts found.</h2><p className="mt-2 text-sm text-slate-500">Try another keyword or category.</p><button onClick={clear} className="mt-5 rounded-lg bg-brand-blue px-4 py-2 text-xs font-black text-white hover:bg-brand-blue-hover">Clear Filters</button></div>}
      </main>
      <aside className="space-y-5 lg:sticky lg:top-28">
        <section className="rounded-2xl border border-brand-border bg-white p-5"><h2 className="text-lg font-black text-brand-heading">Categories</h2><div className="mt-3 space-y-1">{tabs.map(([value, label]) => <button key={value} onClick={() => select(value)} className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-bold ${category === value ? "bg-brand-light text-brand-blue" : "text-slate-600 hover:bg-slate-50"}`}><span>{label}</span><span>{count(value)}</span></button>)}</div></section>
        <section className="rounded-2xl border border-brand-border bg-white p-5"><h2 className="text-lg font-black text-brand-heading">Featured Posts</h2><div className="mt-4 space-y-4">{featured.map((post) => <Link key={post.id} href={`/blogs/${post.slug}`} className="group flex gap-3"><span className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg"><Image unoptimized src={post.coverImage} alt="" fill sizes="80px" className="object-cover" /></span><span><strong className="line-clamp-2 text-xs leading-5 text-brand-heading group-hover:text-brand-blue">{post.title}</strong><time className="mt-1 block text-[9px] text-slate-400">{formatPublishedDate(post.publishedAt)}</time></span></Link>)}</div></section>
      </aside>
    </div>
  </>;
}
