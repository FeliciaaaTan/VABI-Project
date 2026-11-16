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
    title: "Who is exposed?",
    kind: "dashboard",
    src: "https://public.tableau.com/views/IS428-G1T3-Project/D1WhoisExposed",
    height: { desktop: 840, mobile: 640 },
    interact: "Pick a year at the top right. In the treemap, click + on a job family to see its occupations. Hover any mark for details.",
    what: "The proportion of U.S. occupations exposed to AI, and their level of exposure.",
    insight:
      "Despite the hype about AI taking over jobs, only about 3% of U.S. jobs are highly exposed to AI, according to Anthropic's Economic Index.",
    why: "It shows which jobs count as highly exposed, and so which are most likely to see AI's effects on employment and wages.",
  },

  // ── Q2 · What happened to employment & wages? ─────────────────────────
  {
    id: "q2-jobs-wages",
    question: "q2",
    title: "Jobs & wages: the overall trend",
    kind: "dashboard",
    src: "https://public.tableau.com/views/IS428-G1T3-Project/D2JobsandWage",
    height: { desktop: 840, mobile: 640 },
    interact: "Use the filters on the right to switch the wage basis, pick periods and exclude occupations. Hover any line or bar for details.",
    what: "How employment and wages across AI-exposure levels changed over each period, from pre-COVID to post-ChatGPT.",
    insight:
      "At the overall level there is a visible change: after 2022, employment in highly exposed jobs declined significantly, while wages showed no significant change.",
    why: "It shows whether there is an overall impact of AI on employment and wages in highly exposed jobs.",
  },
  {
    id: "q2-inside-exposed",
    question: "q2",
    title: "Inside the exposed jobs: is the trend real?",
    kind: "dashboard",
    src: "https://public.tableau.com/views/IS428-G1T3-Project/D3InsidetheExposedJobs",
    height: { desktop: 840, mobile: 640 },
    interact: "Compare job families across periods in the heatmap, then hover the scatter and line charts to see individual occupations.",
    what: "The same trends broken down into job families and individual highly exposed occupations.",
    insight:
      "The overall decline isn't what it seems. It is dominated by Office & Admin Support, and most of these declining trends had already started before COVID and ChatGPT. So we can't conclude that AI caused them. They seem more linked to the nature of the work, which is easy to automate.",
    why: "It tests whether the overall decline is really an AI effect, or an older trend in a few occupations.",
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
