import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";
import { BlogCard } from "@/components/blog/BlogCard";
import { BlogPagination } from "@/components/blog/BlogPagination";
import {
  getBlogCategories,
  getBlogPageCount,
  getBlogsForPage,
  type BlogPost,
} from "@/data/blogs";

export function BlogListingPage({ currentPage }: { currentPage: number }) {
  const categories = getBlogCategories();
  const posts = getBlogsForPage(currentPage);
  const totalPages = getBlogPageCount();
  const [featured, ...rest] = posts;
  const regularPosts: BlogPost[] = currentPage === 1 ? rest : posts;

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-6xl *:[[id]]:scroll-mt-22">
        <Navbar />

        <section className="screen-line-after border-x border-edge bg-grid-dots">
          <div className="px-4 py-6 sm:px-8 sm:py-8">
            <div className="max-w-3xl space-y-6 py-6 sm:py-10">
              <p className="text-[11px] font-mono uppercase tracking-[0.3em] text-muted-foreground">
                Blog
              </p>
              <h1 className="max-w-4xl text-5xl font-medium tracking-tight text-balance sm:text-7xl">
                Notes on AI, product, GTM, hiring, and building teams that scale.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                Writing from Sayandeep Das on founder questions around AI visibility,
                answer engine optimization, product strategy, startup hiring, growth
                loops, and operating systems for YC-style teams.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pb-4">
              {categories.map((item) => (
                <span
                  key={item.label}
                  className="inline-flex items-center gap-2 border border-edge bg-background/80 px-3 py-2 text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground backdrop-blur-sm"
                >
                  <span className={item.label === "All" ? "text-info" : undefined}>
                    {item.label}
                  </span>
                  <span>{item.count}</span>
                </span>
              ))}
            </div>
          </div>
        </section>

        {featured && currentPage === 1 ? (
          <section className="screen-line-after border-x border-edge p-4 sm:p-8">
            <BlogCard blog={featured} featured />
          </section>
        ) : null}

        <section className="border-x border-edge p-4 sm:p-8">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {regularPosts.map((blog) => (
              <BlogCard key={blog.slug} blog={blog} />
            ))}
          </div>
        </section>

        <BlogPagination currentPage={currentPage} totalPages={totalPages} />
        <Separator />
        <Footer />
      </div>
    </main>
  );
}
