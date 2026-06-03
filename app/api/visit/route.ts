import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Vercel KV / Upstash Redis environment variables
const KV_REST_API_URL = process.env.KV_REST_API_URL;
const KV_REST_API_TOKEN = process.env.KV_REST_API_TOKEN;

// Local JSON file configurations (used for local development)
const DATA_FILE = path.join(process.cwd(), "data", "visitor-count.json");

interface VisitorData {
    total: number;
    monthly: number;
    currentMonth: string;
    seenThisMonth: string[];
}

function ensureDataFile() {
    const dataDir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
        fs.writeFileSync(
            DATA_FILE,
            JSON.stringify({ total: 0, monthly: 0, currentMonth: "", seenThisMonth: [] }, null, 2)
        );
    }
}

// Local visitor increment logic
function handleLocalVisit(clientId: string): { total: number; monthly: number } {
    ensureDataFile();
    const now = new Date();
    const thisMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

    let raw = fs.readFileSync(DATA_FILE, "utf-8");
    let data: VisitorData;
    try {
        data = JSON.parse(raw);
    } catch {
        data = { total: 0, monthly: 0, currentMonth: "", seenThisMonth: [] };
    }

    // Reset monthly counter if the month has rolled over
    if (data.currentMonth !== thisMonth) {
        data.currentMonth = thisMonth;
        data.monthly = 0;
        data.seenThisMonth = [];
    }

    // Increment counters if client is new this month
    if (clientId && !data.seenThisMonth.includes(clientId)) {
        data.total = (data.total || 0) + 1;
        data.monthly = (data.monthly || 0) + 1;
        data.seenThisMonth.push(clientId);

        // Cap stored clientIds to prevent file growing indefinitely (keep last 2000)
        if (data.seenThisMonth.length > 2000) {
            data.seenThisMonth.shift();
        }

        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    }

    return {
        total: data.total || 0,
        monthly: data.monthly || 0,
    };
}

// Vercel KV / Upstash Redis visitor increment logic
async function handleKVVisit(clientId: string): Promise<{ total: number; monthly: number } | null> {
    if (!KV_REST_API_URL || !KV_REST_API_TOKEN) return null;

    const now = new Date();
    const thisMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

    const totalKey = "portfolio:visitor:total";
    const monthlyKey = `portfolio:visitor:monthly:${thisMonth}`;
    const seenSetKey = `portfolio:visitor:seen:${thisMonth}`;

    const redisCommand = async (args: string[]) => {
        const response = await fetch(`${KV_REST_API_URL}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${KV_REST_API_TOKEN}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(args),
        });
        if (!response.ok) {
            throw new Error(`Redis error: ${response.statusText}`);
        }
        const res = await response.json();
        return res.result;
    };

    try {
        let isNew = 0;
        if (clientId) {
            // Add member to monthly set. SADD returns 1 if element is new, 0 if duplicate.
            isNew = await redisCommand(["SADD", seenSetKey, clientId]);
        }

        let total = 0;
        let monthly = 0;

        if (isNew === 1) {
            // Increment counters atomically
            total = await redisCommand(["INCR", totalKey]);
            monthly = await redisCommand(["INCR", monthlyKey]);

            // Set expiry of 60 days so old monthly counters clean up
            await redisCommand(["EXPIRE", monthlyKey, "5184000"]);
            await redisCommand(["EXPIRE", seenSetKey, "5184000"]);
        } else {
            // Fetch current stats
            const totalVal = await redisCommand(["GET", totalKey]);
            const monthlyVal = await redisCommand(["GET", monthlyKey]);
            total = totalVal ? parseInt(totalVal, 10) : 0;
            monthly = monthlyVal ? parseInt(monthlyVal, 10) : 0;
        }

        return { total, monthly };
    } catch (error) {
        console.error("KV Visitor counter error:", error);
        return null; // Force fallback to local
    }
}

// Fetch current statistics without incrementing
async function fetchCounts(): Promise<{ total: number; monthly: number }> {
    const now = new Date();
    const thisMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

    if (KV_REST_API_URL && KV_REST_API_TOKEN) {
        const totalKey = "portfolio:visitor:total";
        const monthlyKey = `portfolio:visitor:monthly:${thisMonth}`;

        const redisCommand = async (args: string[]) => {
            const response = await fetch(`${KV_REST_API_URL}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${KV_REST_API_TOKEN}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(args),
            });
            if (!response.ok) return null;
            const res = await response.json();
            return res.result;
        };

        try {
            const totalVal = await redisCommand(["GET", totalKey]);
            const monthlyVal = await redisCommand(["GET", monthlyKey]);
            return {
                total: totalVal ? parseInt(totalVal, 10) : 0,
                monthly: monthlyVal ? parseInt(monthlyVal, 10) : 0,
            };
        } catch {
            // fallback
        }
    }

    ensureDataFile();
    try {
        const raw = fs.readFileSync(DATA_FILE, "utf-8");
        const data: VisitorData = JSON.parse(raw);
        if (data.currentMonth !== thisMonth) {
            return { total: data.total || 0, monthly: 0 };
        }
        return { total: data.total || 0, monthly: data.monthly || 0 };
    } catch {
        return { total: 0, monthly: 0 };
    }
}

// GET: Fetch current counts
export async function GET() {
    try {
        const counts = await fetchCounts();
        return NextResponse.json(counts);
    } catch (error) {
        console.error("Error getting visitor counts:", error);
        return NextResponse.json({ total: 0, monthly: 0 }, { status: 500 });
    }
}

// POST: Record visit and return counts
export async function POST(request: Request) {
    try {
        let clientId = "";
        try {
            const body = await request.json();
            clientId = body.clientId || "";
        } catch {
            // No client ID provided
        }

        // Try KV first, then fallback to local filesystem
        let result = await handleKVVisit(clientId);
        if (!result) {
            result = handleLocalVisit(clientId);
        }

        return NextResponse.json(result);
    } catch (error) {
        console.error("Error recording visit:", error);
        return NextResponse.json({ total: 0, monthly: 0 }, { status: 500 });
    }
}
