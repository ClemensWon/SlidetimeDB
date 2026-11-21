import { t } from "spacetimedb/server";
import { quiz } from "../tables/quiz";
import { quizOption } from "../tables/quizOption";
import { quizResponse } from "../tables/quizResponse";

export const quizObject = t.object("quizObject", {
  quiz: quiz.rowType,
  options: t.array(quizOption.rowType),
  responses: t.array(quizResponse.rowType),
});

export const quizResult = t.option(quizObject);
export type QuizObject = typeof quizObject.type;
