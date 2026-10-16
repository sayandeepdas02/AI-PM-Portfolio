import { education } from "@/data/education";
import Image from "next/image";
import { Panel, PanelContent, PanelHeader, PanelTitle } from "@/components/ui/panel";

export default function Education() {
    return (
        <Panel id="education">
            <PanelHeader>
                <PanelTitle>
                    Education
                </PanelTitle>
            </PanelHeader>

            <PanelContent className="flex flex-col gap-1 p-2">
                {education.map((edu, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-4 rounded-lg p-3 hover:bg-accent2 transition-colors"
                    >
                        {/* Logo */}
                        {edu.logo ? (
                            <div className="flex size-10 shrink-0 select-none relative overflow-hidden rounded-lg">
                                <Image
                                    src={edu.logo}
                                    alt={edu.institution}
                                    width={40}
                                    height={40}
                                    className="object-cover"
                                    unoptimized
                                />
                            </div>
                        ) : (
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-muted-foreground/15 bg-muted text-muted-foreground select-none text-xs font-mono">
                                {edu.institution.split(' ').map(word => word.charAt(0)).slice(0, 2).join('')}
                            </div>
                        )}

                        <div className="min-w-0 flex-1">
                            <div className="flex w-full items-center gap-2">
                                <div className="flex-1">
                                    <h3 className="mb-1 leading-snug font-medium text-balance">
                                        {edu.degree}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        @ {edu.institution}
                                    </p>
                                    <p className="text-xs font-mono text-muted-foreground mt-0.5">
                                        {edu.year}{edu.location && ` · ${edu.location}`}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </PanelContent>
        </Panel>
    );
}
