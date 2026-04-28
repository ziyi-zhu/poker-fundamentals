import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Container } from "@/components/Container";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <Container className="flex flex-col gap-6 py-10 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-2">
          <Logo />
          <p className="max-w-md text-sm text-[var(--color-muted)]">
            A math-first curriculum for microstakes No-Limit Hold&apos;em. All
            content is editorial, for educational use only — no real-money play.
          </p>
        </div>
        <nav className="flex flex-col gap-2 text-sm sm:items-end">
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <Link
              href="/learn"
              className="text-[var(--color-muted)] hover:text-[var(--color-foreground)]"
            >
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
            © {new Date().getFullYear()} Poker Fundamentals · Built with Next.js
            and Tailwind.
          </p>
        </nav>
      </Container>
    </footer>
  );
}
