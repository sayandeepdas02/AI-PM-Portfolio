import { certifications } from "@/data/certifications";
import { LinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Panel, PanelContent, PanelHeader, PanelTitle } from "@/components/ui/panel";

export default function Certifications() {
    return (
        <Panel id="certifications">
            <PanelHeader>
                <PanelTitle>
                    Certifications
                </PanelTitle>
            </PanelHeader>

            <PanelContent className="flex flex-col gap-1 p-2">
                {certifications.map((cert, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-4 rounded-lg p-3 hover:bg-accent2 transition-colors"
                    >
                        {/* Logo */}
                        {cert.logo ? (
                            <div className="flex size-10 shrink-0 select-none relative overflow-hidden rounded-lg">
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
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-muted-foreground/15 bg-muted text-muted-foreground select-none text-xs font-mono">
                                {cert.icon || cert.issuer.charAt(0)}
                            </div>
                        )}

                        <div className="min-w-0 flex-1">
                            <div className="flex w-full items-center gap-2">
                                <div className="flex-1">
                                    <h3 className="mb-1 leading-snug font-medium text-balance">
                                        {cert.name}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        @ {cert.issuer} · {cert.date}
                                    </p>
                                </div>

                                {/* Link Icon */}
                                <Link
                                    className="relative flex size-6 shrink-0 items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                                    href={`/certifications/${cert.slug}`}
                                >
                                    <LinkIcon className="size-4" />
                                    <span className="sr-only">View Certificate</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </PanelContent>
        </Panel>
    );
}
