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
      { id: "q1", label: "Q1 · Most Exposed Occupations" },
      { id: "q2", label: "Q2 · Employment & Wages" },
      { id: "q3", label: "Q3 · Differences by Age" },
      { id: "q4", label: "Q4 · Tasks & How They Changed" },
    ],
  },
  { id: "takeaways", label: "Takeaways" },
  { id: "methodology", label: "Method" },
  { id: "team", label: "Team" },
];

export const heroStats = [
  { value: "—", label: "of U.S. employment sits in High or Very-high AI-exposure occupations", note: "OEWS 2025 × BLS tiers" },
  { value: "—", label: "employment change in Very-high-exposure occupations, 2023–2025 vs earlier periods", note: "OEWS 2013–2025" },
  { value: "—", label: "change in young workers' employment in the most exposed occupations", note: "Age-group data (source TBC)" },
];

/** The four research questions, in story order. They drive the dashboard tabs. */
export const questions = [
  {
    id: "q1",
    num: 1,
    short: "Most Exposed Occupations",
    title: "Which occupations are most exposed to AI?",
    lead: "Occupations ranked by the BLS's four AI-exposure tiers and their continuous AIOE score, sized by how many people work in them.",
    blurb: "Start here: who is exposed",
  },
  {
    id: "q2",
    num: 2,
    short: "Employment & Wages",
    title: "What happened to employment and wages in those exposed occupations?",
    lead: "Employment and median wages by exposure tier from 2013 to 2025. Post-ChatGPT years are compared against three earlier periods, including the COVID era, instead of assuming any change is caused by AI.",
    blurb: "What actually happened, 2013–2025",
  },
  {
    id: "q3",
    num: 3,
    short: "Differences by Age",
    title: "Are there differences in those trends across age groups?",
    lead: "The same employment and wage trends split by age group, to see whether younger, early-career workers in exposed occupations are affected differently from older workers.",
    blurb: "Young vs older workers",
  },
  {
    id: "q4",
    num: 4,
    short: "Tasks & How They Changed",
    title: "What kinds of work and tasks are impacted, and how have they changed?",
    lead: "Zooming in from occupations to the tasks inside them: which tasks are most exposed to AI, and how the work and skills asked for have shifted.",
    blurb: "From jobs to tasks",
  },
] as const;

export const findings = [
  { q: "Q1", stat: "—", title: "Placeholder finding headline", body: "Placeholder: which occupations are most exposed, and how many workers that covers." },
  { q: "Q2", stat: "—", title: "Placeholder finding headline", body: "Placeholder: how employment and wages in exposed occupations moved compared with earlier periods." },
  { q: "Q3", stat: "—", title: "Placeholder finding headline", body: "Placeholder: whether the trend differs for younger vs older workers." },
  { q: "Q4", stat: "—", title: "Placeholder finding headline", body: "Placeholder: which tasks are most affected and how the work has changed." },
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
  { who: "Job seekers & workers", points: ["Placeholder: what exposure means (and doesn't mean) for your occupation.", "Placeholder: what the age-group differences mean for early-career workers."] },
  { who: "Employers & planners", points: ["Placeholder: which tasks are changing inside exposed roles.", "Placeholder: what that implies for hiring and training."] },
  { who: "Policymakers", points: ["Placeholder: which groups and occupations to monitor.", "Placeholder: why causal claims need more than these trends."] },
];

export const datasets: { name: string; kind: string; grain: string; use: string; href?: string }[] = [
  { name: "BLS AI Exposure Categories", kind: "Static", grain: "831 occupations · SOC 2018", use: "Four exposure tiers (Low → Very high) that drive the tier filter.", href: "https://www.bls.gov/emp/publications/ai-exposure-categories.htm" },
  { name: "AI Occupational Exposure (AIOE / AIIE)", kind: "Static", grain: "SOC occupations · NAICS industries", use: "Continuous exposure scores to rank occupations within a tier and to score industries.", href: "https://doi.org/10.1002/smj.3286" },
  { name: "BLS OEWS", kind: "Dynamic · annual", grain: "~830 occupations · May reference", use: "Employment and median wages, the occupation-level outcomes.", href: "https://www.bls.gov/oes/" },
  { name: "Indeed Hiring Lab AI Tracker", kind: "Dynamic · monthly", grain: "U.S. national · CC BY 4.0", use: "Share of postings mentioning AI / GenAI, used as a national adoption signal.", href: "https://github.com/hiring-lab/ai-tracker" },
  { name: "Placeholder: age-group data (source TBC)", kind: "Dynamic", grain: "Occupation × age group", use: "Placeholder: employment (and wages) by age group, used for Q3." },
  { name: "Placeholder: task data (source TBC)", kind: "Static / dynamic", grain: "Tasks within occupations", use: "Placeholder: task-level exposure and how tasks have changed, used for Q4." },
];

export const pipeline = [
  { step: "Collect", text: "Pull data from the BLS public API and download the static tables and the Hiring Lab CSV." },
  { step: "Clean", text: "Standardise codes and years and handle suppressed values (Python · pandas)." },
  { step: "Join", text: "Merge occupations on 6-digit SOC codes and industries on NAICS codes." },
  { step: "Visualise", text: "Build interactive dashboards in Tableau, then publish to Tableau Public." },
];

export const limitations = [
  "These are descriptive trends. Differences between tiers are correlations, not proof that AI caused them.",
  "Some highly exposed occupations were already declining before ChatGPT (NY Fed), so a pre/post difference may continue an older trend.",
  "The Indeed AI Tracker is national-only, so it cannot be split by industry or occupation.",
  "Age-group differences can reflect other forces too, such as fewer entry-level openings across the economy.",
  "Exposure tiers use the 2018 SOC structure. Occupations that were reclassified may not map cleanly.",
  "The post-ChatGPT period has only three annual OEWS observations (2023–2025), against three earlier comparison periods going back to 2013.",
];

export const glossary = [
  { term: "SOC", def: "Standard Occupational Classification, the U.S. federal 6-digit occupation code used to join datasets." },
  { term: "NAICS", def: "North American Industry Classification System, the codes used to join industry data." },
  { term: "AIOE", def: "AI Occupational Exposure index (Felten, Raj & Seamans), which gives each occupation a continuous exposure score." },
  { term: "AIIE", def: "AI Industry Exposure, the industry-level version of AIOE." },
  { term: "OEWS", def: "Occupational Employment and Wage Statistics (BLS), annual employment and wages by occupation." },
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
