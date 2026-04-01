import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Download, FileText } from "lucide-react";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resume | Sayandeep Das',
  description: 'View my professional resume',
};

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto w-full md:max-w-3xl flex flex-col min-h-screen px-0">
        <Navbar />
        
        <div className="flex-1 py-10 px-4 md:px-0 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-secondary/50 rounded-lg border border-edge">
                <FileText className="text-foreground/80" size={22} strokeWidth={1.5} />
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl font-bold tracking-tight text-foreground">My Resume</h1>
                <p className="text-[13px] text-muted-foreground mt-0.5">Updated Document</p>
              </div>
            </div>
            
            <a 
              href="https://drive.google.com/file/d/1U_3TLj_0-y_AmwbRI_7tx6D0XlrKTNvn/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-foreground text-background hover:bg-foreground/90 transition-colors rounded-md shadow-sm"
            >
              <Download size={15} strokeWidth={2} />
              Download PDF
            </a>
          </div>
          
          <div className="w-full h-[800px] rounded-xl overflow-hidden border border-edge shadow-sm ring-1 ring-border/30 bg-secondary/20">
            <iframe 
              src="https://drive.google.com/file/d/1U_3TLj_0-y_AmwbRI_7tx6D0XlrKTNvn/preview" 
              className="w-full h-full border-none"
              title="Resume PDF Viewer"
              allow="autoplay"
            />
          </div>
        </div>
        
        <Footer />
      </div>
    </main>
  );
}
