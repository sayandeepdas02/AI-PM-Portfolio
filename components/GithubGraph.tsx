import ContributionSkyline, { type ContributionDay } from "@/components/ui/contribution-skyline";
import { Panel, PanelContent, PanelHeader, PanelTitle } from "@/components/ui/panel";
import { githubUrl } from "@/data/social";

const GITHUB_USERNAME = "sayandeepdas02";
// Public mirror of the GitHub contribution calendar (the source react-github-calendar used)
const CONTRIBUTIONS_API = `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`;
const REVALIDATE_SECONDS = 60 * 60 * 6;

async function getContributions(): Promise<ContributionDay[] | null> {
    try {
        const res = await fetch(CONTRIBUTIONS_API, {
            next: { revalidate: REVALIDATE_SECONDS },
            signal: AbortSignal.timeout(8000),
        });
        if (!res.ok) return null;
        const json = (await res.json()) as { contributions?: ContributionDay[] };
        if (!Array.isArray(json.contributions) || json.contributions.length === 0) return null;
        return json.contributions.map(({ date, count }) => ({ date, count }));
    } catch {
        return null;
    }
}

export async function GithubGraph() {
    const data = await getContributions();

    return (
        <Panel id="github-contributions">
            <PanelHeader>
                <PanelTitle>GitHub Contributions</PanelTitle>
            </PanelHeader>
            <div>
                {/* Never render the skyline without real data: it would fall back to a generated sample year */}
                {data ? (
                    <ContributionSkyline data={data} />
                ) : (
                    <PanelContent className="p-4 text-sm text-muted-foreground">
                        Contributions are unavailable right now. See them on{" "}
                        <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-foreground">
                            GitHub
                        </a>
                        .
                    </PanelContent>
                )}
            </div>
        </Panel>
    );
}
