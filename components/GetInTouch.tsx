"use client";

import { Calendar, Check, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { Panel, PanelContent, PanelHeader, PanelTitle } from "@/components/ui/panel";
import { brandProfiles } from "@/components/ui/brand-icons";
import { ProfileLink } from "@/components/ui/profile-link";
import { WalkingScene } from "@/components/WalkingScene";
import { calendarUrl, emailAddress } from "@/data/social";
import { Button, buttonVariants } from "@/components/ui/button";

export default function GetInTouch() {
    return (
        <Panel id="get-in-touch">
            <PanelHeader>
                <PanelTitle>Get in Touch</PanelTitle>
            </PanelHeader>

            <PanelContent className="flex flex-col-reverse gap-8 p-5 sm:flex-row sm:items-center sm:gap-6 sm:p-8">
                <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-semibold tracking-tight">Let&apos;s build something together</h3>
                    <p className="mt-2 max-w-md text-[15px] leading-relaxed text-muted-foreground text-pretty">
                        Open to new roles, collaborations, and good conversations about GTM, growth, and AI
                        products. Grab a slot on my calendar or drop me a line.
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2.5">
                        <Button asChild>
                            <a href={calendarUrl} target="_blank" rel="noopener noreferrer">
                                <Calendar strokeWidth={2} />
                                Schedule a meeting
                            </a>
                        </Button>
                        <Button asChild variant="neutral">
                            <a href={`mailto:${emailAddress}`}>
                                <Mail strokeWidth={2} />
                                Email me
                            </a>
                        </Button>
                    </div>

                    <p className="mt-7 font-mono text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
                        Find me on
                    </p>
                    <div className="mt-2.5 flex flex-wrap gap-3">
                        {brandProfiles.map((profile) => (
                            <ProfileLink
                                key={profile.name}
                                profile={profile}
                                className={buttonVariants({ variant: "neutral", size: "icon", className: "cursor-pointer" })}
                            >
                                {(copied) =>
                                    copied ? (
                                        <Check strokeWidth={2.5} className="text-success" />
                                    ) : (
                                        <profile.Icon />
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
            </PanelContent>
        </Panel>
    );
}
