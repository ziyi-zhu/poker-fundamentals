"use client";

import Link from "next/link";
import { useState } from "react";
import { LESSONS, type LessonMeta } from "@/lib/lessons";
import { cn } from "@/lib/cn";

export function LessonNav({ activeSlug }: { activeSlug?: string }) {
  const [open, setOpen] = useState(false);

  const items = LESSONS.map((lesson) => ({
    lesson,
    active: lesson.slug === activeSlug,
  }));

  return (
    <>
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1.5 text-xs font-medium text-[var(--color-muted)] hover:text-[var(--color-foreground)]"
        >
          <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor">
            <path d="M2 4h12v1H2zM2 8h12v1H2zM2 12h12v1H2z" />
          </svg>
          Curriculum ({LESSONS.length} lessons)
          <svg viewBox="0 0 16 16" width="10" height="10" fill="currentColor">
            <path d={open ? "M3 10l5-5 5 5z" : "M3 6l5 5 5-5z"} />
          </svg>
        </button>
        {open ? (
          <ol className="mt-3 flex flex-col gap-1 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-2">
            {items.map(({ lesson, active }) => (
              <NavRow key={lesson.slug} lesson={lesson} active={active} compact />
            ))}
          </ol>
        ) : null}
      </div>

      <nav className="hidden lg:block" aria-label="Curriculum">
        <p className="mb-3 px-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-muted)]">
          Curriculum
        </p>
        <ol className="flex flex-col gap-0.5">
          {items.map(({ lesson, active }) => (
            <NavRow key={lesson.slug} lesson={lesson} active={active} />
          ))}
        </ol>
      </nav>
    </>
  );
}

function NavRow({
  lesson,
  active,
  compact,
}: {
  lesson: LessonMeta;
  active: boolean;
  compact?: boolean;
}) {
  return (
    <li>
      <Link
        href={`/learn/${lesson.slug}`}
        className={cn(
          "group flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors",
          active
            ? "bg-[var(--color-surface-2)]"
            : "hover:bg-[var(--color-surface-2)]",
          compact ? "py-2" : "",
        )}
      >
        <span
          className={cn(
            "mt-0.5 inline-flex h-6 w-6 flex-none items-center justify-center rounded-md border text-[11px] font-mono font-semibold",
            active
              ? "border-[var(--color-foreground)] bg-[var(--color-foreground)] text-[var(--color-background)]"
              : "border-[var(--color-border)] text-[var(--color-muted)] group-hover:border-[var(--color-border-strong)]",
          )}
        >
          {lesson.order}
        </span>
        <span className="flex flex-col gap-0.5">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-muted)]">
            {lesson.partLabel}
          </span>
          <span className={cn("text-sm font-medium leading-snug", active ? "" : "")}>
            {lesson.title}
          </span>
        </span>
      </Link>
    </li>
  );
}
