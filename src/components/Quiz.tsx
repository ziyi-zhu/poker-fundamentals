"use client";

import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/cn";
import type {
  ChoiceQuestion,
  MultiSelectQuestion,
  NumericQuestion,
  Quiz as QuizType,
  QuizQuestion,
} from "@/lib/quiz";
import { InlineMath } from "@/components/InlineMath";

type QuestionState = { status: "unanswered" } | { status: "answered"; correct: boolean };

type Answer =
  | { type: "choice"; value: string }
  | { type: "multi"; value: string[] }
  | { type: "numeric"; value: number | null }
  | { type: "truefalse"; value: boolean | null };

const STORAGE_PREFIX = "pf:quiz:";
// Bump when the persisted shape changes in a backwards-incompatible way.
const STORAGE_VERSION = 1;

type PersistedQuiz = {
  v: number;
  ids: string[];
  answers: Answer[];
  states: QuestionState[];
};

function emptyAnswer(question: QuizQuestion): Answer {
  switch (question.type) {
    case "choice":
      return { type: "choice", value: "" };
    case "multi":
      return { type: "multi", value: [] };
    case "numeric":
      return { type: "numeric", value: null };
    case "truefalse":
      return { type: "truefalse", value: null };
  }
}

function isAnswerComplete(answer: Answer): boolean {
  switch (answer.type) {
    case "choice":
      return answer.value !== "";
    case "multi":
      return answer.value.length > 0;
    case "numeric":
      return answer.value !== null && !Number.isNaN(answer.value);
    case "truefalse":
      return answer.value !== null;
  }
}

function isCorrect(question: QuizQuestion, answer: Answer): boolean {
  switch (question.type) {
    case "choice":
      return answer.type === "choice" && answer.value === question.answer;
    case "multi": {
      if (answer.type !== "multi") return false;
      const expected = new Set(question.answer);
      const got = new Set(answer.value);
      if (expected.size !== got.size) return false;
      for (const v of expected) if (!got.has(v)) return false;
      return true;
    }
    case "numeric": {
      if (answer.type !== "numeric" || answer.value === null) return false;
      return Math.abs(answer.value - question.answer) <= question.tolerance;
    }
    case "truefalse":
      return answer.type === "truefalse" && answer.value === question.answer;
  }
}

export function Quiz({ quiz, slug }: { quiz: QuizType; slug: string }) {
  const [answers, setAnswers] = useState<Answer[]>(() => quiz.questions.map(emptyAnswer));
  const [states, setStates] = useState<QuestionState[]>(() =>
    quiz.questions.map(() => ({ status: "unanswered" })),
  );
  // Effects below need a stable reference to the question id list to detect
  // when a stored payload no longer matches the current quiz shape.
  const questionIds = useMemo(() => quiz.questions.map((q) => q.id), [quiz.questions]);
  const storageKey = `${STORAGE_PREFIX}${slug}`;
  // `hydrated` MUST be state, not a ref. If it were a ref, the persist effect
  // would fire on the same commit as the hydrate effect with the *old* empty
  // answers/states closure and overwrite the saved payload before the loaded
  // state had a chance to render. Promoting it to state defers the persist
  // effect until React has committed the loaded values together with
  // `hydrated = true`.
  const [hydrated, setHydrated] = useState(false);

  // Reset hydration when the storage key changes so a remounted component
  // (e.g. fast client-side navigation between lessons) re-reads the new key
  // before persisting anything.
  //
  // The setState-in-effect calls below are an intentional, React-docs-endorsed
  // pattern for hydrating client-only state (localStorage) after SSR. The
  // canonical alternative (`useSyncExternalStore`) requires a stable subscribe
  // mechanism and is significantly more boilerplate for one-shot per-instance
  // reads — see ThemeToggle.tsx for the cross-cutting use case where it does
  // pay off.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHydrated(false);
  }, [storageKey]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw) as PersistedQuiz;
        if (
          parsed?.v === STORAGE_VERSION &&
          Array.isArray(parsed.ids) &&
          parsed.ids.length === questionIds.length &&
          parsed.ids.every((id, i) => id === questionIds[i]) &&
          Array.isArray(parsed.answers) &&
          parsed.answers.length === questionIds.length &&
          Array.isArray(parsed.states) &&
          parsed.states.length === questionIds.length
        ) {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setAnswers(parsed.answers);
          setStates(parsed.states);
        } else {
          // Stale or malformed payload (quiz changed shape, etc.) — drop it.
          window.localStorage.removeItem(storageKey);
          setAnswers(quiz.questions.map(emptyAnswer));
          setStates(quiz.questions.map(() => ({ status: "unanswered" })));
        }
      } else {
        // No saved payload for this lesson — start fresh, even if we were
        // previously displaying state for another lesson.
        setAnswers(quiz.questions.map(emptyAnswer));
        setStates(quiz.questions.map(() => ({ status: "unanswered" })));
      }
    } catch {
      // Ignore storage errors (quota, disabled storage, etc.).
    }
    setHydrated(true);
  }, [storageKey, questionIds, quiz.questions]);

  useEffect(() => {
    if (!hydrated || typeof window === "undefined") return;
    try {
      const payload: PersistedQuiz = {
        v: STORAGE_VERSION,
        ids: questionIds,
        answers,
        states,
      };
      window.localStorage.setItem(storageKey, JSON.stringify(payload));
    } catch {
      // Ignore storage errors.
    }
  }, [answers, states, storageKey, questionIds, hydrated]);

  const score = useMemo(
    () => states.reduce((acc, s) => (s.status === "answered" && s.correct ? acc + 1 : acc), 0),
    [states],
  );
  const answeredCount = useMemo(
    () => states.reduce((acc, s) => (s.status === "answered" ? acc + 1 : acc), 0),
    [states],
  );

  function setAnswer(idx: number, value: Answer) {
    setAnswers((prev) => prev.map((a, i) => (i === idx ? value : a)));
    setStates((prev) => prev.map((s, i) => (i === idx ? { status: "unanswered" } : s)));
  }

  function check(idx: number) {
    const correct = isCorrect(quiz.questions[idx], answers[idx]);
    setStates((prev) => prev.map((s, i) => (i === idx ? { status: "answered", correct } : s)));
  }

  function reset(idx: number) {
    setAnswers((prev) => prev.map((a, i) => (i === idx ? emptyAnswer(quiz.questions[i]) : a)));
    setStates((prev) => prev.map((s, i) => (i === idx ? { status: "unanswered" } : s)));
  }

  function resetAll() {
    setAnswers(quiz.questions.map(emptyAnswer));
    setStates(quiz.questions.map(() => ({ status: "unanswered" })));
    if (typeof window !== "undefined") {
      try {
        window.localStorage.removeItem(storageKey);
      } catch {
        // Ignore storage errors.
      }
    }
  }

  return (
    <section
      id="quiz"
      className="mt-12 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-6 lg:p-8"
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-[var(--color-border)] pb-5 sm:gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
            Check your understanding
          </p>
          <h2 className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl">{quiz.title}</h2>
          {quiz.description ? (
            <p className="mt-1.5 max-w-xl text-sm text-[var(--color-muted)]">{quiz.description}</p>
          ) : null}
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-wide text-[var(--color-muted)] sm:text-xs">
              Score
            </div>
            <div className="font-mono text-sm font-semibold sm:text-base">
              {score} / {quiz.questions.length}
              <span className="ml-2 hidden text-xs text-[var(--color-muted)] sm:inline">
                ({answeredCount} answered)
              </span>
            </div>
          </div>
          <button
            onClick={resetAll}
            className="rounded-full border border-[var(--color-border)] px-3 py-1.5 text-xs font-medium text-[var(--color-muted)] transition-colors hover:bg-[var(--color-surface-2)] hover:text-[var(--color-foreground)]"
          >
            Reset
          </button>
        </div>
      </header>

      <ol className="mt-6 flex flex-col gap-6">
        {quiz.questions.map((question, idx) => (
          <li key={question.id}>
            <QuestionCard
              index={idx}
              total={quiz.questions.length}
              question={question}
              answer={answers[idx]}
              state={states[idx]}
              onChange={(a) => setAnswer(idx, a)}
              onCheck={() => check(idx)}
              onReset={() => reset(idx)}
            />
          </li>
        ))}
      </ol>
    </section>
  );
}

function QuestionCard(props: {
  index: number;
  total: number;
  question: QuizQuestion;
  answer: Answer;
  state: QuestionState;
  onChange: (a: Answer) => void;
  onCheck: () => void;
  onReset: () => void;
}) {
  const { index, total, question, answer, state, onChange, onCheck, onReset } = props;
  const answered = state.status === "answered";
  const complete = isAnswerComplete(answer);

  return (
    <article
      className={cn(
        "rounded-xl border bg-[var(--color-background)] p-4 transition-shadow sm:p-5",
        answered
          ? state.correct
            ? "border-[var(--color-accent)]/60"
            : "border-[var(--color-danger)]/60"
          : "border-[var(--color-border)]",
      )}
    >
      <header className="mb-4 flex flex-wrap items-center gap-2">
        <span className="font-mono text-xs uppercase tracking-wide text-[var(--color-muted)]">
          Q{index + 1} <span className="opacity-60">/ {total}</span>
        </span>
        {question.concept ? (
          <span className="rounded-full bg-[var(--color-surface-2)] px-2.5 py-0.5 text-[11px] font-medium text-[var(--color-muted)]">
            {question.concept}
          </span>
        ) : null}
        <span className="ml-auto text-[11px] font-medium uppercase tracking-wide">
          {answered ? (
            state.correct ? (
              <span className="text-[var(--color-accent-fg)]">Correct</span>
            ) : (
              <span className="text-[var(--color-danger)]">Try again</span>
            )
          ) : (
            <span className="text-[var(--color-muted)]">Unanswered</span>
          )}
        </span>
      </header>

      {question.context ? (
        <p className="mb-3 rounded-lg border border-dashed border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-muted)]">
          <InlineMath text={question.context} />
        </p>
      ) : null}

      <p className="text-base font-medium leading-relaxed">
        <InlineMath text={question.prompt} />
      </p>

      <div className="mt-4">
        {question.type === "choice" ? (
          <ChoiceQuestionInput
            question={question}
            value={answer.type === "choice" ? answer.value : ""}
            disabled={answered && state.correct}
            answered={answered}
            correctChoice={question.answer}
            onChange={(v) => onChange({ type: "choice", value: v })}
          />
        ) : null}

        {question.type === "multi" ? (
          <MultiSelectInput
            question={question}
            value={answer.type === "multi" ? answer.value : []}
            disabled={answered && state.correct}
            answered={answered}
            correctChoices={question.answer}
            onChange={(v) => onChange({ type: "multi", value: v })}
          />
        ) : null}

        {question.type === "numeric" ? (
          <NumericInput
            question={question}
            value={answer.type === "numeric" ? answer.value : null}
            disabled={answered && state.correct}
            onChange={(v) => onChange({ type: "numeric", value: v })}
          />
        ) : null}

        {question.type === "truefalse" ? (
          <TrueFalseInput
            value={answer.type === "truefalse" ? answer.value : null}
            disabled={answered && state.correct}
            answered={answered}
            correctValue={question.answer}
            onChange={(v) => onChange({ type: "truefalse", value: v })}
          />
        ) : null}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        {!answered ? (
          <button
            disabled={!complete}
            onClick={onCheck}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-colors",
              complete
                ? "bg-[var(--color-foreground)] text-[var(--color-background)] hover:opacity-90"
                : "cursor-not-allowed bg-[var(--color-surface-2)] text-[var(--color-muted)]",
            )}
          >
            Check answer
          </button>
        ) : state.correct ? (
          <button
            onClick={onReset}
            className="rounded-full border border-[var(--color-border)] px-4 py-2 text-sm font-medium text-[var(--color-muted)] transition-colors hover:bg-[var(--color-surface-2)] hover:text-[var(--color-foreground)]"
          >
            Try a different answer
          </button>
        ) : (
          <button
            onClick={onCheck}
            disabled={!complete}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-colors",
              complete
                ? "bg-[var(--color-foreground)] text-[var(--color-background)] hover:opacity-90"
                : "cursor-not-allowed bg-[var(--color-surface-2)] text-[var(--color-muted)]",
            )}
          >
            Re-check
          </button>
        )}
      </div>

      {answered ? (
        <div
          className={cn(
            "mt-4 rounded-lg border p-3.5 text-sm leading-relaxed",
            state.correct
              ? "border-[var(--color-accent)]/40 bg-[var(--color-accent-soft)] text-[var(--color-accent-fg)]"
              : "border-[var(--color-danger)]/30 bg-[var(--color-danger-soft)] text-[var(--color-danger)]",
          )}
        >
          <span className="block text-[11px] font-semibold uppercase tracking-wide opacity-80">
            {state.correct ? "Why this is right" : "Why that's not quite it"}
          </span>
          <span className="mt-1 block text-[var(--color-foreground)]">
            <InlineMath text={question.explanation} />
          </span>
        </div>
      ) : null}
    </article>
  );
}

function ChoiceQuestionInput(props: {
  question: ChoiceQuestion;
  value: string;
  disabled: boolean;
  answered: boolean;
  correctChoice: string;
  onChange: (v: string) => void;
}) {
  const { question, value, disabled, answered, correctChoice, onChange } = props;
  return (
    <div className="flex flex-col gap-2">
      {question.choices.map((choice) => {
        const selected = value === choice.id;
        const isAnswer = answered && choice.id === correctChoice;
        const isWrongSelection = answered && selected && choice.id !== correctChoice;
        return (
          <label
            key={choice.id}
            className={cn(
              "group flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 text-sm transition-all",
              selected
                ? "border-[var(--color-foreground)]"
                : "border-[var(--color-border)] hover:border-[var(--color-border-strong)]",
              isAnswer ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)]" : "",
              isWrongSelection ? "border-[var(--color-danger)] bg-[var(--color-danger-soft)]" : "",
              disabled ? "cursor-not-allowed opacity-90" : "",
            )}
          >
            <input
              type="radio"
              name={question.id}
              className="sr-only"
              checked={selected}
              disabled={disabled}
              onChange={() => onChange(choice.id)}
            />
            <span
              className={cn(
                "mt-0.5 inline-flex h-4 w-4 flex-none items-center justify-center rounded-full border",
                selected
                  ? "border-[var(--color-foreground)] bg-[var(--color-foreground)]"
                  : "border-[var(--color-border-strong)]",
              )}
            >
              {selected ? (
                <span className="block h-1.5 w-1.5 rounded-full bg-[var(--color-background)]" />
              ) : null}
            </span>
            <span className="flex-1 leading-relaxed">
              <InlineMath text={choice.text} />
            </span>
          </label>
        );
      })}
    </div>
  );
}

function MultiSelectInput(props: {
  question: MultiSelectQuestion;
  value: string[];
  disabled: boolean;
  answered: boolean;
  correctChoices: string[];
  onChange: (v: string[]) => void;
}) {
  const { question, value, disabled, answered, correctChoices, onChange } = props;
  const selectedSet = new Set(value);
  const correctSet = new Set(correctChoices);
  function toggle(id: string) {
    if (selectedSet.has(id)) onChange(value.filter((v) => v !== id));
    else onChange([...value, id]);
  }
  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs text-[var(--color-muted)]">Select all that apply.</p>
      {question.choices.map((choice) => {
        const selected = selectedSet.has(choice.id);
        const isAnswer = answered && correctSet.has(choice.id);
        const isWrongSelection = answered && selected && !correctSet.has(choice.id);
        const isMissed = answered && !selected && correctSet.has(choice.id);
        return (
          <label
            key={choice.id}
            className={cn(
              "group flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 text-sm transition-all",
              selected ? "border-[var(--color-foreground)]" : "border-[var(--color-border)]",
              isAnswer ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)]" : "",
              isWrongSelection ? "border-[var(--color-danger)] bg-[var(--color-danger-soft)]" : "",
              isMissed ? "border-dashed border-[var(--color-warning)]" : "",
              disabled ? "cursor-not-allowed opacity-90" : "",
            )}
          >
            <input
              type="checkbox"
              className="sr-only"
              checked={selected}
              disabled={disabled}
              onChange={() => toggle(choice.id)}
            />
            <span
              className={cn(
                "mt-0.5 inline-flex h-4 w-4 flex-none items-center justify-center rounded-[5px] border",
                selected
                  ? "border-[var(--color-foreground)] bg-[var(--color-foreground)] text-[var(--color-background)]"
                  : "border-[var(--color-border-strong)]",
              )}
            >
              {selected ? (
                <svg
                  viewBox="0 0 12 12"
                  width="10"
                  height="10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M2.5 6.5l2.5 2.5L9.5 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : null}
            </span>
            <span className="flex-1 leading-relaxed">
              <InlineMath text={choice.text} />
            </span>
          </label>
        );
      })}
    </div>
  );
}

function NumericInput(props: {
  question: NumericQuestion;
  value: number | null;
  disabled: boolean;
  onChange: (v: number | null) => void;
}) {
  const { question, value, disabled, onChange } = props;
  return (
    <div className="flex items-center gap-2">
      <input
        type="number"
        step="any"
        inputMode="decimal"
        disabled={disabled}
        value={value === null || Number.isNaN(value) ? "" : value}
        onChange={(e) => {
          const v = e.target.value;
          onChange(v === "" ? null : Number(v));
        }}
        className="h-11 w-full max-w-[180px] rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-3 font-mono text-base outline-none transition-colors focus:border-[var(--color-foreground)] disabled:opacity-70"
        placeholder="Enter a number"
      />
      {question.unit ? (
        <span className="font-mono text-sm text-[var(--color-muted)]">{question.unit}</span>
      ) : null}
      {question.tolerance > 0 ? (
        <span className="text-xs text-[var(--color-muted)]">
          (tolerance ±{question.tolerance}
          {question.unit ?? ""})
        </span>
      ) : null}
    </div>
  );
}

function TrueFalseInput(props: {
  value: boolean | null;
  disabled: boolean;
  answered: boolean;
  correctValue: boolean;
  onChange: (v: boolean) => void;
}) {
  const { value, disabled, answered, correctValue, onChange } = props;
  const options = [
    { id: true, label: "True" },
    { id: false, label: "False" },
  ];
  return (
    <div className="flex gap-2">
      {options.map((opt) => {
        const selected = value === opt.id;
        const isAnswer = answered && opt.id === correctValue;
        const isWrong = answered && selected && opt.id !== correctValue;
        return (
          <button
            key={String(opt.id)}
            disabled={disabled}
            onClick={() => onChange(opt.id)}
            className={cn(
              "flex-1 rounded-xl border px-4 py-3 text-sm font-medium transition-colors",
              selected ? "border-[var(--color-foreground)]" : "border-[var(--color-border)]",
              isAnswer ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)]" : "",
              isWrong ? "border-[var(--color-danger)] bg-[var(--color-danger-soft)]" : "",
              disabled ? "cursor-not-allowed opacity-90" : "hover:bg-[var(--color-surface-2)]",
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
