export interface Certification {
    name: string;
    issuer: string;
    date: string;
    url?: string;
    icon?: string;
    logo?: string;
}

export const certifications: Certification[] = [
    {
        name: "Machine Learning Specialisation",
        issuer: "Stanford University",
        date: "Sept 2024",
        url: "https://drive.google.com/file/d/1CN1BSCUNbXD8cf9c0HPQG6GZUlY4aOoi/view?usp=drive_link",
        logo: "/logos/stanford.png",
    },
    {
        name: "Project Management Specialisation",
        issuer: "University of California Irvine",
        date: "Oct 2024",
        url: "https://drive.google.com/file/d/1q2pcu34_ZpH5y4a_WTIk7M6NEdmdCE31/view?usp=sharing", // default placeholder / resume link
        logo: "/logos/uci.png",
    },
    {
        name: "Full Stack Development Bootcamp 2024",
        issuer: "Angela Yu",
        date: "2024",
        url: "https://drive.google.com/file/d/1eJamKSDs2ItNmOcIWH2EmtkRkYtEyAsV/view?usp=sharing",
        logo: "/logos/udemy.png",
    },
    {
        name: "Generative AI",
        issuer: "Google",
        date: "2024",
        url: "https://drive.google.com/file/d/1hv-F16YUsUtP7n39ZxIkIiBYyDrowaAA/view?usp=drive_link",
        logo: "/logos/google.png",
    },
];
