## Why position is currency

You may have heard that **position** is the most valuable thing in No-Limit Hold'em. The mathematical reason hides under one number: **equity realisation**.

## 1. What is equity realisation?

**Equity realisation (EQR)** measures what fraction of your raw equity you actually convert into chips, accounting for your ability to control the pot and see cheap showdowns.

Even if your hand has 50% raw equity, you will not win exactly 50% of the pot in expectation — because someone has to act first, and acting first under uncertainty costs you.

Solver analyses consistently show:

$$
\text{EQR}_{\text{IP}} \approx 105\text{–}120\% \qquad \text{EQR}_{\text{OOP}} \approx 80\text{–}95\%
$$

That is: the same hand earns ~10–25% **more** in chips IP than OOP, because:

- IP gets **information** — they see villain act first and respond optimally.
- IP can **take free cards** with marginal hands by checking back.
- OOP must commit chips before knowing what villain wants to do.

## 2. Practical implications

### IP — apply pressure

- **C-bet wider** — you can size small with confidence because villain showed weakness by checking.
- **Float more** — call flop bets with backdoors, pick up turn cards in position.
- **Bluff rivers more frequently** — your range is harder for villain to attack.

### OOP — control the pot

- **Check more, especially on dynamic textures** — checking lets you check-raise or check-fold cheaply.
- **Use smaller sizings to keep the pot manageable** — a small bet costs less when villain has the closing action.
- **Rely on the check-raise as your primary aggression vehicle** — it punishes IP's cbet frequency directly.

### A 35% equity hand

A hand with 35% equity IP is often more profitable than the same hand with 35% equity OOP. The EQR multiplier converts that raw equity into:

- **IP**: ~38–42% effective win share.
- **OOP**: ~28–33% effective win share.

That gap is large enough to flip many call/fold decisions OOP that are clear calls IP.

## 3. Why position should be the first input

When in doubt about a marginal preflop call:

1. **Am I IP or OOP postflop?** If OOP, tighten significantly.
2. **What is my SPR going to be?** Lower SPR helps OOP slightly (less postflop manoeuvring).
3. **What is villain's tendency to apply pressure?** Aggressive IP villains turn marginal flats into folds.

## 4. The OOP playbook

When you are OOP, your aggression has to be **purposeful** — you can't fall back on positional information advantage. The check-raise is the canonical OOP weapon because it:

- Charges villain's wide cbet range immediately.
- Forces a decision before they realise their equity.
- Allows you to control the pot size when called (you can check the next street).

A clean OOP construction:

- ~60–70% of your range checks the flop.
- ~10–15% of those checks are check-raises (mix of value and bluff).
- The rest are check-calls (bluff-catchers and high-equity draws).

## 5. Worked example — `JTs` IP vs OOP

`JTs` has roughly 36% equity vs a typical button cold-calling range. What is your effective EV?

- **From the BTN, IP**: EQR ≈ 115%, effective equity ≈ 41%. `JTs` is a profitable call against many opens.
- **From the SB, OOP**: EQR ≈ 88%, effective equity ≈ 32%. The same hand becomes marginal-to-bad in many spots, especially against strong opens.

That is why solver charts have you **3-bet `JTs` from the SB** instead of flat-calling: it lets you avoid playing OOP postflop with reduced realisation.

> **Heuristic.** Whenever a play "feels" close, ask whether you'll be IP or OOP after the flop. If OOP, lean fold. If IP, lean call.
