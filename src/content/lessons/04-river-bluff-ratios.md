## On the river, every bet is value or bluff

By the river, no more cards are coming. Every hand in your betting range is unambiguously one of two things:

- A **value hand** — beats most of villain's calling range.
- A **bluff** — loses at showdown unless villain folds.

The GTO-optimal ratio of bluffs to value hands in your betting range is set by the **indifference condition**: the ratio must make your opponent indifferent between calling and folding. In other words, a call breaks even against your range — neither profitable nor losing.

If you under-bluff, villain over-folds; you can't punish them. If you over-bluff, villain over-calls; you bleed chips.

## 1. Deriving the optimal bluff frequency

Let $V$ be the number of value combos and $B_c$ the number of bluff combos in your betting range. When the opponent calls $C = B$ to win the final pot $P + B$:

- Against your value hands (probability $V/(V + B_c)$), the caller loses $B$.
- Against your bluffs (probability $B_c/(V + B_c)$), the caller wins $P + B$.

Setting the expected value of calling to zero:

$$
\frac{B_c}{V + B_c} \cdot (P + B) - \frac{V}{V + B_c} \cdot B = 0
$$

Multiplying through by $V + B_c$:

$$
B_c (P + B) = V B
$$

Solving for the bluff fraction $b = B_c / (V + B_c)$:

$$
b = \frac{B}{P + 2B}
$$

Equivalently, expressed as a ratio of combos:

$$
\text{Bluffs} : \text{Value} = B : (P + B)
$$

| Bet size | Bluff : Value | Bluff % of bets |
|---|---|---|
| 1/2 pot | 1 : 3 | 25.0% |
| 2/3 pot | 2 : 5 | 28.6% |
| 1× pot | 1 : 2 | 33.3% |
| 2× pot | 2 : 3 | 40.0% |

> **Mental shortcut.** Larger bets get more bluffs. The intuition: bigger bets give villain better pot odds, so you must threaten more often to keep them indifferent.

## 2. Connecting it back to MDF

If your bluff frequency satisfies the indifference condition, then villain's MDF call frequency makes them break even. This is the symmetric equilibrium: **you bluff at exactly the rate that justifies their MDF defence**, and they defend at exactly the rate that punishes deviation from your bluff frequency.

When either player drops below their threshold, the other wins money — that is what *exploitative* means.

## 3. Three caveats

### Caveat 1 — these ratios apply strictly to the river

On earlier streets, your "bluffs" are usually semi-bluffs with live equity, so you can bluff more frequently. A rough heuristic from solver outputs:

- ~1/3 of your betting range is value on the **flop**.
- ~1/2 on the **turn**.
- ~2/3 on the **river**.

The river ratios are the only ones where the indifference algebra holds exactly. Earlier streets are governed by a multi-street EV calculation that has many more moving parts.

### Caveat 2 — rake shifts the ratio toward more value

Because rake is taken from the pot, pure bluffs carry an additional hidden cost: the pot you fold villain off of has been raked, so the equity of "winning the pot" is slightly less than the nominal $P$. Accounting for this, you should bluff *slightly less* than the formula prescribes.

### Caveat 3 — at low stakes, opponents call too often

This is the dominant adjustment. Against a calling station, the correct bluff frequency is **near zero**: their fold rate is so low that no bluff can clear α, much less the indifference threshold.

> **Practical rule.** Use the GTO ratio as your *upper bound* for bluffing. If villain is expected to under-fold, drop bluffs below this — sometimes all the way to zero.

## 4. Worked example — building a river betting range

Pot 30bb, you decide to bet 30bb (pot-sized). The GTO bluff fraction is:

$$
b = \frac{30}{30 + 2 \cdot 30} = \frac{30}{90} = 33.3\%
$$

If you have 6 value combos in this range, you should select bluffs such that:

$$
B_c = b \cdot (V + B_c) \quad \Rightarrow \quad B_c = \frac{b}{1 - b} \cdot V = \frac{1/3}{2/3} \cdot 6 = 3
$$

So 3 bluff combos for 6 value combos — a 1 : 2 ratio. Pick the bluffs that **block** villain's calling range (e.g. hands containing the ace of the suit on a flush board, removing nut-flush combos from villain) and **unblock** villain's folding range.

> **Block / unblock heuristic.** Your best bluff candidates remove villain's strong continues from the deck. Your worst bluff candidates contain cards villain needs to call.
