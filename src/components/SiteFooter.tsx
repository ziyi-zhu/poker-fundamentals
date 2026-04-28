import Link from "next/link";
import { Logo } from "@/components/Logo";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="flex flex-col gap-2">
          <Logo />
          <p className="max-w-md text-sm text-[var(--color-muted)]">
            A math-first curriculum for microstakes No-Limit Hold&apos;em. All content is editorial,
            for educational use only — no real-money play.
          </p>
        </div>
        <nav className="flex flex-col gap-2 text-sm sm:items-end">
          <div className="flex gap-4">
            <Link href="/learn" className="text-[var(--color-muted)] hover:text-[var(--color-foreground)]">
              Curriculum
            </Link>
            <Link
              href="/calculator"
              className="text-[var(--color-muted)] hover:text-[var(--color-foreground)]"
            >
              Calculator
            </Link>
            <Link
              href="/glossary"
              className="text-[var(--color-muted)] hover:text-[var(--color-foreground)]"
            >
              Glossary
            </Link>
          </div>
          <p className="text-xs text-[var(--color-muted)]">
            © {new Date().getFullYear()} Poker Fundamentals. Built with Next.js + Tailwind.
          </p>
        </nav>
      </div>
    </footer>
  );
}
