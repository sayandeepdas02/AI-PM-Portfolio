"use client";

import Link from "next/link";
import { Moon, Sun, Calendar, Menu, X, FileText } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
    const [isDark, setIsDark] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        // Check for saved theme preference or default to light
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            setIsDark(true);
            document.documentElement.classList.add('dark');
        }
    }, []);

    const toggleTheme = () => {
        setIsDark(!isDark);
        if (!isDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
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

    return (
        <>
            <nav className="sticky top-0 z-50 backdrop-blur-md screen-line-after border-x border-edge bg-background/80">
                <div className="px-4 h-14 flex items-center justify-between">
                    {/* Left: Portfolio Title */}


                    {/* Desktop: Center Navigation Links */}
                    <div className="hidden md:flex items-center gap-6">
                        <button
                            onClick={() => scrollToSection('experience')}
                            className="text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-foreground after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100"
                        >
                            Experience
                        </button>
                        <button
                            onClick={() => scrollToSection('projects')}
                            className="text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-foreground after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100"
                        >
                            Projects
                        </button>
                        <button
                            onClick={() => scrollToSection('education')}
                            className="text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-foreground after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100"
                        >
                            Education
                        </button>
                    </div>

                    {/* Desktop: Book a Call Button */}
                    <div className="hidden md:flex items-center gap-2">
                        <a
                            href="https://cal.com/sayandeep-3n4b6i"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-3 py-1.5 text-[13px] font-medium bg-foreground text-background hover:bg-foreground/90 transition-colors rounded-md relative overflow-hidden before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.7)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:transition-[background-position_0s_ease] before:duration-1000 hover:before:bg-[position:-100%_0,0_0] dark:before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%,transparent_100%)] cursor-pointer"
                        >
                            <Calendar size={14} strokeWidth={2} />
                            Book a Call
                        </a>
                        <Link
                            href="/resume"
                            className="flex items-center gap-2 px-3 py-1.5 text-[13px] font-medium bg-foreground text-background hover:bg-foreground/90 transition-colors rounded-md relative overflow-hidden before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.7)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:transition-[background-position_0s_ease] before:duration-1000 hover:before:bg-[position:-100%_0,0_0] dark:before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%,transparent_100%)] cursor-pointer"
                        >
                            <FileText size={14} strokeWidth={2} />
                            Resume
                        </Link>
                    </div>

                    {/* Right: Dark Mode & Mobile Menu */}
                    <div className="flex items-center gap-3">
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
                        <div className="mx-4 my-3 p-4 bg-background rounded-lg border border-edge shadow-sm">
                            <button
                                onClick={() => {
                                    scrollToSection('projects');
                                    setIsMobileMenuOpen(false);
                                }}
                                className="block w-full text-left py-3 text-base font-medium text-foreground hover:text-muted-foreground transition-colors"
                            >
                                Projects
                            </button>
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
                        </div>
                    </div>
                )}
            </nav>
        </>
    );
}
