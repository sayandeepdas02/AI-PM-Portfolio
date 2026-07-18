"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, type LucideIcon } from "lucide-react";
import * as Icons from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Panel, PanelHeader, PanelTitle } from "@/components/ui/panel";

type IconName = keyof typeof Icons;

interface SkillItem {
    name: string;
    slug?: string;
    iconName?: IconName;
}

interface Category {
    name: string;
    skills: SkillItem[];
}

const categories: Category[] = [
    {
        name: "Product & Strategy",
        skills: [
            { name: "0→1 Development", iconName: "Milestone" },
            { name: "Product Strategy", iconName: "Compass" },
            { name: "Roadmapping", iconName: "Map" },
            { name: "User Research", iconName: "Users" },
            { name: "Growth Funnels", iconName: "TrendingUp" },
            { name: "A/B Testing", iconName: "GitCompare" },
            { name: "PRDs", iconName: "FileText" },
            { name: "Stakeholder Management", iconName: "Handshake" },
        ]
    },
    {
        name: "Core Technical Stack",
        skills: [
            { name: "AWS (EC2, S3, Lambda)", slug: "amazonwebservices" },
            { name: "Docker", slug: "docker" },
            { name: "Kubernetes", slug: "kubernetes" },
            { name: "Redis", slug: "redis" },
            { name: "PostgreSQL", slug: "postgresql" },
            { name: "MongoDB", slug: "mongodb" },
            { name: "Python", slug: "python" },
            { name: "SQL", slug: "sqlite" },
        ]
    },
    {
        name: "AI & ML / Data",
        skills: [
            { name: "Scikit-learn", slug: "scikitlearn" },
            { name: "TensorFlow", slug: "tensorflow" },
            { name: "PyTorch", slug: "pytorch" },
            { name: "Claude / Anthropic", slug: "anthropic" },
            { name: "HuggingFace", slug: "huggingface" },
            { name: "Jupyter", slug: "jupyter" },
            { name: "Pandas", slug: "pandas" },
            { name: "NumPy", slug: "numpy" },
            { name: "Matplotlib", iconName: "BarChart3" },
            { name: "Tableau", iconName: "LayoutDashboard" },
        ]
    },
    {
        name: "Architecture",
        skills: [
            { name: "Distributed Systems", iconName: "Network" },
            { name: "Microservices", iconName: "Boxes" },
            { name: "REST APIs", iconName: "Webhook" },
            { name: "System Design", iconName: "Cpu" },
            { name: "Scalable Architectures", iconName: "Server" },
        ]
    }
];

const marqueeSkills = categories.flatMap(c => c.skills).filter(s => s.slug);

export function TechStack() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [contentHeight, setContentHeight] = useState(0);
    const contentRef = useRef<HTMLDivElement | null>(null);
    const shouldReduceMotion = useReducedMotion();

    useEffect(() => {
        if (!contentRef.current) return;

        const node = contentRef.current;
        const updateHeight = () => setContentHeight(node.scrollHeight);
        updateHeight();

        const observer = new ResizeObserver(updateHeight);
        observer.observe(node);

        return () => observer.disconnect();
    }, []);

    const renderIcon = (skill: SkillItem) => {
        if (skill.slug) {
            return (
                <img
                    src={`https://cdn.simpleicons.org/${skill.slug}`}
                    alt={skill.name}
                    className="h-full w-full object-contain opacity-50 group-hover:opacity-100 transition-all duration-300 brightness-0 group-hover:brightness-100 dark:brightness-0 dark:invert dark:group-hover:invert-0 dark:group-hover:brightness-100"
                    loading="lazy"
                />
            );
        }
        if (skill.iconName) {
            const IconComponent = Icons[skill.iconName] as LucideIcon | undefined;
            if (IconComponent) {
                return <IconComponent className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />;
            }
        }
        return <span className="text-xs">✨</span>;
    };

    return (
        <Panel id="tech-stack">
            <PanelHeader>
                <PanelTitle>Skills & Tech Stack</PanelTitle>
            </PanelHeader>

            <div className="w-full space-y-4 pt-4 pb-4 border-l border-dashed border-edge">
                <div className="flex items-center justify-between gap-3 px-4">
                    <p className="text-[11px] leading-5 text-muted-foreground">
                        Product, data, AI, and systems experience across 0→1 builds and scale-stage execution.
                    </p>
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        aria-expanded={isExpanded}
                        aria-controls="tech-stack-details"
                        className="inline-flex shrink-0 items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors"
                    >
                        {isExpanded ? "Show Less" : "View Full Stack"}
                        <ChevronDown
                            size={12}
                            className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : "rotate-0"}`}
                        />
                    </button>
                </div>

                <div className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                    <div className="flex w-max animate-infinite-scroll">
                        <div className="flex gap-12 py-4 pr-12">
                            {marqueeSkills.map((tech, index) => (
                                <div key={index} className="flex flex-col items-center justify-center gap-2">
                                    <div className="h-10 w-10 transition-all duration-300">
                                        <img
                                            src={`https://cdn.simpleicons.org/${tech.slug}`}
                                            alt={tech.name}
                                            className="h-full w-full object-contain opacity-80 hover:opacity-100 transition-all duration-300 brightness-0 hover:brightness-100 dark:brightness-0 dark:invert dark:hover:invert-0 dark:hover:brightness-100"
                                            loading="lazy"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-12 py-4 pr-12">
                            {marqueeSkills.map((tech, index) => (
                                <div key={index + marqueeSkills.length} className="flex flex-col items-center justify-center gap-2">
                                    <div className="h-10 w-10 transition-all duration-300">
                                        <img
                                            src={`https://cdn.simpleicons.org/${tech.slug}`}
                                            alt={tech.name}
                                            className="h-full w-full object-contain opacity-80 hover:opacity-100 transition-all duration-300 brightness-0 hover:brightness-100 dark:brightness-0 dark:invert dark:hover:invert-0 dark:hover:brightness-100"
                                            loading="lazy"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <motion.div
                    id="tech-stack-details"
                    initial={false}
                    animate={{
                        height: isExpanded ? contentHeight : 0,
                        opacity: isExpanded ? 1 : 0,
                    }}
                    transition={
                        shouldReduceMotion
                            ? { duration: 0 }
                            : { duration: 0.38, ease: [0.22, 1, 0.36, 1] }
                    }
                    className="overflow-hidden"
                >
                    <div ref={contentRef} className="grid grid-cols-1 gap-8 px-4 pt-2 pb-1 sm:grid-cols-2 lg:grid-cols-2">
                        {categories.map((category) => (
                            <div key={category.name} className="space-y-4">
                                <h3 className="border-b border-edge pb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                                    {category.name}
                                </h3>
                                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                                    {category.skills.map((skill) => (
                                        <div
                                            key={skill.name}
                                            className="group flex min-w-0 items-start gap-3 rounded-lg border border-transparent p-2 transition-all hover:border-edge hover:bg-accent2"
                                        >
                                            <div className="flex h-5 w-5 shrink-0 items-center justify-center transition-all duration-300">
                                                {renderIcon(skill)}
                                            </div>
                                            <span className="text-xs font-medium text-muted-foreground transition-colors group-hover:text-foreground">
                                                {skill.name}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </Panel>
    );
}
