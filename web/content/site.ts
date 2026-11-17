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
    github: "https://github.com/FeliciaaaTan/VABI-Project" as string | undefined,
    tableauProfile: "https://public.tableau.com/app/profile/felicia.paulus3833/viz/IS428-G1T3-Project/D1WhoisExposed" as string | undefined,
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
  { value: "~3%", label: "of U.S. jobs are highly exposed to AI", note: "Anthropic Economic Index × OEWS 2025" },
  { value: "−5.6%", label: "employment change in high-exposure jobs after ChatGPT (2022–25), after growing in earlier periods", note: "OEWS · employment index 2013–2016 = 100" },
  { value: "−2.4%", label: "change in young workers' (20–24) employment in exposed jobs, 2022→2025, while other young workers grew 5.8%", note: "CPS · Age" },
];

/** The four research questions, in story order. They drive the dashboard tabs. */
export const questions = [
  {
    id: "q1",
    num: 1,
    short: "Most Exposed Occupations",
    title: "Which occupations are most exposed to AI?",
    lead: "Occupations grouped into High, Moderate, Low and No exposure using Anthropic's Economic Index, sized by how many people work in them, and the tasks within them that AI does or assists with.",
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
  { q: "Q1", stat: "~3%", title: "Few jobs are highly exposed", body: "Despite the hype, only about 3% of U.S. jobs are highly exposed to AI, according to Anthropic's Economic Index." },
  { q: "Q2", stat: "↓ jobs", title: "A decline driven by one job family", body: "Employment in highly exposed jobs fell while wages held, but the drop is driven by Office & Admin Support, which was already declining before COVID and ChatGPT. Without it, the decline isn't significant." },
  { q: "Q3", stat: "−2.4%", title: "Young workers fell behind", body: "From 2022 to 2025, young workers (20–24) in exposed jobs lost ground while other young workers and older workers in the same jobs grew. The gap is widest in degree jobs." },
  { q: "Q4", stat: "16 of 28", title: "Behind older colleagues, where AI automates", body: "In 16 of 28 highly exposed jobs, young workers fell behind older workers in the same job, often in jobs where AI mostly automates the work rather than augmenting it." },
];

/** Evidence summarised from the proposal's related-works section. */
export const evidence = [
  { stat: "23%", text: "of employed U.S. respondents used generative AI for work in the previous week, within two years of ChatGPT's release.", cite: "Bick, Blandin & Deming (2024)", href: "https://www.nber.org/papers/w32966" },
  { stat: "↑", text: "Productivity improved when workers had AI assistance.", cite: "Brynjolfsson, Li & Raymond (2023)", href: "https://www.nber.org/papers/w31161" },
  { stat: "≈0", text: "Little measurable change in employment or earnings so far.", cite: "Humlum & Vestergaard (2025)", href: "https://www.nber.org/papers/w33777" },
  { stat: "pre-2022", text: "Demand for highly exposed jobs was already declining before ChatGPT, which makes attribution hard.", cite: "NY Fed, Audoly et al. (2026)", href: "https://libertystreeteconomics.newyorkfed.org/2026/05/do-job-postings-show-early-labor-market-effects-of-ai/" },
  { stat: "−1pp", text: "Employment share of young workers (20–24) in the most exposed jobs fell after ChatGPT, though the effect may not be causal.", cite: "Dallas Fed, Atkinson & Yamco (2026)", href: "https://www.dallasfed.org/research/economics/2026/0106" },
  { stat: "+200%", text: "Corporate AI investment exploded in 2025: private AI investment more than doubled, and generative-AI funding grew over 200% as firms rushed to integrate language models, automation and AI agents into their businesses.", cite: "Forbes Advisor, AI Statistics (2026)", href: "https://www.forbes.com/advisor/business/ai-statistics/" },
];

export const takeaways = [
  {
    who: "Job seekers & workers",
    points: [
      "Exposure isn't the same as job loss. Only about 3% of U.S. jobs are highly exposed, and the biggest decline, in office & admin work, started before ChatGPT.",
      "If you're early in your career, watch most closely. Young workers in exposed jobs fell behind both their peers and older colleagues, especially in jobs that usually need a degree.",
      "Firms mostly train the staff they already have, so getting a foot in the door and learning to work with AI on the job both matter.",
    ],
  },
  {
    who: "Employers & planners",
    points: [
      "You're not alone in upskilling: at every firm size, AI-using businesses train current staff far more often than they hire AI talent.",
      "Look at tasks, not job titles. In most of the most exposed jobs, AI tends to do the task rather than assist, so roles may need to be redesigned around the work that's left.",
      "Entry-level roles are where the effects show first. Trimming junior hiring in exposed jobs could thin out the talent pipeline you'll need later.",
    ],
  },
  {
    who: "Researchers",
    points: [
      "Revisit after 2025. Businesses have been integrating AI since ChatGPT's release in late 2022, and the pace accelerated sharply in 2024–2025. Job effects usually lag behind, and our data stops at 2025, so later OEWS and CPS releases may show a stronger trend.",
      "Look beyond headline employment to age. The clearest signal so far is among young workers (20–24) in exposed jobs, especially degree jobs.",
      "Study tasks, not just occupations. Which tasks AI automates vs assists within the same job may explain who keeps getting hired and who doesn't.",
    ],
  },
];

export const datasets: { name: string; kind: string; grain: string; use: string; href?: string }[] = [
  { name: "Anthropic Economic Index", kind: "Static · 2026 snapshot", grain: "Occupations & their tasks", use: "How people use AI (Claude) across each occupation's tasks, and whether it automates or assists. Drives the exposure levels (High → No exposure) and the task charts.", href: "https://www.anthropic.com/economic-index" },
  { name: "BLS OEWS", kind: "Dynamic · annual", grain: "~830 occupations · May reference", use: "Employment and median wages, the occupation-level outcomes.", href: "https://www.bls.gov/oes/" },
  { name: "CPS · Age (Current Population Survey)", kind: "Dynamic", grain: "Occupation × age group", use: "Employment by age group in exposed occupations, used for Q3.", href: "https://www.bls.gov/cps/" },
  { name: "BTOS (Business Trends and Outlook Survey)", kind: "Dynamic", grain: "U.S. businesses", use: "How businesses report using AI, used for Q4.", href: "https://www.census.gov/hfp/btos/" },
];

export const pipeline = [
  { step: "Collect", text: "Pull data from the BLS and Census public sources and download the Anthropic Economic Index tables." },
  { step: "Clean", text: "Standardise codes and years and handle suppressed values (Python · pandas)." },
  { step: "Join", text: "Merge occupation-level data on 6-digit SOC codes." },
  { step: "Visualise", text: "Build interactive dashboards in Tableau, then publish to Tableau Public." },
];

export const limitations = [
  "Age-group differences can reflect other forces too, such as fewer entry-level openings across the economy.",
  "Our data ends in 2025, but businesses' AI integration only accelerated sharply in 2024–2025. Effects on jobs and wages that take longer to appear won't show up yet.",
  "OEWS estimates pool three years of surveys, so we compare non-overlapping periods only. That leaves a single post-ChatGPT period (2022–2025) to compare against three earlier ones.",
];

export const glossary = [
  { term: "SOC", def: "Standard Occupational Classification, the U.S. federal 6-digit occupation code used to join datasets." },
  { term: "Anthropic Economic Index", def: "Anthropic's measure of how people use Claude across the tasks in each occupation, including whether AI automates the task or assists a person." },
  { term: "OEWS", def: "Occupational Employment and Wage Statistics (BLS), annual employment and wages by occupation." },
  { term: "CPS", def: "Current Population Survey (BLS & Census), the monthly household survey behind U.S. employment by age." },
  { term: "BTOS", def: "Business Trends and Outlook Survey (Census Bureau), which asks businesses how they use AI." },
  { term: "Exposure level", def: "Our four groups (High, Moderate, Low, No exposure), based on each occupation's AI usage in the Anthropic Economic Index." },
];

export const members = [
  { name: "Felicia Paulus", email: "f.paulus.2023@smu.edu.sg", handle: "feliciapaulus" },
  { name: "Felicia Tanujaya", email: "f.tanujaya.2023@smu.edu.sg", handle: "felifelicia" },
  { name: "Mok Qing Ling", email: "ql.mok.2024@smu.edu.sg", handle: "QLY2N" },
  { name: "Ong Sze Hwee Alec", email: "alec.ong.2024@smu.edu.sg", handle: "Skacerine" },
  { name: "Tan Zu Wei", email: "zuwei.tan.2023@smu.edu.sg", handle: "zuinazoo" },
];

/** AI-exposure levels, in the order and colours used in the Tableau workbook. */
export const tiers = [
  { key: "high", label: "High" },
  { key: "moderate", label: "Moderate" },
  { key: "low", label: "Low" },
  { key: "none", label: "No exposure" },
] as const;

/** Analysis window and comparison periods shown on the hero timeline. */
export const analysisWindow = { start: 2013, end: 2025 };

/**
 * Comparison periods. `highIndex` = employment in high-exposure jobs,
 * indexed to the 2013–2016 period (= 100).
 */
export const periods = [
  { label: "Baseline", from: 2013, to: 2016, tone: "baseline", highIndex: 100 },
  { label: "Baseline", from: 2016, to: 2019, tone: "baseline", highIndex: 103.23 },
  { label: "Pre-ChatGPT · COVID era", from: 2019, to: 2022, tone: "pre", highIndex: 101.94 },
  { label: "Post-ChatGPT", from: 2022, to: 2025, tone: "post", highIndex: 96.23 },
] as const;
