import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogListingPage } from "@/components/blog/BlogListingPage";
import { getBlogPageCount, getBlogsForPage } from "@/data/blogs";

type PageProps = {
  params: Promise<{ page: string }>;
};

export function generateStaticParams() {
  return Array.from({ length: Math.max(0, getBlogPageCount() - 1) }, (_, index) => ({
    page: String(index + 2),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { page } = await params;
  const pageNumber = Number(page);

  if (!Number.isInteger(pageNumber) || pageNumber < 2 || pageNumber > getBlogPageCount()) {
    return {};
  }

  const canonical = `https://ai.sayandeep.space/blog/page/${pageNumber}`;

  return {
    title: `Blog Page ${pageNumber}`,
    description: `Page ${pageNumber} of Sayandeep Das blog posts on AI, GTM, product strategy, startup hiring, SEO, and scaling teams.`,
    alternates: { canonical },
    openGraph: {
      title: `Blog Page ${pageNumber} | Sayandeep Das`,
      description: `Page ${pageNumber} of Sayandeep Das blog posts on AI, GTM, product strategy, startup hiring, SEO, and scaling teams.`,
      url: canonical,
      images: [{ url: "https://ai.sayandeep.space/og-image.jpg", width: 1200, height: 630 }],
    },
  };
}

export default async function PaginatedBlogPage({ params }: PageProps) {
  const { page } = await params;
  const pageNumber = Number(page);
  const pageCount = getBlogPageCount();

  if (!Number.isInteger(pageNumber) || pageNumber < 2 || pageNumber > pageCount) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `https://ai.sayandeep.space/blog/page/${pageNumber}#page`,
    url: `https://ai.sayandeep.space/blog/page/${pageNumber}`,
    name: `Sayandeep Das Blog - Page ${pageNumber}`,
    description: `Page ${pageNumber} of startup writing by Sayandeep Das.`,
    hasPart: getBlogsForPage(pageNumber).map((blog) => ({
      "@type": "BlogPosting",
      headline: blog.title,
      url: `https://ai.sayandeep.space/blog/${blog.slug}`,
      datePublished: blog.publishedAt,
      author: {
        "@type": "Person",
        name: "Sayandeep Das",
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogListingPage currentPage={pageNumber} />
    </>
  );
}
