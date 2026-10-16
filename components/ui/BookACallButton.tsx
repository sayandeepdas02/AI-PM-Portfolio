"use client";

import { Calendar } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface BookACallButtonProps {
    /** Extra classes — use to override size/padding for different contexts */
    className?: string;
    /**
     * "solid"  — neobrutalism Button (navbar, footer)
     * "ghost"  — plain text link (mobile menu)
     */
    variant?: "solid" | "ghost";
    /** Called after navigation is triggered (e.g. close mobile menu) */
    onNavigate?: () => void;
}

export function BookACallButton({
    className,
    variant = "solid",
    onNavigate,
}: BookACallButtonProps) {
    const pathname = usePathname();
    const router = useRouter();

    const handleClick = () => {
        onNavigate?.();
        if (pathname !== "/") {
            router.push("/#get-in-touch");
            return;
        }
        document.getElementById("get-in-touch")?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    if (variant === "ghost") {
        return (
            <button
                onClick={handleClick}
                className={cn(
                    "flex items-center gap-2 py-2 text-base font-medium text-foreground hover:text-muted-foreground transition-colors",
                    className
                )}
            >
                <Calendar size={16} strokeWidth={2} />
                Book a Call
            </button>
        );
    }

    return (
        <Button size="sm" onClick={handleClick} className={className}>
            <Calendar strokeWidth={2} />
            Book a Call
        </Button>
    );
}
