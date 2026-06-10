"use client";

import { Calendar } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface BookACallButtonProps {
    /** Extra classes — use to override size/padding for different contexts */
    className?: string;
    /**
     * "solid"  — filled shimmer button (navbar, footer)
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
            router.push("/#book-a-call");
            return;
        }
        document.getElementById("book-a-call")?.scrollIntoView({ behavior: "smooth", block: "start" });
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
        <button
            onClick={handleClick}
            className={cn(
                "flex items-center gap-2 px-3 py-1.5 text-[13px] font-medium",
                "bg-foreground text-background hover:bg-foreground/90 transition-colors rounded-md",
                "relative overflow-hidden cursor-pointer",
                "before:absolute before:inset-0 before:rounded-[inherit]",
                "before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.7)_50%,transparent_75%,transparent_100%)]",
                "before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat",
                "before:transition-[background-position_0s_ease] before:duration-1000",
                "hover:before:bg-[position:-100%_0,0_0]",
                "dark:before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%,transparent_100%)]",
                className
            )}
        >
            <Calendar size={14} strokeWidth={2} />
            Book a Call
        </button>
    );
}
