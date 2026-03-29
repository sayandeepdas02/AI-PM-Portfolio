"use client";

import { GitHubCalendar } from "react-github-calendar";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Panel, PanelHeader, PanelTitle } from "@/components/ui/panel";

export function GithubGraph() {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <Panel id="github-contributions">
            <PanelHeader>
                <PanelTitle>GitHub Contributions</PanelTitle>
            </PanelHeader>
            <div className="w-full overflow-x-auto pb-4 pt-4 scrollbar-hide border-l border-dashed border-edge">
                <div className="flex min-w-max justify-center text-xs px-4">
                    <GitHubCalendar
                        username="hkirat"
                        colorScheme={theme === "dark" ? "dark" : "light"}
                        blockSize={10}
                        blockMargin={4}
                        fontSize={12}
                    />
                </div>
            </div>
        </Panel>
    );
}
