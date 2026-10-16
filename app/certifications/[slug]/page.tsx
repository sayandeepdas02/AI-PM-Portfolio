import { certifications } from "@/data/certifications";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
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
                    <PanelHeader className="flex items-center justify-between py-4">
                        <div>
                            <PanelTitle>{cert.name}</PanelTitle>
                            <p className="text-sm text-muted-foreground mt-0.5">
                                {cert.issuer} · {cert.date}
                            </p>
                        </div>
                        <Button asChild size="sm">
                            <a href={driveViewUrl} target="_blank" rel="noopener noreferrer">
                                <Download strokeWidth={2} />
                                Open in Drive
                            </a>
                        </Button>
                    </PanelHeader>

                    <div className="w-full h-[800px] bg-secondary/20 relative">
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
