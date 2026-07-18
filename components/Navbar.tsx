"use client";

import Link from "next/link";
import { Moon, Sun, Menu, X, FileText } from "lucide-react";
import { useEffect, useState, useSyncExternalStore } from "react";
import { usePathname, useRouter } from "next/navigation";
import { BookACallButton } from "@/components/ui/BookACallButton";

function subscribeToTheme(callback: () => void) {
    if (typeof window === "undefined") {
        return () => undefined;
    }

    const handler = () => callback();
    window.addEventListener("storage", handler);
    window.addEventListener("themechange", handler);

    return () => {
        window.removeEventListener("storage", handler);
        window.removeEventListener("themechange", handler);
    };
}

function getThemeSnapshot() {
    if (typeof document === "undefined") {
        return false;
    }

    return document.documentElement.classList.contains("dark");
}

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const isDark = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, () => false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        document.documentElement.classList.toggle('dark', savedTheme === 'dark');
        window.dispatchEvent(new Event("themechange"));
    }, []);

    const toggleTheme = () => {
        if (!isDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
        window.dispatchEvent(new Event("themechange"));
    };

    const scrollToSection = (sectionId: string) => {
        if (pathname !== '/') {
            router.push(`/#${sectionId}`);
            return;
        }

        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const scrollToTop = () => {
        if (pathname !== '/') {
            router.push('/');
            return;
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <nav className="sticky top-0 z-50 backdrop-blur-md screen-line-after border-x border-edge bg-background/80">
                <div className="flex h-14 items-center justify-between gap-3 px-3 sm:gap-4 sm:px-4">

                    {/* Left: SD Logo — clicks scroll to top */}
                    <button
                        onClick={scrollToTop}
                        aria-label="Back to top"
                        className="flex-shrink-0 cursor-pointer"
                    >
                        <div className="w-8 h-8 rounded-lg overflow-hidden border border-edge shadow-sm hover:opacity-80 transition-opacity">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/sd-logo.png"
                                alt="SD"
                                width={32}
                                height={32}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </button>

                    {/* Center: Navigation Links (desktop) */}
                    <div className="hidden md:flex items-center gap-4 flex-1 justify-center">
                        <button
                            onClick={() => scrollToSection('about')}
                            className="text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-foreground after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100"
                        >
                            About Me
                        </button>
                        <Link
                            href="/blog"
                            className="text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-foreground after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100"
                        >
                            Blogs
                        </Link>
                        <button
                            onClick={() => scrollToSection('experience')}
                            className="text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-foreground after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100"
                        >
                            Experience
                        </button>
                        <button
                            onClick={() => scrollToSection('education')}
                            className="text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-foreground after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100"
                        >
                            Education
                        </button>
                        <button
                            onClick={() => scrollToSection('projects')}
                            className="text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-foreground after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100"
                        >
                            Projects
                        </button>
                    </div>

                    {/* Right group: CTA buttons + theme toggle */}
                    <div className="flex shrink-0 items-center gap-1 sm:gap-2">

                        {/* CTA Buttons (desktop only) */}
                        <div className="hidden md:flex items-center gap-2">
                            <BookACallButton />
                            <Link
                                href="/resume"
                                className="flex items-center gap-2 px-3 py-1.5 text-[13px] font-medium bg-foreground text-background hover:bg-foreground/90 transition-colors rounded-md relative overflow-hidden before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.7)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:transition-[background-position_0s_ease] before:duration-1000 hover:before:bg-[position:-100%_0,0_0] dark:before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%,transparent_100%)] cursor-pointer"
                            >
                                <FileText size={14} strokeWidth={2} />
                                Resume
                            </Link>
                        </div>

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="Toggle theme"
                        >
                            {isDark ? <Sun size={18} strokeWidth={1.5} /> : <Moon size={18} strokeWidth={1.5} />}
                        </button>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Dropdown Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden absolute top-14 left-0 right-0 bg-background border-b border-edge shadow-lg">
                        <div className="mx-3 my-3 rounded-lg border border-edge bg-background p-4 shadow-sm">
                            <button
                                onClick={() => {
                                    scrollToSection('about');
                                    setIsMobileMenuOpen(false);
                                }}
                                className="block w-full text-left py-3 text-base font-medium text-foreground hover:text-muted-foreground transition-colors"
                            >
                                About Me
                            </button>
                            <Link
                                href="/blog"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block w-full text-left py-3 text-base font-medium text-foreground hover:text-muted-foreground transition-colors"
                            >
                                Blogs
                            </Link>
                            <button
                                onClick={() => {
                                    scrollToSection('experience');
                                    setIsMobileMenuOpen(false);
                                }}
                                className="block w-full text-left py-3 text-base font-medium text-foreground hover:text-muted-foreground transition-colors"
                            >
                                Experience
                            </button>
                            <button
                                onClick={() => {
                                    scrollToSection('education');
                                    setIsMobileMenuOpen(false);
                                }}
                                className="block w-full text-left py-3 text-base font-medium text-foreground hover:text-muted-foreground transition-colors"
                            >
                                Education
                            </button>
                            <button
                                onClick={() => {
                                    scrollToSection('projects');
                                    setIsMobileMenuOpen(false);
                                }}
                                className="block w-full text-left py-3 text-base font-medium text-foreground hover:text-muted-foreground transition-colors"
                            >
                                Projects
                            </button>
                            <div className="pt-2 mt-2 border-t border-edge flex flex-col gap-2">
                                <BookACallButton
                                    variant="ghost"
                                    onNavigate={() => setIsMobileMenuOpen(false)}
                                />
                                <Link
                                    href="/resume"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center gap-2 py-2 text-base font-medium text-foreground hover:text-muted-foreground transition-colors"
                                >
                                    <FileText size={16} strokeWidth={2} />
                                    Resume
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </>
    );
}
