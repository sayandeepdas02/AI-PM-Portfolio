export interface Certification {
    name: string;
    issuer: string;
    date: string;
    slug: string;
    driveFileId: string;
    icon?: string;
    logo?: string;
}

export const certifications: Certification[] = [
    {
        name: "Machine Learning Specialisation",
        issuer: "Stanford University",
        date: "Sept 2024",
        slug: "machine-learning-specialisation",
        driveFileId: "1CN1BSCUNbXD8cf9c0HPQG6GZUlY4aOoi",
        logo: "/logos/stanford.png",
    },
    {
        name: "Project Management Specialisation",
        issuer: "University of California Irvine",
        date: "Oct 2024",
        slug: "project-management-specialisation",
        driveFileId: "1O7R2RaoVIaesC3ljDfXfUJ_CNV5TG35Q",
        logo: "/logos/uci.png",
    },
    {
        name: "Full Stack Development Bootcamp 2024",
        issuer: "Angela Yu",
        date: "2024",
        slug: "full-stack-development-bootcamp",
        driveFileId: "1eJamKSDs2ItNmOcIWH2EmtkRkYtEyAsV",
        logo: "/logos/udemy.png",
    },
    {
        name: "Generative AI",
        issuer: "Google",
        date: "2024",
        slug: "generative-ai",
        driveFileId: "1hv-F16YUsUtP7n39ZxIkIiBYyDrowaAA",
        logo: "/logos/google.png",
    },
];
