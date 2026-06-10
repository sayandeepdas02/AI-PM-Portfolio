import { experiences } from "@/data/experience";
import Image from "next/image";
import { Panel, PanelHeader, PanelTitle } from "@/components/ui/panel";

export default function Experience() {
    return (
        <Panel id="experience">
            <PanelHeader>
                <PanelTitle>
                    Experience
                </PanelTitle>
            </PanelHeader>

            <div>
                {experiences.map((job, index) => (
                    <div
                        key={index}
                        className="flex items-start hover:bg-accent2 transition-colors"
                    >
                        {/* Logo */}
                        {job.logo ? (
                            <div className="mx-4 mt-4 flex size-10 shrink-0 select-none relative overflow-hidden rounded-lg">
                                <Image
                                    src={job.logo}
                                    alt={job.company}
                                    width={40}
                                    height={40}
                                    className="object-cover"
                                    unoptimized
                                />
                            </div>
                        ) : (
                            <div className="mx-4 mt-4 flex size-10 shrink-0 items-center justify-center rounded-lg border border-muted-foreground/15 bg-muted text-muted-foreground ring-1 ring-edge ring-offset-1 ring-offset-background select-none text-xs font-mono">
                                {job.company.charAt(0)}
                            </div>
                        )}

                        <div className="flex-1 border-l border-dashed border-edge">
                            <div className="p-4">
                                <div className="flex items-start justify-between gap-4 mb-2">
                                    <div>
                                        <h3 className="mb-1 leading-snug font-medium text-balance">
                                            {job.role}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            @ {job.company}
                                        </p>
                                    </div>
                                    <div className="text-xs font-mono text-muted-foreground text-right shrink-0">
                                        <div>{job.period} / {job.duration}</div>
                                        <div className="mt-0.5">{job.location}</div>
                                    </div>
                                </div>

                                {/* Description bullets */}
                                <ul className="mb-3 space-y-1">
                                    {job.description.map((item, i) => (
                                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                            <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0 bg-muted-foreground" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Tech Stack */}
                                <div className="flex flex-wrap gap-1.5">
                                    {job.techStack.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-2 py-0.5 text-xs rounded border border-muted-foreground/15 bg-muted text-muted-foreground"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Panel>
    );
}
