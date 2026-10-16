"use client";

import Image from "next/image";
import { MapPin, Clock, Music, Pause, Check } from "lucide-react";
import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { brandProfiles } from "@/components/ui/brand-icons";
import { ProfileLink } from "@/components/ui/profile-link";

export default function Hero() {
    const [time, setTime] = useState<string>("");
    const [showEasterEgg, setShowEasterEgg] = useState(false);
    const [isLofiPlaying, setIsLofiPlaying] = useState(false);
    const [lofiVolume, setLofiVolume] = useState(1);
    const lofiRef = useRef<HTMLAudioElement | null>(null);

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
            {/* Avatar column — chanhdai.com pattern: no padding on outer, tiny margin on inner, ring-offset for the floating ring */}
            <div className="shrink-0 border-r border-edge flex items-center justify-center">
                <div className="mx-0.5 my-[3px]">
                    <button
                        onClick={() => setShowEasterEgg(!showEasterEgg)}
                        className="relative h-32 w-32 sm:h-40 sm:w-40 flex-shrink-0 rounded-full overflow-hidden cursor-pointer active:scale-95 ring-1 ring-border ring-offset-2 ring-offset-background select-none"
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

                    {/* Social Links — app icon + label + arrow; icon-only below md so all four fit */}
                    <div className="border-b border-edge grid grid-cols-4">
                        {brandProfiles.map((profile, i) => (
                            <ProfileLink
                                key={profile.name}
                                profile={profile}
                                className={`flex items-center justify-center md:justify-start gap-2.5 p-3 transition-colors hover:bg-accent2 cursor-pointer ${i < brandProfiles.length - 1 ? "border-r border-edge" : ""}`}
                            >
                                {(copied) => (
                                    <>
                                        <div className="relative size-8 shrink-0">
                                            <div
                                                className="size-8 rounded-lg flex items-center justify-center text-white"
                                                style={{ backgroundColor: profile.color }}
                                            >
                                                {copied ? (
                                                    <Check size={16} strokeWidth={2.5} />
                                                ) : (
                                                    <profile.Icon width={profile.tileIconSize} height={profile.tileIconSize} />
                                                )}
                                            </div>
                                            <div className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-inset ring-black/10 dark:ring-white/15" />
                                        </div>
                                        <span className="hidden md:block flex-1 text-left text-sm font-medium">
                                            {copied ? "Copied!" : profile.label}
                                        </span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hidden md:block text-muted-foreground shrink-0" aria-hidden="true">
                                            {profile.url ? (
                                                <><path d="M7 7h10v10" /><path d="M7 17 17 7" /></>
                                            ) : (
                                                <><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></>
                                            )}
                                        </svg>
                                    </>
                                )}
                            </ProfileLink>
                        ))}
                    </div>

                    {/* Location + Time + Lofi — compact secondary metadata row */}
                    <div className="px-5 py-1.5 flex items-center gap-0 flex-wrap">
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

                </div>

            </div>
        </div>
    );
}
