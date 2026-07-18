import { cn } from "@/lib/utils";

const coverClasses: Record<string, string> = {
  "grid-blue":
    "bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.22),transparent_40%),linear-gradient(135deg,#ffffff_0%,#eff6ff_45%,#dbeafe_100%)] text-slate-900",
  "signal-black":
    "bg-[radial-gradient(circle_at_top_right,rgba(96,165,250,0.24),transparent_35%),linear-gradient(135deg,#0f172a_0%,#111827_60%,#1e293b_100%)] text-white",
  "paper-sky":
    "bg-[radial-gradient(circle_at_top_left,rgba(186,230,253,0.4),transparent_30%),linear-gradient(135deg,#f8fafc_0%,#f0f9ff_50%,#dbeafe_100%)] text-slate-900",
  "ember-orange":
    "bg-[radial-gradient(circle_at_bottom_left,rgba(251,146,60,0.26),transparent_32%),linear-gradient(135deg,#fff7ed_0%,#fed7aa_55%,#fb923c_100%)] text-slate-950",
  "mint-lines":
    "bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.24),transparent_30%),linear-gradient(135deg,#ecfdf5_0%,#d1fae5_45%,#99f6e4_100%)] text-slate-950",
  "cobalt-graph":
    "bg-[radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.24),transparent_30%),linear-gradient(135deg,#dbeafe_0%,#93c5fd_45%,#2563eb_100%)] text-slate-950",
};

export function BlogCover({
  title,
  category,
  coverStyle,
  featured = false,
}: {
  title: string;
  category: string;
  coverStyle: string;
  featured?: boolean;
}) {
  const wordmark = featured ? "OPERATOR NOTES" : "SAYANDEEP DAS";

  return (
    <div
      className={cn(
        "relative overflow-hidden border-b border-edge",
        featured ? "min-h-[280px] sm:min-h-[360px]" : "min-h-[220px]",
        coverClasses[coverStyle] ?? coverClasses["grid-blue"]
      )}
    >
      <div className="absolute inset-0 opacity-50 [background-image:radial-gradient(circle,rgba(100,116,139,0.22)_1px,transparent_1px)] [background-size:18px_18px]" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_0%,rgba(255,255,255,0.15)_55%,transparent_100%)]" />
      <div className="absolute left-4 top-4 flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.28em] opacity-80">
        <span>{wordmark}</span>
        <span className="opacity-50">×</span>
        <span>{category}</span>
      </div>
      <div className="absolute right-5 top-5 h-16 w-16 rounded-full border border-current/15" />
      <div className="absolute bottom-5 left-5 right-5">
        <p
          className={cn(
            "max-w-[16ch] font-serif italic leading-[0.92] tracking-tight",
            featured ? "text-5xl sm:text-7xl" : "text-3xl"
          )}
        >
          {title.split(" ").slice(0, 4).join(" ")}
        </p>
      </div>
    </div>
  );
}
