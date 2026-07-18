import type { Metadata } from "next";
import { BlogListingPage } from "@/components/blog/BlogListingPage";
import { blogs } from "@/data/blogs";

const canonical = "https://ai.sayandeep.space/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Blog by Sayandeep Das on AI, GTM, product strategy, recruitment, SEO, AEO, startup growth, and scaling venture-backed teams.",
  keywords: [
    "Sayandeep Das blog",
    "Sayandeep blog",
    "GTM Engineer Sayandeep",
    "Product Manager Sayandeep",
    "AI blog by Sayandeep Das",
  ],
  alternates: {
    canonical,
  },
  openGraph: {
    title: "Blog | Sayandeep Das",
    description:
      "Notes on AI, product, GTM, startup hiring, SEO, AEO, and scaling products from Sayandeep Das.",
    url: canonical,
    images: [{ url: "https://ai.sayandeep.space/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Sayandeep Das",
    description:
      "Notes on AI, product, GTM, startup hiring, SEO, AEO, and scaling products from Sayandeep Das.",
    images: ["https://ai.sayandeep.space/og-image.jpg"],
  },
};

export default function BlogIndexPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${canonical}#page`,
    url: canonical,
    name: "Sayandeep Das Blog",
    description: metadata.description,
    about: {
      "@type": "Person",
      name: "Sayandeep Das",
      url: "https://ai.sayandeep.space",
    },
    hasPart: blogs.slice(0, 9).map((blog) => ({
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
      <BlogListingPage currentPage={1} />
    </>
  );
}
