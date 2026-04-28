import Link from "next/link";
import { LESSONS } from "@/lib/lessons";
import { Container } from "@/components/Container";

export const metadata = {
  title: "Curriculum",
  description: "Browse all poker fundamentals lessons.",
};

export default function CurriculumIndex() {
  return (
    <main>
      <Container className="py-10 sm:py-14">
        <header className="mb-8 max-w-2xl sm:mb-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
            Curriculum
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            The full course, end to end.
          </h1>
          <p className="mt-3 text-[var(--color-muted)]">
            Lessons build on each other in order. Each one finishes with a quiz, so
            you can verify the concept landed before moving on.
          </p>
        </header>

        <ol className="flex flex-col gap-3">
          {LESSONS.map((lesson) => (
            <li key={lesson.slug}>
              <Link
                href={`/learn/${lesson.slug}`}
                className="group flex flex-col gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 transition-colors hover:border-[var(--color-border-strong)] sm:flex-row sm:items-center sm:gap-4 sm:p-5"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 flex-none items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] font-mono text-base font-semibold">
                    {lesson.order.toString().padStart(2, "0")}
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-muted)] sm:hidden">
                    {lesson.partLabel} · {lesson.estimatedMinutes} min
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-1">
                  <div className="hidden flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-muted)] sm:flex">
                    <span>{lesson.partLabel}</span>
                    <span className="opacity-50">·</span>
                    <span>{lesson.level}</span>
                    <span className="opacity-50">·</span>
                    <span>{lesson.estimatedMinutes} min</span>
                  </div>
                  <h2 className="text-base font-semibold leading-snug sm:text-lg">
                    {lesson.title}
                  </h2>
                  <p className="max-w-2xl text-sm text-[var(--color-muted)]">
                    {lesson.summary}
                  </p>
                  <ul className="mt-1 flex flex-wrap gap-1.5">
                    {lesson.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full bg-[var(--color-surface-2)] px-2 py-0.5 text-[11px] text-[var(--color-muted)]"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
                <span className="hidden text-[var(--color-muted)] transition-colors group-hover:text-[var(--color-foreground)] sm:block">
                  <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                    <path d="M6 3l5 5-5 5-1-1 4-4-4-4z" />
                  </svg>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </Container>
    </main>
  );
}
