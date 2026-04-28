"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Container } from "@/components/Container";
import { cn } from "@/lib/cn";

const NAV_ITEMS = [
  { href: "/learn", label: "Curriculum" },
  { href: "/calculator", label: "Calculator" },
  { href: "/glossary", label: "Glossary" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--color-border)] bg-[color-mix(in_oklab,var(--color-background)_85%,transparent)] backdrop-blur">
      <Container className="flex h-14 items-center gap-4 sm:h-16 sm:gap-6">
        <Link href="/" className="flex items-center gap-2" onClick={close}>
          <Logo />
        </Link>
        <nav className="hidden items-center gap-1 text-sm md:flex">
          {NAV_ITEMS.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-3 py-1.5 transition-colors",
                  active
                    ? "bg-[var(--color-surface-2)] text-[var(--color-foreground)]"
                    : "text-[var(--color-muted)] hover:bg-[var(--color-surface-2)] hover:text-[var(--color-foreground)]",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <ThemeToggle className="hidden sm:inline-flex" />
          <Link
            href="/learn/introduction"
            className="hidden rounded-full bg-[var(--color-foreground)] px-3.5 py-1.5 text-sm font-medium text-[var(--color-background)] transition-opacity hover:opacity-90 md:inline-flex"
          >
            Start course
          </Link>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-foreground)] hover:bg-[var(--color-surface-2)] md:hidden"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <>
                  <path d="M4 7h16" />
                  <path d="M4 12h16" />
                  <path d="M4 17h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </Container>

      <div
        id="mobile-nav"
        className={cn(
          "border-t border-[var(--color-border)] bg-[var(--color-background)] md:hidden",
          open ? "block" : "hidden",
        )}
      >
        <Container className="flex flex-col gap-1 py-3">
          {NAV_ITEMS.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={close}
                className={cn(
                  "rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-[var(--color-surface-2)] text-[var(--color-foreground)]"
                    : "text-[var(--color-muted)] hover:bg-[var(--color-surface-2)] hover:text-[var(--color-foreground)]",
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="mt-2 flex items-center justify-between border-t border-[var(--color-border)] pt-3">
            <span className="text-xs text-[var(--color-muted)]">Theme</span>
            <ThemeToggle />
          </div>
          <Link
            href="/learn/introduction"
            onClick={close}
            className="mt-3 inline-flex items-center justify-center rounded-full bg-[var(--color-foreground)] px-4 py-2.5 text-sm font-medium text-[var(--color-background)]"
          >
            Start course
          </Link>
        </Container>
      </div>
    </header>
  );
}
