import Link from "next/link";
import { LESSONS } from "@/lib/lessons";
import { Container } from "@/components/Container";

export default function Home() {
  const totalMinutes = LESSONS.reduce((acc, l) => acc + l.estimatedMinutes, 0);
  const featured = LESSONS.slice(0, 3);

  return (
    <main className="flex flex-col">
      <section className="border-b border-[var(--color-border)]">
        <Container className="grid gap-10 py-12 sm:py-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12 lg:py-24">
          <div className="flex flex-col gap-6 sm:gap-8">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1 text-xs text-[var(--color-muted)]">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
              <span className="hidden sm:inline">Microstakes No-Limit Hold&apos;em · </span>
              {LESSONS.length} lessons · ≈{Math.round(totalMinutes / 10) * 10} min
            </div>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
              Learn poker from{" "}
              <span className="text-[var(--color-muted)]">first principles.</span>
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-[var(--color-muted)] sm:text-lg">
              A rigorous, math-first curriculum that builds No-Limit Hold&apos;em from
              counting outs all the way up to a real-time decision stack. Every lesson
              has worked examples and an interactive quiz so you can verify
              understanding before moving on.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Link
                href="/learn/introduction"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-foreground)] px-5 py-3 text-sm font-medium text-[var(--color-background)] transition-opacity hover:opacity-90"
              >
                Start with the introduction
                <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
                  <path d="M6.5 3l5 5-5 5-1-1L9 8 5.5 4z" />
                </svg>
              </Link>
              <Link
                href="/learn"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--color-border)] px-5 py-3 text-sm font-medium text-[var(--color-foreground)] transition-colors hover:bg-[var(--color-surface-2)]"
              >
                Browse the curriculum
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
              Start here
            </p>
            <ol className="flex flex-col gap-3">
              {featured.map((lesson) => (
                <Link
                  key={lesson.slug}
                  href={`/learn/${lesson.slug}`}
                  className="group flex items-start gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 transition-colors hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-2)]"
                >
                  <span className="flex h-10 w-10 flex-none items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] font-mono text-sm font-semibold">
                    {lesson.order.toString().padStart(2, "0")}
                  </span>
                  <span className="flex flex-1 flex-col gap-1">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-muted)]">
                      {lesson.partLabel} · {lesson.estimatedMinutes} min
                    </span>
                    <span className="text-base font-semibold leading-snug">
                      {lesson.title}
                    </span>
                    <span className="text-sm text-[var(--color-muted)]">
                      {lesson.subtitle}
                    </span>
                  </span>
                  <span className="hidden text-[var(--color-muted)] transition-colors group-hover:text-[var(--color-foreground)] sm:block">
                    <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
                      <path d="M6 3l5 5-5 5-1-1 4-4-4-4z" />
                    </svg>
                  </span>
                </Link>
              ))}
            </ol>
            <Link
              href="/learn"
              className="mt-1 self-end text-xs text-[var(--color-muted)] hover:text-[var(--color-foreground)]"
            >
              View all {LESSONS.length} lessons →
            </Link>
          </div>
        </Container>
      </section>

      <section className="border-b border-[var(--color-border)]">
        <Container className="py-12 sm:py-16 lg:py-20">
          <div className="mb-8 max-w-3xl sm:mb-12">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
              How it works
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              Read, work an example, prove you got it.
            </h2>
            <p className="mt-3 text-[var(--color-muted)]">
              Every lesson follows the same shape, so you can move at your own pace and
              know exactly where you are in the cascade.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <FeatureCard
              step="01"
              title="Conceptual notes"
              description="Each part introduces one big idea, derives the formula from scratch, and connects it to the rest of the curriculum."
            />
            <FeatureCard
              step="02"
              title="Worked examples"
              description="Numbers, hand histories, and sizing tables drawn directly from solver outputs and population baselines."
            />
            <FeatureCard
              step="03"
              title="Interactive quiz"
              description="Choice, multi-select and numeric questions with detailed explanations. No login required — just check your answers and move on."
            />
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-12 sm:py-16 lg:py-20">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4 sm:mb-10">
            <div className="max-w-xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
                Curriculum
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                The ten parts
              </h2>
              <p className="mt-2 text-[var(--color-muted)]">
                Each part assumes only what came before it. Skip ahead at your own
                risk — they compound.
              </p>
            </div>
            <Link
              href="/learn"
              className="text-sm text-[var(--color-muted)] hover:text-[var(--color-foreground)]"
            >
              All lessons →
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {LESSONS.map((lesson) => (
              <Link
                key={lesson.slug}
                href={`/learn/${lesson.slug}`}
                className="group flex flex-col gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 transition-colors hover:border-[var(--color-border-strong)]"
              >
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-muted)]">
                  <span className="font-mono">
                    {lesson.order.toString().padStart(2, "0")}
                  </span>
                  <span>{lesson.partLabel}</span>
                  <span className="ml-auto rounded-full bg-[var(--color-surface-2)] px-2 py-0.5 text-[10px] font-medium text-[var(--color-muted)]">
                    {lesson.level}
                  </span>
                </div>
                <h3 className="text-base font-semibold leading-snug">{lesson.title}</h3>
                <p className="text-sm text-[var(--color-muted)]">{lesson.summary}</p>
                <div className="mt-auto flex items-center gap-2 pt-2 text-xs text-[var(--color-muted)]">
                  <span>{lesson.estimatedMinutes} min</span>
                  <span className="opacity-50">·</span>
                  <span>{lesson.tags.slice(0, 2).join(", ")}</span>
                  <span className="ml-auto opacity-0 transition-opacity group-hover:opacity-100">
                    Open →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}

function FeatureCard({
  step,
  title,
  description,
}: {
  step: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
      <span className="font-mono text-xs text-[var(--color-muted)]">{step}</span>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-[var(--color-muted)]">{description}</p>
    </div>
  );
}
