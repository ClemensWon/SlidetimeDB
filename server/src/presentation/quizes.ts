import type { QuizValues } from "../domain/tables/quiz";
import type { QuizOptionRow } from "../domain/tables/quizOption";

export const quizes: QuizValues[] = [
  {
    id: 0,
    question: "What language performs the best",
  },
];

export const options: QuizOptionRow[] = [
  {
    id: 0,
    isRight: false,
    quizId: 0,
    text: "C#",
  },
  {
    id: 1,
    isRight: false,
    quizId: 0,
    text: "C++",
  },
  {
    id: 2,
    isRight: true,
    quizId: 0,
    text: "Typescript",
  },
  {
    id: 3,
    isRight: false,
    quizId: 0,
    text: "Rust",
  },
];
