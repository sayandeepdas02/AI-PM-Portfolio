import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";
import { BlogCover } from "@/components/blog/BlogCover";
import { blogs, getBlogBySlug } from "@/data/blogs";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}

export function generateStaticParams() {
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    return {};
  }

  const canonical = `https://ai.sayandeep.space/blog/${blog.slug}`;

  return {
    title: blog.seoTitle,
    description: blog.seoDescription,
    keywords: blog.keywords,
    alternates: { canonical },
    openGraph: {
      title: blog.seoTitle,
      description: blog.seoDescription,
      url: canonical,
      images: [{ url: "https://ai.sayandeep.space/og-image.jpg", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.seoTitle,
      description: blog.seoDescription,
      images: ["https://ai.sayandeep.space/og-image.jpg"],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.seoDescription,
    datePublished: blog.publishedAt,
    dateModified: blog.publishedAt,
    author: {
      "@type": "Person",
      name: "Sayandeep Das",
      url: "https://ai.sayandeep.space",
    },
    publisher: {
      "@type": "Person",
      name: "Sayandeep Das",
      url: "https://ai.sayandeep.space",
    },
    mainEntityOfPage: `https://ai.sayandeep.space/blog/${blog.slug}`,
    keywords: blog.keywords.join(", "),
  };

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-5xl *:[[id]]:scroll-mt-22">
        <Navbar />

        <article className="border-x border-edge">
          <div className="px-4 py-6 sm:px-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-4" />
              Back to Blog
            </Link>
          </div>

          <BlogCover
            title={blog.title}
            category={blog.category}
            coverStyle={blog.coverStyle}
            featured
          />

          <div className="grid gap-8 px-4 py-8 sm:px-8 lg:grid-cols-[minmax(0,1fr)_240px]">
            <div className="space-y-8">
              <header className="space-y-5">
                <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
                  <span className="text-info">{blog.category}</span>
                  <span>•</span>
                  <time dateTime={blog.publishedAt}>{formatDate(blog.publishedAt)}</time>
                  <span>•</span>
                  <span>{blog.readTime}</span>
                </div>

                <h1 className="max-w-3xl text-4xl font-medium tracking-tight text-balance sm:text-6xl">
                  {blog.title}
                </h1>
                <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
                  {blog.body.intro}
                </p>
              </header>

              <div className="space-y-8">
                {blog.body.sections.map((section) => (
                  <section key={section.title} className="space-y-4">
                    <h2 className="text-2xl font-medium tracking-tight">
                      {section.title}
                    </h2>
                    <div className="space-y-4 text-base leading-8 text-muted-foreground">
                      {section.paragraphs.map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      ))}
                    </div>
                    {section.bullets ? (
                      <ul className="space-y-2 border-l border-dashed border-edge pl-5 text-base leading-7 text-muted-foreground">
                        {section.bullets.map((item) => (
                          <li key={item} className="list-disc">
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </section>
                ))}
              </div>

              <section className="rounded-2xl border border-edge bg-accent2/40 p-6">
                <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
                  Key Takeaway
                </p>
                <p className="mt-3 text-lg leading-8 text-foreground">
                  {blog.body.takeaway}
                </p>
              </section>
            </div>

            <aside className="space-y-5 border-t border-edge pt-6 lg:border-t-0 lg:border-l lg:pl-6 lg:pt-0">
              <div className="space-y-3">
                <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
                  Explore
                </p>
                <div className="space-y-2">
                  <Link href="/#about" className="flex items-center justify-between text-sm hover:text-info">
                    <span>About Me</span>
                    <ArrowUpRight className="size-4" />
                  </Link>
                  <Link href="/#experience" className="flex items-center justify-between text-sm hover:text-info">
                    <span>Experience</span>
                    <ArrowUpRight className="size-4" />
                  </Link>
                  <Link href="/#projects" className="flex items-center justify-between text-sm hover:text-info">
                    <span>Projects</span>
                    <ArrowUpRight className="size-4" />
                  </Link>
                  <Link href="/#education" className="flex items-center justify-between text-sm hover:text-info">
                    <span>Education</span>
                    <ArrowUpRight className="size-4" />
                  </Link>
                  <Link href="/resume" className="flex items-center justify-between text-sm hover:text-info">
                    <span>Resume</span>
                    <ArrowUpRight className="size-4" />
                  </Link>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
                  Keywords
                </p>
                <div className="flex flex-wrap gap-2">
                  {blog.keywords.slice(0, 5).map((keyword) => (
                    <span
                      key={keyword}
                      className="rounded-full border border-edge px-3 py-1 text-xs text-muted-foreground"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </article>

        <Separator />
        <Footer />
      </div>
    </main>
  );
}
