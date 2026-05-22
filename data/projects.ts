export interface Project {
    name: string;
    slug: string;
    description: string;
    category: string;
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
        name: "Glork AI: AI Voice Agents for Medical Professionals",
        slug: "glork-ai",
        description: "AI voice agents for clinics to automate inbound calls, appointment booking, and scheduling.",
        category: "AI / Healthcare",
        details: [
            "Built AI voice agents for clinics to automate inbound calls, appointment booking, and scheduling.",
            "Engineered a low-latency conversational pipeline using LLMs, RAG, speech-to-text, and Voice AI to handle real-time patient interactions, contextual responses, and automated appointment booking."
        ],
        image: "/logos/glork-logo.png",
        techStack: ["LLMs", "RAG", "Speech-to-Text", "Voice AI", "Python", "FastAPI"],
        githubUrl: "https://github.com/sayandeepdas02/Glork-AI",
        liveUrl: "https://glork.sayandeep.space/"
    },
    {
        name: "Notemind AI: AI Notetaker for Google Meeting",
        slug: "notemind-ai",
        description: "AI Notetaker for transcription and summarization, reducing manual note-taking effort by 60%.",
        category: "AI / Productivity",
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
        details: [
            "Designed end-to-end interview automation workflows, enabling resume parsing, assessments, and candidate scoring.",
            "Automated technical rounds and onboarding, evaluation pipelines and structured feedback loops."
        ],
        image: "/logos/flux-hire-logo.png",
        techStack: ["React.js", "Redux", "Node.js", "OpenAI API", "Tailwind CSS"],
        githubUrl: "https://github.com/sayandeepdas02/Interview-AI",
        liveUrl: "https://fluxberry.sayandeep.space/",
        demoUrl: "https://www.youtube.com/embed/y3-m6mOWieA"
    }
];
