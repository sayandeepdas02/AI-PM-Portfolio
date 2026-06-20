import { projects } from "@/data/projects";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Github, Globe, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";
import { Panel, PanelHeader, PanelTitle, PanelContent } from "@/components/ui/panel";
import type { Metadata } from "next";

const projectMetadata: Record<string, Partial<Metadata>> = {
  "hyperglork-ai": {
    title: "Hyperglork AI — AI Voice Agents for Medical Professionals",
    description:
      "Hyperglork AI is an AI voice agent platform built by Sayandeep Das for automating inbound calls, appointment booking, and scheduling in healthcare clinics. Built with LLMs, RAG, and Speech-to-Text.",
    alternates: { canonical: "https://ai.sayandeep.space/projects/hyperglork-ai" },
    openGraph: {
      title: "Hyperglork AI — AI Voice Agents for Medical Professionals | Sayandeep Das",
      description: "AI voice agents for clinics. Automates inbound calls and appointment booking using LLMs and RAG.",
      url: "https://ai.sayandeep.space/projects/hyperglork-ai",
      images: [{ url: "https://ai.sayandeep.space/og-image.jpg", width: 1200, height: 630 }],
    },
  },
  "notemind-ai": {
    title: "Notemind AI — AI Notetaker for Google Meet",
    description:
      "Notemind AI is an AI-powered meeting notetaker built by Sayandeep Das. Reduces manual note-taking effort by 60% through real-time transcription and summarization for Google Meet.",
    alternates: { canonical: "https://ai.sayandeep.space/projects/notemind-ai" },
    openGraph: {
      title: "Notemind AI — AI Notetaker for Google Meet | Sayandeep Das",
      description: "AI meeting notetaker for transcription and summarization. Cuts note-taking effort by 60%.",
      url: "https://ai.sayandeep.space/projects/notemind-ai",
      images: [{ url: "https://ai.sayandeep.space/og-image.jpg", width: 1200, height: 630 }],
    },
  },
  "fluxberry-ai": {
    title: "Fluxberry AI — AI-Native Automation for Technical Hiring",
    description:
      "Fluxberry AI automates technical hiring workflows end-to-end — resume parsing, assessments, and candidate scoring. Built by Sayandeep Das with React, Node.js, and OpenAI API.",
    alternates: { canonical: "https://ai.sayandeep.space/projects/fluxberry-ai" },
    openGraph: {
      title: "Fluxberry AI — AI-Native Automation for Technical Hiring | Sayandeep Das",
      description: "End-to-end interview automation: resume parsing, assessments, and candidate scoring.",
      url: "https://ai.sayandeep.space/projects/fluxberry-ai",
      images: [{ url: "https://ai.sayandeep.space/og-image.jpg", width: 1200, height: 630 }],
    },
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  if (projectMetadata[slug]) return projectMetadata[slug];

  return {
    title: project.name,
    description: project.description,
    alternates: { canonical: `https://ai.sayandeep.space/projects/${slug}` },
    openGraph: {
      title: `${project.name} | Sayandeep Das`,
      description: project.description,
      url: `https://ai.sayandeep.space/projects/${slug}`,
      images: [{ url: "https://ai.sayandeep.space/og-image.jpg", width: 1200, height: 630 }],
    },
  };
}

export function generateStaticParams() {
    return projects.map((p) => ({
        slug: p.slug,
    }));
}

export default async function ProjectDetails({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = projects.find((p) => p.slug === slug);

    if (!project) {
        notFound();
    }

    const jsonLd = project.type === "tech"
        ? {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": project.name,
            "url": project.liveUrl ?? `https://ai.sayandeep.space/projects/${project.slug}`,
            "author": {
                "@type": "Person",
                "name": "Sayandeep Das",
                "url": "https://ai.sayandeep.space"
            },
            "description": project.description,
            "applicationCategory": "WebApplication",
            "operatingSystem": "Web",
            "offers": { "@type": "Offer", "price": "0" }
          }
        : null;

    return (
        <main className="min-h-screen">
            {jsonLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            )}
            <div className="mx-auto md:max-w-3xl *:[[id]]:scroll-mt-22">
                <Navbar />

                <Panel className="pt-6">
                    <PanelHeader className="flex flex-col gap-6 pb-6">
                        {/* Back button */}
                        <Link href="/#projects" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit group">
                            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                            Back to Portfolio
                        </Link>

                        {/* Logo and Project Name / Action CTA */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                {project.image ? (
                                    <div className="relative size-16 md:size-20 rounded-2xl overflow-hidden border border-edge shrink-0 bg-zinc-900 shadow-md">
                                        <Image
                                            src={project.image}
                                            alt={project.name}
                                            fill
                                            className="object-cover"
                                            unoptimized
                                        />
                                    </div>
                                ) : (
                                    <div className="size-16 md:size-20 rounded-2xl flex items-center justify-center bg-zinc-900 border border-edge text-3xl font-serif italic text-white/50 shrink-0 shadow-md">
                                        {project.name.charAt(0)}
                                    </div>
                                )}
                                <div className="flex flex-col gap-1.5">
                                    <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider rounded border border-edge bg-muted text-muted-foreground inline-block w-fit">
                                        {project.category}
                                    </span>
                                    <PanelTitle className="text-2xl md:text-3xl text-balance">
                                        {project.name}
                                    </PanelTitle>
                                </div>
                            </div>

                            {/* "Open in Drive" Button (Case Studies) */}
                            {project.type === "case-study" && project.liveUrl && (
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-foreground text-background hover:bg-foreground/90 transition-colors rounded-lg shadow-sm w-fit self-start sm:self-center shrink-0 cursor-pointer"
                                >
                                    <Globe className="size-4" />
                                    <span>Open in Drive</span>
                                </a>
                            )}
                        </div>
                    </PanelHeader>

                    <PanelContent className="p-0">
                        {project.type === "case-study" ? (
                            /* Case Study layout: PDF iframe on top, metadata below */
                            <div className="flex flex-col gap-6 p-4 md:p-6 border-t border-edge bg-accent/5">
                                {/* PDF Viewer */}
                                <div className="relative h-[60vh] min-h-[420px] w-full overflow-hidden rounded-xl border border-edge bg-secondary/20 shadow-md md:h-[650px]">
                                    <iframe
                                        src={project.liveUrl?.replace("view?usp=sharing", "preview")}
                                        className="w-full h-full border-none absolute inset-0"
                                        title={`${project.name} PDF Viewer`}
                                        allow="autoplay"
                                    />
                                </div>

                                {/* Project Details below PDF */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-edge/60">
                                    {/* Left Column: Description & Tech Stack */}
                                    <div className="flex flex-col gap-6">
                                        <div>
                                            <h3 className="text-sm font-medium mb-2 uppercase tracking-wider text-muted-foreground">Case Study Overview</h3>
                                            <p className="text-sm text-foreground/90 leading-relaxed">
                                                {project.description}
                                            </p>
                                        </div>

                                        <div>
                                            <h3 className="text-sm font-medium mb-2 uppercase tracking-wider text-muted-foreground">Focus Areas & Skills</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {project.techStack.map((tech) => (
                                                    <span
                                                        key={tech}
                                                        className="px-2.5 py-1 text-xs font-mono rounded border border-edge bg-background text-muted-foreground shadow-sm"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Column: Key details */}
                                    {project.details && project.details.length > 0 && (
                                        <div>
                                            <h3 className="text-sm font-medium mb-2 uppercase tracking-wider text-muted-foreground">Key Insights & Recommendations</h3>
                                            <ul className="list-disc pl-5 space-y-2 text-sm text-foreground/90">
                                                {project.details.map((detail, idx) => (
                                                    <li key={idx} className="leading-relaxed">{detail}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            /* Standard 2-column layout for other projects */
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 md:p-6 items-start border-t border-edge bg-accent/5">
                                
                                {/* Left Column: Video & Action Buttons */}
                                <div className="flex flex-col gap-4">
                                    <div className="w-full aspect-video rounded-xl overflow-hidden border border-edge bg-zinc-950 shadow-xl ring-1 ring-white/10">
                                        {project.demoUrl ? (
                                            <iframe 
                                                src={project.demoUrl} 
                                                title={`${project.name} Demo`} 
                                                className="w-full h-full"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                                allowFullScreen
                                            ></iframe>
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-zinc-900 relative">
                                                {project.image ? (
                                                    <Image
                                                        src={project.image}
                                                        alt={project.name}
                                                        fill
                                                        className="object-cover opacity-60"
                                                        unoptimized
                                                    />
                                                ) : (
                                                    <span className="text-muted-foreground font-mono text-sm">No preview available</span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    
                                    {/* Action Buttons underneath the video */}
                                    <div className="grid grid-cols-2 gap-3">
                                        {project.githubUrl ? (
                                            <a
                                                href={project.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-lg border border-edge bg-background text-foreground hover:bg-accent transition-colors shadow-sm"
                                            >
                                                <Github className="size-4" />
                                                Github
                                            </a>
                                        ) : (
                                            <div className="flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-lg border border-edge bg-background/50 text-muted-foreground cursor-not-allowed">
                                                <Github className="size-4" />
                                                Github
                                            </div>
                                        )}

                                        {project.liveUrl ? (
                                            <a
                                                href={project.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-lg border border-edge bg-foreground text-background hover:bg-foreground/90 transition-colors shadow-sm shadow-foreground/20"
                                            >
                                                <Globe className="size-4" />
                                                Live
                                            </a>
                                        ) : (
                                            <div className="flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-lg border border-edge bg-background/50 text-muted-foreground cursor-not-allowed">
                                                <Globe className="size-4" />
                                                Live
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Right Column: Project Description */}
                                <div className="flex flex-col gap-6">
                                    {/* Description */}
                                    <div>
                                        <h3 className="text-sm font-medium mb-2 uppercase tracking-wider text-muted-foreground">Project Overview</h3>
                                        <p className="text-sm text-foreground/90 leading-relaxed">
                                            {project.description}
                                        </p>
                                    </div>

                                    {/* Details */}
                                    {project.details && project.details.length > 0 && (
                                        <div>
                                            <h3 className="text-sm font-medium mb-2 uppercase tracking-wider text-muted-foreground">Key Features</h3>
                                            <ul className="list-disc pl-5 space-y-2 text-sm text-foreground/90">
                                                {project.details.map((detail, idx) => (
                                                    <li key={idx} className="leading-relaxed">{detail}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Tech Stack */}
                                    <div>
                                        <h3 className="text-sm font-medium mb-2 uppercase tracking-wider text-muted-foreground">Tech Stack</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {project.techStack.map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="px-2.5 py-1 text-xs font-mono rounded border border-edge bg-background text-muted-foreground shadow-sm"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </PanelContent>
                </Panel>
                
                <Separator />
                <Footer />
            </div>
        </main>
    );
}
