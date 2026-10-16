"use client";

import { projects, ProjectType, type Project } from "@/data/projects";
import { FileText, FolderOpen, Globe, Text } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Panel, PanelHeader, PanelTitle } from "@/components/ui/panel";
import { GitHubIcon } from "@/components/ui/brand-icons";
import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

/** `short` is shown below `sm` so all three tabs fit on a phone */
const TABS: { type: ProjectType; label: string; short: string }[] = [
    { type: "indie", label: "Indie Projects", short: "Indie" },
    { type: "data-analysis", label: "Data Analysis", short: "Data Analysis" },
    { type: "case-study", label: "Product Case Studies", short: "Case Studies" },
];

/** "Notemind AI: AI Notetaker…" → "Notemind AI"; "Rapido Product Case Study" → "Rapido" */
const shortName = (name: string) => name.split(":")[0].replace(/ Product Case Study$/, "");

const iconLinkClass =
    "flex size-8 items-center justify-center rounded-md text-muted-foreground/70 transition-colors hover:bg-accent hover:text-foreground";

/** Internal paths ("/projects/…") stay in the tab; anything else opens in a new one. */
function IconLink({ href, label, children }: { href: string; label: string; children: ReactNode }) {
    if (href.startsWith("/")) {
        return (
            <Link href={href} aria-label={label} title={label} className={iconLinkClass}>
                {children}
            </Link>
        );
    }
    return (
        <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label} className={iconLinkClass}>
            {children}
        </a>
    );
}

function ProjectRow({ project }: { project: Project }) {
    const name = shortName(project.name);
    const isCaseStudy = project.type === "case-study";

    return (
        <li className="relative flex items-center gap-4 px-4 py-3.5 transition-colors hover:bg-accent2">
            <div className="relative flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-edge bg-muted/40 text-muted-foreground/50">
                {project.image ? (
                    <Image src={project.image} alt="" fill sizes="44px" className="object-cover" />
                ) : (
                    <Text className="size-4" strokeWidth={1.75} />
                )}
            </div>

            <div className="min-w-0 flex-1">
                <h3 className="flex items-center gap-2 text-[15px] font-semibold leading-snug">
                    {/* Stretched link: the whole row opens the project page */}
                    <Link
                        href={`/projects/${project.slug}`}
                        className="after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-inset focus-visible:after:ring-ring"
                    >
                        {name}
                    </Link>
                    {project.comingSoon && (
                        <span className="rounded-full bg-amber-400/90 px-1.5 py-px font-mono text-[9px] font-semibold uppercase tracking-wider text-amber-950 select-none">
                            Soon
                        </span>
                    )}
                </h3>
                <p className="mt-0.5 text-sm text-muted-foreground text-pretty">{project.tagline}</p>
            </div>

            {!project.comingSoon && (
                <div className="relative z-10 flex shrink-0 items-center gap-0.5">
                    {project.githubUrl && (
                        <IconLink href={project.githubUrl} label={`${name} on GitHub`}>
                            <GitHubIcon width={16} height={16} />
                        </IconLink>
                    )}
                    {project.liveUrl && (
                        <IconLink
                            href={isCaseStudy ? `/projects/${project.slug}` : project.liveUrl}
                            label={isCaseStudy ? `Open ${name} case study` : `Visit ${name}`}
                        >
                            {isCaseStudy ? (
                                <FileText className="size-4" strokeWidth={1.5} />
                            ) : (
                                <Globe className="size-4" strokeWidth={1.5} />
                            )}
                        </IconLink>
                    )}
                </div>
            )}
        </li>
    );
}

export default function Projects() {
    const [activeTab, setActiveTab] = useState<ProjectType>("indie");

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
                {TABS.map(({ type, label, short }) => {
                    const count = projects.filter((p) => p.type === type).length;
                    const isActive = activeTab === type;

                    return (
                        <button
                            key={type}
                            onClick={() => setActiveTab(type)}
                            className={cn(
                                "flex-1 min-w-[100px] px-2 py-3 text-xs font-mono font-medium border-r last:border-r-0 border-edge transition-colors duration-150 relative text-center select-none cursor-pointer whitespace-nowrap",
                                isActive
                                    ? "bg-accent/30 text-foreground"
                                    : "text-muted-foreground hover:text-foreground hover:bg-accent/10"
                            )}
                        >
                            <span className="relative z-10">
                                <span className="sm:hidden">{short}</span>
                                <span className="hidden sm:inline">{label}</span>
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

            {/* List / Empty State with fade animation */}
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
                        <motion.ul
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.15 }}
                            className="py-2"
                        >
                            {filteredProjects.map((project) => (
                                <ProjectRow key={project.slug} project={project} />
                            ))}
                        </motion.ul>
                    )}
                </AnimatePresence>
            </div>
        </Panel>
    );
}
