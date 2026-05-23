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
    default: "Sayandeep Das | Product Manager",
    template: "%s | Sayandeep Das",
  },
  description:
    "Sayandeep Das is a Product Manager specializing in Agentic AI products, 0→1 roadmaps, and growth optimization. Experienced at Trelium (YC F25) and SuperAGI, with a BS in Data Science & AI from IIT Guwahati.",

  keywords: [
    "Sayandeep Das",
    "Product Manager",
    "Product Manager",
    "AI Product Manager",
    "Agentic AI",
    "0→1 Development",
    "Product Strategy",
    "Roadmapping",
    "Growth Funnels",
    "A/B Testing",
    "IIT Guwahati",
    "SuperAGI",
    "Trelium",
  ],

  authors: [{ name: "Sayandeep Das", url: "https://sayandeep.space/" }],
  creator: "Sayandeep Das",
  publisher: "Sayandeep Das",

  metadataBase: new URL("https://sayandeep.space"),

  openGraph: {
    title: "Sayandeep Das | Product Manager",
    description:
      "Building Agentic AI products, scaling to 120+ customers, 500+ DAUs, and 5,000+ monthly actions. Focused on 0→1 development, growth, and data-driven optimization.",
    url: "https://sayandeep.space",
    siteName: "Sayandeep Portfolio",
    images: [
      {
        url: "https://sayandeep.space/og-image.jpg",
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
    title: "Sayandeep Das | Product Manager",
    description:
      "Product Manager building Agentic AI products, scaling to 120+ customers, 500+ DAUs, and 5,000+ monthly actions.",
    images: ["https://sayandeep.space/og-image.jpg"],
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
              image: "https://sayandeep.space/og-image.jpg",
              jobTitle: "Product Manager",
              sameAs: [
                "https://github.com/sayandeepdas02",
                "https://www.linkedin.com/in/sayandeep02",
              ],
              worksFor: {
                "@type": "Organization",
                name: "Trelium",
              },
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "IIT Guwahati",
              },
              knowsAbout: [
                "Product Management",
                "Product Strategy",
                "Roadmapping",
                "User Research",
                "Growth Funnels",
                "A/B Testing",
                "Agentic AI",
                "System Design",
                "Data Science",
                "AI Applications",
              ],
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
