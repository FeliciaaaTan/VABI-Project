import { ArrowDown, BookOpen, Database, ExternalLink, FileText, Github } from "lucide-react";
import {
  datasets,
  evidence,
  findings,
  glossary,
  heroStats,
  limitations,
  members,
  pipeline,
  questions,
  site,
  takeaways,
} from "@/content/site";
import { vizzesFor } from "@/content/vizzes";
import { Section } from "../ui/Section";
import { VizPanel } from "../tableau/VizPanel";
import { CausationCallout } from "../ui/CausationCallout";
import { ChatGPTTimeline } from "../ui/ChatGPTTimeline";
import { QuestionTabs } from "../ui/QuestionTabs";

const card = "rounded-2xl border border-line bg-surface";

/* ── Hero ─────────────────────────────────────────────────────────────── */
export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-14 pb-20 sm:pt-20 sm:pb-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-60 [background-image:radial-gradient(circle_at_1px_1px,var(--border)_1px,transparent_0)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
      />
      <div className="w-full px-4 sm:px-8 lg:px-12 2xl:px-16">
        <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-muted sm:text-sm">
          <span className="size-1.5 rounded-full bg-primary" aria-hidden />
          {site.course} · {site.team}
        </p>
        <h1 className="max-w-4xl font-display text-4xl leading-[1.05] font-bold tracking-tight text-balance text-ink sm:text-6xl lg:text-7xl">
          {site.title}
        </h1>
        <p className="mt-4 font-display text-xl text-muted sm:text-2xl">{site.subtitle}</p>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-ink/80">{site.pitch}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#explore" className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-on-primary hover:opacity-90">
            Explore the data <ArrowDown className="size-4" aria-hidden />
          </a>
          <a href="#methodology" className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-5 py-3 font-semibold text-ink hover:border-primary">
            How we did it
          </a>
        </div>

        <dl className="mt-14 grid gap-4 sm:grid-cols-3">
          {heroStats.map((s) => (
            <div key={s.label} className={`${card} p-5`}>
              <dd className="font-display text-4xl font-bold text-primary tabular-nums">{s.value}</dd>
              <dt className="mt-2 text-[15px] leading-snug text-ink">{s.label}</dt>
              <p className="mt-2 text-xs text-muted">Placeholder stat · {s.note}</p>
            </div>
          ))}
        </dl>

        <div className={`${card} mt-6 px-5 pt-6 pb-5 sm:px-8`}>
          <p className="mb-4 text-xs font-semibold tracking-wider text-muted uppercase">Analysis window</p>
          <ChatGPTTimeline />
        </div>
      </div>
    </section>
  );
}

/* ── The debate ───────────────────────────────────────────────────────── */
export function Debate() {
  return (
    <Section
      id="debate"
      eyebrow="The problem"
      title="Two loud stories, not enough evidence"
      lead="AI may automate some tasks, augment workers in others and create demand for new skills. Research so far points in different directions, and exposure measures have rarely been put next to actual hiring and wage data."
    >
      <div className="grid gap-4 md:grid-cols-2">
        <blockquote className={`${card} p-6`}>
          <p className="font-display text-2xl font-semibold text-ink">“AI is replacing workers.”</p>
          <p className="mt-2 text-muted">Headlines often rely on anecdotes about layoffs and hiring freezes in exposed roles.</p>
        </blockquote>
        <blockquote className={`${card} p-6`}>
          <p className="font-display text-2xl font-semibold text-ink">“Nothing has changed yet.”</p>
          <p className="mt-2 text-muted">Aggregate employment looks stable, and some studies find little measurable effect.</p>
        </blockquote>
      </div>

      <h3 className="mt-14 mb-5 font-display text-xl font-semibold text-ink">What existing research says</h3>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {evidence.map((e) => (
          <li key={e.cite} className={`${card} flex flex-col p-5`}>
            <span className="font-display text-2xl font-bold text-primary">{e.stat}</span>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-ink">{e.text}</p>
            <p className="mt-3 text-xs text-muted">{e.cite}</p>
          </li>
        ))}
      </ul>

      <p className="mt-10 max-w-3xl border-l-4 border-primary pl-5 text-lg leading-relaxed text-ink">
        <span className="font-semibold">Exposure is not a forecast.</span> A highly AI-exposed occupation is not necessarily
        shrinking. Exposure scores don&apos;t predict job loss or wage effects on their own, so we look at them next to what
        actually happened to employment, wages and hiring.
      </p>
    </Section>
  );
}

/* ── Key findings ─────────────────────────────────────────────────────── */
export function Findings() {
  return (
    <Section id="findings" eyebrow="Key findings" title="What the data shows" lead="Placeholder: a one-sentence summary of the overall answer, written once the analysis is final.">
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {findings.map((f, i) => (
          <li key={i} className={`${card} p-6`}>
            <div className="flex items-center justify-between">
              <span className="font-display text-sm font-semibold text-muted tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <span className="rounded-full bg-primary-soft px-2.5 py-0.5 text-xs font-semibold text-primary">{f.q}</span>
            </div>
            <p className="mt-4 font-display text-4xl font-bold text-ink tabular-nums">{f.stat}</p>
            <h3 className="mt-2 font-display text-lg font-semibold text-ink">{f.title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">{f.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

/* ── Explore: research questions as tabs, dashboards below ────────────── */
export function Explore() {
  return (
    <Section
      id="explore"
      className="theme-deep"
      eyebrow="Explore the dashboards"
      title="Three questions, three ways in"
      lead="Pick the question that matches what you want to know. Every dashboard can be filtered by industry, occupation and AI-exposure tier."
    >
      <QuestionTabs
        tabs={questions.map(({ id, num, short, title, audience }) => ({ id, num, short, title, audience }))}
        panels={{ q1: <QuestionPanel id="q1" />, q2: <QuestionPanel id="q2" />, q3: <QuestionPanel id="q3" /> }}
      />
    </Section>
  );
}

function QuestionPanel({ id }: { id: "q1" | "q2" | "q3" }) {
  const q = questions.find((x) => x.id === id)!;
  return (
    <div>
      <header className="mb-8 max-w-4xl">
        <p className="mb-2 text-sm font-semibold tracking-wider text-primary uppercase">
          Research question {q.num} · {q.short}
        </p>
        <h3 className="font-display text-2xl leading-tight font-semibold tracking-tight text-balance text-ink sm:text-3xl">{q.title}</h3>
        <p className="mt-3 text-lg leading-relaxed text-pretty text-muted">{q.lead}</p>
      </header>
      {id === "q2" && (
        <div className="theme-base mb-8">
          <CausationCallout />
        </div>
      )}
      <div className="flex flex-col gap-8">
        {vizzesFor(id).map((v) => (
          <VizPanel key={v.id} viz={v} />
        ))}
      </div>
      {id === "q3" && (
        <div className="theme-base mt-8">
          <CausationCallout>
            JOLTS reports by industry and the Indeed tracker is national-only, so changes in industry demand can&apos;t be
            linked directly to occupation-level AI exposure.
          </CausationCallout>
        </div>
      )}
    </div>
  );
}

/* ── Story ────────────────────────────────────────────────────────────── */
export function Story() {
  return (
    <Section
      id="story"
      eyebrow="Guided narrative"
      title="Walk through the whole story"
      lead="Our Tableau Story takes you through all three questions in order. Use it if you'd rather be guided than explore on your own."
    >
      {vizzesFor("story").map((v) => (
        <VizPanel key={v.id} viz={v} />
      ))}
    </Section>
  );
}

/* ── Takeaways ────────────────────────────────────────────────────────── */
export function Takeaways() {
  return (
    <Section id="takeaways" eyebrow="So what?" title="What it means for you" lead="Placeholder: frame the takeaways as evidence to weigh, not predictions.">
      <div className="grid gap-4 md:grid-cols-3">
        {takeaways.map((t) => (
          <div key={t.who} className={`${card} p-6`}>
            <h3 className="font-display text-lg font-semibold text-ink">{t.who}</h3>
            <ul className="mt-4 flex flex-col gap-3">
              {t.points.map((p) => (
                <li key={p} className="flex gap-2.5 text-[15px] leading-relaxed text-muted">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ── Methodology ──────────────────────────────────────────────────────── */
export function Methodology() {
  return (
    <Section
      id="methodology"
      eyebrow="Methodology"
      title="Data, joins and limits"
      lead="All datasets are free and publicly available. Occupations are joined on 6-digit SOC codes and industries on NAICS codes, producing one analysis-ready table."
    >
      <h3 className="mb-4 flex items-center gap-2 font-display text-lg font-semibold text-ink">
        <Database className="size-5 text-primary" aria-hidden /> Datasets
      </h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {datasets.map((d) => (
          <a key={d.name} href={d.href} target="_blank" rel="noreferrer" className={`${card} group p-5 hover:border-primary`}>
            <div className="flex items-start justify-between gap-2">
              <h4 className="font-semibold text-ink">{d.name}</h4>
              <ExternalLink className="mt-1 size-3.5 shrink-0 text-muted group-hover:text-primary" aria-hidden />
            </div>
            <p className="mt-1 text-xs font-medium text-primary">{d.kind}</p>
            <p className="mt-1 text-xs text-muted">{d.grain}</p>
            <p className="mt-3 text-sm leading-relaxed text-ink/85">{d.use}</p>
          </a>
        ))}
      </div>

      <h3 className="mt-14 mb-4 font-display text-lg font-semibold text-ink">Pipeline</h3>
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {pipeline.map((p, i) => (
          <li key={p.step} className={`${card} p-5`}>
            <span className="font-display text-sm font-semibold text-muted">Step {i + 1}</span>
            <p className="mt-1 font-display text-lg font-semibold text-ink">{p.step}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">{p.text}</p>
          </li>
        ))}
      </ol>

      <div className="mt-14 grid gap-8 lg:grid-cols-2">
        <div>
          <h3 className="mb-4 font-display text-lg font-semibold text-ink">Limitations</h3>
          <ul className="flex flex-col gap-3">
            {limitations.map((l) => (
              <li key={l} className="flex gap-2.5 text-[15px] leading-relaxed text-ink/85">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-signal" aria-hidden />
                {l}
              </li>
            ))}
          </ul>
        </div>
        <div id="glossary">
          <h3 className="mb-4 flex items-center gap-2 font-display text-lg font-semibold text-ink">
            <BookOpen className="size-5 text-primary" aria-hidden /> Glossary
          </h3>
          <dl className={`${card} divide-y divide-line`}>
            {glossary.map((g) => (
              <div key={g.term} className="grid grid-cols-[7.5rem_1fr] gap-3 px-5 py-3 text-sm">
                <dt className="font-semibold text-ink">{g.term}</dt>
                <dd className="leading-relaxed text-muted">{g.def}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}

/* ── Footer (with team) ───────────────────────────────────────────────── */
const initials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

export function Footer() {
  const links = [
    { label: "Project report (PDF)", href: site.links.report, icon: FileText },
    { label: "GitHub", href: site.links.github, icon: Github },
    { label: "Tableau Public", href: site.links.tableauProfile, icon: ExternalLink },
  ];
  return (
    <footer id="team" className="mt-24 scroll-mt-16 border-t border-line bg-surface sm:mt-40">
      <div className="grid w-full gap-12 px-4 py-14 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:px-12 2xl:px-16">
        <div className="text-sm text-muted">
          <a href="#home" className="flex items-center gap-2 font-display text-lg font-semibold text-ink">
            <span className="grid size-8 place-items-center rounded-lg bg-primary text-sm font-bold text-on-primary">AI</span>
            {site.title}
          </a>
          <p className="mt-3 max-w-sm leading-relaxed">{site.subtitle}.</p>
          <p className="mt-3">
            {site.course}
            <br />
            Singapore Management University
          </p>
          <ul className="mt-6 flex flex-col gap-2.5">
            {links.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                {href ? (
                  <a href={href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-ink hover:text-primary">
                    <Icon className="size-4" aria-hidden /> {label}
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2 opacity-60" title="Link coming soon">
                    <Icon className="size-4" aria-hidden /> {label} (soon)
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-5 text-sm font-semibold tracking-wider text-primary uppercase">The team · {site.team}</h2>
          <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {members.map((m) => (
              <li key={m.name} className="flex items-center gap-3 rounded-xl border border-line bg-bg p-3">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-primary-soft font-display text-sm font-bold text-primary">
                  {initials(m.name)}
                </span>
                <span className="min-w-0">
                  <span className="block truncate font-semibold text-ink">{m.name}</span>
                  <a href={`mailto:${m.email}`} className="block truncate text-sm text-muted hover:text-primary">
                    {m.email}
                  </a>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
