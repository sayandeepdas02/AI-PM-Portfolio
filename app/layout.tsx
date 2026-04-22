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
  title: "Sayandeep Das | Software Engineer",
  description: "Software Engineer specializing in building polished, high-performance web applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${robotoFlex.variable} ${instrumentSerif.variable}`} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
