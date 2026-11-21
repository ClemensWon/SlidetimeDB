import type { DbReadAccess } from "../../domain/schema";

export function useQuizOption(db: DbReadAccess) {
  function getByQuizId(quizId: number) {
    return Array.from(db.quizOption.quizId.filter(quizId));
  }

  return {
    getByQuizId,
  };
}
