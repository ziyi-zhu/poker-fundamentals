import { notFound } from "next/navigation";
import Link from "next/link";
import { LESSONS, getAdjacentLessons, getLessonBySlug } from "@/lib/lessons";
import { loadLessonMarkdown } from "@/lib/markdown";
import { loadQuiz } from "@/lib/quiz";
import { Markdown } from "@/components/Markdown";
import { LessonNav } from "@/components/LessonNav";
import { Quiz } from "@/components/Quiz";
import { Container } from "@/components/Container";
import { CopyMarkdownButton } from "@/components/CopyMarkdownButton";

export async function generateStaticParams() {
  return LESSONS.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lesson = getLessonBySlug(slug);
  if (!lesson) return {};
  return {
    title: lesson.title,
    description: lesson.summary,
  };
}

export default async function LessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lesson = getLessonBySlug(slug);
  if (!lesson) notFound();

  const [{ html, toc, raw }, quiz] = await Promise.all([
    loadLessonMarkdown(lesson.contentFile),
    loadQuiz(lesson.quizFile),
  ]);

  const { previous, next } = getAdjacentLessons(lesson.slug);

  return (
    <main>
      <Container className="py-8 sm:py-10 lg:py-12">
        <div className="lg:grid lg:grid-cols-[220px_minmax(0,1fr)_200px] lg:gap-10 xl:grid-cols-[240px_minmax(0,1fr)_220px] xl:gap-12">
          <aside className="hidden lg:sticky lg:top-20 lg:block lg:h-fit">
            <LessonNav activeSlug={lesson.slug} />
          </aside>

          <article className="min-w-0">
            <div className="mb-6 lg:hidden">
              <LessonNav activeSlug={lesson.slug} />
            </div>

            <div className="mb-3 flex items-center justify-between gap-3">
              <nav className="text-xs text-[var(--color-muted)]">
                <Link href="/learn" className="hover:text-[var(--color-foreground)]">
                  Curriculum
                </Link>
                <span className="mx-1.5 opacity-50">/</span>
                <span>{lesson.partLabel}</span>
              </nav>
              <CopyMarkdownButton content={raw} />
            </div>

            <header className="mb-8 border-b border-[var(--color-border)] pb-7">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-muted)]">
                {lesson.partLabel} · {lesson.level} · {lesson.estimatedMinutes} min
              </p>
              <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
                {lesson.title}
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-[var(--color-muted)]">
                {lesson.subtitle}
              </p>
              {lesson.outcomes?.length ? (
                <div className="mt-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-muted)]">
                    You will learn to
                  </p>
                  <ul className="mt-2 flex flex-col gap-1.5 text-sm">
                    {lesson.outcomes.map((o) => (
                      <li key={o} className="flex items-start gap-2">
                        <svg
                          viewBox="0 0 16 16"
                          width="14"
                          height="14"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="mt-1 flex-none text-[var(--color-accent)]"
                        >
                          <path
                            d="M2.5 8.5l3.5 3.5L13.5 4.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="text-[var(--color-foreground)]/90">{o}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {lesson.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full bg-[var(--color-surface-2)] px-2.5 py-0.5 text-[11px] text-[var(--color-muted)]"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </header>

            <Markdown html={html} />

            <Quiz quiz={quiz} slug={lesson.slug} />

            <nav className="mt-12 grid gap-3 border-t border-[var(--color-border)] pt-8 sm:grid-cols-2 sm:gap-4">
              {previous ? (
                <Link
                  href={`/learn/${previous.slug}`}
                  className="group flex flex-col gap-1 rounded-xl border border-[var(--color-border)] p-4 transition-colors hover:border-[var(--color-border-strong)]"
                >
                  <span className="text-xs uppercase tracking-wide text-[var(--color-muted)]">
                    ← Previous
                  </span>
                  <span className="font-medium">{previous.title}</span>
                </Link>
              ) : (
                <div className="hidden sm:block" />
              )}
              {next ? (
                <Link
                  href={`/learn/${next.slug}`}
                  className="group flex flex-col gap-1 rounded-xl border border-[var(--color-border)] p-4 transition-colors hover:border-[var(--color-border-strong)] sm:items-end sm:text-right"
                >
                  <span className="text-xs uppercase tracking-wide text-[var(--color-muted)]">
                    Next →
                  </span>
                  <span className="font-medium">{next.title}</span>
                </Link>
              ) : (
                <Link
                  href="/learn"
                  className="group flex flex-col gap-1 rounded-xl border border-[var(--color-border)] p-4 transition-colors hover:border-[var(--color-border-strong)] sm:items-end sm:text-right"
                >
                  <span className="text-xs uppercase tracking-wide text-[var(--color-muted)]">
                    Course complete
                  </span>
                  <span className="font-medium">Back to curriculum</span>
                </Link>
              )}
            </nav>
          </article>

          <aside className="hidden lg:sticky lg:top-20 lg:block lg:h-fit">
            <p className="mb-3 px-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-muted)]">
              On this page
            </p>
            <ol className="flex flex-col gap-1 text-sm">
              {toc.map((entry) => (
                <li key={entry.id}>
                  <a
                    href={`#${entry.id}`}
                    className="block rounded-md px-2 py-1 text-[var(--color-muted)] transition-colors hover:bg-[var(--color-surface-2)] hover:text-[var(--color-foreground)]"
                    style={{ paddingLeft: `${(entry.depth - 2) * 12 + 8}px` }}
                  >
                    {entry.text}
                  </a>
                </li>
              ))}
              <li className="mt-3 border-t border-[var(--color-border)] pt-3">
                <a
                  href="#quiz"
                  className="block rounded-md bg-[var(--color-surface-2)] px-2 py-1 text-[var(--color-foreground)]"
                >
                  ↓ Quiz
                </a>
              </li>
            </ol>
          </aside>
        </div>
      </Container>
    </main>
  );
}
