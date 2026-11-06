/**
 * Every Tableau viz on the site is configured here.
 *
 * To embed a real viz, paste its Tableau Public URL into `src`, e.g.
 *   src: "https://public.tableau.com/views/<Workbook>/<SheetOrDashboard>"
 * Leave `src` undefined to show a placeholder.
 *
 * `variants` turns the panel into a switcher (one frame, several views).
 */

export type QuestionId = "q1" | "q2" | "q3" | "story";

export type VizVariant = { label: string; src?: string };

export type Viz = {
  id: string;
  question: QuestionId;
  title: string;
  kind: "sheet" | "dashboard" | "story";
  src?: string;
  variants?: VizVariant[];
  height?: { desktop: number; mobile: number };
  /** Shows the exposure-tier legend above the viz. */
  tierLegend?: boolean;
  interact?: string;
  what: string;
  insight: string;
  why: string;
};

const TODO_INSIGHT =
  "Placeholder: state the single most important pattern this viz reveals, with a number where possible.";
const TODO_WHY =
  "Placeholder: explain who should care (job seekers, employers, policymakers) and what it changes for them.";

export const vizzes: Viz[] = [
  // ── Q1 · Exposure → outcomes ───────────────────────────────────────────
  {
    id: "q1-tier-trends",
    question: "q1",
    title: "Employment & median wage by AI-exposure tier, 2013–2025",
    kind: "dashboard",
    tierLegend: true,
    interact: "Toggle between employment and wage, filter by industry, hover for tier totals.",
    what: "Placeholder: annual OEWS employment and median wages, aggregated by BLS AI-exposure tier (Low → Very high).",
    insight: TODO_INSIGHT,
    why: TODO_WHY,
  },
  {
    id: "q1-occupation-explorer",
    question: "q1",
    title: "Occupation explorer",
    kind: "dashboard",
    tierLegend: true,
    interact: "Filter by exposure tier, industry and SOC major group. Click an occupation to see its trend.",
    what: "Placeholder: every SOC-coded occupation plotted by AIOE score against employment change, coloured by tier.",
    insight: TODO_INSIGHT,
    why: TODO_WHY,
  },
  {
    id: "q1-aioe-rank",
    question: "q1",
    title: "Who ranks highest within each tier? (AIOE score)",
    kind: "sheet",
    variants: [
      { label: "Low" },
      { label: "Moderate" },
      { label: "High" },
      { label: "Very high" },
    ],
    height: { desktop: 640, mobile: 520 },
    interact: "Switch tiers with the buttons above the chart.",
    what: "Placeholder: occupations within one BLS tier ranked by their continuous AIOE exposure score.",
    insight: TODO_INSIGHT,
    why: TODO_WHY,
  },

  // ── Q2 · Before vs after ChatGPT ───────────────────────────────────────
  {
    id: "q2-indexed",
    question: "q2",
    title: "Indexed employment by tier (2022 = 100)",
    kind: "dashboard",
    tierLegend: true,
    interact: "Hover a line to compare tiers in the same year. The vertical rule marks ChatGPT's release.",
    what: "Placeholder: employment in each tier rebased to the last pre-ChatGPT OEWS estimate (May 2022), so you can compare tiers of different sizes.",
    insight: TODO_INSIGHT,
    why: TODO_WHY,
  },
  {
    id: "q2-pretrend",
    question: "q2",
    title: "Actual vs pre-ChatGPT trend projection",
    kind: "dashboard",
    tierLegend: true,
    variants: [{ label: "Employment" }, { label: "Median wage" }],
    interact: "Switch the outcome above. The dashed line extends each tier's 2019–2022 trend.",
    what: "Placeholder: each tier's 2023–2025 outcomes compared with its own earlier periods (2013–2016, 2016–2019, 2019–2022).",
    insight: TODO_INSIGHT,
    why: TODO_WHY,
  },

  // ── Q3 · Industry demand & adoption ────────────────────────────────────
  {
    id: "q3-jolts",
    question: "q3",
    title: "Job openings, hires & separations by industry",
    kind: "dashboard",
    variants: [{ label: "Openings" }, { label: "Hires" }, { label: "Separations" }],
    interact: "Pick a measure, then click an industry to highlight it across the timeline.",
    what: "Placeholder: monthly BLS JOLTS series by NAICS industry, 2019–2025.",
    insight: TODO_INSIGHT,
    why: TODO_WHY,
  },
  {
    id: "q3-adoption",
    question: "q3",
    title: "Share of U.S. job postings mentioning AI and GenAI",
    kind: "sheet",
    height: { desktop: 560, mobile: 460 },
    interact: "Hover for the monthly share. Annotations mark major model releases.",
    what: "Placeholder: Indeed Hiring Lab AI Tracker (national level), share of postings with AI or generative-AI terms.",
    insight: TODO_INSIGHT,
    why: TODO_WHY,
  },
  {
    id: "q3-aiie-demand",
    question: "q3",
    title: "Industry AI exposure (AIIE) vs change in labour demand",
    kind: "dashboard",
    interact: "Each bubble is an industry. Filter by period (pre / post ChatGPT).",
    what: "Placeholder: industries plotted by AIIE exposure score against the change in their job-openings rate.",
    insight: TODO_INSIGHT,
    why: TODO_WHY,
  },

  // ── Story ──────────────────────────────────────────────────────────────
  {
    id: "story",
    question: "story",
    title: "AI's Real Impact on Jobs: the guided story",
    kind: "story",
    height: { desktop: 980, mobile: 720 },
    interact: "Use the story points along the top to step through the narrative.",
    what: "Placeholder: a Tableau Story that walks through Q1 → Q2 → Q3 in order.",
    insight: TODO_INSIGHT,
    why: TODO_WHY,
  },
];

export const vizzesFor = (q: QuestionId) => vizzes.filter((v) => v.question === q);
