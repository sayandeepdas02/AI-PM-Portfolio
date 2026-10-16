import React from "react";
import { cn } from "@/lib/utils";

/** Vertical stack of sections below the navbar: no rules between them, just space. */
function PanelStack({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="panel-stack"
            className={cn("flex flex-col gap-12 px-4 pt-8 pb-16 sm:gap-16 sm:pt-10 md:px-0 *:[[id]]:scroll-mt-22", className)}
            {...props}
        />
    );
}

/** A section: title on top (PanelHeader), content in a card (PanelContent) or its own component. */
function Panel({ className, ...props }: React.ComponentProps<"section">) {
    return <section data-slot="panel" className={cn("relative", className)} {...props} />;
}

function PanelHeader({ className, ...props }: React.ComponentProps<"header">) {
    return (
        <header
            data-slot="panel-header"
            className={cn("mb-4", className)}
            {...props}
        />
    );
}

function PanelTitle({
    className,
    ...props
}: React.ComponentProps<"h2">) {
    return (
        <h2
            data-slot="panel-title"
            className={cn("text-4xl font-serif font-normal italic tracking-tight", className)}
            {...props}
        />
    );
}

function PanelTitleSup({ className, ...props }: React.ComponentProps<"sup">) {
    return (
        <sup
            className={cn(
                "-top-[0.75em] ml-1 text-sm font-medium text-muted-foreground select-none",
                className
            )}
            {...props}
        />
    );
}

/** The box a section's content sits in. */
function PanelContent({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="panel-body"
            className={cn("rounded-xl border border-border bg-background", className)}
            {...props}
        />
    );
}

export { Panel, PanelContent, PanelHeader, PanelStack, PanelTitle, PanelTitleSup };
