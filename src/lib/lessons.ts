export type LessonMeta = {
  slug: string;
  /** Sequential index (0 = introduction). */
  order: number;
  /** Short label like "Part 1" used in cards and breadcrumbs. */
  partLabel: string;
  title: string;
  subtitle: string;
  summary: string;
  /** Five word teaser used on the index card. */
  blurb: string;
  /** Bullet list of what the learner will be able to do after the lesson. */
  outcomes: string[];
  /** Difficulty bucket used for the small chip on cards. */
  level: "Foundations" | "Core" | "Applied" | "Advanced";
  /** Approximate time to complete reading + quiz. */
  estimatedMinutes: number;
  /** Concept tags shown beneath the title on the lesson page. */
  tags: string[];
  /** Filename inside content/lessons (without extension). */
  contentFile: string;
  /** Filename inside content/quizzes (without extension). */
  quizFile: string;
};

export const LESSONS: LessonMeta[] = [
  {
    slug: "introduction",
    order: 0,
    partLabel: "Intro",
    title: "GTO vs. Exploitative Play",
    subtitle: "The two strategic frames every winning player toggles between.",
    summary:
      "Why GTO is a defensive baseline, why exploitative play wins money at low stakes, and the notation we will rely on for the rest of the curriculum.",
    blurb: "Set the strategic frame and notation.",
    outcomes: [
      "Define Game Theory Optimal play and Nash equilibrium in poker terms.",
      "Explain why exploitative play outperforms GTO at microstakes.",
      "Read standard hand notation (AKs, 77+, A2s+) fluently.",
    ],
    level: "Foundations",
    estimatedMinutes: 8,
    tags: ["GTO", "exploit", "notation"],
    contentFile: "00-introduction",
    quizFile: "00-introduction",
  },
  {
    slug: "equity-and-outs",
    order: 1,
    partLabel: "Part 1",
    title: "Counting Outs and Estimating Equity",
    subtitle: "From 47 unseen cards to a real-time percentage at the table.",
    summary:
      "Equity is the foundation every betting formula sits on. Learn how to count clean and dirty outs, how the Rule of 2 & 4 approximates the binomial maths, and when Phil Gordon's refinement matters.",
    blurb: "Count outs, apply the Rule of 2 & 4.",
    outcomes: [
      "Count outs cleanly for straight, flush, and combo draws.",
      "Apply the Rule of 2 & 4 and the (3n + 8) refinement.",
      "Discount dirty outs before quoting an equity number.",
    ],
    level: "Foundations",
    estimatedMinutes: 14,
    tags: ["equity", "outs", "Rule of 2 & 4"],
    contentFile: "01-equity-and-outs",
    quizFile: "01-equity-and-outs",
  },
  {
    slug: "betting-formulas",
    order: 2,
    partLabel: "Part 2",
    title: "The Four Core Betting Formulas",
    subtitle: "Pot odds, alpha, MDF, and SPR — the primitives behind every decision.",
    summary:
      "Almost every postflop decision reduces to four numbers derived from the pot and the bet size. Master these and the rest of NLHE is a layered application of them.",
    blurb: "Pot odds, alpha, MDF, SPR.",
    outcomes: [
      "Compute pot odds for any bet size and decide whether to call on equity.",
      "Use alpha (α) and MDF to reason about bluff and defence frequencies.",
      "Compute SPR and read commitment thresholds from it.",
    ],
    level: "Core",
    estimatedMinutes: 18,
    tags: ["pot odds", "MDF", "alpha", "SPR"],
    contentFile: "02-betting-formulas",
    quizFile: "02-betting-formulas",
  },
  {
    slug: "ev-implied-odds",
    order: 3,
    partLabel: "Part 3",
    title: "Expected Value, Implied Odds, and Semi-Bluffs",
    subtitle: "How to value multi-street decisions and hands with future potential.",
    summary:
      "EV is the master quantity poker reduces to. Implied odds tell you when a draw without immediate pot odds is still a profitable call; semi-bluffs combine fold equity with showdown equity for compounding EV.",
    blurb: "EV maths, implied odds, semi-bluffs.",
    outcomes: [
      "Write the EV of a river bluff and recover α from the formula.",
      "Use implied odds to call draws that fail naked pot odds.",
      "Recognise reverse implied odds with dominated draws.",
    ],
    level: "Core",
    estimatedMinutes: 16,
    tags: ["EV", "implied odds", "semi-bluff"],
    contentFile: "03-ev-implied-odds",
    quizFile: "03-ev-implied-odds",
  },
  {
    slug: "river-bluff-ratios",
    order: 4,
    partLabel: "Part 4",
    title: "River Bluff-to-Value Ratios",
    subtitle: "Building unexploitable river ranges from the indifference principle.",
    summary:
      "On the river, every betting range is value or bluff. The GTO ratio is set by the maths that makes your opponent's call break even. We derive it, table it by sizing, and discuss why low-stakes deviates hard.",
    blurb: "Indifference, optimal bluff frequency.",
    outcomes: [
      "Derive the GTO bluff fraction B / (P + 2B) from the indifference condition.",
      "Map bet sizing to optimal bluff:value ratios.",
      "Adjust the ratio for rake and low-stakes population tendencies.",
    ],
    level: "Core",
    estimatedMinutes: 12,
    tags: ["bluffs", "value", "river", "GTO"],
    contentFile: "04-river-bluff-ratios",
    quizFile: "04-river-bluff-ratios",
  },
  {
    slug: "preflop-ranges",
    order: 5,
    partLabel: "Part 5",
    title: "GTO Preflop Opening Ranges at 100bb",
    subtitle: "What to open from each seat, and how to 3-bet from each seat.",
    summary:
      "Position is the primary input to a preflop strategy. We catalogue solver-derived RFI and 3-bet ranges for both 6-max and full-ring, and lay out the linear vs. polarised distinction.",
    blurb: "RFI charts, 3-bet sizing.",
    outcomes: [
      "Recall canonical 6-max RFI ranges and 3-bet frequencies.",
      "Explain when to use a polarised vs. merged 3-bet construction.",
      "Adjust opening size by position and players behind.",
    ],
    level: "Applied",
    estimatedMinutes: 16,
    tags: ["preflop", "ranges", "3-bet"],
    contentFile: "05-preflop-ranges",
    quizFile: "05-preflop-ranges",
  },
  {
    slug: "cbet-textures",
    order: 6,
    partLabel: "Part 6",
    title: "Continuation Betting by Board Texture",
    subtitle: "Range vs. nut advantage drives c-bet sizing and frequency.",
    summary:
      "A continuation bet is not one decision; it is a textural lookup. We classify boards by connectivity, suitedness, and pairing, and tabulate solver baselines for both single-raised and 3-bet pots.",
    blurb: "C-bet texture matrix.",
    outcomes: [
      "Distinguish range advantage from nut advantage.",
      "Choose c-bet frequency and sizing from a textural classification.",
      "Adjust between single-raised and 3-bet pots.",
    ],
    level: "Applied",
    estimatedMinutes: 14,
    tags: ["c-bet", "boards", "textures"],
    contentFile: "06-cbet-textures",
    quizFile: "06-cbet-textures",
  },
  {
    slug: "position-eqr",
    order: 7,
    partLabel: "Part 7",
    title: "Position and Equity Realisation",
    subtitle: "Why 35% IP often beats 35% OOP.",
    summary:
      "Equity realisation captures the chip-conversion gap between in-position and out-of-position play. It is the structural reason why position is currency in NLHE.",
    blurb: "EQR, position, OOP rules.",
    outcomes: [
      "Define equity realisation and quote IP/OOP ranges.",
      "Pick sizings that protect OOP equity.",
      "Identify spots where check-raising is the best aggression vehicle.",
    ],
    level: "Applied",
    estimatedMinutes: 8,
    tags: ["position", "EQR"],
    contentFile: "07-position-eqr",
    quizFile: "07-position-eqr",
  },
  {
    slug: "value-betting",
    order: 8,
    partLabel: "Part 8",
    title: "Value Betting",
    subtitle: "Bet sizes that maximise calls from worse hands.",
    summary:
      "A value bet must extract more from worse hands than it loses to better. We build a sizing hierarchy from thin value to overbets, and derive the geometric three-street sizing formula.",
    blurb: "By-worse criterion, geometric sizing.",
    outcomes: [
      "Apply the by-worse criterion to decide between betting and checking.",
      "Choose sizing tiers from thin value to overbet.",
      "Compute the geometric per-street size that gets stacks in by the river.",
    ],
    level: "Advanced",
    estimatedMinutes: 14,
    tags: ["value", "sizing", "geometric"],
    contentFile: "08-value-betting",
    quizFile: "08-value-betting",
  },
  {
    slug: "low-stakes-exploits",
    order: 9,
    partLabel: "Part 9",
    title: "The Low-Stakes Exploit Playbook",
    subtitle: "Where to deviate from GTO and how much to deviate.",
    summary:
      "GTO is the baseline. At microstakes the biggest edges come from deliberate deviations. Player typing, HUD reads, and the rake adjustment combine into a concrete exploit playbook.",
    blurb: "Player types, HUD reads, exploits.",
    outcomes: [
      "Type opponents from VPIP/PFR/AF/3B and choose an exploit.",
      "Drop bluffs against calling stations; widen value.",
      "Account for rake in calling and stealing decisions.",
    ],
    level: "Advanced",
    estimatedMinutes: 18,
    tags: ["exploit", "HUD", "rake"],
    contentFile: "09-low-stakes-exploits",
    quizFile: "09-low-stakes-exploits",
  },
  {
    slug: "decision-stack",
    order: 10,
    partLabel: "Part 10",
    title: "The Decision Stack",
    subtitle: "Putting all ten parts together as a real-time cascade.",
    summary:
      "On every hand the frameworks compose: range → SPR → texture → outs → pot odds → river-by-worse. Internalising this cascade is what turns the math into table speed.",
    blurb: "End-to-end real-time cascade.",
    outcomes: [
      "Walk through preflop → flop → turn → river using the right framework at each step.",
      "Pick the right tool for the decision at hand.",
      "Plan stack-off lines from the flop onward.",
    ],
    level: "Advanced",
    estimatedMinutes: 10,
    tags: ["workflow", "synthesis"],
    contentFile: "10-decision-stack",
    quizFile: "10-decision-stack",
  },
];

export function getLessonBySlug(slug: string): LessonMeta | undefined {
  return LESSONS.find((l) => l.slug === slug);
}

export function getAdjacentLessons(slug: string) {
  const idx = LESSONS.findIndex((l) => l.slug === slug);
  if (idx === -1) return { previous: undefined, next: undefined };
  return {
    previous: idx > 0 ? LESSONS[idx - 1] : undefined,
    next: idx < LESSONS.length - 1 ? LESSONS[idx + 1] : undefined,
  };
}
