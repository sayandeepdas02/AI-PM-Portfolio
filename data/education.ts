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
    {
        degree: "Bachelor of Science in Mathematics",
        institution: "West Bengal State University",
        year: "2022 - 2025",
        location: "Kolkata, West Bengal, INDIA",
        logo: "/logos/wbsu.png",
    },
    {
        degree: "High School Diploma - Class XII (Maths & Science)",
        institution: "Delhi Public School, Ruby Park, Kolkata",
        year: "2020",
        location: "Kolkata, West Bengal, INDIA",
        logo: "/logos/dps.png",
    },
];

