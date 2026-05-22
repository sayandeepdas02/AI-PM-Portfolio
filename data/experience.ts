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
        role: "Member of GTM Staff",
        company: "Trelium (YC F25)",
        period: "Apr 2026 - Present",
        location: "San Francisco, USA (Remote)",
        description: [
            "Owned the end-to-end growth funnel for an AI campaign automation platform, driving a 18% increase in qualified signups through SEO, onboarding optimization, and conversion-focused UX improvements.",
            "Rebuilt core activation and onboarding flows using product analytics, session recordings, and customer interviews, improving activation rate by 27% and significantly reducing time-to-first-value.",
            "Led performance marketing and customer discovery across LinkedIn, outbound email, and user interviews, reducing CAC by 42% and translating customer insights into high-impact product and retention improvements."
        ],
        techStack: ["Product Analytics", "A/B Testing", "SEO", "User Research", "Conversion Optimization"],
        logo: "/logos/trelium.png"
    },
    {
        role: "Associate Product Manager",
        company: "SuperAGI",
        period: "May 2025 - Apr 2026",
        location: "Bengaluru, India",
        description: [
            "Owned the 0→1 roadmap for campaign automation across SuperAGI's AI-native CRM and Voice Agent suite, shipping workflows that handled 5,000+ automated actions/month.",
            "Designed and optimized AI agent workflows that reduced manual sales operations effort, improved automation reliability, and supported growth to 500+ DAUs.",
            "Defined product architecture for multi-channel AI workflows spanning email, LinkedIn, and voice outreach, translating GTM requirements into scalable engineering execution.",
            "Led customer discovery across SMB and mid-market users, identifying adoption bottlenecks and prioritizing product improvements that increased retention, engagement, and CSAT."
        ],
        techStack: ["Roadmapping", "Product Strategy", "User Research", "Agile", "PRDs", "System Design"],
        logo: "/logos/superagi.png"
    },
    {
        role: "Data Science Intern",
        company: "Graphy (Unacademy)",
        period: "Nov 2024 - Apr 2025",
        location: "Bengaluru, India",
        description: [
            "Built end-to-end data pipelines processing 100K+ user records, reducing manual processing effort by 40% and enabling faster analytics.",
            "Analyzed user behavior and flow patterns, driving insights that improved conversion rates by 10-15%."
        ],
        techStack: ["Python", "Pandas", "NumPy", "SQL", "PostgreSQL", "EDA"],
        logo: "/logos/graphy.png"
    }
];