"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { BrandProfile } from "@/components/ui/brand-icons";

interface ProfileLinkProps {
    profile: BrandProfile;
    className?: string;
    /** Receives `copied` so callers can swap in a "Copied" state for copy-only profiles */
    children: (copied: boolean) => ReactNode;
}

/** External link for profiles with a URL; copy-to-clipboard button for handle-only ones (Discord). */
export function ProfileLink({ profile, className, children }: ProfileLinkProps) {
    const [copied, setCopied] = useState(false);
    const timeout = useRef<ReturnType<typeof setTimeout>>(undefined);

    useEffect(() => () => clearTimeout(timeout.current), []);

    if (profile.url) {
        return (
            <a
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={profile.name}
                className={className}
            >
                {children(false)}
            </a>
        );
    }

    const copy = async () => {
        if (!profile.copyText) return;
        try {
            await navigator.clipboard.writeText(profile.copyText);
        } catch {
            return;
        }
        setCopied(true);
        clearTimeout(timeout.current);
        timeout.current = setTimeout(() => setCopied(false), 1600);
    };

    return (
        <button
            type="button"
            onClick={copy}
            aria-label={`Copy ${profile.name} username ${profile.copyText}`}
            title={`${profile.name}: ${profile.copyText}`}
            className={className}
        >
            {children(copied)}
            <span className="sr-only" aria-live="polite">
                {copied ? `${profile.name} username copied` : ""}
            </span>
        </button>
    );
}
