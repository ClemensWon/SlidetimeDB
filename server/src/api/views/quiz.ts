import { quizResult } from "../../domain/objects/quizResult";
import { spacetimedb } from "../../domain/schema";
import { useQuizQuery } from "../../services/queries/quizQuery";

export const quizView = spacetimedb.anonymousView(
  {
    public: true,
  },
  quizResult,
  (ctx) => {
    const quizQuery = useQuizQuery(ctx.db);
    try {
      return quizQuery.getQuizObject();
    } catch (exception) {
      console.error("an exception occured", exception);
      return undefined;
    }
  },
);
