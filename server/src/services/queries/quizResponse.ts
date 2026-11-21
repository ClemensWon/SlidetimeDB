import type { DbReadAccess } from "../../domain/schema";

export function useQuizResponseQuery(db: DbReadAccess) {
  function getByQuizId(quizId: number) {
    return Array.from(db.quizResponse.quizId.filter(quizId));
  }

  return {
    getByQuizId,
  };
}
