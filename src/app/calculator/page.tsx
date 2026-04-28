import { Calculator } from "@/components/Calculator";

export const metadata = {
  title: "Calculator",
  description: "Pot odds, alpha, MDF, and equity-from-outs calculators.",
};

export default function CalculatorPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-5 py-12 sm:px-8 sm:py-16">
      <header className="mb-10 max-w-2xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
          Tools
        </p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">
          Calculators
        </h1>
        <p className="mt-3 text-[var(--color-muted)]">
          Drop in a pot, a bet, and a number of outs to instantly see pot odds,
          alpha, MDF, the GTO river bluff fraction, and an equity estimate.
        </p>
      </header>
      <Calculator />
    </main>
  );
}
