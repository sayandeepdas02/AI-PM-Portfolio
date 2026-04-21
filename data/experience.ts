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
            "Engineered AI-driven dynamic templating system with contextual runtime resolution, powering 5,000+ LinkedIn automation actions/month and improving lead conversion by 40%.",
            "Designed distributed background job processing with retry strategies and idempotent workers supporting 500+ DAUs.",
            "Automated domain and mailbox provisioning via Infraforge APIs, decreasing campaign setup time by 30% and enabling 700+ AI SDR campaigns/month."
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

