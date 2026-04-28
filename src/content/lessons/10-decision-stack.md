## Composing the frameworks

The frameworks from Parts 1–9 form a **cascade**. On every hand you apply them in order, dropping into deeper layers only when the current one cannot resolve the decision. Internalising this cascade is what turns the math into table speed.

## The cascade, street by street

### Preflop

1. **Pick your range.** Use the position-based RFI charts in Part 5 as the baseline. Open the chart range and adjust by sizing rather than range whenever possible.
2. **Adjust for opponent type.** Nits in the BB → wider opens. Calling stations behind → larger sizings, narrower bluffs. Maniacs to your left → tighter opens, more 4-bet for value.
3. **Plan for SPR.** With premiums (`QQ+`, `AK`), 3-bet to create a low-SPR pot — it simplifies postflop and gets the money in with the equity edge.
4. **Apply the rake adjustment.** Slightly tighten when rake is high; reward fold-equity-driven aggression that wins pots preflop.

### Flop

1. **SPR check.** Compute SPR once on the flop (Part 2.4). This tells you whether your hand class — top pair, set, draw — is committed or not. If SPR < 4 with top pair, start planning to stack off.
2. **Texture check.** Classify the board (Part 6). Pick c-bet frequency and sizing from the texture matrix. Adjust for SRP vs 3BP.
3. **Range check.** Where am I on the range? Strong made hands prefer larger sizings; range-bet candidates prefer 25–33% pot bets at high frequency.
4. **Facing a c-bet?** Count outs (Part 1) and apply pot odds (Part 2.1). Adjust for implied odds (Part 3.2) when stacks are deep enough.

### Turn

1. **Re-evaluate.** Many draws missed; the board has changed. If the turn card is a "scare card" (completes a draw, pairs the board), consider how it changes both your equity and your opponent's continuing range.
2. **Apply the Rule of 2.** With one card to come, your draw equity halves vs the flop two-card equity. Recompute pot odds against the new bet.
3. **Continue the geometric plan or break it.** If your three-street plan from the flop still makes sense, continue. If the texture changed, re-plan.
4. **Bluff or value?** Use the by-worse criterion. The turn often shifts hands from value into bluff-catcher status, or vice versa.

### River

1. **No more cards.** Decisions are now purely about hand strength vs. calling range.
2. **Apply the by-worse criterion** (Part 8.1) before any bet. If only better hands call, check.
3. **Sizing.** Match sizing to villain's calling range, not to a textbook target. Thin value bets small; strong value bets larger; overbets only with nut advantage.
4. **If bluffing, check that fold equity exceeds α** (Part 2.2). At low stakes, it usually does not against station-type opponents.

## A unified worked example

Let's run a single hand all the way through the cascade.

**Setup.** 100bb effective. 6-max online microstakes. Hero in the CO with `A♥ Q♥`.

### Preflop

- CO RFI baseline: `ATo+`, includes `AQs/AQo`. Standard open at 2.5bb.
- BTN is a TAG (VPIP 22, 3B 7); blinds are population-average.
- No reason to deviate. Open 2.5bb.
- BB (a calling station, VPIP 52, fold-to-c-bet 30%) calls. BTN folds.

### Flop

Pot 6bb. Board: **A♣ 8♦ 4♠** (dry, A-high rainbow).

- **SPR.** Effective stack ≈ 97.5bb, pot 6bb → SPR ≈ 16.
- **Texture.** Dry, A-high, rainbow. Big range advantage and nut advantage to CO.
- **Hand strength.** TPTK with backdoor flush draw.
- **C-bet plan.** Texture says range bet 25–33% pot at high frequency. Against a station, deviate slightly: bet larger to build the pot for thin value later.
- **Action.** Bet 3bb (50% pot). BB calls.

### Turn

Pot 12bb. Turn: **8♣**. Board now A♣ 8♦ 4♠ 8♣ — paired.

- **Equity check.** TPTK still strong; villain's range now includes more `8X` (since stations call wide preflop and on the flop). Some `A8s` combos beat us; many `A2-AJ` don't.
- **By-worse check.** Hands that call: `AX` weaker, `8X`, possibly `4X`, pocket pairs. Mostly worse — value is still there.
- **Sizing.** Same threshold logic. Bet ~7bb (~58% pot).
- **Action.** Bet 7bb. BB calls.

### River

Pot 26bb. River: **2♥**. Final board: A♣ 8♦ 4♠ 8♣ 2♥. No flush, no straight.

- **Calling range.** Stations who reach the river have weak `AX`, pocket pairs that hero-called, occasional `8X` they didn't raise.
- **By-worse check.** Most of villain's range is `AX-with-worse-kicker` and pocket pairs `<AA`. Rare `A8`/`88` hands beat us, but they're <10% of villain's range.
- **Sizing.** Strong value vs a station. Don't slow-play; bet ~75% pot for full extraction. ~19bb.
- **Action.** Bet 19bb. BB calls with `A♦ 5♦`. We win.

That hand applied: preflop ranges (Part 5), opponent typing (Part 9), SPR (Part 2), texture (Part 6), Rule of 2/equity intuition (Part 1), by-worse (Part 8), and the value sizing hierarchy. The whole curriculum compressed into one ~15-second decision per street.

## What "table speed" looks like

The cascade is fast once you've internalised the pieces. A hand at table speed sounds like:

> "CO with `AQs`. Standard open. Station calls. Flop A-high dry — range advantage, c-bet 50% (sized up vs station). Turn pairs the 8 — still value, bet again. River blanks — no draws hit, value bet 75% for max extraction."

Every step is a one-line lookup. The first time through a hand, it takes minutes; after enough reps, it takes seconds.

## A checklist you can paste into a notebook

1. **Position?** IP / OOP. (Part 7)
2. **My range, their range?** Open or 3-bet. (Part 5)
3. **SPR after the flop?** (Part 2.4)
4. **Board texture?** Range / nut advantage. (Part 6)
5. **Outs?** Equity via Rule of 2 & 4. (Part 1)
6. **Pot odds met?** Pot odds + implied odds. (Parts 2 & 3)
7. **Bet for value?** By-worse criterion. (Part 8)
8. **Bluff?** Compare opponent fold rate to α. (Parts 2 & 9)

> **The unifying rule.** Every poker decision is a small EV calculation. The frameworks above just give you faster ways to compute it.
