import { education } from "@/data/education";
import Image from "next/image";
import { Panel, PanelHeader, PanelTitle } from "@/components/ui/panel";

export default function Education() {
    return (
        <Panel id="education">
            <PanelHeader>
                <PanelTitle>
                    Education
                </PanelTitle>
            </PanelHeader>

            <div>
                {education.map((edu, index) => (
                    <div
                        key={index}
                        className="flex items-start hover:bg-accent2 transition-colors"
                    >
                        {/* Logo */}
                        {edu.logo ? (
                            <div className="relative mx-3 mt-4 flex size-10 shrink-0 select-none overflow-hidden rounded-lg sm:mx-4">
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
                            <div className="mx-3 mt-4 flex size-10 shrink-0 items-center justify-center rounded-lg border border-muted-foreground/15 bg-muted text-xs font-mono text-muted-foreground ring-1 ring-edge ring-offset-1 ring-offset-background select-none sm:mx-4">
                                {edu.institution.split(' ').map(word => word.charAt(0)).slice(0, 2).join('')}
                            </div>
                        )}

                        <div className="flex-1 border-l border-dashed border-edge">
                            <div className="flex w-full items-start gap-2 p-4 pr-2">
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
