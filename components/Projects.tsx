"use client";

import { projects } from "@/data/projects";
import { LinkIcon, ChevronDown } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { Panel, PanelHeader, PanelTitle, PanelTitleSup } from "@/components/ui/panel";

export default function Projects() {
    const [expandedProjects, setExpandedProjects] = useState<Set<number>>(new Set());

    const toggleProject = (index: number) => {
        const newExpanded = new Set(expandedProjects);
        if (newExpanded.has(index)) {
            newExpanded.delete(index);
        } else {
            newExpanded.add(index);
        }
        setExpandedProjects(newExpanded);
    };

    return (
        <Panel id="projects">
            <PanelHeader>
                <PanelTitle>
                    Projects
                    <PanelTitleSup>({projects.length})</PanelTitleSup>
                </PanelTitle>
            </PanelHeader>

            <div>
                {projects.map((project, index) => {
                    const isExpanded = expandedProjects.has(index);
                    return (
                        <div
                            key={index}
                            className="flex items-center hover:bg-accent2 transition-colors"
                        >
                            {/* Project Icon/Logo */}
                            {project.image ? (
                                <div className="mx-4 flex size-6 shrink-0 select-none relative overflow-hidden rounded">
                                    <Image
                                        src={project.image}
                                        alt={project.name}
                                        width={24}
                                        height={24}
                                        className="object-cover"
                                        unoptimized
                                    />
                                </div>
                            ) : (
                                <div
                                    className="mx-4 flex size-6 shrink-0 items-center justify-center rounded-lg border border-muted-foreground/15 bg-muted text-muted-foreground ring-1 ring-edge ring-offset-1 ring-offset-background select-none text-xs font-mono"
                                >
                                    {project.name.charAt(0)}
                                </div>
                            )}

                            <div className="flex-1 border-l border-dashed border-edge">
                                <div className="flex w-full items-center gap-2 p-4 pr-2">
                                    <div className="flex-1">
                                        <h3 className="mb-2 leading-snug font-medium text-balance">
                                            {project.name}
                                        </h3>

                                        {/* Expand/Collapse Button */}
                                        {project.details && project.details.length > 0 && (
                                            <button
                                                onClick={() => toggleProject(index)}
                                                className="w-auto flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors mb-3"
                                            >
                                                <span>{isExpanded ? "Hide details" : "Show details"}</span>
                                                <ChevronDown className={`size-3.5 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
                                            </button>
                                        )}

                                        {/* Expandable Details */}
                                        {project.details && project.details.length > 0 && (
                                            <div 
                                                className={`grid transition-all duration-300 ease-in-out ${isExpanded ? "grid-rows-[1fr] opacity-100 mb-4" : "grid-rows-[0fr] opacity-0"}`}
                                            >
                                                <div className="overflow-hidden">
                                                    <ul className="space-y-1.5">
                                                        {project.details.map((detail, i) => (
                                                            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                                                <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0 bg-muted-foreground" />
                                                                <span>{detail}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        )}

                                        {/* Tech Stack */}
                                        <div className="flex flex-wrap gap-1.5 mt-2">
                                            {project.techStack.map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="px-2 py-0.5 text-xs rounded border border-muted-foreground/15 bg-muted text-muted-foreground"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Link Icon */}
                                    {(project.githubUrl || project.liveUrl) && (
                                        <a
                                            className="relative flex size-6 shrink-0 items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                                            href={project.liveUrl || project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <LinkIcon className="size-4" />
                                            <span className="sr-only">Open Project Link</span>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Panel>
    );
}
