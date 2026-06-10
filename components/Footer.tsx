"use client";

import { Github, Linkedin, Mail, Twitter, Code2, Calendar } from "lucide-react";
import { socialLinks, emailAddress } from "@/data/social";
import { Panel } from "@/components/ui/panel";

export default function Footer() {
    const getIcon = (iconName: string) => {
        switch (iconName) {
            case "Github":
                return Github;
            case "Linkedin":
                return Linkedin;
            case "Twitter":
                return Twitter;
            case "Code2":
                return Code2;
            case "Mail":
                return Mail;
            default:
                return Mail;
        }
    };

    return (
        <Panel>
            <div className="p-4 text-center">
                <p className="text-sm mb-2 text-muted-foreground">
                    Built by <span className="font-medium text-foreground">Sayandeep Das</span>
                </p>

                {/* Social Links */}
                <div className="flex items-center justify-center gap-4 mb-3">
                    {socialLinks.map((link) => {
                        const Icon = getIcon(link.icon);
                        return (
                            <a
                                key={link.name}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-foreground transition-colors"
                                aria-label={link.name}
                            >
                                <Icon size={16} strokeWidth={1.5} />
                            </a>
                        );
                    })}
                </div>

                {/* Book a Call CTA */}
                <div className="my-4">
                    <a
                        href="https://cal.com/dsayandeep/30min"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-foreground text-background hover:bg-foreground/90 transition-colors rounded-md relative overflow-hidden before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.7)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:transition-[background-position_0s_ease] before:duration-1000 hover:before:bg-[position:-100%_0,0_0] dark:before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%,transparent_100%)] cursor-pointer"
                    >
                        <Calendar size={16} strokeWidth={2} />
                        Book a Call
                    </a>
                </div>

                <p className="text-xs text-muted-foreground mt-4">
                    © {new Date().getFullYear()} All rights reserved
                </p>
            </div>
        </Panel>
    );
}
