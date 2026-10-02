import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { BlogCard } from "./blog-card";
import type { BlogContentBlock, BlogPost } from "@/features/blogs/types/blogs.types";
import { formatPublishedDate } from "@/features/blogs/utils/blogs.utils";
import { BlogFeedbackForm } from "./blog-feedback-form";

function ContentBlock({ block }: { block: BlogContentBlock }) {
  if (block.type === "heading") return <h2 className="mt-9 text-2xl font-black text-[#1B519F]">{block.text}</h2>;
  if (block.type === "list") return <ul className="my-5 list-disc space-y-2 pl-6 text-base leading-8 text-slate-700">{block.items?.map((item) => <li key={item}>{item}</li>)}</ul>;
  if (block.type === "callout") return <aside className="my-7 rounded-xl border-l-4 border-[#F59223] bg-[#FFF8E8] p-5 text-sm leading-7 text-[#704A00]">{block.text}</aside>;
  return <p className="mt-5 text-base leading-8 text-slate-700">{block.text}</p>;
}

type BlogDetailsProps = {
  post: BlogPost;
  related: BlogPost[];
  previous?: BlogPost;
  next?: BlogPost;
  current: number;
  total: number;
};

export function BlogDetails({ post, related }: BlogDetailsProps){

  return <>
    <article className="bg-white py-6 sm:py-8">
      <Container>
        <header className="mx-auto max-w-[900px] text-center">
          <span className="rounded-md bg-[#1B519F] px-3 py-1.5 text-[10px] font-black uppercase text-white">{post.category}</span>
          <h1 className="mt-5 text-[clamp(2.3rem,5vw,4.2rem)] font-black leading-tight tracking-[-.04em] text-[#061B49]">{post.title}</h1>
          <time dateTime={post.publishedAt} className="mt-4 block text-sm font-bold text-slate-500">{formatPublishedDate(post.publishedAt)}</time>
          
        </header>
        <div className="relative mx-auto mt-8 aspect-[16/7] max-w-[1120px] overflow-hidden rounded-2xl">
          <Image src={post.coverImage} alt={post.coverImageAlt} fill priority sizes="(max-width:1200px) 100vw,1120px" className="object-cover" />
        </div>
        <div className="mx-auto mt-10 max-w-[800px]">
          <p className="text-xl font-semibold leading-9 text-[#263B5C]">{post.excerpt}</p>
          {post.content.map((block, index) => <ContentBlock key={`${block.type}-${index}`} block={block} />)}
          <div className="mt-10 flex flex-wrap gap-2 border-t border-slate-200 pt-6">{post.tags.map((tag) => <span key={tag} className="rounded-lg bg-[#EEF5FF] px-3 py-2 text-xs font-bold text-[#1B519F]">{tag}</span>)}</div>
          {post.relatedTrainingSlug ? <Link href={`/opportunities/training/${post.relatedTrainingSlug}`} className="mt-6 inline-flex text-sm font-black hover:underline !border-0 !bg-transparent !text-black hover:!bg-transparent hover:!text-black">See More...</Link> : null}
        </div>
      </Container>
    </article>

      <BlogFeedbackForm
        postTitle={post.title}
        postSlug={post.slug}
      />
    {related.length ? <section className="bg-[#F7FAFF] py-12"><Container><h2 className="text-2xl font-black text-[#1B519F]">Related Posts</h2><div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{related.map((item) => <BlogCard key={item.id} post={item} />)}</div></Container></section> : null}
  </>;
}


