import { t, table } from "spacetimedb/server";

export const quizOption = table(
  {
    public: false,
  },
  {
    id: t.u32().primaryKey(),
    text: t.string(),
    isRight: t.bool(),
    quizId: t.u32().index(),
  },
);

export type QuizOptionRow = typeof quizOption.rowType.type;
