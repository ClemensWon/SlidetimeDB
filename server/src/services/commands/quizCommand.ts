import { SenderError } from "spacetimedb";
import type { CommandCtx } from "../../domain/schema";
import { useQuizQuery } from "../queries/quizQuery";
import { useQuizResponseQuery } from "../queries/quizResponse";

export function useQuizCommand(ctx: CommandCtx) {
  const quizQuery = useQuizQuery(ctx.db);
  const quizResponseQuery = useQuizResponseQuery(ctx.db);

  function startQuiz() {
    const quiz = quizQuery.getCurrent();
    if (quiz.state.tag !== "scheduled") {
      throw new SenderError("");
    }
    ctx.db.quiz.id.update({ ...quiz, state: { tag: "ongoing" } });
  }

  function respondToQuiz(choiceId: number) {
    const quiz = quizQuery.getCurrent();
    if (quiz.state.tag !== "ongoing") {
      throw new SenderError("");
    }

    const quizId = quiz.id;
    const senderIdentiy = ctx.sender;

    const responses = quizResponseQuery.getByQuizId(quizId);
    const alreadyResponded = responses.some((response) => response.identity.isEqual(senderIdentiy));

    if (alreadyResponded) {
      throw new SenderError("user has already responded to this quizz");
    }

    ctx.db.quizResponse.insert({
      id: 0,
      identity: senderIdentiy,
      quizId,
      quizOptionId: choiceId,
    });
  }

  function showResults() {
    const quiz = quizQuery.getCurrent();
    if (quiz.state.tag !== "ongoing") {
      throw new SenderError("");
    }

    ctx.db.quiz.id.update({ ...quiz, state: { tag: "analytics" } });
  }

  function revealCorrectAnswer() {
    const quiz = quizQuery.getCurrent();
    if (quiz.state.tag !== "analytics") {
      throw new SenderError("");
    }

    ctx.db.quiz.id.update({ ...quiz, state: { tag: "reveal" } });
  }

  return {
    startQuiz,
    respondToQuiz,
    showResults,
    revealCorrectAnswer,
  };
}
