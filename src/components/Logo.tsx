import { cn } from "@/lib/cn";

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 font-semibold tracking-tight", className)}>
      <span className="relative inline-flex h-7 w-7 items-center justify-center rounded-md bg-[var(--color-foreground)] text-[var(--color-background)]">
        <span className="text-[15px] font-bold leading-none">A</span>
        <span className="absolute -bottom-0.5 -right-0.5 text-[10px] leading-none text-[var(--color-foreground)]">
          ♠
        </span>
      </span>
      <span className="text-[15px]">
        <span className="text-[var(--color-foreground)]">Poker</span>
        <span className="text-[var(--color-muted)]">/</span>
        <span className="text-[var(--color-foreground)]">Fundamentals</span>
      </span>
    </span>
  );
}
