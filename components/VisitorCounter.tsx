"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, Eye } from "lucide-react";

export default function VisitorCounter() {
    const [stats, setStats] = useState<{ total: number; monthly: number } | null>(null);

    useEffect(() => {
        let clientId = "";
        try {
            if (typeof window !== "undefined") {
                let id = localStorage.getItem("portfolio_visitor_id");
                if (!id) {
                    // Generate a cryptographically secure random identifier for uniqueness
                    id = "usr_" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
                    localStorage.setItem("portfolio_visitor_id", id);
                }
                clientId = id;
            }
        } catch (error) {
            console.error("Local storage error:", error);
        }

        // Post visit to register uniquely on the backend
        fetch("/api/visit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ clientId }),
        })
            .then((res) => res.json())
            .then((data) => {
                setStats({
                    total: data.total || 0,
                    monthly: data.monthly || 0,
                });
            })
            .catch((err) => console.error("Failed to fetch visitor statistics:", err));
    }, []);

    if (!stats) {
        return null;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex items-center justify-center gap-3 mt-4 text-[10px] font-mono text-muted-foreground select-none"
        >
            <div className="flex items-center gap-1.5 bg-accent/20 px-2 py-1 rounded border border-edge">
                <Users className="size-3 text-muted-foreground/70" strokeWidth={1.5} />
                <span>
                    visitors: <span className="font-semibold text-foreground">{stats.total.toLocaleString()}</span>
                </span>
            </div>
            <div className="flex items-center gap-1.5 bg-accent/20 px-2 py-1 rounded border border-edge">
                <Eye className="size-3 text-muted-foreground/70" strokeWidth={1.5} />
                <span>
                    monthly: <span className="font-semibold text-foreground">{stats.monthly.toLocaleString()}</span>
                </span>
            </div>
        </motion.div>
    );
}
