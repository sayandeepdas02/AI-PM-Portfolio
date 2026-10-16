"use client";

import { Calendar, Check, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { Panel, PanelHeader, PanelTitle } from "@/components/ui/panel";
import { brandProfiles } from "@/components/ui/brand-icons";
import { ProfileLink } from "@/components/ui/profile-link";
import { WalkingScene } from "@/components/WalkingScene";
import { calendarUrl, emailAddress } from "@/data/social";
import { cn } from "@/lib/utils";

const ctaBase =
    "inline-flex items-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium transition-colors cursor-pointer";

const shine = cn(
    "relative overflow-hidden",
    "before:absolute before:inset-0 before:rounded-[inherit]",
    "before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.7)_50%,transparent_75%,transparent_100%)]",
    "before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat",
    "before:transition-[background-position_0s_ease] before:duration-1000",
    "hover:before:bg-[position:-100%_0,0_0]",
    "dark:before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%,transparent_100%)]"
);

export default function GetInTouch() {
    return (
        <Panel id="get-in-touch">
            <PanelHeader>
                <PanelTitle>Get in Touch</PanelTitle>
            </PanelHeader>

            <div className="flex flex-col-reverse gap-8 p-4 sm:flex-row sm:items-center sm:gap-6 sm:p-6">
                <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-semibold tracking-tight">Let&apos;s build something together</h3>
                    <p className="mt-2 max-w-md text-[15px] leading-relaxed text-muted-foreground text-pretty">
                        Open to new roles, collaborations, and good conversations about GTM, growth, and AI
                        products. Grab a slot on my calendar or drop me a line.
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2.5">
                        <a
                            href={calendarUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(ctaBase, shine, "bg-foreground text-background hover:bg-foreground/90")}
                        >
                            <Calendar size={15} strokeWidth={2} />
                            Schedule a meeting
                        </a>
                        <a
                            href={`mailto:${emailAddress}`}
                            className={cn(ctaBase, "border border-border bg-background hover:bg-accent")}
                        >
                            <Mail size={15} strokeWidth={2} />
                            Email me
                        </a>
                    </div>

                    <p className="mt-7 font-mono text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
                        Find me on
                    </p>
                    <div className="mt-2.5 flex flex-wrap gap-2">
                        {brandProfiles.map((profile) => (
                            <ProfileLink
                                key={profile.name}
                                profile={profile}
                                className="flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-all hover:-translate-y-0.5 hover:bg-accent hover:text-foreground cursor-pointer"
                            >
                                {(copied) =>
                                    copied ? (
                                        <Check size={15} strokeWidth={2.5} className="text-success" />
                                    ) : (
                                        <profile.Icon width={15} height={15} />
                                    )
                                }
                            </ProfileLink>
                        ))}
                    </div>
                </div>

                {/* Illustration — stacked "photo" that straightens up on hover */}
                <motion.div
                    className="relative mx-auto size-56 shrink-0 sm:mx-0 sm:size-60"
                    initial="rest"
                    animate="rest"
                    whileHover="hover"
                >
                    <motion.div
                        className="absolute inset-0 rounded-2xl border border-border bg-muted shadow-sm"
                        variants={{ rest: { rotate: 6, x: 4, y: 4 }, hover: { rotate: 9, x: 8, y: 6 } }}
                        transition={{ type: "spring", stiffness: 260, damping: 22 }}
                    />
                    <motion.div
                        className="relative size-full overflow-hidden rounded-2xl border-4 border-white shadow-lg ring-1 ring-black/5 dark:border-zinc-800 dark:ring-white/10"
                        variants={{ rest: { rotate: -3, y: 0, scale: 1 }, hover: { rotate: 0, y: -4, scale: 1.02 } }}
                        transition={{ type: "spring", stiffness: 260, damping: 22 }}
                    >
                        <WalkingScene className="block size-full" />
                    </motion.div>
                </motion.div>
            </div>
        </Panel>
    );
}
