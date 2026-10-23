export type ProjectType = 'indie' | 'data-analysis' | 'case-study';

export interface Project {
    name: string;
    slug: string;
    description: string;
    /** One-liner shown in the projects list */
    tagline: string;
    category: string;
    type: ProjectType;
    details?: string[];
    /** Square logo; projects without one show a neutral placeholder */
    image?: string;
    techStack: string[];
    githubUrl?: string;
    liveUrl?: string;
    demoUrl?: string;
    date?: string;
    comingSoon?: boolean;
}

export const projects: Project[] = [
    {
        name: "Notemind AI: AI Notetaker for Google Meeting",
        slug: "notemind-ai",
        description: "AI Notetaker for transcription and summarization, reducing manual note-taking effort by 60%.",
        tagline: "AI notetaker that transcribes and summarizes Google Meet calls.",
        category: "AI / Productivity",
        type: "indie",
        details: [
            "AI Notetaker for transcription and summarization, reducing manual note-taking effort by 60%.",
            "Designed structured workflows for retrieving meeting insights, improving post-meeting productivity."
        ],
        image: "/logos/notemind-icon.png", // from notemind.space/icon.svg
        techStack: ["React.js", "Node.js", "Google Meet API", "OpenAI API", "Tailwind CSS"],
        githubUrl: "https://github.com/sayandeepdas02/Notemind-ai",
        liveUrl: "https://notemind.space/"
    },
    {
        name: "Fluxberry AI: AI Native Automation for Technical Hiring",
        slug: "fluxberry-ai",
        description: "Designed end-to-end interview automation workflows, enabling resume parsing, assessments, and candidate scoring.",
        tagline: "Automated resume parsing, assessments and scoring for tech hiring.",
        category: "AI / SaaS",
        type: "indie",
        details: [
            "Designed end-to-end interview automation workflows, enabling resume parsing, assessments, and candidate scoring.",
            "Automated technical rounds and onboarding, evaluation pipelines and structured feedback loops."
        ],
        image: "/logos/fluxberry-icon.png", // from fluxberry.in/logo-mark.png
        techStack: ["React.js", "Redux", "Node.js", "OpenAI API", "Tailwind CSS"],
        githubUrl: "https://github.com/sayandeepdas02/Interview-AI",
        liveUrl: "https://fluxberry.in/",
        demoUrl: "https://www.youtube.com/embed/y3-m6mOWieA"
    },
    {
        name: "Walmart Sales Data Analysis: End-to-End SQL + Python",
        slug: "walmart-sql-python-analysis",
        description: "End-to-end data analysis solution designed to ingest, clean, and extract critical business insights from Walmart sales data.",
        tagline: "End-to-end SQL + Python analysis of Walmart sales data.",
        category: "Data Analysis",
        type: "data-analysis",
        details: [
            "Ingested and cleaned 10K+ sales records using Pandas and SQLAlchemy, resolving data inconsistencies and type mismatches.",
            "Designed complex SQL queries in PostgreSQL to analyze weekly department sales, revenue growth, and seasonal peaks."
        ],
        image: "/logos/walmart-logo.png",
        techStack: ["Python", "SQL", "Pandas", "PostgreSQL", "SQLAlchemy", "Kaggle API"],
        githubUrl: "https://github.com/sayandeepdas02/Walmart-SQL-Python-Project"
    },
    {
        name: "Monday Coffee Expansion: SQL Market Analysis",
        slug: "coffee-brand-expansion-analysis",
        description: "SQL-driven market analysis to identify the top three Indian cities for opening new physical coffee shop locations based on demand and demographic projections.",
        tagline: "SQL market analysis to pick the top 3 Indian cities for new stores.",
        category: "Market Analysis",
        type: "data-analysis",
        details: [
            "Analyzed regional customer transactions and sales volumes using PostgreSQL queries.",
            "Engineered population density projections and consumer demand models (estimated at 25% coffee drinkers) to identify the highest ROI cities."
        ],
        image: "/logos/coffee-logo.png",
        techStack: ["SQL", "PostgreSQL", "Market Sizing", "Data Analysis", "Excel"],
        githubUrl: "https://github.com/sayandeepdas02/Coffee-Brand-Expansion-SQL-Project"
    },
    {
        name: "Rapido Product Case Study",
        slug: "rapido-case-study",
        description: "Product strategy teardown analyzing ride cancellation loops, driver supply dynamics, and trust vectors to optimize peak-hour ride-matching.",
        tagline: "Cutting ride cancellations and fixing peak-hour driver supply.",
        category: "Ride-Sharing",
        type: "case-study",
        details: [
            "Conducted qualitative research to isolate driver retention friction and peak-hour cancellations.",
            "Designed route-matching optimizations and dynamic rider-reassurance patterns to improve overall ride completion rates."
        ],
        image: "/logos/rapido-logo.png",
        techStack: ["Product Strategy", "User Research", "Market Sizing", "Flow Optimization"],
        liveUrl: "https://drive.google.com/file/d/1FT5u9AbCtKLJpC4B0y4fGqR2AV7baBTZ/view?usp=sharing"
    },
    {
        name: "MakeMyTrip Product Case Study",
        slug: "makemytrip-case-study",
        description: "Conversion rate optimization case study focused on redesigning the hotel booking funnel, checkout flows, and guest selection interfaces.",
        tagline: "Redesigning the hotel booking funnel and checkout to lift conversion.",
        category: "TravelTech",
        type: "case-study",
        details: [
            "Identified drop-offs in guest information selection screens through funnel audits and usability reviews.",
            "Designed wireframes for a progressive disclosure checkout flow to streamline hotel room bookings."
        ],
        image: "/logos/makemytrip-logo.png",
        techStack: ["Funnel Analysis", "User Personas", "A/B Testing Strategy", "UX Auditing"],
        liveUrl: "https://drive.google.com/file/d/1Xn8egJo1DxJZSO4Pq0EGRz95aiScDum1/view?usp=sharing"
    },
    {
        name: "Meesho Product Case Study",
        slug: "meesho-case-study",
        description: "Growth case study focusing on reducing seller onboarding friction, catalog listing complexity, and checkout-to-delivery communication gaps.",
        tagline: "Reducing seller onboarding and catalog listing friction.",
        category: "E-Commerce",
        type: "case-study",
        details: [
            "Mapped out social commerce reseller pain points in tier-2/3 Indian cities to optimize catalog sharing success.",
            "Proposed simplified visual listing tools to decrease seller catalog processing times by 40%."
        ],
        image: "/logos/meesho-logo.png",
        techStack: ["Growth Product Management", "Onboarding Flows", "Trust Optimization", "Market Expansion"],
        liveUrl: "https://drive.google.com/file/d/1arjXnyonyIPBqFqSOussVK9d3Ox5LxYN/view?usp=sharing"
    },
    {
        name: "Razorpay Product Case Study",
        slug: "razorpay-case-study",
        description: "Fintech product study analyzing transaction success rates, instant payment retry systems, and merchant onboarding flow refinements.",
        tagline: "Improving payment success rates and merchant onboarding.",
        category: "FinTech",
        type: "case-study",
        details: [
            "Proposed transaction success rate (TSR) recovery flows that prompt users with alternative payment methods upon failure.",
            "Created optimized checkout wireframes reducing overall keystrokes by 35%."
        ],
        image: "/logos/razorpay-logo.png",
        techStack: ["API Integration", "Checkout UX", "Conversion Rate Optimization", "Fintech Strategy"],
        liveUrl: "https://drive.google.com/file/d/1DBsBnrhbbjiT9QYz6dUVETmoqHdTESxc/view?usp=sharing"
    },
    {
        name: "Groww Product Case Study",
        slug: "groww-case-study",
        description: "Wealthtech case study evaluating micro-investing onboarding, mutual fund exploration engines, and retail user financial education loops.",
        tagline: "Simplifying micro-investing onboarding and fund discovery.",
        category: "WealthTech",
        type: "case-study",
        details: [
            "Designed simplified onboarding steps to ease the conversion from basic savings to mutual fund SIPs.",
            "Proposed context-specific micro-learning blocks to explain financial terms directly on user dashboards."
        ],
        image: "/logos/groww-logo.png",
        techStack: ["Retail Investing UX", "Simplified Onboarding", "Product Design", "User Education"],
        liveUrl: "https://drive.google.com/file/d/1WMjohl6DIl14D27-UTphWzUKLk2Fg2_q/view?usp=sharing"
    },
    {
        name: "FirstClub Product Case Study",
        slug: "firstclub-case-study",
        description: "Product strategy and analytics study of a lifestyle membership model, evaluating subscription onboarding, retention loops, and user engagement programs.",
        tagline: "Onboarding, retention and engagement for a membership model.",
        category: "Subscriptions",
        type: "case-study",
        details: [
            "Mapped early user retention patterns to define core value-realization milestones within the first 30 days.",
            "Designed personalized reward milestones to increase repeat transaction frequencies and lower membership churn."
        ],
        image: "/logos/firstclub-logo.png",
        techStack: ["Subscription Modeling", "Retention Loops", "Customer Value Proposition", "Engagement Strategy"],
        liveUrl: "https://drive.google.com/file/d/1785DjaoJLEF7-DZnqdr4-TggSNFdrLVt/view?usp=sharing"
    }
];
