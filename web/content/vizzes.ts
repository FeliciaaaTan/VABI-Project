/**
 * Every Tableau viz on the site is configured here.
 *
 * To embed a real viz, paste its Tableau Public URL into `src`, e.g.
 *   src: "https://public.tableau.com/views/<Workbook>/<SheetOrDashboard>"
 * Leave `src` undefined to show a placeholder.
 *
 * `variants` turns the panel into a switcher (one frame, several views).
 */

export type QuestionId = "q1" | "q2" | "q3" | "q4";

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
  // ── Q1 · Which occupations are most exposed? ──────────────────────────
  {
    id: "q1-exposure-map",
    question: "q1",
    title: "Where AI exposure sits across U.S. occupations",
    kind: "dashboard",
    tierLegend: true,
    interact: "Each box is an occupation, sized by employment. Filter by SOC major group and hover for details.",
    what: "Placeholder: all SOC-coded occupations sized by employment and coloured by BLS AI-exposure tier.",
    insight: TODO_INSIGHT,
    why: TODO_WHY,
  },
  {
    id: "q1-top-exposed",
    question: "q1",
    title: "Most exposed occupations by AIOE score",
    kind: "sheet",
    variants: [{ label: "All tiers" }, { label: "Very high" }, { label: "High" }, { label: "Moderate" }, { label: "Low" }],
    height: { desktop: 640, mobile: 520 },
    interact: "Switch tiers with the buttons above the chart.",
    what: "Placeholder: occupations ranked by their continuous AIOE exposure score, overall or within one BLS tier.",
    insight: TODO_INSIGHT,
    why: TODO_WHY,
  },

  // ── Q2 · What happened to employment & wages? ─────────────────────────
  {
    id: "q2-tier-trends",
    question: "q2",
    title: "Employment & median wage by AI-exposure tier, 2013–2025",
    kind: "dashboard",
    tierLegend: true,
    variants: [{ label: "Employment" }, { label: "Median wage" }],
    interact: "Switch the outcome above. Hover a line to compare tiers in the same year. The vertical rule marks ChatGPT's release.",
    what: "Placeholder: annual OEWS employment and median wages, aggregated by BLS AI-exposure tier (Low → Very high).",
    insight: TODO_INSIGHT,
    why: TODO_WHY,
  },
  {
    id: "q2-period-compare",
    question: "q2",
    title: "Growth by period: 2013–16, 2016–19, 2019–22 (COVID era) vs 2023–25",
    kind: "dashboard",
    tierLegend: true,
    interact: "Compare each tier's growth across the four periods. Filter by SOC major group.",
    what: "Placeholder: each tier's employment and wage growth in the post-ChatGPT period next to its own earlier periods.",
    insight: TODO_INSIGHT,
    why: TODO_WHY,
  },
  {
    id: "q2-occupation-explorer",
    question: "q2",
    title: "Occupation explorer",
    kind: "dashboard",
    tierLegend: true,
    interact: "Search or click an occupation to see its employment and wage trend.",
    what: "Placeholder: every SOC-coded occupation plotted by AIOE score against employment change, coloured by tier.",
    insight: TODO_INSIGHT,
    why: TODO_WHY,
  },

  // ── Q3 · Differences across age groups? ───────────────────────────────
  {
    id: "q3-age-trends",
    question: "q3",
    title: "Employment in exposed occupations by age group",
    kind: "dashboard",
    tierLegend: true,
    interact: "Filter by age group and exposure tier. Hover for yearly values.",
    what: "Placeholder: employment trends for each age group, split by AI-exposure tier.",
    insight: TODO_INSIGHT,
    why: TODO_WHY,
  },
  {
    id: "q3-age-gap",
    question: "q3",
    title: "Younger vs older workers: the gap by exposure tier",
    kind: "sheet",
    variants: [{ label: "Employment" }, { label: "Median wage" }],
    height: { desktop: 600, mobile: 500 },
    interact: "Switch the outcome above.",
    what: "Placeholder: the difference between younger and older workers' trends within each exposure tier.",
    insight: TODO_INSIGHT,
    why: TODO_WHY,
  },

  // ── Q4 · Which tasks are impacted & how have they changed? ────────────
  {
    id: "q4-task-exposure",
    question: "q4",
    title: "Which kinds of tasks are most exposed?",
    kind: "dashboard",
    interact: "Pick an occupation or task category to see its exposed tasks.",
    what: "Placeholder: tasks within occupations, grouped by type of work and coloured by exposure.",
    insight: TODO_INSIGHT,
    why: TODO_WHY,
  },
  {
    id: "q4-task-change",
    question: "q4",
    title: "How the work has changed",
    kind: "dashboard",
    interact: "Compare before and after ChatGPT. Hover for details.",
    what: "Placeholder: how tasks and skills asked for have shifted over time, e.g. the share of job postings mentioning AI or generative AI (Indeed Hiring Lab).",
    insight: TODO_INSIGHT,
    why: TODO_WHY,
  },
];

export const vizzesFor = (q: QuestionId) => vizzes.filter((v) => v.question === q);
