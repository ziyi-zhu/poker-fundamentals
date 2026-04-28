import fs from "node:fs/promises";
import path from "node:path";
import { z } from "zod";

const QUIZ_ROOT = path.join(process.cwd(), "src", "content", "quizzes");

const ChoiceSchema = z.object({
  id: z.string(),
  text: z.string(),
});

const BaseQuestion = z.object({
  id: z.string(),
  prompt: z.string(),
  /** Optional Markdown-style preamble shown above the prompt (kept brief; rendered as plain text). */
  context: z.string().optional(),
  /** Plain-text explanation revealed once an answer is submitted. May contain $...$ for inline math. */
  explanation: z.string(),
  /** Optional concept label shown as a chip in the question header. */
  concept: z.string().optional(),
});

const ChoiceQuestionSchema = BaseQuestion.extend({
  type: z.literal("choice"),
  choices: z.array(ChoiceSchema).min(2),
  /** Index of correct choice within `choices`. */
  answer: z.string(),
});

const MultiSelectQuestionSchema = BaseQuestion.extend({
  type: z.literal("multi"),
  choices: z.array(ChoiceSchema).min(2),
  /** Set of choice ids that must be selected for the question to be marked correct. */
  answer: z.array(z.string()).min(1),
});

const NumericQuestionSchema = BaseQuestion.extend({
  type: z.literal("numeric"),
  /** Correct numeric answer. */
  answer: z.number(),
  /** Absolute tolerance applied around answer. */
  tolerance: z.number().nonnegative().default(0),
  /** Suffix shown after the input box, e.g. "%" or "bb". */
  unit: z.string().optional(),
});

const TrueFalseSchema = BaseQuestion.extend({
  type: z.literal("truefalse"),
  answer: z.boolean(),
});

const QuestionSchema = z.discriminatedUnion("type", [
  ChoiceQuestionSchema,
  MultiSelectQuestionSchema,
  NumericQuestionSchema,
  TrueFalseSchema,
]);

const QuizSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  questions: z.array(QuestionSchema),
});

export type Quiz = z.infer<typeof QuizSchema>;
export type QuizQuestion = z.infer<typeof QuestionSchema>;
export type ChoiceQuestion = z.infer<typeof ChoiceQuestionSchema>;
export type MultiSelectQuestion = z.infer<typeof MultiSelectQuestionSchema>;
export type NumericQuestion = z.infer<typeof NumericQuestionSchema>;
export type TrueFalseQuestion = z.infer<typeof TrueFalseSchema>;

export async function loadQuiz(file: string): Promise<Quiz> {
  const filepath = path.join(QUIZ_ROOT, `${file}.json`);
  const raw = await fs.readFile(filepath, "utf8");
  const data = JSON.parse(raw);
  return QuizSchema.parse(data);
}
