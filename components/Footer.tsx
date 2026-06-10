"use client";

import { Github, Linkedin, Mail, Twitter, Code2 } from "lucide-react";
import { socialLinks, emailAddress } from "@/data/social";
import { Panel } from "@/components/ui/panel";
import { BookACallButton } from "@/components/ui/BookACallButton";

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
                    <BookACallButton className="px-4 py-2 text-sm inline-flex" />
                </div>

                <p className="text-xs text-muted-foreground mt-4">
                    © {new Date().getFullYear()} All rights reserved
                </p>
            </div>
        </Panel>
    );
}
