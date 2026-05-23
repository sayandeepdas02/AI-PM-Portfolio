import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Download } from "lucide-react";
import { Metadata } from 'next';
import { Panel, PanelHeader, PanelTitle } from "@/components/ui/panel";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: 'Resume | Sayandeep Das',
  description: 'View my professional resume',
};

export default function ResumePage() {
  return (
    <main className="min-h-screen">
      <div className="mx-auto md:max-w-3xl *:[[id]]:scroll-mt-22">
        <Navbar />

        <Panel id="resume">
          <PanelHeader className="flex items-center justify-between py-4">
            <PanelTitle>My Resume</PanelTitle>
            <a
              href="https://drive.google.com/file/d/1q2pcu34_ZpH5y4a_WTIk7M6NEdmdCE31/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium bg-foreground text-background hover:bg-foreground/90 transition-colors rounded shadow-sm relative overflow-hidden before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.7)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:transition-[background-position_0s_ease] before:duration-1000 hover:before:bg-[position:-100%_0,0_0] dark:before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%,transparent_100%)] cursor-pointer"
            >
              <Download size={14} strokeWidth={2} />
              Download PDF
            </a>
          </PanelHeader>

          <div className="w-full h-[800px] bg-secondary/20 relative">
            <iframe
              src="https://drive.google.com/file/d/1q2pcu34_ZpH5y4a_WTIk7M6NEdmdCE31/preview"
              className="w-full h-full border-none absolute inset-0"
              title="Resume PDF Viewer"
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
