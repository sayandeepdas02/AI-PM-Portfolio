"use client";

import { projects } from "@/data/projects";
import { Github, Globe } from "lucide-react";
import Image from "next/image";
import { Panel, PanelHeader, PanelTitle, PanelTitleSup } from "@/components/ui/panel";

/** Per-category banner gradients — vibrant but still tasteful */
const CATEGORY_GRADIENTS: Record<string, string> = {
    "AI / SaaS":        "from-indigo-500 via-blue-500 to-violet-600",
    "Collaboration":    "from-zinc-800 via-zinc-700 to-zinc-900",
    "FinTech":          "from-rose-500 via-red-500 to-red-600",
    "Productivity":     "from-violet-600 via-purple-500 to-fuchsia-600",
    "AI / Productivity":"from-teal-500 via-emerald-500 to-cyan-600",
    "Enterprise":       "from-orange-500 via-amber-500 to-orange-600",
};

const DEFAULT_GRADIENT = "from-zinc-400 via-zinc-500 to-zinc-600";

export default function Projects() {
    return (
        <Panel id="projects">
            <PanelHeader>
                <PanelTitle>
                    Projects
                    <PanelTitleSup>({projects.length})</PanelTitleSup>
                </PanelTitle>
            </PanelHeader>

            {/* Padded grid — gap creates breathing room without border math */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
                {projects.map((project, index) => {
                    const gradient = CATEGORY_GRADIENTS[project.category] ?? DEFAULT_GRADIENT;
                    return (
                        <article
                            key={index}
                            className="flex flex-col rounded-xl border border-edge overflow-hidden bg-background transition-colors duration-150 hover:bg-accent2"
                        >
                            {/* ── Banner ── */}
                            <div className={`relative h-44 bg-gradient-to-br ${gradient} flex items-center justify-center overflow-hidden shrink-0`}>
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
                                    <div className="relative z-10 size-20 rounded-2xl overflow-hidden ring-2 ring-white/20 shadow-lg">
                                        <Image
                                            src={project.image}
                                            alt={project.name}
                                            fill
                                            className="object-cover"
                                            unoptimized
                                        />
                                    </div>
                                ) : (
                                    <div className="relative z-10 size-20 rounded-2xl flex items-center justify-center bg-white/10 ring-2 ring-white/20 text-3xl font-serif font-normal italic text-white select-none">
                                        {project.name.charAt(0)}
                                    </div>
                                )}
                            </div>

                            {/* ── Body ── */}
                            <div className="flex flex-col flex-1 px-4 pt-4 pb-3 gap-2.5">
                                {/* Category pill */}
                                <span className="self-start px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider rounded border border-muted-foreground/20 bg-muted text-muted-foreground select-none">
                                    {project.category}
                                </span>

                                {/* Title */}
                                <h3 className="text-sm font-medium leading-snug text-balance">
                                    {project.name}
                                </h3>

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
                                                    project.liveUrl ? "border-r border-edge" : "",
                                                ].join(" ")}
                                            >
                                                <Github className="size-3.5" strokeWidth={1.5} />
                                                <span>GitHub</span>
                                            </a>
                                        )}
                                        {project.liveUrl && (
                                            <a
                                                href={project.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={`${project.name} live demo`}
                                                className="flex flex-1 items-center justify-center gap-1.5 py-2.5 text-xs font-mono text-muted-foreground transition-colors duration-150 hover:text-foreground hover:bg-accent"
                                            >
                                                <Globe className="size-3.5" strokeWidth={1.5} />
                                                <span>Live</span>
                                            </a>
                                        )}
                                    </>
                                )}
                            </div>
                        </article>
                    );
                })}
            </div>
        </Panel>
    );
}
