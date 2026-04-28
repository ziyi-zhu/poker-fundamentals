"use client";

import { useMemo, useState } from "react";

type Mode = "betting" | "outs";

export function Calculator() {
  const [mode, setMode] = useState<Mode>("betting");

  return (
    <div className="flex flex-col gap-8">
      <div
        role="tablist"
        className="inline-flex w-full max-w-full overflow-x-auto rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] p-1 text-sm sm:w-fit"
      >
        {(
          [
            { id: "betting", label: "Pot odds · α · MDF" },
            { id: "outs", label: "Equity from outs" },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={mode === tab.id}
            onClick={() => setMode(tab.id)}
            className={`flex-1 whitespace-nowrap rounded-full px-3.5 py-1.5 transition-colors sm:flex-none ${
              mode === tab.id
                ? "bg-[var(--color-foreground)] text-[var(--color-background)]"
                : "text-[var(--color-muted)] hover:text-[var(--color-foreground)]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {mode === "betting" ? <BettingCalculator /> : <OutsCalculator />}
    </div>
  );
}

function NumberField({
  label,
  value,
  onChange,
  unit,
  step = 0.1,
  min = 0,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  unit?: string;
  step?: number;
  min?: number;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium uppercase tracking-wider text-[var(--color-muted)]">
        {label}
      </span>
      <div className="flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] focus-within:border-[var(--color-foreground)]">
        <input
          type="number"
          step={step}
          min={min}
          value={Number.isNaN(value) ? "" : value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="h-11 w-full rounded-xl bg-transparent px-3 font-mono text-base outline-none"
        />
        {unit ? (
          <span className="px-3 font-mono text-sm text-[var(--color-muted)]">{unit}</span>
        ) : null}
      </div>
    </label>
  );
}

function ResultRow({
  label,
  value,
  hint,
  highlight,
}: {
  label: string;
  value: string;
  hint?: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`flex items-baseline justify-between gap-3 rounded-lg border px-4 py-3 ${
        highlight
          ? "border-[var(--color-foreground)]/30 bg-[var(--color-surface-2)]"
          : "border-[var(--color-border)]"
      }`}
    >
      <div>
        <div className="text-xs font-medium uppercase tracking-wider text-[var(--color-muted)]">
          {label}
        </div>
        {hint ? <div className="mt-0.5 text-xs text-[var(--color-muted)]">{hint}</div> : null}
      </div>
      <div className="font-mono text-lg font-semibold">{value}</div>
    </div>
  );
}

function BettingCalculator() {
  const [pot, setPot] = useState(20);
  const [bet, setBet] = useState(10);

  const result = useMemo(() => {
    if (pot <= 0 || bet <= 0) return null;
    const potOdds = bet / (pot + bet);
    const mdf = pot / (pot + bet);
    const bluffFraction = bet / (pot + 2 * bet);
    const ratio = pot + bet === 0 ? 0 : bet / (pot + bet);
    return {
      potOdds,
      alpha: potOdds,
      mdf,
      bluffFraction,
      bluffToValueRatio: ratio,
    };
  }, [pot, bet]);

  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:gap-8">
      <div className="flex flex-col gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-6">
        <h2 className="text-base font-semibold">Inputs</h2>
        <NumberField
          label="Pot before bet"
          value={pot}
          onChange={setPot}
          unit="bb"
          step={0.5}
        />
        <NumberField
          label="Bet size"
          value={bet}
          onChange={setBet}
          unit="bb"
          step={0.5}
        />
        <p className="text-xs text-[var(--color-muted)]">
          Assumes you face the bet (call equals the bet). Outputs use the standard
          microstakes formulas: pot odds &nbsp;<code>B/(P+B)</code>, MDF &nbsp;
          <code>P/(P+B)</code>, GTO river bluff fraction &nbsp;
          <code>B/(P+2B)</code>.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        {result ? (
          <>
            <ResultRow
              label="Required equity to call (pot odds)"
              value={`${(result.potOdds * 100).toFixed(2)}%`}
              hint="The break-even equity threshold facing this bet."
              highlight
            />
            <ResultRow
              label="α — folds needed for a pure bluff"
              value={`${(result.alpha * 100).toFixed(2)}%`}
              hint="Same formula as pot odds, viewed from the bluffer."
            />
            <ResultRow
              label="MDF — defender's minimum continue %"
              value={`${(result.mdf * 100).toFixed(2)}%`}
              hint="Below this, opponent profitably bluffs any two."
            />
            <ResultRow
              label="GTO river bluff fraction"
              value={`${(result.bluffFraction * 100).toFixed(2)}%`}
              hint="Share of the betting range that should be bluffs."
            />
            <ResultRow
              label="Bluff : Value ratio"
              value={`${result.bluffToValueRatio.toFixed(2)} : 1`}
              hint="Bluff combos for every value combo."
            />
            <p className="mt-3 text-xs text-[var(--color-muted)]">
              At microstakes, defenders almost never reach MDF and almost always
              under-bluff. Read these as theoretical floors, not targets.
            </p>
          </>
        ) : (
          <p className="rounded-lg border border-dashed border-[var(--color-border)] p-6 text-sm text-[var(--color-muted)]">
            Enter a positive pot and bet size to see results.
          </p>
        )}
      </div>
    </section>
  );
}

function OutsCalculator() {
  const [outs, setOuts] = useState(9);
  const [streets, setStreets] = useState<1 | 2>(2);

  const result = useMemo(() => {
    if (outs < 0) return null;
    const unseenFlop = 47;
    const unseenTurn = 46;
    const oneCard = outs / unseenTurn;
    const twoCards = 1 - ((unseenFlop - outs) / unseenFlop) * ((unseenTurn - outs) / unseenTurn);
    const ruleApprox = streets === 1 ? 2 * outs : 4 * outs;
    const refined = streets === 2 && outs > 8 ? 3 * outs + 8 : null;
    const exactPct = streets === 1 ? oneCard * 100 : twoCards * 100;
    return { ruleApprox, refined, exactPct };
  }, [outs, streets]);

  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:gap-8">
      <div className="flex flex-col gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-6">
        <h2 className="text-base font-semibold">Inputs</h2>
        <NumberField label="Number of outs" value={outs} onChange={setOuts} step={1} />
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-medium uppercase tracking-wider text-[var(--color-muted)]">
            Cards to come
          </span>
          <div className="flex flex-col gap-2 sm:flex-row">
            {([1, 2] as const).map((n) => (
              <button
                key={n}
                onClick={() => setStreets(n)}
                className={`flex-1 rounded-xl border px-3 py-2 text-sm transition-colors ${
                  streets === n
                    ? "border-[var(--color-foreground)] bg-[var(--color-surface-2)]"
                    : "border-[var(--color-border)] hover:bg-[var(--color-surface-2)]"
                }`}
              >
                {n} card{n === 2 ? "s" : ""}
                <span className="text-[var(--color-muted)]">
                  {" "}
                  {n === 1 ? "(turn → river)" : "(all-in flop)"}
                </span>
              </button>
            ))}
          </div>
        </div>
        <p className="text-xs text-[var(--color-muted)]">
          The Rule of 4 only applies when you pay a single price to see both cards
          (e.g. all-in on the flop). For two-street betting, apply the Rule of 2
          per street.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        {result ? (
          <>
            <ResultRow
              label="Rule of 2 & 4 estimate"
              value={`${result.ruleApprox}%`}
              highlight
            />
            {result.refined !== null ? (
              <ResultRow
                label="Phil Gordon refinement"
                value={`${result.refined}%`}
                hint="Recommended whenever outs > 8 and two cards remain."
              />
            ) : null}
            <ResultRow
              label="Exact equity"
              value={`${result.exactPct.toFixed(1)}%`}
              hint={
                streets === 1
                  ? "n / 46 unseen turn cards."
                  : "1 - (47-n)/47 · (46-n)/46."
              }
            />
            <p className="mt-3 text-xs text-[var(--color-muted)]">
              Discount dirty outs (cards that complete you but improve villain to a
              better hand) before applying any of these.
            </p>
          </>
        ) : (
          <p className="rounded-lg border border-dashed border-[var(--color-border)] p-6 text-sm text-[var(--color-muted)]">
            Enter a non-negative number of outs.
          </p>
        )}
      </div>
    </section>
  );
}
