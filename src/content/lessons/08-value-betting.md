## What makes a bet a value bet?

A bet is for **value** if and only if you expect the opponent to call more often with a *worse* hand than with a *better* hand. Formally, the value bet is +EV relative to checking when:

$$
p(\text{worse calls}) \cdot B \;>\; p(\text{better calls}) \cdot B + p(\text{raise}) \cdot \text{loss on raise}
$$

Simplified for typical river spots: **bet for value when the hands that call you are more often worse than better.** If the only hands that call are better, you are "value-owning" yourself and should check.

This is the **by-worse criterion**, and it's the test you must run silently before every bet.

## 1. The by-worse criterion in practice

Imagine the river. You hold a hand. You consider betting. Walk through villain's range and bucket each hand:

- **Worse calls** — pay you off when you bet, lose at showdown.
- **Better calls** — pay you, but you lose the showdown.
- **Better raises** — you fold, you lose the bet.
- **Worse folds** — neutral; you don't extract.
- **Worse raises** (rare bluffs) — neutral or +EV if you call.

Bet when the size of the "worse calls" bucket dominates the others.

> **Common leak.** Players bet thin pairs into ranges where every calling hand is better. The fact that *some* worse hands exist in villain's range doesn't help if they aren't the ones that call.

## 2. Sizing hierarchy

The correct value bet size depends on how strong your hand is relative to villain's likely calling range:

| Hand strength | Sizing | Rationale |
|---|---|---|
| Thin value (2nd pair, weak top pair, weak overpair) | 25–40% pot | Keep the wide weak range in; minimise loss to raises from better hands |
| Standard value (TPTK, strong overpair, dry board) | 50–70% pot | Charge draws; keep medium pairs in |
| Strong value (set, two pair, straight/flush on wet board) | 75–100% pot | Maximise against medium-strength calling hands |
| Nut advantage, river, deep-stacked | 100–200% pot (overbet) | Only correct when you structurally hold more nutted hands than your opponent |

The sizing should always answer the question: *which calling range am I targeting?*

- Thin value targets the *whole* weak range — bet small to keep them all in.
- Strong value targets the *medium-strength* portion — bet large enough to fold out only the worst combos that wouldn't call anyway.
- Overbets target *bluff-catchers* in villain's range — viable only when you have the nut advantage.

## 3. Geometric sizing for three streets

When planning to value-bet three streets (flop, turn, river) and get all-in, the bet sizes that build the pot most efficiently in equal proportions satisfy:

$$
\frac{B}{P} = \frac{(1 + 2\,\text{SPR})^{1/n} - 1}{2}
$$

where $n$ is the number of streets remaining and SPR is computed at the start of the flop. This comes from the fact that each bet-and-call multiplies the pot by $(1 + 2B/P)$, and after $n$ streets the final pot must equal $P_0 \cdot (1 + 2\,\text{SPR})$ for stacks to be all-in.

### Two cases worth memorising

- **3-bet pot, 100bb effective.** SPR ≈ 5, so $B/P = (11^{1/3} - 1)/2 \approx 0.61$. **Roughly 60% pot per street** gets you all-in by the river.
- **Single-raised pot, 100bb effective.** SPR ≈ 17, so $B/P = (35^{1/3} - 1)/2 \approx 1.13$. You need **overbets of ~115% pot per street** to get all-in over three streets, which is rarely optimal in practice.

### Worked example in a 3-bet pot

100bb effective, flop pot 18.5bb, ~91bb behind each. Target 60% pot per street.

$$
\text{Flop: } 18.5 \times 0.6 = 11.1\text{bb} \;\Rightarrow\; \text{new pot } 40.7\text{bb, stacks } \approx 80\text{bb}
$$

$$
\text{Turn: } 40.7 \times 0.6 = 24.4\text{bb} \;\Rightarrow\; \text{new pot } 89.5\text{bb, stacks } \approx 56\text{bb}
$$

$$
\text{River: } 89.5 \times 0.6 = 53.7\text{bb} \;\Rightarrow\; \text{stacks committed}
$$

The arithmetic works — you commit stacks exactly as the river bet hits.

In an SRP at 100bb, the same 60% sizing leaves substantial money behind — you would still have ~71bb behind after the river bet. To genuinely get all-in from an SRP you must either bet larger per street, jam the river as an overbet, or accept that the hand will not stack off in three streets.

## 4. Constructing the betting line

Once you have the sizing, you also need to construct the line:

1. **Plan from the flop.** With a strong made hand and a stack-off plan, choose the per-street size that lands you all-in by the river.
2. **Adjust to texture changes.** When the turn brings a scare card, you may need to reconsider — some draws now hit, some don't. The geometric formula gives you a default; the texture tells you when to deviate.
3. **Use overbets on the river only when you have a nut advantage.** Overbetting with one-pair hands invites raises from better and folds from worse — exactly the wrong outcome.

## 5. Worked example — TPTK on a dry board

100bb effective. CO opens 2.5bb, BB calls. Flop K♥ 8♣ 3♠. Pot 5.5bb.

You hold A♥ K♣ — TPTK. SPR ≈ 17.

- By-worse check: hands that call you on the flop are mostly KX with worse kickers, pocket pairs ≤ JJ that decide to peel, and gutshot floats. All worse than your hand. Standard value.
- Sizing: standard value at this SPR is hard to stack off in three streets without overbets. A 50–70% pot c-bet is fine; you don't need geometric maximisation here because villain's range is too wide and weak to credibly stack off.

Bet ~3bb (~55% pot) and re-evaluate the turn. If the turn is a low brick, repeat with a similar size. If it's a Q or J that adds two-pair combos to villain's range, slow down.

> **Common mistake.** Trying to bet geometrically toward an all-in with `AK` on a dry SRP — villain's range simply doesn't pay off three big bets. Match your sizing to villain's calling range, not to a textbook target.
