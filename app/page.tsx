import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Certifications from "@/components/Certifications";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";
import { GithubGraph } from "@/components/GithubGraph";
import { TechStack } from "@/components/TechStack";
import { PomodoroTimer } from "@/components/PomodoroTimer";
import BookACall from "@/components/BookACall";

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="mx-auto md:max-w-3xl *:[[id]]:scroll-mt-22">
        <Navbar />
        <Hero />
        <Separator />

        <Experience />
        <Separator />

        <GithubGraph />
        <Separator />

        <Projects />
        <Separator />

        <TechStack />
        <Separator />

        <Education />
        <Separator />

        <Certifications />
        <Separator />

        <BookACall />
        <Separator />

        <PomodoroTimer />
        <section aria-label="About Sayandeep Das" style={{ fontSize: '12px', color: '#999', padding: '24px 0', textAlign: 'center' }}>
          Sayandeep Das is a Growth Product Manager and AI Product Manager based in Bengaluru, India.
          Currently a Member of GTM Staff at Trelium (YC F25), previously Associate Product Manager at SuperAGI.
          Studying Data Science and Artificial Intelligence at IIT Guwahati.
          Specializes in 0→1 AI product development, GTM strategy, agentic AI workflows, LLM applications,
          B2B SaaS growth, conversion optimization, growth marketing, SEO, and answer engine optimization.
          Known for building Hyperglork AI, Notemind AI, and Fluxberry AI.
          He also writes about AI, product strategy, GTM systems, recruitment, and startup scaling.
        </section>
        <Footer />
      </div>
    </main>
  );
}
