import { certifications } from "@/data/certifications";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Download } from "lucide-react";
import { Metadata } from "next";
import { Panel, PanelHeader, PanelTitle } from "@/components/ui/panel";
import { Separator } from "@/components/ui/separator";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
    return certifications.map((cert) => ({ slug: cert.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const cert = certifications.find((c) => c.slug === slug);
    if (!cert) return {};
    return {
        title: `${cert.name} | Sayandeep Das`,
        description: `${cert.name} certificate issued by ${cert.issuer}`,
    };
}

export default async function CertificatePage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const cert = certifications.find((c) => c.slug === slug);
    if (!cert) notFound();

    const driveViewUrl = `https://drive.google.com/file/d/${cert.driveFileId}/view?usp=sharing`;
    const drivePreviewUrl = `https://drive.google.com/file/d/${cert.driveFileId}/preview`;

    return (
        <main className="min-h-screen">
            <div className="mx-auto md:max-w-3xl *:[[id]]:scroll-mt-22">
                <Navbar />

                <Panel id="certificate">
                    <PanelHeader className="flex flex-col items-start gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <PanelTitle>{cert.name}</PanelTitle>
                            <p className="text-sm text-muted-foreground mt-0.5">
                                {cert.issuer} · {cert.date}
                            </p>
                        </div>
                        <a
                            href={driveViewUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex w-full items-center justify-center gap-2 rounded shadow-sm bg-foreground px-3 py-1.5 text-sm font-medium text-background transition-colors hover:bg-foreground/90 sm:w-auto relative overflow-hidden before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.7)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:transition-[background-position_0s_ease] before:duration-1000 hover:before:bg-[position:-100%_0,0_0] dark:before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%,transparent_100%)] cursor-pointer"
                        >
                            <Download size={14} strokeWidth={2} />
                            Open in Drive
                        </a>
                    </PanelHeader>

                    <div className="relative h-[70vh] min-h-[480px] w-full bg-secondary/20 sm:h-[800px]">
                        <iframe
                            src={drivePreviewUrl}
                            className="w-full h-full border-none absolute inset-0"
                            title={`${cert.name} Certificate`}
                            allow="autoplay"
                        />
                    </div>
                </Panel>

                <Separator />
                <Footer />
            </div>
        </main>
    );
}
