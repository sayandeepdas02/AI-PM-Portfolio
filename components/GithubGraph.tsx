"use client";

import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { Panel, PanelHeader, PanelTitle } from "@/components/ui/panel";

const Calendar = dynamic(
    () => import("react-github-calendar").then((mod) => mod.GitHubCalendar),
    { ssr: false }
);

export function GithubGraph() {
    const { theme } = useTheme();

    return (
        <Panel id="github-contributions">
            <PanelHeader>
                <PanelTitle>GitHub Contributions</PanelTitle>
            </PanelHeader>
            <div className="w-full overflow-x-auto pb-4 pt-4 scrollbar-hide border-l border-dashed border-edge">
                <div className="flex min-w-max justify-center text-xs px-4">
                    <Calendar
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
