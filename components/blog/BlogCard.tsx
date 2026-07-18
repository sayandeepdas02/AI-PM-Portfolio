import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { BlogPost } from "@/data/blogs";
import { BlogCover } from "@/components/blog/BlogCover";

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}

export function BlogCard({
  blog,
  featured = false,
}: {
  blog: BlogPost;
  featured?: boolean;
}) {
  return (
    <article className="flex h-full flex-col border border-edge bg-background transition-colors hover:bg-accent2/70">
      <Link href={`/blog/${blog.slug}`} className="block">
        <BlogCover
          title={blog.title}
          category={blog.category}
          coverStyle={blog.coverStyle}
          featured={featured}
        />
      </Link>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
          <span className="text-info">{blog.category}</span>
          <span>•</span>
          <time dateTime={blog.publishedAt}>{formatDate(blog.publishedAt)}</time>
        </div>

        <div className="space-y-3">
          <Link href={`/blog/${blog.slug}`}>
            <h3 className={featured ? "text-3xl font-medium leading-tight text-balance" : "text-2xl font-medium leading-tight text-balance"}>
              {blog.title}
            </h3>
          </Link>
          <p className={featured ? "max-w-2xl text-base leading-7 text-muted-foreground" : "text-sm leading-6 text-muted-foreground"}>
            {blog.excerpt}
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 pt-4 text-sm text-muted-foreground">
          <div className="flex flex-wrap items-center gap-2">
            <span>Sayandeep Das</span>
            <span>•</span>
            <span>{blog.readTime}</span>
          </div>

          <Link
            href={`/blog/${blog.slug}`}
            className="inline-flex items-center gap-1 text-foreground transition-colors hover:text-info"
          >
            Read article
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
