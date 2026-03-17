export function PageHero({
  eyebrow,
  title,
  description
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="bg-hero-glow section-padding">
      <div className="container max-w-4xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary/70">{eyebrow}</p>
        <h1 className="mt-4 text-4xl font-semibold text-primary md:text-5xl">{title}</h1>
        <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">{description}</p>
      </div>
    </section>
  );
}
