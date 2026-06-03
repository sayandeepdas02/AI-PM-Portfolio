export type ProjectType = 'tech' | 'data-science' | 'case-study';

export interface Project {
    name: string;
    slug: string;
    description: string;
    category: string;
    type: ProjectType;
    details?: string[];
    image: string;
    techStack: string[];
    githubUrl?: string;
    liveUrl?: string;
    demoUrl?: string;
    date?: string;
    comingSoon?: boolean;
}

export const projects: Project[] = [
    {
        name: "Hyperglork AI: AI Voice Agents for Medical Professionals",
        slug: "hyperglork-ai",
        description: "AI voice agents for clinics to automate inbound calls, appointment booking, and scheduling.",
        category: "AI / Healthcare",
        type: "tech",
        details: [
            "Built AI voice agents for clinics to automate inbound calls, appointment booking, and scheduling.",
            "Engineered a low-latency conversational pipeline using LLMs, RAG, speech-to-text, and Voice AI to handle real-time patient interactions, contextual responses, and automated appointment booking."
        ],
        image: "/logos/hyperglork-logo.png",
        techStack: ["LLMs", "RAG", "Speech-to-Text", "Voice AI", "Python", "FastAPI"],
        githubUrl: "https://github.com/sayandeepdas02/Glork-AI",
        liveUrl: "https://glork.sayandeep.space/"
    },
    {
        name: "Notemind AI: AI Notetaker for Google Meeting",
        slug: "notemind-ai",
        description: "AI Notetaker for transcription and summarization, reducing manual note-taking effort by 60%.",
        category: "AI / Productivity",
        type: "tech",
        details: [
            "AI Notetaker for transcription and summarization, reducing manual note-taking effort by 60%.",
            "Designed structured workflows for retrieving meeting insights, improving post-meeting productivity."
        ],
        image: "/logos/notemind-logo.png",
        techStack: ["React.js", "Node.js", "Google Meet API", "OpenAI API", "Tailwind CSS"],
        githubUrl: "https://github.com/sayandeepdas02/Notemind-ai",
        liveUrl: "https://notemind.sayandeep.space/"
    },
    {
        name: "Fluxberry AI: AI Native Automation for Technical Hiring",
        slug: "fluxberry-ai",
        description: "Designed end-to-end interview automation workflows, enabling resume parsing, assessments, and candidate scoring.",
        category: "AI / SaaS",
        type: "tech",
        details: [
            "Designed end-to-end interview automation workflows, enabling resume parsing, assessments, and candidate scoring.",
            "Automated technical rounds and onboarding, evaluation pipelines and structured feedback loops."
        ],
        image: "/logos/flux-hire-logo.png",
        techStack: ["React.js", "Redux", "Node.js", "OpenAI API", "Tailwind CSS"],
        githubUrl: "https://github.com/sayandeepdas02/Interview-AI",
        liveUrl: "https://fluxberry.sayandeep.space/",
        demoUrl: "https://www.youtube.com/embed/y3-m6mOWieA"
    },
    {
        name: "Walmart Sales Data Analysis: End-to-End SQL + Python",
        slug: "walmart-sql-python-analysis",
        description: "End-to-end data analysis solution designed to ingest, clean, and extract critical business insights from Walmart sales data.",
        category: "Data Science",
        type: "data-science",
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
        category: "Market Analysis",
        type: "data-science",
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
