"use client";

import Link from "next/link";
import { Github, Moon, Sun, Calendar, Menu, X, Linkedin, Twitter, FileText } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
    const [isDark, setIsDark] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <>
            <nav className="sticky top-0 z-50 backdrop-blur-md border-b border-edge bg-background/80">
                <div className="px-4 h-14 flex items-center justify-between">
                    {/* Left: Portfolio Title */}


                    {/* Desktop: Center Navigation Links */}
                    <div className="hidden md:flex items-center gap-6">
                        <button
                            onClick={() => scrollToSection('projects')}
                            className="text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Projects
                        </button>
                        <button
                            onClick={() => scrollToSection('experience')}
                            className="text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Experience
                        </button>
                        <button
                            onClick={() => scrollToSection('education')}
                            className="text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors"
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
                            className="flex items-center gap-2 px-3 py-1.5 text-[13px] font-medium bg-foreground text-background hover:bg-foreground/90 transition-colors rounded-md"
                        >
                            <Calendar size={14} strokeWidth={2} />
                            Book a Call
                        </a>
                        <a
                            href="https://drive.google.com/file/d/1U_3TLj_0-y_AmwbRI_7tx6D0XlrKTNvn/view?usp=sharing"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-3 py-1.5 text-[13px] font-medium bg-foreground text-background hover:bg-foreground/90 transition-colors rounded-md"
                        >
                            <FileText size={14} strokeWidth={2} />
                            Resume
                        </a>
                    </div>

                    {/* Right: GitHub, Dark Mode & Mobile Menu */}
                    <div className="flex items-center gap-3">
                        <a
                            href="https://github.com/sayandeepdas02/portfolio"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="GitHub"
                        >
                            <Github size={18} strokeWidth={1.5} />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/sayandeep02/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="LinkedIn"
                        >
                            <Linkedin size={18} strokeWidth={1.5} />
                        </a>
                        <a
                            href="https://x.com/lifeofsayan"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="Twitter"
                        >
                            <Twitter size={18} strokeWidth={1.5} />
                        </a>
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
