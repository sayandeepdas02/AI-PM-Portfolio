import { projects } from "@/data/projects";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";

export function generateStaticParams() {
    return projects.filter(p => p.demoUrl).map((p) => ({
        slug: p.slug,
    }));
}

export default function ProjectDemo({ params }: { params: { slug: string } }) {
    const project = projects.find((p) => p.slug === params.slug);

    if (!project || !project.demoUrl) {
        notFound();
    }

    return (
        <main className="min-h-screen py-16 px-4 sm:px-8 bg-zinc-950">
            <div className="mx-auto md:max-w-5xl flex flex-col gap-6 h-full">
                <div className="flex items-center justify-between">
                    <Link href={`/projects/${project.slug}`} className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors w-fit group">
                        <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                        Back to {project.name}
                    </Link>
                    <a 
                        href={project.demoUrl.replace("embed/", "watch?v=")} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-400 hover:text-white transition-colors"
                    >
                        View on YouTube
                        <ExternalLink className="size-3" />
                    </a>
                </div>
                
                <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-zinc-800 bg-black shadow-2xl ring-1 ring-white/10">
                    <iframe 
                        src={project.demoUrl} 
                        title={`${project.name} Demo`} 
                        className="absolute inset-0 w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        allowFullScreen
                    ></iframe>
                </div>
                
                <div className="text-center mt-4">
                    <h1 className="text-2xl font-medium text-zinc-100">{project.name}</h1>
                    <p className="text-zinc-500 mt-2 text-sm max-w-2xl mx-auto">{project.description}</p>
                </div>
            </div>
        </main>
    );
}
