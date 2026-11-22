import { t } from "spacetimedb/server";
import { quiz } from "../tables/quiz";
import { quizResponse } from "../tables/quizResponse";

export const displayOption = t.object("displayOption", {
  id: t.u32(),
  text: t.string(),
  isRight: t.option(t.bool()),
});

export const quizObject = t.object("quizObject", {
  quiz: quiz.rowType,
  options: t.array(displayOption),
  responses: t.array(quizResponse.rowType),
});

export const quizResult = t.option(quizObject);
export type QuizObject = typeof quizObject.type;
export type DisplayOption = typeof displayOption.type;
