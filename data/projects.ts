export interface Project {
    name: string;
    description: string;
    details?: string[];
    image: string;
    techStack: string[];
    githubUrl?: string;
    liveUrl?: string;
    date?: string;
}

export const projects: Project[] = [
    {
        name: "Interview AI - Automating Screening for Hiring Talent",
        description: "",
        details: [
            "Developed AI-driven interview automation system with resume parsing, dynamic Q&A generation, and automated candidate scoring using LLM APIs.",
            "Reduced manual interviewer review effort by 70% through automated evaluation workflows.",
            "Integrated OpenAI GPT models for intelligent question generation and response analysis, enhancing interview quality and scalability.",
        ],
        image: "/logos/flux-hire-logo.png",
        techStack: ["React.js", "Redux", "Node.js", "OpenAI API", "Tailwind CSS"],
        githubUrl: "https://github.com/sayandeepdas02/Interview-AI",
    },
    {
        name: "Plixa Meetups - A collaborative app for discussions, planning and more",
        description: "",
        details: [
            "Engineered real-time collaborative whiteboards with synchronized state updates and low-latency bi-directional communication.",
            "Implemented peer-to-peer live video streaming using WebRTC with STUN/TURN server integration for reliable NAT traversal.",
            "Delivered a highly responsive, cross-device interface for seamless real-time collaboration supporting concurrent users.",
        ],
        image: "/logos/plixa-logo.png",
        techStack: ["JavaScript", "React.js", "Node.js", "Socket.io", "Express.js", "Tailwind CSS"],
        githubUrl: "https://github.com/sayandeepdas02/Plixa-Meetups",
    },
    {
        name: "Swift Invoice - Modern invoicing for the next-gen freelancers & businesses",
        description: "",
        details: [
            "Developed full-stack MERN application enabling seamless creation and management of customizable, dynamic PDF invoices.",
            "Designed backend validation systems and robust transactional data pipelines to ensure secure and accurate payment processing.",
            "Integrated automatic QR code generation for instant invoice resolution, reducing average payment times by 50%.",
        ],
        image: "/logos/swift-invoice-logo.png",
        techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
        githubUrl: "https://github.com/sayandeepdas02/Swift-Invoice",
    },
    {
        name: "Altresume - Custom Resume for every job application",
        description: "",
        details: [
            "Architected a scalable application that dynamically generates tailored, ATS-friendly resumes matched to specific job descriptions.",
            "Engineered customizable, modular resume templates with real-time visual preview and automated layout formatting logic.",
            "Integrated robust PDF export pipelines to produce visually consistent and highly professional output documents.",
        ],
        image: "/logos/alt-resume-logo.png",
        techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
        githubUrl: "https://github.com/sayandeepdas02/Altresume",
    },
    {
        name: "Notemind - AI Notetaker for GMeets",
        description: "",
        details: [
            "Engineered an intelligent Google Meet integration to capture, transcribe, and synthesize live meeting audio into comprehensive notes.",
            "Integrated advanced LLM APIs to automatically generate concise summaries, highlight key decisions, and extract actionable follow-up tasks.",
            "Developed a responsive dashboard to seamlessly organize, search, and recall historical meeting insights with cross-platform sync.",
        ],
        image: "/logos/notemind-logo.png",
        techStack: ["React.js", "Node.js", "Google Meet API", "OpenAI API", "Tailwind CSS"],
        githubUrl: "https://github.com/sayandeepdas02/Notemind",
    },
];


