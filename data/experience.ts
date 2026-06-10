export interface Experience {
    role: string;
    company: string;
    period: string;
    duration: string;
    location: string;
    description: string[];
    techStack: string[];
    logo?: string;
}

export const experiences: Experience[] = [
    {
        role: "Member of GTM Staff / GTM Engineer",
        company: "Trelium (YC F25)",
        period: "Apr 2026 - ∞",
        duration: "3 mons",
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
        duration: "1 yr",
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
        duration: "6 mons",
        location: "Bengaluru, India",
        description: [
            "Built end-to-end data pipelines processing 100K+ user records, reducing manual processing effort by 40% and enabling faster analytics.",
            "Analyzed user behavior and flow patterns, driving insights that improved conversion rates by 10-15%."
        ],
        techStack: ["Python", "Pandas", "NumPy", "SQL", "PostgreSQL", "EDA"],
        logo: "/logos/graphy.png"
    },
    {
        role: "Co-Founder",
        company: "Techscholars",
        period: "Jul 2023 - Oct 2024",
        duration: "1 yr 4 mons",
        location: "Bengaluru, India",
        description: [
            "0 → 0.1 Journey | Product, Marketing, CX, Sales ~ Everything",
            "Learned a lot from scratch, how to build a product, how to hire, how to pitch to investors, a lot of what I am today is because of this phase of my life.",
            "Felt in love with the process of building stuff, always looking for the next opportunity to build something.",
            "Failing at my first venture, taught me things beyond any Ivy League could, a massive eye opener for me at a young age.",
        ],
        techStack: ["Product", "Marketing", "Sales", "CX", "Fundraising", "0→1"],
        logo: "/logos/techscholars-logo.png",
    }
];