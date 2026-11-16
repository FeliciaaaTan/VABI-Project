import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { themeInitScript } from "@/components/ui/ThemeToggle";

/**
 * Runs before first paint: on a page *reload*, start from the top instead of
 * restoring the old scroll position, and drop any #q1–#q4 tab hash so the
 * page doesn't jump back down. Fresh visits to a shared link (e.g. /#q2) are
 * untouched, because their navigation type is "navigate", not "reload".
 */
const scrollResetScript = `try{if("scrollRestoration"in history)history.scrollRestoration="manual";var n=performance.getEntriesByType("navigation")[0];if(n&&n.type==="reload"){if(location.hash)history.replaceState(null,"",location.pathname+location.search);window.scrollTo(0,0)}}catch(e){}`;

const body = Inter({ variable: "--font-body", subsets: ["latin"] });
const heading = Space_Grotesk({ variable: "--font-heading", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI's Real Impact on Jobs",
  description:
    "An interactive visual analytics project tracking U.S. hiring, wages and AI adoption across occupations and industries, 2013–2025. IS428 G1 Team 3.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // data-theme is set by the inline script before hydration, hence suppressHydrationWarning.
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script dangerouslySetInnerHTML={{ __html: scrollResetScript }} />
      </head>
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
