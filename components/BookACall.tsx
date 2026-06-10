"use client";

import { useEffect } from "react";
import Script from "next/script";
import { Panel, PanelHeader, PanelTitle } from "@/components/ui/panel";

declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Cal?: any;
    }
}

export default function BookACall() {
    useEffect(() => {
        if (typeof window !== "undefined" && window.Cal) {
            window.Cal("inline", {
                elementOrSelector: "#cal-booking-inline",
                calLink: "dsayandeep/30min",
                layout: "month_view",
            });
            window.Cal("ui", {
                theme: "auto",
                styles: { branding: { brandColor: "#000000" } },
                hideEventTypeDetails: false,
                layout: "month_view",
            });
        }
    }, []);

    return (
        <Panel id="book-a-call">
            <PanelHeader>
                <PanelTitle>Book a Call</PanelTitle>
            </PanelHeader>

            <Script
                src="https://app.cal.com/embed/embed.js"
                strategy="lazyOnload"
                onLoad={() => {
                    if (window.Cal) {
                        window.Cal("init", { origin: "https://cal.com" });
                        window.Cal("inline", {
                            elementOrSelector: "#cal-booking-inline",
                            calLink: "dsayandeep/30min",
                            layout: "month_view",
                        });
                        window.Cal("ui", {
                            theme: "auto",
                            styles: { branding: { brandColor: "#000000" } },
                            hideEventTypeDetails: false,
                            layout: "month_view",
                        });
                    }
                }}
            />

            <div
                id="cal-booking-inline"
                className="w-full min-h-[600px]"
                style={{ height: "700px" }}
            />
        </Panel>
    );
}
