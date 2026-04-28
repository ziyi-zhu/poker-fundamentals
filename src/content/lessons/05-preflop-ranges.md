## Position is the primary input

Before any equity calculation matters, you must decide whether to play your hand at all — and that decision depends almost entirely on **position**. A hand like `AJo` is a comfortable open from the cutoff but a clear fold from UTG.

Position determines:

- How many players are still to act (and thus the chance of running into a stronger range).
- Your postflop information advantage (acting last is a +EV per-decision boost worth 5–10% on equity realisation).
- Your steal frequency potential against the blinds.

## 1. Seat names

In a **6-max** game (six seats), positions in order of preflop action are:

> LJ (Lojack) → HJ (Hijack) → CO (Cutoff) → BTN (Button) → SB (Small Blind) → BB (Big Blind)

In a **9-max** (full ring) game, three early-position seats are added before the LJ: UTG, UTG+1, and UTG+2.

The button (BTN) acts last postflop and is the most profitable position. UTG/LJ acts first and plays the tightest range.

A few terms used in the charts below:

- **RFI (raise-first-in)** — you are the first player to voluntarily put money in preflop.
- **VPIP** — voluntarily put money in pot — the percentage of hands a player plays preflop. Typical GTO baseline is 20–24% in 6-max.
- **PFR** — preflop raise — the percentage of hands a player raises preflop. For a solid player, PFR should be close to VPIP.

## 2. 6-Max RFI ranges (100bb, ~2.5bb open)

These are solver-derived baselines. Use them as a starting point; deviate based on opponent type (Part 9).

| Position | RFI % | Representative hand range |
|---|---|---|
| LJ | ~16–18% | `55+`, `A2s+`, `K8s+`, `Q9s+`, `J9s+`, `T8s+`, `98s`, `87s`, `76s`, `AJo+`, `KQo` |
| HJ | ~21% | `55+`, `A2s+`, `K6s+`, `Q9s+`, `J9s+`, `T9s`, `98s`, `87s`, `76s`, `ATo+`, `KTo+`, `QTo+` |
| CO | ~25–28% | `22+`, `A2s+`, `K3s+`, `Q6s+`, `J8s+`, `T7s+`, `97s+`, `87s`, `76s`, `65s`, `54s`, `ATo+`, `KTo+`, `QTo+`, `JTo` |
| BTN | ~43–48% | `22+`, `A2s+`, `K2s+`, `Q3s+`, `J4s+`, `T6s+`, `96s+`, `85s+`, `75s+`, `64s+`, `53s+`, `43s`, `A2o+`, `K9o+`, `Q9o+`, `J9o+`, `T9o` |
| SB | ~40–48% | Similar width to BTN; modern GTO is overwhelmingly raise-or-fold, never flat |

> **Why SB doesn't flat.** Calling from the SB leaves you out of position against the BB with a capped range. Modern solver play overwhelmingly prefers a raise-or-fold strategy: 3-bet wide and never just call.

## 3. Full ring (9-max) RFI ranges (100bb)

| Position | RFI % | Representative hand range |
|---|---|---|
| UTG | ~10–12% | `77+`, `A3s+`, `K9s+`, `QTs+`, `JTs`, `T9s`, `AQo+`, `KQo` |
| UTG+1 | ~13% | `77+`, `A3s+`, `K8s+`, `QTs+`, `JTs`, `T9s`, `AJo+`, `KQo` |
| UTG+2 / MP | ~14–16% | `66+`, `A2s+`, `K8s+`, `Q9s+`, `J9s+`, `T9s`, `98s`, `76s`, `ATo+`, `KJo+` |
| LJ | ~15–17% | `66+`, `A2s+`, `K7s+`, `QTs+`, `JTs`, `T9s`, `ATo+`, `KJo+` |
| HJ | ~19–21% | `55+`, `A2s+`, `K5s+`, `Q9s+`, `J9s+`, `T9s`, `98s`, `87s`, `76s`, `ATo+`, `KTo+`, `QJo` |
| CO | ~26–28% | `44+`, `A2s+`, `K5s+`, `Q8s+`, `J8s+`, `T8s+`, `97s+`, `87s`, `76s`, `65s`, `54s`, `A8o+`, `KTo+`, `QTo+`, `JTo` |
| BTN | ~40–45% | `22+`, `A2s+`, `K2s+`, `Q3s+`, `J5s+`, `T6s+`, `96s+`, `86s+`, `76s`, `65s`, `54s`, `A3o+`, `K8o+`, `Q9o+`, `J9o+`, `T9o` |
| SB | ~40–55% | Wide, mostly raise-or-fold |

## 4. 3-bet ranges and sizing

A **3-bet** is a re-raise over someone else's open raise (the "2-bet"). GTO 3-betting is **polarised**: it includes both strong value hands (that want to play for stacks) and bluff hands with good blocking properties (that block the opponent's calling range).

| Situation | 3-bet % |
|---|---|
| HJ vs UTG | ~3–4% |
| CO vs UTG | ~4–6% |
| BTN vs CO | ~9–12% |
| SB vs CO/BTN | ~12–15% |
| BB vs BTN | ~14–17% |
| BB vs SB | ~16–20% |

**3-bet sizing:**

- **3× the open size** when in position (IP).
- **4× the open** when out of position (OOP).

The larger OOP size compensates for the positional disadvantage by charging callers more and building a pot worth playing.

## 5. Polarised vs. linear 3-betting

A **polarised** 3-bet range mixes premium value (`QQ+`, `AK`) with low-equity bluffs that have good blockers (`A5s`, `KJo`, `76s`). The bluff hands serve a strategic purpose:

- They block villain's calling range (`A5s` blocks AA, AK, A5s).
- They have backup equity if called (suited connectors flop draws).

A **linear / merged** 3-bet range only includes value hands — `TT+`, `AQo+`, `AJs+`, `KQs` — that simply want to get money in as a favourite.

> **Low-stakes overlay.** Drop most 3-bet bluffs against recreational opponents. They don't fold often enough to make the bluffs +EV, and they call too often to make the value bets thin. Replace your polarised 3-bet range with a linear merged range and watch the EV climb.

## 6. Adjusting opening size

Default opens at 100bb 6-max:

| Position | Open size |
|---|---|
| LJ–CO | 2.5bb |
| BTN | 2bb (sometimes 2.5bb) |
| SB | 3–3.5bb (no flatting) |

Adjust **up** when:

- There are many limpers behind (add 1bb per limper).
- The blinds are calling stations (charge them more).
- Stacks are deep (pot-build for postflop).

Adjust **down** when:

- The blinds are nits who 3-bet only premiums (smaller open extracts more EV).
- You're playing exploitatively against a wide-folding population.

## 7. Worked example — opening from the CO

You're in the CO at 100bb with `K8s`. The chart says CO RFI is ~25–28% and includes `K3s+`, so `K8s` is a clear open.

Now suppose the BB has been 3-betting at 18% (slightly wider than baseline) and the BTN is a calling station. What changes?

- BB's wider 3-bet range means more `KX` blockers in their range — your `K8s` plays okay vs their bluffs.
- BTN's call frequency means more multiway pots — `K8s` flops well in those.
- Net: still open. But size up to 3bb to charge the BTN.

> **Heuristic.** When in doubt, open the chart range and adjust by sizing rather than range. Sizing changes are easier to undo if your read is wrong.
