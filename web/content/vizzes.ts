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

export const vizzes: Viz[] = [
  // ── Q1 · Which occupations are most exposed? ──────────────────────────
  {
    id: "q1-exposure-map",
    question: "q1",
    title: "Which jobs are exposed?",
    kind: "dashboard",
    src: "https://public.tableau.com/views/IS428-G1T3-Project/D1WhoisExposed",
    height: { desktop: 840, mobile: 640 },
    interact: "Pick a year at the top right. In the treemap, click + on a job family to see its occupations. Hover any mark for details.",
    what: "The proportion of U.S. occupations exposed to AI, and their level of exposure.",
    insight:
      "Despite the hype about AI taking over jobs, only about 3% of U.S. jobs are highly exposed to AI, according to Anthropic's Economic Index.",
    why: "It shows which jobs count as highly exposed, and so which are most likely to see AI's effects on employment and wages.",
  },
  {
    id: "q1-exposed-tasks",
    question: "q1",
    title: "Which tasks within those jobs?",
    kind: "dashboard",
    src: "https://public.tableau.com/views/IS428-G1T3-Project/D2WhoisExposedPt2",
    interact: "Hover a bar to see how often AI does the task versus helps a person do it. Hover the word cloud for each activity's share.",
    what: "The tasks inside the most exposed occupations: whether AI automates them or helps a person do them, and what employees use generative AI for at work.",
    insight:
      "In 13 of the 20 most exposed jobs, most AI use automates the task rather than helping a person do it. At work, employees mostly use generative AI for writing & editing, information search and document interpretation.",
    why: "It shows what kind of work AI is actually taking on inside these jobs, not just which jobs are exposed.",
  },

  // ── Q2 · What happened to employment & wages? ─────────────────────────
  {
    id: "q2-jobs-wages",
    question: "q2",
    title: "Jobs & wages: the overall trend",
    kind: "dashboard",
    src: "https://public.tableau.com/views/IS428-G1T3-Project/D3JobsandWage",
    height: { desktop: 840, mobile: 640 },
    interact: "Use the filters on the right to switch the wage basis, pick periods and exclude occupations. Hover any line or bar for details.",
    what: "How employment and wages across AI-exposure levels changed over each period, from pre-COVID to post-ChatGPT.",
    insight:
      "At the overall level there is a visible change: after 2022, employment in highly exposed jobs declined significantly, while wages showed no significant change. But the decline is dominated by one job family, Office & Admin Support. Once those jobs are excluded, the decline is no longer significant, so we can't say that employment in exposed jobs is falling sharply or that it is much affected by AI.",
    why: "It shows whether there is an overall impact of AI on employment and wages in highly exposed jobs.",
  },
  {
    id: "q2-inside-exposed",
    question: "q2",
    title: "Inside the exposed jobs: is the trend real?",
    kind: "dashboard",
    src: "https://public.tableau.com/views/IS428-G1T3-Project/D4InsidetheExposedJobs",
    height: { desktop: 840, mobile: 640 },
    interact: "Compare job families across periods in the heatmap, then hover and select an occupation in the scatter plot to see its individual trend.",
    what: "The same trends broken down into job families and individual highly exposed occupations.",
    insight:
      "Looking at individual occupations confirms there is no significant break in trend after ChatGPT. Even in Office & Admin Support, the same decline was already under way before COVID and before ChatGPT. So we can't conclude that AI caused the decline. It seems more linked to the nature of the work, which is easy to automate.",
    why: "It tests whether the overall decline is really an AI effect, or a continuation of trends that were already under way.",
  },

  // ── Q3 · Differences across age groups? ───────────────────────────────
  {
    id: "q3-age",
    question: "q3",
    title: "Young vs older workers",
    kind: "dashboard",
    src: "https://public.tableau.com/views/IS428-G1T3-Project/D5Age",
    interact: "Hover the lines and bars for exact values.",
    what: "Employment for young (20–24) and prime-age (35–54) workers by AI-exposure level, indexed to 2022 = 100 (CPS), plus each age group's change from 2022 to 2025, split by whether the job usually needs a degree.",
    insight:
      "In 2025, young workers did worse as exposure rose. From 2022 to 2025, young workers in exposed jobs fell 2.4% while other young workers grew 5.8%, even as older workers in exposed jobs grew. The gap is widest in jobs that usually need a degree (−4.1% vs +9.7%).",
    why: "It shows whether any AI effect falls hardest on early-career workers trying to enter exposed jobs.",
  },

  // ── Q4 · Which tasks are impacted & how have they changed? ────────────
  {
    id: "q4-task",
    question: "q4",
    title: "Inside the jobs where young workers fell behind",
    kind: "dashboard",
    src: "https://public.tableau.com/views/IS428-G1T3-Project/D6Task",
    interact: "Hover a job to compare young and older workers. Hover the bars to see how much of each job's work AI does.",
    what: "Within each highly exposed occupation, the change in employment for ages 20–24 vs all other ages (2022 vs 2024–25 average), and how much of the work in the jobs where young workers fell furthest is done by AI.",
    insight:
      "In 16 of 28 highly exposed jobs, young workers fell behind older workers in the same job. In several of the jobs where they fell furthest, such as interviewers, data entry keyers and secretaries, AI does most of the tasks.",
    why: "It links the age gap to the work itself: where AI can do the tasks, entry-level roles may be the first to shrink.",
  },
  {
    id: "q4-training-vs-hiring",
    question: "q4",
    title: "Companies train existing staff rather than hire for AI",
    kind: "sheet",
    src: "https://public.tableau.com/views/IS428-G1T3-Project/17Trainingvshiring",
    interact: "Hover a dot for the exact share in each firm-size group.",
    what: "Among AI-using businesses (Census BTOS), the share in each firm-size group that trained current staff to use AI vs hired AI-trained staff.",
    insight:
      "At every firm size, training existing staff is far more common than hiring AI-trained staff: from 13.4% vs 1.0% at firms with 1–4 employees, to 31.4% vs 6.8% at firms with 250+. Larger firms do more of both.",
    why: "It suggests companies are adapting how their existing workers do the job rather than hiring new AI talent, which may help explain why young, entry-level workers are falling behind.",
  },
];

export const vizzesFor = (q: QuestionId) => vizzes.filter((v) => v.question === q);
