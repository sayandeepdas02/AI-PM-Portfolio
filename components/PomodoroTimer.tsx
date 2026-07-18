"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Panel, PanelHeader, PanelTitle } from "@/components/ui/panel";

export function PomodoroTimer() {
    const [workDuration, setWorkDuration] = useState(25);
    const [breakDuration, setBreakDuration] = useState(5);
    const [timeLeft, setTimeLeft] = useState(workDuration * 60);
    const [isActive, setIsActive] = useState(false);
    const [mode, setMode] = useState<"work" | "break">("work");
    const [completed, setCompleted] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        let audio: HTMLAudioElement | null = null;

        if (completed) {
            audio = new Audio("/jingle.mp3");
            audio.loop = true;
            audio.play().catch(e => console.error("Audio play failed:", e));
        }

        return () => {
            if (audio) {
                audio.pause();
                audio.currentTime = 0;
            }
        };
    }, [completed]);

    useEffect(() => {
        if (!isActive) {
            if (timerRef.current) clearInterval(timerRef.current);
            return;
        }

        timerRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    if (timerRef.current) clearInterval(timerRef.current);
                    setIsActive(false);
                    setCompleted(true);
                    return 0;
                }

                return prev - 1;
            });
        }, 1000);

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isActive]);

    const toggleTimer = () => setIsActive(!isActive);

    const resetTimer = () => {
        setIsActive(false);
        setCompleted(false);
        setTimeLeft((mode === "work" ? workDuration : breakDuration) * 60);
    };

    const switchMode = (newMode: "work" | "break") => {
        setIsActive(false);
        setCompleted(false);
        setMode(newMode);
        setTimeLeft((newMode === "work" ? workDuration : breakDuration) * 60);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    const handleDurationChange = (type: "work" | "break", value: string) => {
        const num = parseInt(value) || 1;
        if (type === "work") {
            setWorkDuration(num);
            if (mode === "work" && !isActive) setTimeLeft(num * 60);
        } else {
            setBreakDuration(num);
            if (mode === "break" && !isActive) setTimeLeft(num * 60);
        }
    };

    return (
        <Panel id="pomodoro" className="relative mb-16 w-full text-left">
            <PanelHeader className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
                <PanelTitle>Pomodoro Timer</PanelTitle>
                <button
                    onClick={() => setShowSettings(!showSettings)}
                    className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                >
                    {showSettings ? "Close Settings" : "Adjust Time"}
                </button>
            </PanelHeader>
            {/* Pulsating Aura when timer finishes */}
            <AnimatePresence>
                {completed && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        exit={{ opacity: 0 }}
                        className="pointer-events-none absolute -inset-4 z-0 rounded-2xl border-2 border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.2)]"
                        animate={{
                            opacity: [0.2, 0.4, 0.2],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                )}
            </AnimatePresence>

            <div className="w-full text-left p-4 border-l border-dashed border-edge">
                <p className="text-sm italic text-muted-foreground mb-6">
                    You&apos;ve reached the end! Or have you? Before you vanish into the digital void, I&apos;ve got a quick Pomodoro Timer to help you focus better on your next big thing (or just to remind you to stop doomscrolling).
                </p>

                <div className="relative z-10 overflow-hidden rounded-2xl border border-edge bg-background p-4 shadow-sm transition-all sm:p-6 dark:bg-zinc-900/50">
                    <AnimatePresence mode="wait">
                        {showSettings ? (
                            <motion.div
                                key="settings"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="flex flex-col gap-4"
                            >
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-tight text-muted-foreground">Focus (min)</label>
                                        <input
                                            type="number"
                                            min="1"
                                            max="60"
                                            value={workDuration}
                                            onChange={(e) => handleDurationChange("work", e.target.value)}
                                            className="w-full rounded-lg bg-secondary px-3 py-2 text-sm font-mono focus:outline-none text-foreground"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-tight text-muted-foreground">Break (min)</label>
                                        <input
                                            type="number"
                                            min="1"
                                            max="30"
                                            value={breakDuration}
                                            onChange={(e) => handleDurationChange("break", e.target.value)}
                                            className="w-full rounded-lg bg-secondary px-3 py-2 text-sm font-mono focus:outline-none text-foreground"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="timer"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="flex flex-col items-center justify-between gap-5 sm:flex-row sm:gap-6"
                            >
                                {/* Time Display */}
                                <div className="flex flex-col items-center sm:items-start">
                                    <span className="font-mono text-5xl font-light tracking-tight text-foreground">
                                        {formatTime(timeLeft)}
                                    </span>
                                    <span className="mt-1 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                                        {mode === "work" ? "Focus Session" : "Short Break"}
                                    </span>
                                </div>

                                {/* Controls */}
                                <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:gap-2">
                                    <div className="flex w-full rounded-full bg-secondary p-1 sm:mr-4 sm:w-auto">
                                        <button
                                            onClick={() => switchMode("work")}
                                            className={`flex-1 rounded-full px-4 py-1.5 text-xs font-semibold transition-all sm:flex-none ${mode === "work" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                                        >
                                            {workDuration}m
                                        </button>
                                        <button
                                            onClick={() => switchMode("break")}
                                            className={`flex-1 rounded-full px-4 py-1.5 text-xs font-semibold transition-all sm:flex-none ${mode === "break" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                                        >
                                            {breakDuration}m
                                        </button>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={toggleTimer}
                                            className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-background transition-transform hover:scale-105 active:scale-95"
                                            aria-label={isActive ? "Pause" : "Start"}
                                        >
                                            {isActive ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
                                        </button>
                                        <button
                                            onClick={resetTimer}
                                            className="flex h-10 w-10 items-center justify-center rounded-full border border-edge text-muted-foreground transition-all hover:bg-secondary hover:text-foreground"
                                            aria-label="Reset"
                                        >
                                            <RotateCcw size={18} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {completed && (
                    <button
                        onClick={() => setCompleted(false)}
                        className="mt-4 text-[10px] font-bold uppercase tracking-widest text-purple-500 transition-opacity hover:opacity-100"
                    >
                        Dismiss Alarm
                    </button>
                )}
            </div>
        </Panel>
    );
}
