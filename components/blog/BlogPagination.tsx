import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

function getPageHref(page: number) {
  return page === 1 ? "/blog" : `/blog/page/${page}`;
}

export function BlogPagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  return (
    <nav
      aria-label="Blog pagination"
      className="screen-line-before border-x border-edge px-4 py-5"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          href={getPageHref(Math.max(1, currentPage - 1))}
          aria-disabled={currentPage === 1}
          className={cn(
            "inline-flex items-center gap-2 rounded-md border border-edge px-3 py-2 text-xs font-mono uppercase tracking-[0.2em] transition-colors",
            currentPage === 1
              ? "pointer-events-none opacity-40"
              : "hover:bg-accent2"
          )}
        >
          <ChevronLeft className="size-4" />
          Previous
        </Link>

        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }, (_, index) => {
            const page = index + 1;
            const isActive = currentPage === page;

            return (
              <Link
                key={page}
                href={getPageHref(page)}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "inline-flex h-10 w-10 items-center justify-center rounded-md border text-sm font-mono transition-colors",
                  isActive
                    ? "border-foreground bg-foreground text-background"
                    : "border-edge text-muted-foreground hover:bg-accent2 hover:text-foreground"
                )}
              >
                {page}
              </Link>
            );
          })}
        </div>

        <Link
          href={getPageHref(Math.min(totalPages, currentPage + 1))}
          aria-disabled={currentPage === totalPages}
          className={cn(
            "inline-flex items-center gap-2 rounded-md border border-edge px-3 py-2 text-xs font-mono uppercase tracking-[0.2em] transition-colors",
            currentPage === totalPages
              ? "pointer-events-none opacity-40"
              : "hover:bg-accent2"
          )}
        >
          Next
          <ChevronRight className="size-4" />
        </Link>
      </div>
    </nav>
  );
}
