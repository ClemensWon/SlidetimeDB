import type { QuizValues } from "../domain/tables/quiz";
import type { QuizOptionRow } from "../domain/tables/quizOption";

export const quizes: QuizValues[] = [
  {
    id: 0,
    question: "Which of these languages achieves the best performance when run in Spacetime",
  },
  {
    id: 1,
    question: "Chose an option Spacetime can run on",
  },
  {
    id: 2,
    question: "For which game was Spacetime originally developed for",
  },
  {
    id: 3,
    question: "Which  of these isn't a real database product",
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
  {
    id: 8,
    isRight: false,
    quizId: 2,
    text: "Minecraft",
  },
  {
    id: 9,
    isRight: false,
    quizId: 2,
    text: "Mine Factory",
  },
  {
    id: 10,
    isRight: true,
    quizId: 2,
    text: "BitCraft",
  },
  {
    id: 11,
    isRight: false,
    quizId: 2,
    text: "Bit Factory",
  },
  {
    id: 12,
    isRight: false,
    quizId: 3,
    text: "DuckDB",
  },
  {
    id: 13,
    isRight: false,
    quizId: 3,
    text: "TigerBeetleDB",
  },
  {
    id: 14,
    isRight: false,
    quizId: 3,
    text: "CockroachDB",
  },
  {
    id: 15,
    isRight: true,
    quizId: 3,
    text: "WhaleDB",
  },
];
