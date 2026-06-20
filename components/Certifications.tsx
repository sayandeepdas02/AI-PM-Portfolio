import { certifications } from "@/data/certifications";
import { LinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Panel, PanelHeader, PanelTitle } from "@/components/ui/panel";

export default function Certifications() {
    return (
        <Panel id="certifications">
            <PanelHeader>
                <PanelTitle>
                    Certifications
                </PanelTitle>
            </PanelHeader>

            <div>
                {certifications.map((cert, index) => (
                    <div
                        key={index}
                        className="flex items-start hover:bg-accent2 transition-colors"
                    >
                        {/* Logo */}
                        {cert.logo ? (
                            <div className="relative mx-3 mt-4 flex size-10 shrink-0 select-none overflow-hidden rounded-lg sm:mx-4">
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
                            <div className="mx-3 mt-4 flex size-10 shrink-0 items-center justify-center rounded-lg border border-muted-foreground/15 bg-muted text-xs font-mono text-muted-foreground ring-1 ring-edge ring-offset-1 ring-offset-background select-none sm:mx-4">
                                {cert.icon || cert.issuer.charAt(0)}
                            </div>
                        )}

                        <div className="flex-1 border-l border-dashed border-edge">
                            <div className="flex w-full items-start gap-3 p-4 pr-2">
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
            </div>
        </Panel>
    );
}
