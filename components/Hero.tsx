"use client";

import Image from "next/image";
import { MapPin, Clock, Music, Pause } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ROLES = ["Product Manager", "AI Product Manager", "Growth Product Manager"];

export default function Hero() {
    const [time, setTime] = useState<string>("");
    const [showEasterEgg, setShowEasterEgg] = useState(false);
    const [isLofiPlaying, setIsLofiPlaying] = useState(false);
    const [lofiVolume, setLofiVolume] = useState(1);
    const lofiRef = useRef<HTMLAudioElement | null>(null);

    // ── Typewriter state ───────────────────────────────────────────────
    const [roleIndex, setRoleIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState("");
    const [phase, setPhase] = useState<"typing" | "pausing" | "erasing">("typing");

    useEffect(() => {
        const current = ROLES[roleIndex];
        let timeout: ReturnType<typeof setTimeout>;

        if (phase === "typing") {
            if (displayedText.length < current.length) {
                timeout = setTimeout(() => {
                    setDisplayedText(current.slice(0, displayedText.length + 1));
                }, 65);
            } else {
                timeout = setTimeout(() => setPhase("pausing"), 1400);
            }
        } else if (phase === "pausing") {
            timeout = setTimeout(() => setPhase("erasing"), 0);
        } else {
            if (displayedText.length > 0) {
                timeout = setTimeout(() => {
                    setDisplayedText(displayedText.slice(0, -1));
                }, 38);
            } else {
                timeout = setTimeout(() => {
                    setRoleIndex((i) => (i + 1) % ROLES.length);
                    setPhase("typing");
                }, 0);
            }
        }

        return () => clearTimeout(timeout);
    }, [phase, displayedText, roleIndex]);

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTime(
                now.toLocaleTimeString("en-IN", {
                    timeZone: "Asia/Kolkata",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: false,
                })
            );
        };

        updateTime();
        const timer = setInterval(updateTime, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (lofiRef.current) {
            lofiRef.current.volume = lofiVolume;
        }
    }, [lofiVolume]);

    useEffect(() => {
        return () => {
            if (lofiRef.current) {
                lofiRef.current.pause();
                lofiRef.current = null;
            }
        };
    }, []);

    const toggleLofi = () => {
        if (!lofiRef.current) {
            lofiRef.current = new Audio("/lofi.mp3");
            lofiRef.current.loop = true;
            lofiRef.current.volume = lofiVolume;
        }

        if (isLofiPlaying) {
            lofiRef.current.pause();
        } else {
            lofiRef.current.play().catch(e => console.error("Lofi play failed:", e));
        }
        setIsLofiPlaying(!isLofiPlaying);
    };

    return (
        <section id="about" className="screen-line-after flex flex-col border-x border-edge sm:flex-row" aria-label="About Me">
            {/* Avatar column — chanhdai.com pattern: no padding on outer, tiny margin on inner, ring-offset for the floating ring */}
            <div className="flex w-full shrink-0 items-center justify-center border-b border-edge sm:w-auto sm:border-r sm:border-b-0">
                <div className="mx-0.5 my-[3px]">
                    <button
                        onClick={() => setShowEasterEgg(!showEasterEgg)}
                        className="relative h-28 w-28 flex-shrink-0 cursor-pointer overflow-hidden rounded-full ring-1 ring-border ring-offset-2 ring-offset-background select-none active:scale-95 sm:h-40 sm:w-40"
                        aria-label="Toggle Aura Mode"
                    >
                        <Image
                            src="/profile.png"
                            alt="Sayandeep Das"
                            fill
                            priority
                            className="object-cover"
                        />
                    </button>
                </div>
            </div>

            <div className="flex flex-1 flex-col">

                {/* ── Identity Block — full height flex column so name row owns all slack space ── */}
                <div className="flex flex-col flex-1">
                    {/* Name row — primary identity, stretches to fill remaining height */}
                    <div className="flex flex-1 flex-wrap items-center gap-x-2.5 gap-y-1 border-b border-edge px-4 py-4 sm:pl-5 sm:pr-4">
                        <h1 className="-translate-y-px text-3xl leading-none font-serif font-normal italic tracking-tight text-balance sm:text-4xl">
                            Sayandeep Das
                        </h1>
                        {/* Verified Icon */}
                        <svg
                            className="size-5 text-info select-none flex-shrink-0 mt-0.5"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-label="Verified"
                        >
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                    </div>

                    {/* Role + Location + Time + Lofi — compact secondary metadata row */}
                    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-2 border-b border-edge px-4 py-3 sm:px-5 sm:py-1.5">
                        {/* Role */}
                        {/* Typing role badge */}
                        <span className="font-mono text-sm text-muted-foreground tracking-wide inline-flex items-center gap-[2px]">
                            {displayedText}
                            <span
                                className="inline-block w-[1.5px] h-[0.85em] bg-muted-foreground/70 ml-[1px] align-middle"
                                style={{
                                    animation: "hero-cursor-blink 0.9s step-end infinite",
                                }}
                            />
                        </span>
                        <style>{`
                            @keyframes hero-cursor-blink {
                                0%, 100% { opacity: 1; }
                                50% { opacity: 0; }
                            }
                        `}</style>

                        {/* Bullet */}
                        <span className="hidden text-xs text-muted-foreground/40 select-none sm:inline">•</span>

                        {/* Location */}
                        <div className="flex items-center gap-1 text-muted-foreground/60">
                            <MapPin size={11} strokeWidth={1.5} />
                            <span className="font-mono text-xs">Bengaluru, KA, India</span>
                        </div>

                        {/* Bullet */}
                        <span className="hidden text-xs text-muted-foreground/40 select-none sm:inline">•</span>

                        {/* Time */}
                        <div className="flex items-center gap-1 text-muted-foreground/60">
                            <Clock size={11} strokeWidth={1.5} />
                            <span className="font-mono text-xs tabular-nums">{time || "00:00:00"}</span>
                            <span className="font-mono text-[10px] uppercase tracking-wider ml-0.5">IST</span>
                        </div>

                        {/* Lofi — pushed to right */}
                        <div className="ml-0 flex w-full items-center justify-between gap-1.5 text-muted-foreground/60 sm:ml-auto sm:w-auto sm:justify-start">
                            <span className="text-[10px] font-mono font-bold uppercase tracking-tight">lofi</span>
                            <button
                                onClick={toggleLofi}
                                className="flex h-5 w-5 items-center justify-center rounded-sm transition-all hover:bg-secondary text-muted-foreground hover:text-foreground"
                                aria-label={isLofiPlaying ? "Pause Lofi" : "Play Lofi"}
                            >
                                {isLofiPlaying ? <Pause size={10} fill="currentColor" /> : <Music size={10} />}
                            </button>
                            <AnimatePresence>
                                {isLofiPlaying && (
                                    <motion.div
                                        initial={{ width: 0, opacity: 0 }}
                                        animate={{ width: 60, opacity: 1 }}
                                        exit={{ width: 0, opacity: 0 }}
                                        className="flex h-5 items-center overflow-hidden"
                                    >
                                        <input
                                            type="range"
                                            min="0"
                                            max="1"
                                            step="0.01"
                                            value={lofiVolume}
                                            onChange={(e) => setLofiVolume(parseFloat(e.target.value))}
                                            className="h-[2px] w-full mx-2 cursor-pointer appearance-none rounded-full bg-border [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-2 [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-muted-foreground hover:[&::-webkit-slider-thumb]:bg-foreground [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:h-2 [&::-moz-range-thumb]:w-2 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-muted-foreground hover:[&::-moz-range-thumb]:bg-foreground transition-all"
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Social Links — chanhdai.com pattern: app icon + label + arrow */}
                    <div className="grid grid-cols-1 border-t border-edge sm:grid-cols-3">

                        {/* GitHub */}
                        <a
                            href="https://github.com/sayandeepdas02"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub"
                            className="flex items-center gap-3 border-b border-edge p-4 transition-colors hover:bg-accent2 sm:border-r sm:border-b-0 sm:pr-2"
                        >
                            <div className="relative size-8 shrink-0">
                                <div className="size-8 rounded-lg bg-[#24292e] flex items-center justify-center">
                                    <svg viewBox="0 0 98 96" width="18" height="18" aria-hidden="true" className="fill-white">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" />
                                    </svg>
                                </div>
                                <div className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-inset ring-black/10 dark:ring-white/15" />
                            </div>
                            <span className="flex-1 text-sm font-medium">GitHub</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground shrink-0" aria-hidden="true"><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg>
                        </a>

                        {/* LinkedIn */}
                        <a
                            href="https://www.linkedin.com/in/sayandeep02/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                            className="flex items-center gap-3 border-b border-edge p-4 transition-colors hover:bg-accent2 sm:border-r sm:border-b-0 sm:pr-2"
                        >
                            <div className="relative size-8 shrink-0">
                                <div className="size-8 rounded-lg bg-[#0A66C2] flex items-center justify-center">
                                    <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true" className="fill-white">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0h.003z" />
                                    </svg>
                                </div>
                                <div className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-inset ring-black/10 dark:ring-white/15" />
                            </div>
                            <span className="flex-1 text-sm font-medium">LinkedIn</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground shrink-0" aria-hidden="true"><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg>
                        </a>

                        {/* X (Twitter) */}
                        <a
                            href="https://x.com/sayan_not_deep"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="X (Twitter)"
                            className="flex items-center gap-3 p-4 transition-colors hover:bg-accent2 sm:pr-2"
                        >
                            <div className="relative size-8 shrink-0">
                                <div className="size-8 rounded-lg bg-[#000000] flex items-center justify-center">
                                    <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true" className="fill-white">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.736-8.85L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                </div>
                                <div className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-inset ring-black/10 dark:ring-white/15" />
                            </div>
                            <span className="flex-1 text-sm font-medium">X.com</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground shrink-0" aria-hidden="true"><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg>
                        </a>

                    </div>
                </div>

            </div>
        </section>
    );
}
