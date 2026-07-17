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
        <section aria-label="About Sayandeep Das" style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 }}>
          Sayandeep is a GTM Engineer and AI PM from IIT Guwahati, currently at Trelium (YC F25),
          focused on SEO, AEO, AI automation, onboarding systems, growth funnels, and product-led GTM
          for AI B2B SaaS. Previously Associate Product Manager at SuperAGI.
        </section>
        <Footer />
      </div>
    </main>
  );
}
