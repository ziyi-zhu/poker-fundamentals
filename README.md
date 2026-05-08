# The Poker Primer — A technical curriculum

A math-first learning website for microstakes No-Limit Hold&apos;em, built from a study guide on the four core betting formulas, GTO ranges, and exploitative play.

The site presents an 11-part curriculum (introduction + ten parts) with detailed notes, worked examples, and interactive quizzes after every section. It is structured similarly to LeetCode/Coursera/Khan Academy courses: each lesson is a self-contained reading, followed by a check-your-understanding section.

## Stack

- **Next.js 16** (App Router) with **TypeScript**
- **Tailwind CSS v4** + `@tailwindcss/typography`
- **Markdown** (`.md`) content rendered server-side via `unified` / `remark` / `rehype`
- **KaTeX** for inline and block math
- **GFM tables** for rate / sizing tables
- **Quizzes** authored as JSON validated with `zod`

## Project layout

```
src/
├─ app/
│  ├─ page.tsx                    # Home / hero / curriculum overview
│  ├─ learn/
│  │  ├─ page.tsx                 # Curriculum index
│  │  └─ [slug]/page.tsx          # Lesson page (notes + quiz + nav)
│  ├─ calculator/page.tsx         # Pot-odds / α / MDF / Rule of 2 & 4 calculator
│  └─ glossary/page.tsx           # Curriculum-wide glossary
├─ components/
│  ├─ SiteHeader.tsx              # Sticky header with theme toggle
│  ├─ SiteFooter.tsx
│  ├─ LessonNav.tsx               # Sidebar curriculum nav (mobile + desktop)
│  ├─ Markdown.tsx                # Renders pre-built HTML inside prose container
│  ├─ Quiz.tsx                    # Interactive quiz with choice/multi/numeric/T-F
│  ├─ InlineMath.tsx              # Tiny inline-only KaTeX wrapper for quizzes
│  ├─ Calculator.tsx              # /calculator page widgets
│  ├─ ThemeToggle.tsx             # System/light/dark theme picker
│  └─ Logo.tsx
├─ content/
│  ├─ lessons/                    # 11 markdown files (00-introduction → 10-decision-stack)
│  └─ quizzes/                    # 11 JSON quiz banks matching lesson slugs
└─ lib/
   ├─ lessons.ts                  # Lesson manifest with slugs, titles, outcomes
   ├─ markdown.ts                 # Server-side markdown → HTML pipeline
   ├─ quiz.ts                     # Quiz JSON loader + zod schema
   └─ cn.ts                       # tailwind-merge / clsx helper
```

## Adding or editing a lesson

1. Add a markdown file to `src/content/lessons/<order>-<slug>.md`. Inside, use standard Markdown plus `$...$` and `$$...$$` for math. Tables, fenced code, and links are supported.
2. Add a quiz at `src/content/quizzes/<order>-<slug>.json`. Each question is `choice`, `multi`, `numeric`, or `truefalse` — see `src/lib/quiz.ts` for the schema.
3. Add an entry to `LESSONS` in `src/lib/lessons.ts` with metadata (title, summary, level, tags, etc).

## Development

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build, statically generates all 11 lessons
npm run lint
```

## Curriculum

| # | Title | Topics |
|---|---|---|
| 0 | Introduction: GTO vs. Exploitative Play | GTO, exploit, notation |
| 1 | Counting Outs and Estimating Equity | Rule of 2 & 4, dirty outs |
| 2 | The Four Core Betting Formulas | Pot odds, α, MDF, SPR |
| 3 | EV, Implied Odds, and Semi-Bluffs | EV, implied odds, semi-bluff |
| 4 | River Bluff-to-Value Ratios | Indifference, GTO bluff fraction |
| 5 | GTO Preflop Opening Ranges at 100bb | RFI charts, 3-bet sizing |
| 6 | Continuation Betting by Board Texture | Range/nut advantage, c-bet matrix |
| 7 | Position and Equity Realisation | EQR, IP/OOP playbook |
| 8 | Value Betting | By-worse criterion, geometric sizing |
| 9 | The Low-Stakes Exploit Playbook | Player typing, HUD reads, rake |
| 10 | The Decision Stack | End-to-end real-time cascade |

The whole curriculum is editorial — no real-money advice and no live-play tools.
