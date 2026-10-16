export interface SocialLink {
    name: string;
    url: string;
    icon: string; // Icon name from lucide-react
}

export const githubUrl = "https://github.com/sayandeepdas02";
export const linkedinUrl = "https://www.linkedin.com/in/sayandeep02/";
export const xUrl = "https://x.com/sayan_not_deep";
// Discord profile URLs need a numeric user ID, so the handle is copied to the clipboard instead
export const discordUsername = "sayandeep_16341";
export const calendarUrl = "https://calendly.com/reachsayandeep/30mins-with-sayandeep";

export const socialLinks: SocialLink[] = [
    {
        name: "GitHub",
        url: githubUrl,
        icon: "Github",
    },
    {
        name: "LinkedIn",
        url: linkedinUrl,
        icon: "Linkedin",
    },
    {
        name: "Twitter",
        url: xUrl,
        icon: "Twitter",
    },
    {
        name: "Email",
        url: "mailto:reachsayandeep@gmail.com",
        icon: "Mail",
    },
];

export const resumeUrl = "https://drive.google.com/file/d/1q2pcu34_ZpH5y4a_WTIk7M6NEdmdCE31/view?usp=sharing";
export const emailAddress = "reachsayandeep@gmail.com";
export const location = "Bengaluru, KA, INDIA";
export const gender = "he/him";
export const mobileNumber = "+91 8100517829";
export const role = "Product Manager";

