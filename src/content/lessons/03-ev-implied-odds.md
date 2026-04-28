## Why one-shot pot odds isn't enough

Pot odds and α tell you about *single decisions* against a single bet. To handle multi-street decisions and hands with future potential, you need **expected value** and **implied odds**.

## 1. Expected value (EV)

**Expected value (EV)** is the average monetary outcome of a decision, weighted by the probability of each outcome. The fundamental rule of poker:

> Make every decision whose EV is positive.

For a decision with outcomes $o_1, o_2, \ldots, o_k$ occurring with probabilities $p_1, \ldots, p_k$ and monetary payoffs $v_1, \ldots, v_k$:

$$
\text{EV} = \sum_{i=1}^{k} p_i \cdot v_i
$$

### EV of a river bluff (zero showdown equity)

When you bluff and have no equity if called, only two outcomes matter:

$$
\text{EV}_{\text{bluff}} = p_{\text{fold}} \cdot P - p_{\text{call}} \cdot B
$$

Setting $\text{EV} = 0$ and solving confirms $p_{\text{fold}} = \alpha = B / (P + B)$ — exactly where the α formula in Part 2 came from. EV is the parent formula; α is what falls out when equity is zero.

### EV of a semi-bluff

A **semi-bluff** is a bluff that *also* has equity if called. The EV is richer:

$$
\text{EV}_{\text{semi-bluff}} = p_{\text{fold}} \cdot P + p_{\text{call}} \cdot \bigl[\text{eq} \cdot (P + B) - (1 - \text{eq}) \cdot B\bigr]
$$

where $\text{eq}$ is your equity when called. Let's parse the second term:

- When villain calls (probability $p_{\text{call}}$), you go to showdown.
- With probability $\text{eq}$ you win the new pot $P + B$.
- With probability $1 - \text{eq}$ you lose your bet $B$.

> **Why semi-bluffs print money.** They are positive on two independent axes — fold equity and showdown equity — that compound. Betting a flush draw on the flop is much stronger than betting air on the river: you collect fold equity *and* have ~36% equity when called.

### Worked example — semi-bluff EV

You hold a flush draw on the flop. Pot is 10bb, you bet 7bb. Villain folds 35% of the time; when they call, you have ~35% equity. EV?

Fold leg: $0.35 \cdot 10 = 3.5$.

Call leg: $0.65 \cdot \bigl[0.35 \cdot 17 - 0.65 \cdot 7\bigr] = 0.65 \cdot [5.95 - 4.55] = 0.65 \cdot 1.4 = 0.91$.

$$
\text{EV} = 3.5 + 0.91 \approx +4.4 \text{bb}
$$

Strongly +EV even though α (≈ 41%) was *not* reached. The 35% equity-when-called turns a marginal pure-bluff into a confident bet.

## 2. Implied odds

**Implied odds** extend pot odds by accounting for money you expect to win on *future streets* when you hit your draw. The adjusted required equity to call becomes:

$$
\text{Required equity} = \frac{C}{P + C + X}
$$

where $X$ is the expected additional amount you will win on later streets when your draw completes. Solving for the break-even $X$ given your actual equity $\text{eq}$:

$$
X = \frac{C - \text{eq} \cdot (P + C)}{\text{eq}}
$$

### Worked example — implied odds for a flush draw on the turn

Turn: pot 50bb, opponent bets 50bb. You hold a nut flush draw — 9 outs, ~18% equity by the Rule of 2 ($9 \times 2$). Naked pot odds require:

$$
\frac{50}{50 + 50} = 33.3\%
$$

Your 18% equity falls short — you cannot call on pot odds alone. The break-even implied odds are:

$$
X = \frac{50 - 0.18 \times 100}{0.18} = \frac{32}{0.18} \approx 178\text{bb}
$$

You need to win ~178bb on the river *on average* when you hit. With 100bb effective stacks that is impossible (no money left), making this a fold. With 250bb+ effective stacks against a calling opponent it may be achievable.

## 3. Reverse implied odds

**Reverse implied odds** are the mirror image of implied odds: if you hold a *non-nut* draw (say a low flush draw, or a low straight when there's a higher straight possible), you risk paying off a better hand on exactly the streets where you think you are winning.

When chasing a dominated draw, **discount your implied odds heavily** — sometimes to zero or negative. The intuition:

- You hit your draw → you bet → villain raises → you've lost a bigger pot.
- You miss → you fold → tiny loss.

The asymmetry can flip a marginal-but-profitable call into a clear fold.

### When does this matter most?

- **Low flush draws** vs. tight ranges that include the nut flush draw.
- **Low end of a straight** when villain may hold the high end.
- **Dominated kickers** — calling AT vs a UTG raise on an A-high board.

## 4. Putting EV first

EV is the parent quantity poker reduces to. Pot odds, α, MDF, and implied odds are all derived from EV under different assumptions. When two formulas disagree, go back to the EV expression and recompute from there. That habit alone separates winning from losing players.

> **Mental checklist for any non-trivial spot.** What outcomes are possible? With what probability? What is the payoff in each outcome? Sum and decide.
