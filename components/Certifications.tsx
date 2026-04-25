import { certifications } from "@/data/certifications";
import { LinkIcon } from "lucide-react";
import Image from "next/image";
import { Panel, PanelHeader, PanelTitle, PanelTitleSup } from "@/components/ui/panel";

export default function Certifications() {
    return (
        <Panel id="certifications">
            <PanelHeader>
                <PanelTitle>
                    Certifications
                    <PanelTitleSup>({certifications.length})</PanelTitleSup>
                </PanelTitle>
            </PanelHeader>

            <div>
                {certifications.map((cert, index) => (
                    <div
                        key={index}
                        className="flex items-center hover:bg-accent2 transition-colors"
                    >
                        {/* Logo */}
                        {cert.logo ? (
                            <div className="mx-4 flex size-10 shrink-0 select-none relative overflow-hidden rounded-lg">
                                <Image
                                    src={cert.logo}
                                    alt={cert.issuer}
                                    width={40}
                                    height={40}
                                    className="object-cover"
                                    unoptimized
                                />
                            </div>
                        ) : (
                            <div className="mx-4 flex size-10 shrink-0 items-center justify-center rounded-lg border border-muted-foreground/15 bg-muted text-muted-foreground ring-1 ring-edge ring-offset-1 ring-offset-background select-none text-xs font-mono">
                                {cert.icon || cert.issuer.charAt(0)}
                            </div>
                        )}

                        <div className="flex-1 border-l border-dashed border-edge">
                            <div className="flex w-full items-center gap-2 p-4 pr-2">
                                <div className="flex-1">
                                    <h3 className="mb-1 leading-snug font-medium text-balance">
                                        {cert.name}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        @ {cert.issuer} · {cert.date}
                                    </p>
                                </div>

                                {/* Link Icon */}
                                {cert.url && (
                                    <a
                                        className="relative flex size-6 shrink-0 items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                                        href={cert.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <LinkIcon className="size-4" />
                                        <span className="sr-only">View Certificate</span>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Panel>
    );
}
