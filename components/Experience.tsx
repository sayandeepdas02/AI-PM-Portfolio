"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

import { experiences, type Experience as ExperienceEntry } from "@/data/experience";
import { Panel, PanelHeader, PanelTitle } from "@/components/ui/panel";
import { cn } from "@/lib/utils";

const PREVIEW_COUNT = 2;

function ExperienceItem({ job }: { job: ExperienceEntry }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const hasOverflow = job.description.length > PREVIEW_COUNT;
    const visibleItems = isExpanded ? job.description : job.description.slice(0, PREVIEW_COUNT);

    const handleToggle = () => {
        if (isExpanded) {
            containerRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
            });
        }

        setIsExpanded((current) => !current);
    };

    return (
        <motion.div
            layout
            transition={{ layout: { duration: 0.32, ease: [0.22, 1, 0.36, 1] } }}
            className="flex items-start transition-colors hover:bg-accent2"
        >
            {job.logo ? (
                <div className="relative mx-3 mt-4 flex size-10 shrink-0 select-none overflow-hidden rounded-lg sm:mx-4">
                    <Image
                        src={job.logo}
                        alt={job.company}
                        width={40}
                        height={40}
                        className="object-cover"
                        unoptimized
                    />
                </div>
            ) : (
                <div className="mx-3 mt-4 flex size-10 shrink-0 select-none items-center justify-center rounded-lg border border-muted-foreground/15 bg-muted text-xs font-mono text-muted-foreground ring-1 ring-edge ring-offset-1 ring-offset-background sm:mx-4">
                    {job.company.charAt(0)}
                </div>
            )}

            <div className="flex-1 border-l border-dashed border-edge">
                <div ref={containerRef} className="p-4">
                    <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                        <div>
                            <h3 className="mb-1 leading-snug font-medium text-balance">
                                {job.role}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                @ {job.company}
                            </p>
                        </div>
                        <div className="shrink-0 text-left text-xs font-mono text-muted-foreground sm:text-right">
                            <div>{job.period} / {job.duration}</div>
                            <div className="mt-0.5">{job.location}</div>
                        </div>
                    </div>

                    <motion.div layout className="relative mb-3">
                        <ul className="space-y-1">
                            <AnimatePresence initial={false} mode="popLayout">
                                {visibleItems.map((item, i) => (
                                    <motion.li
                                        key={`${job.company}-${i}-${item.slice(0, 24)}`}
                                        layout
                                        initial={{ opacity: 0, y: -6, height: 0 }}
                                        animate={{ opacity: 1, y: 0, height: "auto" }}
                                        exit={{ opacity: 0, y: -6, height: 0 }}
                                        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                                        className="overflow-hidden"
                                    >
                                        <div className="flex items-start gap-2 text-sm text-muted-foreground">
                                            <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-muted-foreground" />
                                            <span>{item}</span>
                                        </div>
                                    </motion.li>
                                ))}
                            </AnimatePresence>
                        </ul>

                        {hasOverflow && !isExpanded && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-background via-background/88 to-transparent"
                            />
                        )}
                    </motion.div>

                    {hasOverflow && (
                        <div className="mb-3">
                            <button
                                type="button"
                                onClick={handleToggle}
                                className="group inline-flex items-center gap-2 rounded-full border border-edge bg-background px-3 py-1.5 text-[11px] font-mono uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                                aria-expanded={isExpanded}
                            >
                                <span>{isExpanded ? "Read Less" : "Read More"}</span>
                                <ChevronDown
                                    className={cn(
                                        "size-3.5 transition-transform duration-300",
                                        isExpanded && "rotate-180"
                                    )}
                                    strokeWidth={1.8}
                                />
                            </button>
                        </div>
                    )}

                    <div className="flex flex-wrap gap-1.5">
                        {job.techStack.map((tech) => (
                            <span
                                key={tech}
                                className="rounded border border-muted-foreground/15 bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default function Experience() {
    return (
        <Panel id="experience">
            <PanelHeader>
                <PanelTitle>
                    Experience
                </PanelTitle>
            </PanelHeader>

            <div>
                {experiences.map((job) => (
                    <ExperienceItem key={`${job.company}-${job.role}`} job={job} />
                ))}
            </div>
        </Panel>
    );
}
