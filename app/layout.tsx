import type { Metadata } from "next";
import { Roboto_Flex, Instrument_Serif } from "next/font/google";
import "./globals.css";

const ogImageUrl = "https://ai.sayandeep.space/opengraph-portfolio.png";

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
  metadataBase: new URL('https://ai.sayandeep.space'),
  title: {
    default: 'Sayandeep Das | Growth PM & AI Product Manager | IIT Guwahati',
    template: '%s | Sayandeep Das',
  },
  description:
    'Sayandeep is a GTM Engineer and AI PM from IIT Guwahati, currently at Trelium (YC F25), focused on SEO, AEO, AI automation, onboarding systems, growth funnels, and product-led GTM for AI B2B SaaS.',
  keywords: [
    'Sayandeep Das',
    'Sayandeep Das Product Manager',
    'Sayandeep Das IIT Guwahati',
    'Growth Product Manager India',
    'AI Product Manager India',
    'Best PM in India',
    'Growth PM Bengaluru',
    'AI PM Bengaluru',
    'GTM Engineer',
    'GTM Product Manager',
    'B2B SaaS PM India',
    'Agentic AI Product Manager',
    'LLM Product Manager',
    'Trelium YC F25',
    'SuperAGI Product Manager',
    'IIT Guwahati Data Science',
    '0 to 1 Product Manager',
    'Product Strategy India',
    'Growth Marketing PM',
    'Conversion Optimization PM',
    'SaaS Growth Manager',
    'AI SaaS India',
    'Product Manager Portfolio India',
    'Top Product Manager India 2025',
    'Top Product Manager India 2026',
  ],
  authors: [{ name: 'Sayandeep Das', url: 'https://ai.sayandeep.space' }],
  creator: 'Sayandeep Das',
  publisher: 'Sayandeep Das',
  category: 'technology',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://ai.sayandeep.space/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://ai.sayandeep.space/',
    siteName: 'Sayandeep Das — Portfolio',
    title: 'Sayandeep Das | Growth PM & AI Product Manager | IIT Guwahati',
    description:
      'Sayandeep is a GTM Engineer and AI PM from IIT Guwahati, currently at Trelium (YC F25), focused on SEO, AEO, AI automation, onboarding systems, growth funnels, and product-led GTM for AI B2B SaaS.',
    images: [
      {
        url: ogImageUrl,
        width: 1920,
        height: 1080,
        alt: 'Sayandeep Das — Growth PM & AI Product Manager',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sayandeep Das | Growth PM & AI Product Manager | IIT Guwahati',
    description:
      'Sayandeep is a GTM Engineer and AI PM from IIT Guwahati, currently at Trelium (YC F25), focused on SEO, AEO, AI automation, onboarding systems, growth funnels, and product-led GTM for AI B2B SaaS.',
    images: [ogImageUrl],
    creator: '@sayan_not_deep',
    site: '@sayan_not_deep',
  },
  verification: {},
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  "@id": "https://ai.sayandeep.space/#sayandeep",
                  "name": "Sayandeep Das",
                  "url": "https://ai.sayandeep.space",
                  "image": {
                    "@type": "ImageObject",
                    "url": "https://ai.sayandeep.space/profile.jpg",
                    "width": 400,
                    "height": 400
                  },
                  "jobTitle": "GTM Engineer and AI PM",
                  "worksFor": {
                    "@type": "Organization",
                    "name": "Trelium",
                    "url": "https://trelium.com",
                    "description": "Y Combinator-backed AI agent platform (YC F25)"
                  },
                  "alumniOf": {
                    "@type": "EducationalOrganization",
                    "name": "Indian Institute of Technology Guwahati",
                    "url": "https://www.iitg.ac.in",
                    "sameAs": "https://en.wikipedia.org/wiki/Indian_Institute_of_Technology_Guwahati"
                  },
                  "description": "Sayandeep is a GTM Engineer and AI PM from IIT Guwahati, currently at Trelium (YC F25), focused on SEO, AEO, AI automation, onboarding systems, growth funnels, and product-led GTM for AI B2B SaaS.",
                  "email": "reachsayandeep@gmail.com",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Bengaluru",
                    "addressRegion": "Karnataka",
                    "addressCountry": "IN"
                  },
                  "sameAs": [
                    "https://www.linkedin.com/in/sayandeep02/",
                    "https://github.com/sayandeepdas02",
                    "https://x.com/sayan_not_deep"
                  ],
                  "knowsAbout": [
                    "GTM Engineering",
                    "AI Product Management",
                    "SEO",
                    "AEO",
                    "AI Automation",
                    "Growth Marketing",
                    "GTM Strategy",
                    "Agentic AI",
                    "LLM Applications",
                    "B2B SaaS",
                    "0 to 1 Product Development",
                    "Conversion Optimization",
                    "Data Science"
                  ]
                },
                {
                  "@type": "WebSite",
                  "@id": "https://ai.sayandeep.space/#website",
                  "url": "https://ai.sayandeep.space",
                  "name": "Sayandeep Das — Portfolio",
                  "description": "Portfolio of Sayandeep Das, Growth PM and AI Product Manager",
                  "publisher": {
                    "@id": "https://ai.sayandeep.space/#sayandeep"
                  },
                  "inLanguage": "en-IN"
                }
              ]
            })
          }}
        />
        <link rel="me" href="https://www.linkedin.com/in/sayandeep02/" />
        <link rel="me" href="https://github.com/sayandeepdas02" />
        <link rel="me" href="https://x.com/sayan_not_deep" />
        <link rel="me" href="mailto:reachsayandeep@gmail.com" />
      </head>
      <body>{children}</body>
    </html>
  );
}
