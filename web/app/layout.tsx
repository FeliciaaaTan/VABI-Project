import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const body = Inter({ variable: "--font-body", subsets: ["latin"] });
const heading = Space_Grotesk({ variable: "--font-heading", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI's Real Impact on Jobs",
  description:
    "An interactive visual analytics project tracking U.S. hiring, wages and AI adoption across occupations and industries, 2013–2025. IS428 G1 Team 3.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${body.variable} ${heading.variable} font-sans antialiased`}>
        {children}
        {/* Tableau Embedding API v3: registers the <tableau-viz> web component */}
        <Script
          type="module"
          src="https://public.tableau.com/javascripts/api/tableau.embedding.3.latest.min.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
