"use client";

import { projects, ProjectType } from "@/data/projects";
import { Github, Globe, PlaySquare, FolderOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Panel, PanelHeader, PanelTitle } from "@/components/ui/panel";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

/** Per-category banner gradients — vibrant but still tasteful */
const CATEGORY_GRADIENTS: Record<string, string> = {
    "AI / SaaS": "from-indigo-500 via-blue-500 to-violet-600",
    "Collaboration": "from-zinc-800 via-zinc-700 to-zinc-900",
    "FinTech": "from-rose-500 via-red-500 to-red-600",
    "Productivity": "from-violet-600 via-purple-500 to-fuchsia-600",
    "AI / Productivity": "from-teal-500 via-emerald-500 to-cyan-600",
    "Enterprise": "from-orange-500 via-amber-500 to-orange-600",
};

/** Brand-matching banner gradients for specific projects */
const PROJECT_GRADIENTS: Record<string, string> = {
    // Existing projects
    "hyperglork-ai": "from-yellow-300 via-yellow-400 to-amber-300",
    "notemind-ai": "from-[#FAF6EE] via-[#F7F3E9] to-[#EFECE1]",
    "fluxberry-ai": "from-lime-300 via-lime-400 to-lime-500",
    
    // Data Science projects
    "walmart-sql-python-analysis": "from-blue-600 via-sky-500 to-blue-700",
    "coffee-brand-expansion-analysis": "from-stone-800 via-amber-900 to-amber-950",
    
    // Case Studies
    "rapido-case-study": "from-yellow-400 via-amber-400 to-yellow-500",
    "makemytrip-case-study": "from-red-500 via-rose-500 to-red-600",
    "meesho-case-study": "from-fuchsia-900 via-pink-950 to-purple-950",
    "razorpay-case-study": "from-blue-500 via-cyan-500 to-indigo-600",
    "groww-case-study": "from-emerald-500 via-teal-500 to-emerald-600",
    "firstclub-case-study": "from-green-950 via-emerald-900 to-stone-900",
};

const DEFAULT_GRADIENT = "from-zinc-400 via-zinc-500 to-zinc-600";

export default function Projects() {
    const [activeTab, setActiveTab] = useState<ProjectType>("tech");

    const filteredProjects = projects.filter((p) => p.type === activeTab);

    return (
        <Panel id="projects">
            <PanelHeader>
                <PanelTitle>
                    Projects
                </PanelTitle>
            </PanelHeader>

            {/* Tab Switched Buttons */}
            <div className="flex border-b border-edge bg-accent2/10 overflow-x-auto no-scrollbar">
                {(["tech", "data-science", "case-study"] as const).map((tab) => {
                    const label =
                        tab === "tech"
                            ? "Tech & Indie"
                            : tab === "data-science"
                            ? "Data Science"
                            : "Case Studies";
                    const count = projects.filter((p) => p.type === tab).length;
                    const isActive = activeTab === tab;

                    return (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={cn(
                                "flex-1 min-w-[120px] py-3 text-xs font-mono font-medium border-r last:border-r-0 border-edge transition-colors duration-150 relative text-center select-none cursor-pointer",
                                isActive
                                    ? "bg-accent/30 text-foreground"
                                    : "text-muted-foreground hover:text-foreground hover:bg-accent/10"
                            )}
                        >
                            <span className="relative z-10">
                                {label}
                                <span
                                    className={cn(
                                        "ml-1.5 text-[10px] font-sans font-normal",
                                        isActive ? "text-muted-foreground" : "text-muted-foreground/50"
                                    )}
                                >
                                    ({count})
                                </span>
                            </span>
                            {isActive && (
                                <motion.div
                                    layoutId="activeProjectsTab"
                                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-foreground"
                                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                />
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Grid Content / Empty State with fade animation */}
            <div className="relative min-h-[220px]">
                <AnimatePresence mode="wait">
                    {filteredProjects.length === 0 ? (
                        <motion.div
                            key="empty-state"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.15 }}
                            className="flex flex-col items-center justify-center py-16 px-4 text-center"
                        >
                            <div className="size-10 rounded-lg bg-accent/40 border border-edge flex items-center justify-center text-muted-foreground/70 mb-3">
                                <FolderOpen className="size-5 text-muted-foreground/60" strokeWidth={1.5} />
                            </div>
                            <h3 className="text-xs font-mono font-medium text-foreground">Coming Soon</h3>
                            <p className="text-[11px] text-muted-foreground mt-1 max-w-xs leading-normal">
                                Projects in this category are currently being curated and will be added soon.
                              </p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.15 }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-5"
                        >
                            {filteredProjects.map((project, index) => {
                                const gradient = PROJECT_GRADIENTS[project.slug] ?? CATEGORY_GRADIENTS[project.category] ?? DEFAULT_GRADIENT;
                                return (
                                    <article
                                        key={index}
                                        className="flex flex-col rounded-xl border border-edge overflow-hidden bg-background transition-colors duration-150 hover:bg-accent2"
                                    >
                                        {/* ── Banner ── */}
                                        <Link href={`/projects/${project.slug}`} className={`relative h-44 bg-gradient-to-br ${gradient} flex items-center justify-center overflow-hidden shrink-0 group`}>
                                            {/* subtle radial noise overlay for depth */}
                                            <div className="absolute inset-0 opacity-20 mix-blend-overlay"
                                                style={{
                                                    backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
                                                    backgroundSize: "150px 150px",
                                                }}
                                            />
                                            {/* ── Coming Soon badge ── */}
                                            {project.comingSoon && (
                                                <span className="absolute top-3 right-3 z-20 px-2 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider rounded-full bg-amber-400/90 text-amber-950 select-none backdrop-blur-sm">
                                                    Coming Soon
                                                </span>
                                            )}
                                            {project.image ? (
                                                <div className="relative z-10 size-20 rounded-2xl overflow-hidden ring-2 ring-white/20 shadow-lg transition-transform duration-300 group-hover:scale-105">
                                                    <Image
                                                        src={project.image}
                                                        alt={project.name}
                                                        fill
                                                        className="object-cover"
                                                        unoptimized
                                                    />
                                                </div>
                                            ) : (
                                                <div className="relative z-10 size-20 rounded-2xl flex items-center justify-center bg-white/10 ring-2 ring-white/20 text-3xl font-serif font-normal italic text-white select-none transition-transform duration-300 group-hover:scale-105">
                                                    {project.name.charAt(0)}
                                                </div>
                                            )}
                                        </Link>

                                        {/* ── Body ── */}
                                        <div className="flex flex-col flex-1 px-4 pt-4 pb-3 gap-2.5">
                                            {/* Category pill */}
                                            <span className="self-start px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider rounded border border-muted-foreground/20 bg-muted text-muted-foreground select-none">
                                                {project.category}
                                            </span>

                                            {/* Title */}
                                            <Link href={`/projects/${project.slug}`} className="hover:underline">
                                                <h3 className="text-sm font-medium leading-snug text-balance">
                                                    {project.name}
                                                </h3>
                                            </Link>

                                            {/* Description */}
                                            {project.description && (
                                                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                                                    {project.description}
                                                </p>
                                            )}

                                            {/* Tech Stack — pushed to bottom */}
                                            <div className="flex flex-wrap gap-1 mt-auto pt-2">
                                                {project.techStack.slice(0, 4).map((tech) => (
                                                    <span
                                                        key={tech}
                                                        className="px-1.5 py-0.5 text-[10px] font-mono rounded border border-muted-foreground/15 bg-muted text-muted-foreground"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                                {project.techStack.length > 4 && (
                                                    <span className="px-1.5 py-0.5 text-[10px] font-mono rounded border border-muted-foreground/15 bg-muted text-muted-foreground">
                                                        +{project.techStack.length - 4}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* ── Footer ── */}
                                        <div className="border-t border-edge flex shrink-0 mt-1">
                                            {project.comingSoon ? (
                                                <span className="flex flex-1 items-center justify-center gap-1.5 py-2.5 text-xs font-mono text-muted-foreground/50 select-none">
                                                    In Development
                                                </span>
                                            ) : (
                                                <>
                                                    {project.githubUrl && (
                                                        <a
                                                            href={project.githubUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            aria-label={`${project.name} on GitHub`}
                                                            className={[
                                                                "flex flex-1 items-center justify-center gap-1.5 py-2.5 text-xs font-mono",
                                                                "text-muted-foreground transition-colors duration-150 hover:text-foreground hover:bg-accent",
                                                                (project.liveUrl || project.demoUrl) ? "border-r border-edge" : "",
                                                            ].join(" ")}
                                                        >
                                                            <Github className="size-3.5" strokeWidth={1.5} />
                                                            <span>GitHub</span>
                                                        </a>
                                                      )}
                                                      {project.liveUrl && (
                                                          project.type === "case-study" ? (
                                                              <Link
                                                                  href={`/projects/${project.slug}`}
                                                                  className={[
                                                                      "flex flex-1 items-center justify-center gap-1.5 py-2.5 text-xs font-mono",
                                                                      "text-muted-foreground transition-colors duration-150 hover:text-foreground hover:bg-accent",
                                                                      project.demoUrl ? "border-r border-edge" : "",
                                                                  ].join(" ")}
                                                              >
                                                                  <Globe className="size-3.5" strokeWidth={1.5} />
                                                                  <span>View Case Study</span>
                                                              </Link>
                                                          ) : (
                                                              <a
                                                                  href={project.liveUrl}
                                                                  target="_blank"
                                                                  rel="noopener noreferrer"
                                                                  aria-label={`${project.name} live demo`}
                                                                  className={[
                                                                      "flex flex-1 items-center justify-center gap-1.5 py-2.5 text-xs font-mono",
                                                                      "text-muted-foreground transition-colors duration-150 hover:text-foreground hover:bg-accent",
                                                                      project.demoUrl ? "border-r border-edge" : "",
                                                                  ].join(" ")}
                                                              >
                                                                  <Globe className="size-3.5" strokeWidth={1.5} />
                                                                  <span>Live</span>
                                                              </a>
                                                          )
                                                      )}
                                                      {project.demoUrl && (
                                                          <Link
                                                              href={`/projects/${project.slug}`}
                                                              className="flex flex-1 items-center justify-center gap-1.5 py-2.5 text-xs font-mono text-muted-foreground transition-colors duration-150 hover:text-foreground hover:bg-accent"
                                                          >
                                                              <PlaySquare className="size-3.5" strokeWidth={1.5} />
                                                              <span>Demo</span>
                                                          </Link>
                                                      )}
                                                  </>
                                              )}
                                          </div>
                                      </article>
                                  );
                              })}
                          </motion.div>
                      )}
                  </AnimatePresence>
              </div>
          </Panel>
      );
  }
