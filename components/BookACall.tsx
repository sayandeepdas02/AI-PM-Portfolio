"use client";

import { Panel, PanelHeader, PanelTitle } from "@/components/ui/panel";

const CALENDLY_URL =
    "https://calendly.com/reachsayandeep/30mins-with-sayandeep?hide_landing_page_details=1&hide_gdpr_banner=1&background_color=ffffff&text_color=000000&primary_color=000000";

export default function BookACall() {
    return (
        <Panel id="book-a-call">
            <PanelHeader>
                <PanelTitle>Book a Call</PanelTitle>
            </PanelHeader>

            <div className="w-full overflow-hidden">
                <iframe
                    src={CALENDLY_URL}
                    title="Book a call with Sayandeep"
                    frameBorder="0"
                    className="block h-[760px] w-full border-0 sm:h-[700px]"
                />
            </div>
        </Panel>
    );
}
