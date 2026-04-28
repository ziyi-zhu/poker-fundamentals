## What is a continuation bet?

A **continuation bet (c-bet)** is a bet made by the preflop aggressor on the flop (or turn) after their opponents check to them. Since the preflop raiser represents a strong range, a c-bet applies pressure even when the flop missed their hand.

But a c-bet is not one decision — it is a **textural lookup**. Whether to bet, how much, and at what frequency depends on:

- The **connectivity** of the three flop cards.
- Their **suitedness** (rainbow / two-tone / monotone).
- Their **pairing** (paired / unpaired).
- Whether the pot is a **single-raised pot (SRP)** or a **3-bet pot (3BP)**.

This lesson gives you a clean framework for picking sizing and frequency from those four inputs.

## 1. Range advantage vs. nut advantage

Two concepts drive every c-bet decision:

- **Range advantage** — you have more total equity across your *entire range* than your opponent does. This favours *small, high-frequency* bets (sometimes called "range bets") because you benefit from charging the whole pot a small amount.
- **Nut advantage** — you have a disproportionate share of the very strongest hands. This favours *large, infrequent, polarised* bets, because you have hands that can credibly pile money in.

Knowing which advantage you hold tells you whether to bet small-and-often or big-and-rarely.

### Example — dry K-high vs. wet middling board

- **K♥ 7♣ 2♠** — preflop raiser holds `KK`, `77`, `AK` more often than the caller. Both range advantage *and* nut advantage. Bet small, bet often.
- **J♠ T♠ 9♥** — preflop caller's range is full of `JT`, `T9`, `87`, suited connectors, suited Broadways. The raiser's range advantage shrinks; the caller may even hold the nut advantage. Bet bigger, bet less often, and check more.

## 2. C-bet frequency and sizing by texture (IP, single-raised pot)

These are solver-derived baselines for a single-raised pot, in position:

| Board type | Example | C-bet freq | Sizing |
|---|---|---|---|
| Dry, high-card, rainbow | K♥ 7♣ 2♠ | 70–95% | 25–33% pot (range bet) |
| Paired, dry | 8♥ 8♦ 2♣ | 80–90%+ | 25–33% pot |
| Ace-high rainbow | A♥ 7♦ 3♣ | 60–75% | 25–33% pot |
| Two-tone, K/Q-high | K♥ 9♠ 4♥ | 50–65% | 33–50% pot |
| Wet, mid-connected | 9♣ 8♥ 7♦ | 40–60% | 50–75% pot (polarised) |
| Monotone | A♥ K♥ 7♥ | 25–40% | 25% pot, many checks |
| Low coordinated (caller-favouring) | 6♠ 5♥ 4♣ | 20–35% | Mostly check |

### Why the patterns appear

- **Dry high-card boards** — the raiser holds top-pair-strong hands much more often. Range bet small, charge weak draws and pocket pairs.
- **Paired boards** — both ranges miss most of these flops, but the raiser's overpairs and overcards have high equity. Bet small at high frequency.
- **Wet middling boards** — the caller has more sets, two-pairs, and made straights. Big bets force them to fold marginal pairs; small bets get raised.
- **Low connected boards** — the caller has the densest range here; the raiser's overcards are often dominated. Check most of the time.

## 3. Single-raised vs. 3-bet pots

In a **3-bet pot** the preflop raiser's range is much stronger and narrower, and SPR is ~5 rather than ~17. Solvers c-bet far more aggressively in 3BPs — exceeding 90% at 33% pot on dry boards.

Out of position in 3BPs, check more on dynamic or wet textures: the OOP player has fewer options and a smaller stack-to-pot, so check-call and check-raise both become viable.

| Pot type | Typical SPR (100bb) | Aggression posture |
|---|---|---|
| SRP IP | ~17 | Range bet small on dry boards; check more on wet |
| SRP OOP | ~17 | Check more across the board; rely on check-raise |
| 3BP IP | ~5 | C-bet near 90% on dry; nuts-first big bets on wet |
| 3BP OOP | ~5 | Lean into check-raise lines; mix check-call with strong made hands |

## 4. Worked example — dry K-high SRP, IP

100bb effective, 6-max. CO opens 2.5bb, BB calls. Flop: K♣ 7♦ 2♠ (dry, rainbow, K-high). Pot 5.5bb, you're IP.

- Range advantage? **Yes** — CO's range has many more `KX` and pocket pairs ≥ 77.
- Nut advantage? **Yes** — `KK`, `77`, `22`, `AK` are all in CO's range, very rare in BB's.
- Conclusion: range bet small at high frequency.

Strategy: bet ~33% pot (≈ 1.8bb) ~85% of the time. Check back hands with 0% equity vs villain's check-call range and hands that prefer turn play (e.g. backdoor draws to plan a delayed cbet).

## 5. Worked example — wet middling SRP, OOP

100bb effective. SB opens 3bb, BB calls. Flop: J♠ T♠ 9♥. Pot 6bb, you're OOP as SB.

- Range advantage? **No** — BB's flatting range crushes this board (`JT`, `T9`, `87`, `QJ`, `Q8s`).
- Nut advantage? **Marginal** — both ranges contain straights and sets.
- Conclusion: check most of the range, occasionally bet big with the very top of your range and a few high-equity bluffs.

Strategy: check ~70% of the time. Use a polarised 60–75% pot bet on the bet branch.

> **Texture lookup heuristic.** Ask "do I have the nuts more often than they do?" first. If yes and the board is dry, bet small at high frequency. If no, check most of the time and let villain bluff into your range.
