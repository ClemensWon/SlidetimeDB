import { t, table } from "spacetimedb/server";

const quizState = t.enum("quizState", {
  scheduled: t.unit(),
  ongoing: t.unit(),
  analytics: t.unit(),
  reveal: t.unit(),
});

export const quiz = table(
  {
    public: false,
  },
  {
    id: t.u32().primaryKey(),
    question: t.string(),
    state: quizState,
  },
);

type QuizRow = typeof quiz.rowType.type;
export type QuizValues = Omit<QuizRow, "state">;
