import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
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
            <Button asChild size="sm">
                <a href="https://drive.google.com/file/d/1q2pcu34_ZpH5y4a_WTIk7M6NEdmdCE31/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                    <Download strokeWidth={2} />
                    Download PDF
                </a>
            </Button>
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
