export interface Education {
    degree: string;
    institution: string;
    year?: string;
    location?: string;
    logo?: string;
}

export const education: Education[] = [
    {
        degree: "Bachelor of Science in Data Science and Artificial Intelligence",
        institution: "Indian Institute of Technology (IIT) Guwahati",
        year: "2023 - 2027",
        location: "Guwahati, Assam, INDIA",
        logo: "/logos/iitg.png",
    },
];

