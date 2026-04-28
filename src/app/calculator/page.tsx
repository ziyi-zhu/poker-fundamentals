import { Calculator } from "@/components/Calculator";
import { Container } from "@/components/Container";

export const metadata = {
  title: "Calculator",
  description: "Pot odds, alpha, MDF, and equity-from-outs calculators.",
};

export default function CalculatorPage() {
  return (
    <main>
      <Container className="py-10 sm:py-14">
        <header className="mb-8 max-w-2xl sm:mb-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
            Tools
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Calculators
          </h1>
          <p className="mt-3 text-[var(--color-muted)]">
            Drop in a pot, a bet, and a number of outs to instantly see pot odds,
            alpha, MDF, the GTO river bluff fraction, and an equity estimate.
          </p>
        </header>
        <Calculator />
      </Container>
    </main>
  );
}
