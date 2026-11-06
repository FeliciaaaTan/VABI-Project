/** Site-wide copy. Anything starting with "Placeholder" still needs final text. */

export const site = {
  title: "AI's Real Impact on Jobs",
  subtitle: "Tracking Hiring, Wages, and Adoption Across Industries",
  course: "IS428 Visual Analytics for Business Intelligence",
  team: "G1 · Team 3",
  pitch:
    "Coverage swings between “AI is replacing workers” and “nothing has changed yet.” We put validated AI-exposure measures next to real U.S. employment, wage and hiring data from 2013 to 2025, so you can test the claims yourself.",
  links: {
    report: undefined as string | undefined, // e.g. "/report.pdf"
    github: undefined as string | undefined,
    tableauProfile: undefined as string | undefined,
  },
};

export type NavItem = { id: string; label: string; children?: { id: string; label: string }[] };

/** Top menu. Keep in sync with the sections in app/page.tsx. */
export const nav: NavItem[] = [
  { id: "debate", label: "The Debate" },
  { id: "findings", label: "Findings" },
  {
    id: "explore",
    label: "Dashboards",
    children: [
      { id: "q1", label: "Q1 · Exposure & Outcomes" },
      { id: "q2", label: "Q2 · Before vs After ChatGPT" },
      { id: "q3", label: "Q3 · Industry Demand & Adoption" },
    ],
  },
  { id: "story", label: "Story" },
  { id: "takeaways", label: "Takeaways" },
  { id: "methodology", label: "Method" },
  { id: "team", label: "Team" },
];

export const heroStats = [
  { value: "—", label: "of U.S. employment sits in High or Very-high AI-exposure occupations", note: "OEWS 2025 × BLS tiers" },
  { value: "—", label: "of job postings mention AI or generative AI (latest month)", note: "Indeed Hiring Lab" },
  { value: "—", label: "employment change in Very-high-exposure occupations vs their pre-ChatGPT trend", note: "OEWS 2023–2025" },
];

export const questions = [
  {
    id: "q1",
    num: 1,
    short: "Exposure & Outcomes",
    title: "Do more AI-exposed occupations show different employment and wage trends?",
    lead: "Employment and median wages across occupations grouped by the BLS's four AI-exposure tiers, from 2013 to 2025.",
    audience: "Start here if you're a job seeker or worker",
  },
  {
    id: "q2",
    num: 2,
    short: "Before vs After ChatGPT",
    title: "Did highly exposed occupations break from their own pre-ChatGPT trend?",
    lead: "We compare each tier against its own earlier periods (2013–2016, 2016–2019 and the pre-ChatGPT, COVID-era 2019–2022) instead of assuming that any post-2022 decline is caused by AI.",
    audience: "Start here if you're a researcher or policymaker",
  },
  {
    id: "q3",
    num: 3,
    short: "Industry Demand & Adoption",
    title: "How is hiring demand shifting across industries as AI adoption grows?",
    lead: "Job openings, hires and separations by industry, read alongside the share of postings that mention AI and generative AI.",
    audience: "Start here if you're an employer or workforce planner",
  },
] as const;

export const findings = [
  { q: "Q1", stat: "—", title: "Placeholder finding headline", body: "Placeholder: one or two sentences summarising the finding and the viz that supports it." },
  { q: "Q1", stat: "—", title: "Placeholder finding headline", body: "Placeholder: one or two sentences summarising the finding and the viz that supports it." },
  { q: "Q2", stat: "—", title: "Placeholder finding headline", body: "Placeholder: one or two sentences summarising the finding and the viz that supports it." },
  { q: "Q2", stat: "—", title: "Placeholder finding headline", body: "Placeholder: one or two sentences summarising the finding and the viz that supports it." },
  { q: "Q3", stat: "—", title: "Placeholder finding headline", body: "Placeholder: one or two sentences summarising the finding and the viz that supports it." },
  { q: "Q3", stat: "—", title: "Placeholder finding headline", body: "Placeholder: one or two sentences summarising the finding and the viz that supports it." },
];

/** Evidence summarised from the proposal's related-works section. */
export const evidence = [
  { stat: "23%", text: "of employed U.S. respondents used generative AI for work in the previous week, within two years of ChatGPT's release.", cite: "Bick, Blandin & Deming (2024)" },
  { stat: "↑", text: "Productivity improved when workers had AI assistance.", cite: "Brynjolfsson, Li & Raymond (2023)" },
  { stat: "≈0", text: "Little measurable change in employment or earnings so far.", cite: "Humlum & Vestergaard (2025)" },
  { stat: "pre-2022", text: "Demand for highly exposed jobs was already declining before ChatGPT, which makes attribution hard.", cite: "NY Fed, Audoly et al. (2026)" },
  { stat: "−1pp", text: "Employment share of young workers (20–24) in the most exposed jobs fell after ChatGPT, though the effect may not be causal.", cite: "Dallas Fed, Atkinson & Yamco (2026)" },
];

export const takeaways = [
  { who: "Job seekers & workers", points: ["Placeholder: what the exposure-tier trends mean for career choices.", "Placeholder: high exposure ≠ disappearing jobs. Point to the evidence."] },
  { who: "Employers & planners", points: ["Placeholder: where hiring demand is moving across industries.", "Placeholder: how AI mentions in postings are trending."] },
  { who: "Policymakers", points: ["Placeholder: which signals to monitor (coverage of tiers, wage divergence).", "Placeholder: why causal claims need more than these trends."] },
];

export const datasets = [
  { name: "BLS AI Exposure Categories", kind: "Static", grain: "831 occupations · SOC 2018", use: "Four exposure tiers (Low → Very high) that drive the tier filter.", href: "https://www.bls.gov/emp/publications/ai-exposure-categories.htm" },
  { name: "AI Occupational Exposure (AIOE / AIIE)", kind: "Static", grain: "SOC occupations · NAICS industries", use: "Continuous exposure scores to rank occupations within a tier and to score industries.", href: "https://doi.org/10.1002/smj.3286" },
  { name: "BLS OEWS", kind: "Dynamic · annual", grain: "~830 occupations · May reference", use: "Employment and median wages, the occupation-level outcomes.", href: "https://www.bls.gov/oes/" },
  { name: "BLS JOLTS", kind: "Dynamic · monthly", grain: "Industry (NAICS)", use: "Job openings, hires and separations for the industry comparison.", href: "https://www.bls.gov/jlt/" },
  { name: "Indeed Hiring Lab AI Tracker", kind: "Dynamic · monthly", grain: "U.S. national · CC BY 4.0", use: "Share of postings mentioning AI / GenAI, used as a national adoption signal.", href: "https://github.com/hiring-lab/ai-tracker" },
];

export const pipeline = [
  { step: "Collect", text: "Pull data from the BLS public API and download the static tables and the Hiring Lab CSV." },
  { step: "Clean", text: "Standardise codes and years and handle suppressed values (Python · pandas)." },
  { step: "Join", text: "Merge occupations on 6-digit SOC codes and industries on NAICS codes." },
  { step: "Visualise", text: "Build interactive dashboards and a story in Tableau, then publish to Tableau Public." },
];

export const limitations = [
  "These are descriptive trends. Differences between tiers are correlations, not proof that AI caused them.",
  "Some highly exposed occupations were already declining before ChatGPT (NY Fed), so a pre/post difference may continue an older trend.",
  "The Indeed AI Tracker is national-only, so it cannot be split by industry or occupation.",
  "JOLTS has no occupation detail, so industry-level demand cannot be linked directly to occupation-level exposure.",
  "Exposure tiers use the 2018 SOC structure. Occupations that were reclassified may not map cleanly.",
  "The post-ChatGPT period has only three annual OEWS observations (2023–2025), against three earlier comparison periods going back to 2013.",
];

export const glossary = [
  { term: "SOC", def: "Standard Occupational Classification, the U.S. federal 6-digit occupation code used to join datasets." },
  { term: "NAICS", def: "North American Industry Classification System, the codes used to join industry data." },
  { term: "AIOE", def: "AI Occupational Exposure index (Felten, Raj & Seamans), which gives each occupation a continuous exposure score." },
  { term: "AIIE", def: "AI Industry Exposure, the industry-level version of AIOE." },
  { term: "OEWS", def: "Occupational Employment and Wage Statistics (BLS), annual employment and wages by occupation." },
  { term: "JOLTS", def: "Job Openings and Labor Turnover Survey (BLS), monthly openings, hires and separations by industry." },
  { term: "Exposure tier", def: "BLS's four-level classification (Low, Moderate, High, Very high), built from five external exposure measures." },
];

export const members = [
  { name: "Alec Ong Sze Hwee", email: "name@example.com" },
  { name: "Felicia Paulus", email: "name@example.com" },
  { name: "Felicia Tanujaya", email: "name@example.com" },
  { name: "Mok Qing Ling", email: "name@example.com" },
  { name: "Tan Zu Wei", email: "name@example.com" },
];

export const tiers = [
  { key: "low", label: "Low" },
  { key: "moderate", label: "Moderate" },
  { key: "high", label: "High" },
  { key: "vhigh", label: "Very high" },
] as const;

/** Analysis window and comparison periods shown on the hero timeline. */
export const analysisWindow = { start: 2013, end: 2025 };

export const periods = [
  { label: "Baseline", from: 2013, to: 2016, tone: "baseline" },
  { label: "Baseline", from: 2016, to: 2019, tone: "baseline" },
  { label: "Pre-ChatGPT · COVID era", from: 2019, to: 2022, tone: "pre" },
  { label: "Post-ChatGPT", from: 2023, to: 2025, tone: "post" },
] as const;
