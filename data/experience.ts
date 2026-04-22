export interface Experience {
    role: string;
    company: string;
    period: string;
    location: string;
    description: string[];
    techStack: string[];
    logo?: string;
}

export const experiences: Experience[] = [
    {
        role: "Software Engineer",
        company: "SuperAGI",
        period: "Jul 2025 - Present",
        location: "Bengaluru, INDIA",
        description: [
            "Architected distributed campaign orchestration system using Golang microservices and Redis queues, enabling 700+ SDR campaigns/month with idempotent workers, retry strategies, and token-bucket rate limiting.",
            "Designed AI-driven templating and execution engine (Ruby + Golang) with context-aware runtime resolution and dependency graph evaluation, powering 5,000+ actions/month with deterministic outputs under concurrent updates.",
            "Built high-throughput async job pipelines using Redis queues, implementing deduplication, backpressure handling, and priority scheduling, supporting 500+ DAUs with predictable latency and fault-tolerant execution.",
            "Developed AI voice agent infrastructure integrating LLMs with Twilio/Plivo APIs, enabling real-time call streaming, transcription pipelines, and structured data extraction with low-latency and resilient failure handling.",
            "Led frontend architecture using Next.js (SSR/CSR hybrid), building real-time dashboards and campaign builders with modular components and API-driven state, improving performance and developer velocity."
        ],
        
        techStack: ["Next.js", "Vue.js", "Go", "Typescript"],
        logo: "/logos/superagi.png"
    },
    {
        role: "Software Engineer Intern",
        company: "Wolf Pixel Ltd.",
        period: "Dec 2024 - Feb 2025 (3 Months)",
        location: "Remote (London, UK)",
        description: [
            "Built and deployed end-to-end full-stack web applications using React.js, Node.js, and REST APIs, improving system scalability and reducing feature development time by 30%.",
            "Designed and launched 4 high-conversion landing pages for international clients (Australia & UAE), optimizing UI/UX and contributing to a 15% average increase in lead generation."
        ],
        techStack: ["React.js", "Node.js", "REST APIs", "Typescript"],
        logo: "/logos/wolf-pixel.jpg"
    },
];

