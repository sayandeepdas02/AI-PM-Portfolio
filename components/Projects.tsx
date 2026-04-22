"use client";

import { projects } from "@/data/projects";
import { Github, Globe } from "lucide-react";
import Image from "next/image";
import { Panel, PanelHeader, PanelTitle, PanelTitleSup } from "@/components/ui/panel";

export default function Projects() {
    return (
        <Panel id="projects">
            <PanelHeader>
                <PanelTitle>
                    Projects
                    <PanelTitleSup>({projects.length})</PanelTitleSup>
                </PanelTitle>
            </PanelHeader>

            {/* 3-column card grid — border-based, no shadows, flat to match design system */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-edge">
                {projects.map((project, index) => (
                    <article
                        key={index}
                        className={`
                            flex flex-col border-b border-edge transition-colors duration-150 hover:bg-accent2
                            ${index % 3 !== 2 ? "lg:border-r lg:border-edge" : ""}
                            ${index % 2 !== 1 ? "sm:border-r sm:border-edge lg:border-r-0" : "sm:border-r-0"}
                            ${index % 3 === 2 ? "lg:border-r-0" : ""}
                            ${index % 2 === 1 ? "sm:border-r-0" : ""}
                        `}
                    >
                        {/* ── Banner ── */}
                        <div className="relative h-36 bg-muted border-b border-edge flex items-center justify-center overflow-hidden shrink-0">
                            {/* subtle grid dot pattern */}
                            <div
                                className="absolute inset-0 opacity-[0.06]"
                                style={{
                                    backgroundImage:
                                        "radial-gradient(circle, currentColor 1px, transparent 1px)",
                                    backgroundSize: "18px 18px",
                                }}
                            />
                            {project.image ? (
                                <div className="relative z-10 size-16 rounded overflow-hidden ring-1 ring-edge">
                                    <Image
                                        src={project.image}
                                        alt={project.name}
                                        fill
                                        className="object-cover"
                                        unoptimized
                                    />
                                </div>
                            ) : (
                                <div className="relative z-10 size-16 rounded flex items-center justify-center bg-background ring-1 ring-edge text-2xl font-serif font-normal italic text-muted-foreground select-none">
                                    {project.name.charAt(0)}
                                </div>
                            )}
                        </div>

                        {/* ── Body ── */}
                        <div className="flex flex-col flex-1 p-4 gap-3">
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

                            {/* Tech Stack */}
                            <div className="flex flex-wrap gap-1 mt-auto pt-1">
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
                        <div className="border-t border-edge flex shrink-0">
                            {project.githubUrl && (
                                <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`${project.name} on GitHub`}
                                    className={`
                                        flex flex-1 items-center justify-center gap-1.5 py-2.5 text-xs font-mono text-muted-foreground
                                        transition-colors duration-150 hover:text-foreground hover:bg-accent
                                        ${project.liveUrl ? "border-r border-edge" : ""}
                                    `}
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
                        </div>
                    </article>
                ))}
            </div>
        </Panel>
    );
}
