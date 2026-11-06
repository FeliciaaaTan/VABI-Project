type Props = {
  id: string;
  eyebrow?: string;
  title: string;
  lead?: string;
  children: React.ReactNode;
  className?: string;
};

export function Section({ id, eyebrow, title, lead, children, className = "" }: Props) {
  return (
    <section id={id} className={`scroll-mt-20 py-20 sm:py-28 ${className}`}>
      <div className="w-full px-4 sm:px-8 lg:px-12 2xl:px-16">
        <header className="mb-10 max-w-4xl sm:mb-14">
          {eyebrow && <p className="mb-3 text-sm font-semibold tracking-wider text-primary uppercase">{eyebrow}</p>}
          <h2 className="font-display text-3xl leading-tight font-semibold tracking-tight text-balance text-ink sm:text-4xl">
            {title}
          </h2>
          {lead && <p className="mt-4 text-lg leading-relaxed text-pretty text-muted">{lead}</p>}
        </header>
        {children}
      </div>
    </section>
  );
}
