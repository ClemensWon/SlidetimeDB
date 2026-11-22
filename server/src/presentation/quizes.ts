import type { QuizValues } from "../domain/tables/quiz";
import type { QuizOptionRow } from "../domain/tables/quizOption";

export const quizes: QuizValues[] = [
  {
    id: 0,
    question: "What language performs the best",
  },
  {
    id: 1,
    question: "Chose an option Spacetime can run on",
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
  {
    id: 4,
    isRight: true,
    quizId: 1,
    text: "Docker",
  },
  {
    id: 5,
    isRight: true,
    quizId: 1,
    text: "Linux",
  },
  {
    id: 6,
    isRight: true,
    quizId: 1,
    text: "macOS",
  },
  {
    id: 7,
    isRight: true,
    quizId: 1,
    text: "Windows",
  },
];
