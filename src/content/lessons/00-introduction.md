## Why this curriculum exists

Most poker advice is anecdotal: it tells you *what* to do without ever showing you *why*. This curriculum does the opposite. We build No-Limit Hold'em from a small set of probability and game-theory primitives, and we keep adding to that scaffolding until you can make every postflop decision by composing them.

If you can answer "what equity do I need to call?", "how often must my opponent fold for this bluff to break even?", and "how committed is my hand at this stack-to-pot ratio?" — you've already cleared the bar that separates winning microstakes regs from break-even players.

## Game Theory Optimal vs. exploitative play

**Game Theory Optimal (GTO)** is a mixed strategy that is *unexploitable in theory*. If you play GTO, no opponent can win money against you in expectation, regardless of what they do. It is the **Nash equilibrium** of the game.

That sounds like the holy grail. It isn't, for two reasons:

1. **GTO is defensive.** It guarantees you can't be exploited; it does not guarantee you make the most money. Against a suboptimal opponent, GTO leaves money on the table.
2. **GTO is intractable.** Solvers approximate it, but no human plays exactly GTO at the table — and against typical microstakes opponents, even an approximation costs more than it earns.

**Exploitative play** is the deliberate deviation from GTO that targets a known leak. At low stakes, the population overwhelmingly:

- Over-calls (calls too often, especially on the river).
- Under-bluffs (bluffs less than GTO prescribes).
- Plays passively postflop (checks where they should be betting).

The right strategy is therefore not to imitate GTO, but to use it as a **baseline** and then deviate deliberately:

- Add more value bets (they over-call, so worse hands keep paying).
- Remove bluffs (they don't fold enough, so bluffs are a leak).
- Fold more vs. passive aggression (their bets are real).

> **Rule of thumb.** Study GTO to know the equilibrium. Play exploitatively to make money. The rest of this curriculum gives you the tools to do both.

## Notation we will use

Every lesson uses the same compact notation. Memorise it now.

| Symbol | Meaning |
|---|---|
| $P$ | Pot size *before* the current bet is made |
| $B$ | The bet size |
| $C$ | The amount you must call (usually $C = B$) |
| $n$ | Number of outs (cards that improve your hand) |
| `bb` | Big blind, the standard chip unit |
| IP / OOP | In position / out of position |

For hands, we use the standard shorthand:

- `AKs` — Ace-King suited.
- `AKo` — Ace-King offsuit.
- `77+` — pocket sevens and all higher pairs.
- `A2s+` — all suited aces from `A2s` through `AKs`.

## How the curriculum is organised

The ten parts cascade. Each one assumes only what came before it.

1. **Counting outs and equity** — the probabilistic atom every other formula sits on.
2. **The four core betting formulas** — pot odds, α, MDF, and SPR.
3. **Expected value, implied odds, and semi-bluffs** — multi-decision math.
4. **River bluff-to-value ratios** — the indifference principle made concrete.
5. **GTO preflop opening ranges** — what to play from each seat.
6. **Continuation betting by texture** — flop strategy as a textural lookup.
7. **Position and equity realisation** — why position is currency.
8. **Value betting** — sizing hierarchy and geometric three-street planning.
9. **The low-stakes exploit playbook** — where and how to deviate from GTO.
10. **The decision stack** — putting all of it together as a real-time cascade.

You will know you are done with each part when you can answer the quiz at the end without re-reading. Don't move on until you can — every later part depends on the math being automatic.
