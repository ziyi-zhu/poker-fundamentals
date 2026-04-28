## Why equity is the atom

Every other concept in this curriculum depends on **equity** — your probability of winning the hand at showdown given your hole cards versus the range of hands your opponent could hold. Before any of the betting formulas earn their keep, you need a fast way to estimate that number at the table.

Equity for a *drawing* hand reduces cleanly to a counting problem: how many of the unseen cards are outs? For a *made* hand, equity is harder — it depends on opponent ranges — but most of the in-game work is on draws.

## 1. Unseen cards

A standard deck has 52 cards. After your two hole cards and the community cards are dealt, the remaining cards are **unseen**:

- On the **flop** (3 community cards dealt): $52 - 2 - 3 = 47$ unseen cards.
- On the **turn** (4 community cards dealt): $52 - 2 - 4 = 46$ unseen cards.

You don't account for opponent hole cards in the unseen count, because you don't know them — they are sampled at random from the same 47 (or 46) unseen cards as the next street.

## 2. Counting outs

An **out** is any unseen card that, if it appears, improves your hand to (most likely) the best hand. Identify what you are drawing to, then count outs from the structure of the deck.

| Draw | Example holding | Example board | Outs |
|---|---|---|---|
| Gutshot (inside straight) | 9♠ 8♦ | J♣ 7♥ 2♠ | 4 (only a 10 makes 7-8-9-10-J) |
| Pocket pair to set | 7♥ 7♣ | board has no 7 | 2 (the two remaining 7s) |
| Overcards | A♦ K♣ | Q♥ 8♠ 3♦ | 6 (3 aces + 3 kings; "soft" outs) |
| Open-ended straight (OESD) | 9♠ 8♦ | 7♣ 6♥ 2♠ | 8 (4 fives + 4 tens) |
| Flush draw | A♥ 7♥ | K♥ 5♥ 2♣ | 9 (the 9 remaining hearts) |
| Flush draw + gutshot | A♠ 5♠ | K♠ 4♠ 3♥ | 12 (9 spades + 3 non-spade 2s) |
| Open-ender + flush draw | J♥ T♥ | 9♥ 8♣ 2♥ | 15 (clean) |

When counting **combo draws**, never double-count a card that completes both draws. In the flush-plus-gutshot example, the 2♠ would complete *both* the flush and the wheel straight — so it counts only once (as a flush out) and the additional gutshot outs are the three non-spade twos.

### Dirty outs

Not every out that improves your hand wins the pot. A **dirty out** completes your draw but simultaneously improves your opponent to a better hand:

- You hold a flush draw, but the flush card pairs the board and your opponent likely has a full house.
- You have an OESD, but the completing card also puts a fourth card to a flush on the board, and your opponent has been betting strongly.

There is no formula for this — it is a judgment call. **Count dirty outs at half value, or omit them entirely** if the improvement clearly loses.

## 3. The Rule of 2 and 4

Rather than computing exact probabilities at the table, use the **Rule of 2 & 4** as a fast mental approximation:

$$
\text{Equity (one card to come)} \approx 2n\%
$$

$$
\text{Equity (two cards to come)} \approx 4n\%
$$

The exact one-card-to-come equity (47 unseen cards on the flop, before the turn) is:

$$
\text{Equity}_{\text{exact}} = \frac{n}{47} \approx 2.13\,n\%
$$

The exact two-card-to-come equity is:

$$
\text{Equity}_{\text{exact}} = 1 - \frac{47 - n}{47} \cdot \frac{46 - n}{46}
$$

The Rule of 4 systematically over-estimates when $n > 8$ because it implicitly double-counts cards that could appear on either the turn *or* the river. **Phil Gordon's refinement** corrects this:

$$
\text{Equity}_{\text{refined}} \approx (3n + 8)\% \quad \text{for } n > 8
$$

Comparison against exact values:

| Draw | Outs | Rule of 4 | Refined ($3n+8$) | Exact |
|---|---|---|---|---|
| Gutshot | 4 | 16% | — | 16.5% |
| OESD | 8 | 32% | 32% | 31.5% |
| Flush draw | 9 | 36% | 35% | 35.0% |
| FD + gutshot | 12 | 48% | 44% | 45.0% |
| OESD + FD | 15 | 60% | 53% | 54.1% |

### Two important caveats

1. **The Rule of 4 only applies when you pay a single price to see both cards** — for example, when you are all-in on the flop. If there is more betting on the turn, you must apply the Rule of 2 independently on each street, because you will face an additional decision.
2. **Discount dirty outs** before applying either rule.

## 4. Worked examples

### Example A — flush draw on the flop, two cards to come

You hold J♥ 9♥ on K♥ 4♥ 2♣. Flush draw, $n = 9$ outs.

$$
\text{Equity} \approx 4 \times 9 = 36\%
$$

Exact: $1 - (38/47)(37/46) \approx 35.0\%$. Close enough for a real-time decision.

### Example B — OESD on the turn, one card to come

You hold 9♣ 8♦ on 7♥ 6♠ 2♣ Q♦ (Q♦ is the turn card). Open-ender, $n = 8$ outs.

$$
\text{Equity} \approx 2 \times 8 = 16\%
$$

Exact: $8/46 \approx 17.4\%$. The Rule of 2 slightly under-estimates here.

### Example C — combo draw on the flop, two cards to come

You hold A♠ 5♠ on K♠ 4♠ 3♥. You have a nut flush draw (9 spade outs) plus a wheel gutshot (any 2 makes A2345). The 2♠ already counts among the flush outs, so the additional gutshot outs are the 2♥, 2♦, and 2♣ — three extra outs. Total: $n = 12$.

Using the refined formula:

$$
\text{Equity} \approx 3 \times 12 + 8 = 44\%
$$

Exact: ~45%. Near coin-flip equity even when behind — this is a strong semi-bluff.

### Example D — made hand, no draw

You hold K♦ Q♥ on K♥ 8♣ 3♠. You have top pair, top kicker (TPTK). There are no outs to count — instead, you need to estimate whether your opponent's range beats you. The Rule of 2 & 4 does not apply directly. As a rough heuristic, TPTK on a dry board has roughly **70–80% equity** against a typical continuation-calling range.

For precision, look up the matchup in [Equilab](https://www.pokerstrategy.com/poker-software-tools/equilab-holdem/) or GTO Wizard.

> **Mental model.** When unsure, count outs, double them per remaining street, and trust the result for any draw with $n \le 8$. Above that, fall back to $3n + 8$ to avoid over-betting weak combo draws.
