"use client";

import { useEffect, useId, useRef, useState, type PointerEvent } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

import { experiences, type Experience as ExperienceEntry } from "@/data/experience";
import { Panel, PanelContent, PanelHeader, PanelTitle } from "@/components/ui/panel";
import { cn } from "@/lib/utils";

const PREVIEW_COUNT = 2;
const EASE = [0.32, 0.72, 0, 1] as const;
// Hover intent: wait briefly before expanding so items don't open while the cursor is just passing over
const OPEN_DELAY_MS = 120;
const CLOSE_DELAY_MS = 100;
// Ignore hovers caused by the page scrolling under a resting cursor
const SCROLL_SETTLE_MS = 180;

let lastScrollAt = 0;
if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => (lastScrollAt = performance.now()), { passive: true });
}
const isScrolling = () => performance.now() - lastScrollAt < SCROLL_SETTLE_MS;

const collapseVariants: Variants = {
    open: {
        height: "auto",
        transition: { duration: 0.45, ease: EASE, staggerChildren: 0.05, delayChildren: 0.06 },
    },
    closed: {
        height: 0,
        transition: { duration: 0.32, ease: EASE, staggerChildren: 0.02, staggerDirection: -1 },
    },
};

const bulletVariants: Variants = {
    open: { opacity: 1, y: 0, transition: { duration: 0.3, ease: EASE } },
    closed: { opacity: 0, y: -4, transition: { duration: 0.15, ease: "easeOut" } },
};

// prefers-reduced-motion: same states, no animation
const instantCollapse: Variants = {
    open: { height: "auto", transition: { duration: 0 } },
    closed: { height: 0, transition: { duration: 0 } },
};
const instantBullet: Variants = {
    open: { opacity: 1, transition: { duration: 0 } },
    closed: { opacity: 0, transition: { duration: 0 } },
};

function Bullet({ children }: { children: string }) {
    return (
        <div className="flex items-start gap-2 text-sm text-muted-foreground">
            <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-muted-foreground" />
            <span>{children}</span>
        </div>
    );
}

function ExperienceItem({ job }: { job: ExperienceEntry }) {
    // Expanded while hovered (mouse/pen) or while pinned open via the "Read more" control (touch, keyboard)
    const [hovered, setHovered] = useState(false);
    const [pinned, setPinned] = useState(false);
    const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
    const reduceMotion = useReducedMotion();
    const moreId = useId();

    const preview = job.description.slice(0, PREVIEW_COUNT);
    const rest = job.description.slice(PREVIEW_COUNT);
    const hasOverflow = rest.length > 0;
    const expanded = hasOverflow && (hovered || pinned);
    const showHint = hasOverflow && (!hovered || pinned);

    useEffect(() => () => clearTimeout(timer.current), []);

    const scheduleHover = (next: boolean, delay: number) => {
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setHovered(next), delay);
    };

    const onPointerEnter = (e: PointerEvent) => {
        if (e.pointerType === "touch" || !hasOverflow || isScrolling()) return;
        scheduleHover(true, OPEN_DELAY_MS);
    };
    // Entered mid-scroll: open once the cursor actually moves over the item
    const onPointerMove = (e: PointerEvent) => {
        if (e.pointerType === "touch" || !hasOverflow || hovered || isScrolling()) return;
        scheduleHover(true, OPEN_DELAY_MS);
    };
    const onPointerLeave = (e: PointerEvent) => {
        if (e.pointerType === "touch") return;
        scheduleHover(false, CLOSE_DELAY_MS);
    };

    return (
        <div
            onPointerEnter={onPointerEnter}
            onPointerMove={onPointerMove}
            onPointerLeave={onPointerLeave}
            className="flex items-start gap-3 rounded-lg p-3 transition-colors duration-300 hover:bg-accent2 sm:gap-4 sm:p-4"
        >
            {job.logo ? (
                <div className="relative mt-0.5 flex size-10 shrink-0 select-none overflow-hidden rounded-lg">
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
                <div className="mt-0.5 flex size-10 shrink-0 select-none items-center justify-center rounded-lg border border-muted-foreground/15 bg-muted text-xs font-mono text-muted-foreground">
                    {job.company.charAt(0)}
                </div>
            )}

            <div className="min-w-0 flex-1">
                <div>
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

                    <ul className="space-y-1">
                        {preview.map((item, i) => (
                            <li key={i}>
                                <Bullet>{item}</Bullet>
                            </li>
                        ))}
                    </ul>

                    {hasOverflow && (
                        <motion.div
                            id={moreId}
                            initial={false}
                            animate={expanded ? "open" : "closed"}
                            variants={reduceMotion ? instantCollapse : collapseVariants}
                            className="overflow-hidden"
                        >
                            <ul className="space-y-1 pt-1">
                                {rest.map((item, i) => (
                                    <motion.li key={i} variants={reduceMotion ? instantBullet : bulletVariants}>
                                        <Bullet>{item}</Bullet>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    )}

                    {hasOverflow && (
                        <motion.div
                            initial={false}
                            animate={showHint ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
                            transition={{ duration: reduceMotion ? 0 : 0.25, ease: EASE }}
                            className="overflow-hidden"
                        >
                            <button
                                type="button"
                                onClick={() => setPinned((p) => !p)}
                                aria-expanded={expanded}
                                aria-controls={moreId}
                                tabIndex={showHint ? 0 : -1}
                                className="group mt-2 inline-flex items-center gap-1 text-xs text-muted-foreground/80 transition-colors hover:text-foreground cursor-pointer"
                            >
                                {pinned ? "Show less" : "Read more"}
                                <ChevronDown
                                    className={cn("size-3 transition-transform duration-300", pinned && "rotate-180")}
                                    strokeWidth={2}
                                />
                            </button>
                        </motion.div>
                    )}

                    <div className="mt-3 flex flex-wrap gap-1.5">
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
        </div>
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

            <PanelContent className="flex flex-col gap-1 p-2">
                {experiences.map((job) => (
                    <ExperienceItem key={`${job.company}-${job.role}`} job={job} />
                ))}
            </PanelContent>
        </Panel>
    );
}
