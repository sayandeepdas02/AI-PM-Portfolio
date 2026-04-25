import { education } from "@/data/education";
import Image from "next/image";
import { Panel, PanelHeader, PanelTitle, PanelTitleSup } from "@/components/ui/panel";

export default function Education() {
    return (
        <Panel id="education">
            <PanelHeader>
                <PanelTitle>
                    Education
                    <PanelTitleSup>({education.length})</PanelTitleSup>
                </PanelTitle>
            </PanelHeader>

            <div>
                {education.map((edu, index) => (
                    <div
                        key={index}
                        className="flex items-center hover:bg-accent2 transition-colors"
                    >
                        {/* Logo */}
                        {edu.logo ? (
                            <div className="mx-4 flex size-10 shrink-0 select-none relative overflow-hidden rounded-lg">
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
                            <div className="mx-4 flex size-10 shrink-0 items-center justify-center rounded-lg border border-muted-foreground/15 bg-muted text-muted-foreground ring-1 ring-edge ring-offset-1 ring-offset-background select-none text-xs font-mono">
                                {edu.institution.split(' ').map(word => word.charAt(0)).slice(0, 2).join('')}
                            </div>
                        )}

                        <div className="flex-1 border-l border-dashed border-edge">
                            <div className="flex w-full items-center gap-2 p-4 pr-2">
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
            </div>
        </Panel>
    );
}
