import { Container } from "@/components/Container";

export const metadata = {
  title: "Glossary",
  description:
    "Quick reference for the abbreviations and terms used throughout the curriculum.",
};

type Entry = {
  term: string;
  definition: string;
};

const ENTRIES: Entry[] = [
  { term: "Equity", definition: "Probability of winning the hand at showdown given current information." },
  { term: "Out", definition: "An unseen card that improves your hand to (likely) the best hand." },
  { term: "Dirty out", definition: "An out that completes your draw but also improves the opponent to a better hand." },
  { term: "Pot odds", definition: "Required equity to break even on a call: C / (P + C)." },
  { term: "Alpha (α)", definition: "Minimum fold frequency for a pure bluff to break even: B / (P + B)." },
  { term: "MDF", definition: "Minimum defence frequency. P / (P + B). The floor below which folding is exploitable." },
  { term: "SPR", definition: "Stack-to-pot ratio at the start of the flop. Effective stack divided by pot." },
  { term: "EV", definition: "Expected value: probability-weighted average payoff of a decision." },
  { term: "Implied odds", definition: "Pot odds adjusted for money expected to be won on later streets." },
  { term: "Reverse implied odds", definition: "The mirror of implied odds — money lost when a dominated draw completes." },
  { term: "Semi-bluff", definition: "A bluff that retains showdown equity if called." },
  { term: "RFI", definition: "Raise-first-in: opening a pot with a raise rather than limping or folding." },
  { term: "VPIP / PFR", definition: "Voluntarily put money in pot / preflop raise. Population baselines for player typing." },
  { term: "AF", definition: "Aggression factor: (raises + bets) / calls. >2 aggressive, <1 passive." },
  { term: "C-bet", definition: "Continuation bet: bet by the preflop aggressor on the flop." },
  { term: "Range advantage", definition: "Total-equity advantage across the entire range. Favours small high-frequency bets." },
  { term: "Nut advantage", definition: "Disproportionate share of strongest hands. Favours large polarised bets." },
  { term: "Polarised", definition: "A range made up of strong value and bluffs, with little in between." },
  { term: "Linear / merged", definition: "A range made up of value hands of varying strengths, no bluffs." },
  { term: "Equity realisation (EQR)", definition: "Fraction of raw equity actually converted to chips. ~110% IP, ~90% OOP." },
  { term: "By-worse criterion", definition: "Bet for value when more worse hands than better hands call." },
  { term: "Geometric sizing", definition: "Per-street bet that builds a pot to all-in over n streets at SPR. (1 + 2·SPR)^(1/n) − 1, all over 2." },
  { term: "Rake", definition: "House cut taken from the pot, usually capped. Tilts marginal calls to slightly −EV." },
];

export default function GlossaryPage() {
  return (
    <main>
      <Container className="py-10 sm:py-14">
        <header className="mb-8 max-w-2xl sm:mb-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
            Reference
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Glossary
          </h1>
          <p className="mt-3 text-[var(--color-muted)]">
            A flat list of every abbreviation and term used across the lessons.
            Reach for it whenever a formula or label needs a refresher.
          </p>
        </header>
        <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ENTRIES.map((entry) => (
            <div
              key={entry.term}
              className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4"
            >
              <dt className="font-semibold">{entry.term}</dt>
              <dd className="mt-1 text-sm text-[var(--color-muted)]">
                {entry.definition}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </main>
  );
}
