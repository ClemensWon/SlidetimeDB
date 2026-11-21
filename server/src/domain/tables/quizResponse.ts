import { table, t } from "spacetimedb/server";

export const quizResponse = table(
  {
    public: false,
  },
  {
    id: t.u32().primaryKey().autoInc(),
    quizId: t.u32().index(),
    identity: t.identity(),
    quizOptionId: t.u32(),
  },
);
