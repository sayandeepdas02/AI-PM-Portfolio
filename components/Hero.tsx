"use client";

import Image from "next/image";
import { MapPin, Clock, Music, Pause } from "lucide-react";
import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ROLES = ["Software Engineer", "Full Stack Engineer", "AI Engineer"];

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
                setRoleIndex((i) => (i + 1) % ROLES.length);
                setPhase("typing");
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

    const starPositions = useMemo(() => {
        return [...Array(50)].map(() => ({
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            duration: 2 + Math.random() * 3,
            delay: Math.random() * 5,
        }));
    }, []);

    return (
        <div className="screen-line-after flex border-x border-edge">
            {/* Avatar column — p-3 keeps the ring clear of border-r; border-r preserved */}
            <div className="shrink-0 border-r border-edge flex items-center justify-center p-3">
                <button
                    onClick={() => setShowEasterEgg(!showEasterEgg)}
                    className="group relative h-32 w-32 sm:h-40 sm:w-40 flex-shrink-0 rounded-full overflow-hidden cursor-pointer transition-all duration-500 active:scale-95 ring-1 ring-border"
                    aria-label="Toggle Aura Mode"
                >
                    {/* Cartoon Profile (Default) */}
                    <Image
                        src="/cartoon-profile.png"
                        alt="Sayandeep Das Cartoon"
                        fill
                        priority
                        className={`object-cover transition-transform duration-700 ${showEasterEgg ? 'scale-105' : ''}`}
                    />
                    {/* Actual Profile (Hover wipe left to right) */}
                    <div className="absolute inset-y-0 left-0 w-0 overflow-hidden transition-[width] duration-500 ease-out group-hover:w-full z-10 pointer-events-none">
                        <div className="absolute top-0 left-0 h-32 w-32 sm:h-40 sm:w-40">
                            <Image
                                src="/profile.jpg"
                                alt="Sayandeep Das"
                                fill
                                priority
                                className={`object-cover transition-transform duration-700 ${showEasterEgg ? 'scale-105' : ''}`}
                            />
                        </div>
                    </div>
                    {/* Subtle Glow on Hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[inset_0_0_20px_rgba(59,130,246,0.3)] pointer-events-none" />
                </button>
            </div>

            <div className="flex flex-1 flex-col">

                {/* ── Identity Block — full height flex column so name row owns all slack space ── */}
                <div className="flex flex-col flex-1">
                    {/* Name row — primary identity, stretches to fill remaining height */}
                    <div className="flex flex-1 items-center gap-2.5 pl-5 pr-4 border-b border-edge">
                        <h1 className="-translate-y-px text-4xl font-serif font-normal italic tracking-tight leading-none">
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
                    <div className="border-b border-edge px-5 py-1.5 flex items-center gap-0 flex-wrap">
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
                        <span className="mx-2.5 text-muted-foreground/40 text-xs select-none">•</span>

                        {/* Location */}
                        <div className="flex items-center gap-1 text-muted-foreground/60">
                            <MapPin size={11} strokeWidth={1.5} />
                            <span className="font-mono text-xs">Bengaluru, KA, India</span>
                        </div>

                        {/* Bullet */}
                        <span className="mx-2.5 text-muted-foreground/40 text-xs select-none">•</span>

                        {/* Time */}
                        <div className="flex items-center gap-1 text-muted-foreground/60">
                            <Clock size={11} strokeWidth={1.5} />
                            <span className="font-mono text-xs tabular-nums">{time || "00:00:00"}</span>
                            <span className="font-mono text-[10px] uppercase tracking-wider ml-0.5">IST</span>
                        </div>

                        {/* Lofi — pushed to right */}
                        <div className="flex items-center gap-1.5 ml-auto text-muted-foreground/60">
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

                    {/* Social Icons — brand SVGs */}
                    <div className="px-5 py-1 flex items-center gap-0.5">
                        {/* GitHub — official Octocat filled mark */}
                        <a
                            href="https://github.com/sayandeepdas02"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub"
                            className="group flex h-8 w-8 items-center justify-center rounded-md transition-all duration-200 hover:bg-foreground/8"
                        >
                            <svg viewBox="0 0 98 96" width="18" height="18" aria-hidden="true"
                                className="fill-muted-foreground transition-colors duration-200 group-hover:fill-foreground">
                                <path fillRule="evenodd" clipRule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" />
                            </svg>
                        </a>
                        {/* LinkedIn — official "in" square */}
                        <a
                            href="https://www.linkedin.com/in/sayandeep02/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                            className="group flex h-8 w-8 items-center justify-center rounded-md transition-all duration-200 hover:bg-[#0A66C2]/10"
                        >
                            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"
                                className="fill-muted-foreground transition-colors duration-200 group-hover:fill-[#0A66C2]">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                        </a>
                        {/* X (Twitter) — official outlined X logo */}
                        <a
                            href="https://x.com/lifeofsayan"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="X (Twitter)"
                            className="group flex h-8 w-8 items-center justify-center rounded-md transition-all duration-200 hover:bg-foreground/8"
                        >
                            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"
                                className="fill-muted-foreground transition-colors duration-200 group-hover:fill-foreground">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.736-8.85L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </a>
                        {/* LeetCode — brand icon */}
                        <a
                            href="https://leetcode.com/u/sayandeepdas02/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LeetCode"
                            className="group flex h-8 w-8 items-center justify-center rounded-md transition-all duration-200 hover:bg-[#ffa116]/10"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                width="17"
                                height="17"
                                fill="currentColor"
                                className="text-muted-foreground transition-colors duration-200 group-hover:text-[#ffa116]"
                                aria-hidden="true"
                            >
                                <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
                            </svg>
                        </a>
                    </div>
                </div>

            </div>
        </div>
    );
}
