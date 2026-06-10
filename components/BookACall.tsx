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
                    width="100%"
                    height="700"
                    frameBorder="0"
                    style={{ display: "block", border: "none" }}
                />
            </div>
        </Panel>
    );
}
