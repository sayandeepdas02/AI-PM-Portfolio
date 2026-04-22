export interface Project {
    name: string;
    description: string;
    category: string;
    details?: string[];
    image: string;
    techStack: string[];
    githubUrl?: string;
    liveUrl?: string;
    date?: string;
    comingSoon?: boolean;
}

export const projects: Project[] = [
    {
        name: "Fluxberry AI - Automating Screening for Hiring Talent",
        description: "AI-driven interview automation with resume parsing, dynamic Q&A generation, and automated candidate scoring — reducing manual review effort by 70%.",
        category: "AI / SaaS",
        details: [
            "Developed AI-driven interview automation system with resume parsing, dynamic Q&A generation, and automated candidate scoring using LLM APIs.",
            "Reduced manual interviewer review effort by 70% through automated evaluation workflows.",
            "Integrated OpenAI GPT models for intelligent question generation and response analysis, enhancing interview quality and scalability.",
        ],
        image: "/logos/flux-hire-logo.png",
        techStack: ["React.js", "Redux", "Node.js", "OpenAI API", "Tailwind CSS"],
        githubUrl: "https://github.com/sayandeepdas02/Interview-AI",
        liveUrl: "https://fluxberry.in",
    },
    {
        name: "Plixa Meetups - Collaborative app for discussions & planning",
        description: "Real-time collaboration platform with synchronized whiteboards and peer-to-peer video streaming via WebRTC with STUN/TURN server integration.",
        category: "Collaboration",
        details: [
            "Engineered real-time collaborative whiteboards with synchronized state updates and low-latency bi-directional communication.",
            "Implemented peer-to-peer live video streaming using WebRTC with STUN/TURN server integration for reliable NAT traversal.",
            "Delivered a highly responsive, cross-device interface for seamless real-time collaboration supporting concurrent users.",
        ],
        image: "/logos/plixa-logo.png",
        techStack: ["React.js", "Node.js", "Socket.io", "WebRTC", "Express.js"],
        githubUrl: "https://github.com/sayandeepdas02/Plixa-Meetups",
        liveUrl: "https://plixa.sayandeep.space/",
    },
    {
        name: "Swift Invoice - Modern invoicing for freelancers & businesses",
        description: "Full-stack MERN invoicing platform with dynamic PDF generation, QR code payments, and automated pipelines that cut payment times by 50%.",
        category: "FinTech",
        details: [
            "Developed full-stack MERN application enabling seamless creation and management of customizable, dynamic PDF invoices.",
            "Designed backend validation systems and robust transactional data pipelines to ensure secure and accurate payment processing.",
            "Integrated automatic QR code generation for instant invoice resolution, reducing average payment times by 50%.",
        ],
        image: "/logos/swift-invoice-logo.png",
        techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
        githubUrl: "https://github.com/sayandeepdas02/Swift-Invoice",
        liveUrl: "https://invoices.sayandeep.space/",
    },
    {
        name: "Altresume - Custom Resume for every job application",
        description: "Scalable resume builder that generates ATS-friendly, job-tailored resumes with real-time preview, modular templates, and polished PDF export.",
        category: "Productivity",
        details: [
            "Architected a scalable application that dynamically generates tailored, ATS-friendly resumes matched to specific job descriptions.",
            "Engineered customizable, modular resume templates with real-time visual preview and automated layout formatting logic.",
            "Integrated robust PDF export pipelines to produce visually consistent and highly professional output documents.",
        ],
        image: "/logos/alt-resume-logo.png",
        techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
        githubUrl: "https://github.com/sayandeepdas02/Altresume",
        liveUrl: "https://altresume.sayandeep.space/",
    },
    {
        name: "Notemind - AI Notetaker for GMeets",
        description: "Intelligent Google Meet integration that transcribes live audio, synthesizes notes, and extracts action items using advanced LLM APIs.",
        category: "AI / Productivity",
        details: [
            "Engineered an intelligent Google Meet integration to capture, transcribe, and synthesize live meeting audio into comprehensive notes.",
            "Integrated advanced LLM APIs to automatically generate concise summaries, highlight key decisions, and extract actionable follow-up tasks.",
            "Developed a responsive dashboard to seamlessly organize, search, and recall historical meeting insights with cross-platform sync.",
        ],
        image: "/logos/notemind-logo.png",
        techStack: ["React.js", "Node.js", "Google Meet API", "OpenAI API", "Tailwind CSS"],
        githubUrl: "https://github.com/sayandeepdas02/Notemind-ai",
        liveUrl: "https://notemind.sayandeep.space/",
    },
    {
        name: "CRM Software - Smart Customer Relationship Management",
        description: "Full-featured CRM platform with pipeline management, contact tracking, activity logs, and analytics dashboard for sales-driven teams.",
        category: "Enterprise",
        details: [
            "Built a comprehensive CRM with lead pipeline management, contact tagging, and deal-stage tracking across customizable sales funnels.",
            "Engineered real-time activity feeds and automated follow-up reminders to minimize lead drop-off and boost conversion rates.",
            "Designed an analytics dashboard with revenue forecasting, team performance metrics, and exportable reports for data-driven decisions.",
        ],
        image: "/logos/wolf-pixel.jpg",
        techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
        githubUrl: "https://github.com/sayandeepdas02",
        comingSoon: true,
    },
];


