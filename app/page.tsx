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

        <PomodoroTimer />
        <Footer />
      </div>
    </main>
  );
}
