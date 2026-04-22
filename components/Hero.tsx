"use client";

import Image from "next/image";
import { Github, Linkedin, Youtube, Calendar, Mail, FileText, Bot, User, QrCode, X, Music, Pause } from "lucide-react";
import { useState, useEffect, useMemo, useRef } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";

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
            <div className="shrink-0 border-r border-edge relative">
                <div className="mx-0.5 my-0.75 relative">
                    <button
                        onClick={() => setShowEasterEgg(!showEasterEgg)}
                        className="group relative h-32 w-32 sm:h-40 sm:w-40 overflow-hidden cursor-pointer transition-all duration-500 active:scale-95 rounded-full ring-1 ring-border ring-offset-2 ring-offset-background"
                        aria-label="Toggle Aura Mode"
                    >
                        <Image
                            src="/profile.jpg"
                            alt="Sayandeep Das"
                            fill
                            priority
                            className={`object-cover w-full h-full transition-all duration-700 ${showEasterEgg ? 'scale-105' : ''}`}
                        />
                        {/* Subtle Glow on Hover */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[inset_0_0_20px_rgba(59,130,246,0.3)] pointer-events-none" />
                    </button>
                </div>

                {/* Indian Flag */}
                <a
                    href="https://www.india.gov.in/"
                    target="_blank"
                    rel="noreferrer"
                    className="absolute top-0 -left-px z-[60]"
                >
                    <div className="h-8 sm:h-9 w-12 sm:w-14 rounded-br-md overflow-hidden border-r border-b border-edge bg-background">
                        <Image
                            src="/indian-flag.png"
                            alt="India"
                            width={56}
                            height={36}
                            className="object-cover w-full h-full"
                        />
                    </div>
                </a>
            </div>

            <div className="flex flex-1 flex-col justify-end pb-0">
                <div className="border-t border-edge">
                    <div className="flex items-center gap-2 pl-4 py-2">
                        <h1 className="-translate-y-px text-4xl font-serif font-normal italic">
                            Sayandeep Das
                        </h1>

                        {/* Verified Icon */}
                        <svg
                            className="size-4.5 text-info select-none"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-label="Verified"
                        >
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                    </div>

                    <div className="h-12.5 border-t border-edge py-1 pl-4 sm:h-9 flex items-center justify-between pr-4">
                        <div className="flex items-center gap-2">
                            <p className="font-mono text-sm text-muted-foreground hidden sm:block">
                                Software Engineer
                            </p>
                            <span className="text-muted-foreground hidden sm:block">•</span>
                            <div className="flex items-center gap-1.5 text-muted-foreground font-mono">
                                <span className="tabular-nums text-sm">{time || "00:00:00"}</span>
                                <span className="text-[10px] uppercase tracking-wider">IST</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 border-l border-dashed border-edge pl-4 h-full">
                            <span className="text-[10px] font-mono font-bold uppercase tracking-tight text-muted-foreground">lofi</span>
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
