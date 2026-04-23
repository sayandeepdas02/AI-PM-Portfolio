import type { Metadata } from "next";
import { Roboto_Flex, Instrument_Serif } from "next/font/google";
import "./globals.css";

const robotoFlex = Roboto_Flex({
  subsets: ["latin"],
  variable: "--font-roboto-flex",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
});

export const metadata: Metadata = {
  title: {
    default: "Sayandeep Das | Full Stack, Backend & AI Engineer",
    template: "%s | Sayandeep Das",
  },
  description:
    "Sayandeep Das is a Software Engineer specializing in Full Stack, Backend Systems, and AI. Builds scalable distributed systems, LLM-powered applications, and high-performance web platforms using Golang, Next.js, and cloud infrastructure.",

  keywords: [
    "Sayandeep Das",
    "Software Engineer India",
    "Full Stack Developer",
    "Backend Engineer",
    "AI Engineer",
    "Golang Developer",
    "Next.js Developer",
    "Distributed Systems",
    "Microservices Architecture",
    "LLM Applications",
    "React Developer",
    "System Design Engineer",
  ],

  authors: [{ name: "Sayandeep Das", url: "https://sayandeep.space/" }],
  creator: "Sayandeep Das",
  publisher: "Sayandeep Das",

  metadataBase: new URL("https://sayandeep.space"),

  openGraph: {
    title: "Sayandeep Das | Full Stack, Backend & AI Engineer",
    description:
      "Building scalable distributed systems, AI-powered applications, and real-time platforms using Golang, Next.js, and modern cloud infrastructure.",
    url: "https://sayandeep.space",
    siteName: "Sayandeep Portfolio",
    images: [
      {
        url: "https://sayandeep.space/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sayandeep Das Portfolio",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Sayandeep Das | Full Stack, Backend & AI Engineer",
    description:
      "Engineer building scalable backend systems, AI-driven platforms, and real-time applications.",
    images: ["https://sayandeep.space/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "https://sayandeep.space",
  },

  category: "technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${robotoFlex.variable} ${instrumentSerif.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Structured Data — JSON-LD Person schema for rich search results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Sayandeep Das",
              url: "https://sayandeep.space",
              image: "https://sayandeep.space/og-image.png",
              jobTitle: "Full Stack, Backend & AI Engineer",
              sameAs: [
                "https://github.com/sayandeepdas02",
                "https://www.linkedin.com/in/sayandeep02",
              ],
              worksFor: {
                "@type": "Organization",
                name: "SuperAGI",
              },
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "IIT Guwahati",
              },
              knowsAbout: [
                "Full Stack Development",
                "Backend Engineering",
                "Artificial Intelligence",
                "Distributed Systems",
                "Golang",
                "Next.js",
                "LLMs",
                "Microservices",
                "Redis",
                "Kafka",
                "AWS",
              ],
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
