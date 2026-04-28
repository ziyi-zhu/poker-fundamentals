## The four primitives

Every postflop and preflop decision in No-Limit Hold'em reduces to four numbers, all derived from the pot and the bet size:

1. **Pot odds** — the minimum equity to call.
2. **Alpha (α)** — the minimum fold frequency to bluff.
3. **MDF** — the minimum defence frequency to deny auto-profit.
4. **SPR** — the stack-to-pot ratio that governs commitment.

Master these and the rest of the game is layered application.

## 1. Pot odds — the minimum equity to call

**Pot odds** express the price the pot is offering you on a call. The required equity to make a call break-even is:

$$
\text{Required equity to call} = \frac{C}{P + C}
$$

The denominator $P + C$ is the *final pot you would win* if you call and win.

**Decision rule.** Call if and only if your equity against the opponent's range meets or exceeds this threshold. If equity exceeds the threshold, the call has positive EV; if it falls short, folding is correct.

### Worked example

Facing a 6bb bet into an 18bb pot:

$$
\text{Required equity} = \frac{6}{18 + 6} = \frac{6}{24} = 25\%
$$

You need at least 25% equity to call profitably. Combined with Part 1: a flush draw with ~36% equity easily clears this threshold, while a gutshot with ~16% equity falls short.

## 2. Alpha (α) — the minimum fold frequency for a bluff

**Alpha (α)** is the minimum fraction of the time your opponent must fold for a pure bluff (a bet with zero showdown equity) to break even. It tells you when bluffing is profitable, *independent* of your hand's equity:

$$
\alpha = \frac{B}{P + B}
$$

This is derived from the EV of a river bluff. With probability $p_{\text{fold}}$ you win $P$, and with probability $1 - p_{\text{fold}}$ you lose $B$. Setting EV to zero and solving gives $p_{\text{fold}} = B/(P+B)$.

### Worked example

You bet 75bb into a 100bb pot on the river with a missed draw:

$$
\alpha = \frac{75}{100 + 75} = \frac{75}{175} \approx 42.9\%
$$

If your opponent folds more than 42.9% of the time, the bluff is profitable. If less, it loses money in the long run.

> **Microstakes truth.** Opponents fold far less than GTO suggests, so α is rarely cleared — pure bluffs are usually –EV. We will return to this in Part 9.

Notice that pot odds and α use the *same* algebraic formula $B/(P+B)$ when $C = B$. The difference is perspective: pot odds tell the *caller* their required equity; α tells the *bluffer* their required fold frequency.

## 3. Minimum defence frequency (MDF)

**Minimum defence frequency (MDF)** is the flip side of α, viewed from the *defender's* perspective. It is the minimum fraction of your range you must continue with (calling or raising) to prevent your opponent from profitably bluffing with any two cards:

$$
\text{MDF} = \frac{P}{P + B} = 1 - \alpha
$$

### Worked example

Facing a half-pot bet ($B = 0.5\,P$):

$$
\text{MDF} = \frac{P}{P + 0.5P} = \frac{1}{1.5} \approx 66.7\%
$$

You must defend at least 66.7% of your range to deny auto-profit.

> **MDF is a theoretical floor, not a target.** It assumes your opponent is bluffing at the GTO-optimal frequency. Against opponents who bluff far less than that — including almost everyone at low stakes — you should *fold more* than MDF demands. The formula is not telling you to call; it is telling you the minimum threshold below which folding becomes exploitable in theory.

## 4. Stack-to-pot ratio (SPR) — the commitment metric

**Stack-to-pot ratio (SPR)** measures how many pot-sized bets remain before a player is all-in. It is calculated once, at the start of the flop, and governs how committed you should be to the pot with any given hand:

$$
\text{SPR} = \frac{\text{Effective stack at start of flop}}{\text{Pot at start of flop}}
$$

"Effective stack" is the smaller of the two players' remaining chip counts (you can only win what you cover).

### Interpretation

SPR ≈ 4 means you can fit roughly two pot-sized bets before all-in; SPR ≈ 13 means you can fit three. Stronger hands need lower SPR to be profitable — top pair wants a committed pot, while a speculative drawing hand wants a deep-stacked, high-SPR setup that gives it large implied odds.

| SPR | Commitment threshold |
|---|---|
| < 2 | Virtually any top pair or better should stack off |
| 2–4 | Top pair / overpair / strong draw is typically committing |
| 4–13 | Need two pair or better for full commitment at the upper end |
| > 13 | Sets, straights, flushes needed to get stacks in; suited connectors thrive on implied odds |

### Concrete example at 100bb effective stacks

**Single-raised pot (SRP).** CO opens to 2.5bb, BB calls. Flop pot = $2.5 + 2.5 + 0.5 = 5.5$bb (including the small blind), remaining stack ≈ 97.5bb.

$$\text{SPR} \approx \frac{97.5}{5.5} \approx 17.7$$

Deep — requires a strong made hand to commit.

**3-bet pot (3BP).** CO opens 2.5bb, BB 3-bets to 9bb, CO calls. Flop pot = $9 + 9 + 0.5 = 18.5$bb, remaining stack ≈ 91bb.

$$\text{SPR} \approx \frac{91}{18.5} \approx 4.9$$

Shallow — AA/KK/AK trivially stack off.

This is the structural reason premium hands (`QQ+`, `AK`) should be 3-bet preflop: doing so creates a low SPR that simplifies postflop play and extracts maximum value from one-pair strength.

## 5. Putting it together

The table below combines pot odds, α, MDF, and the GTO bluff fraction (derived in Part 4). All values follow directly from the formulas above.

| Bet size (× pot) | Pot odds % (caller needs) | α (bluffer needs) | MDF (defender) | GTO bluff % of river bets |
|---|---|---|---|---|
| 1/3× | 25.0% | 25.0% | 75.0% | 20.0% |
| 1/2× | 33.3% | 33.3% | 66.7% | 25.0% |
| 2/3× | 40.0% | 40.0% | 60.0% | 28.6% |
| 3/4× | 42.9% | 42.9% | 57.1% | 30.0% |
| 1× (pot) | 50.0% | 50.0% | 50.0% | 33.3% |
| 1.5× | 60.0% | 60.0% | 40.0% | 37.5% |
| 2× (overbet) | 66.7% | 66.7% | 33.3% | 40.0% |

Pot odds and α are identical here because we assume $C = B$ (the standard case where you are facing a bet, not a raise). Notice that as bet size grows, the caller needs more equity but the bluffer needs fewer folds — larger bets structurally favour the aggressor when the bluffer holds the range advantage.

> **Try it now.** Use the [calculator](/calculator) to plug in any pot and bet size; the same four numbers will appear.
