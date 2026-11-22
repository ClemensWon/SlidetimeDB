import { SenderError } from "spacetimedb";
import type { CommandCtx } from "../../domain/schema";
import { useQuizQuery } from "../queries/quizQuery";
import { useQuizResponseQuery } from "../queries/quizResponse";
import { useQuizOption } from "../queries/quizOptionQuery";
import { useParticipantsQuery } from "../queries/participantQuery";
import { useUserQuery } from "../queries/userQuery";

export function useQuizCommand(ctx: CommandCtx) {
  const quizQuery = useQuizQuery(ctx.db);
  const quizResponseQuery = useQuizResponseQuery(ctx.db);
  const quizOptionsQuery = useQuizOption(ctx.db);
  const partipantQuery = useParticipantsQuery(ctx.db);
  const userQuery = useUserQuery(ctx.db);

  function startQuiz() {
    userQuery.throwIfNotPresenter(ctx.sender);
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
    userQuery.throwIfNotPresenter(ctx.sender);
    const quiz = quizQuery.getCurrent();
    if (quiz.state.tag !== "ongoing") {
      throw new SenderError("");
    }

    ctx.db.quiz.id.update({ ...quiz, state: { tag: "analytics" } });
  }

  function revealCorrectAnswer() {
    userQuery.throwIfNotPresenter(ctx.sender);
    const quiz = quizQuery.getCurrent();

    if (quiz.state.tag !== "analytics") {
      throw new SenderError("");
    }

    const quizId = quiz.id;
    const responses = quizResponseQuery.getByQuizId(quizId);
    const options = quizOptionsQuery.getByQuizId(quizId);

    for (const response of responses) {
      const chosenOpton = options.find((option) => option.id === response.id);
      if (!chosenOpton) {
        continue;
      }

      if (!chosenOpton.isRight) {
        continue;
      }

      const participant = partipantQuery.getByIdentityOrThrow(response.identity);
      ctx.db.participant.identity.update({ ...participant, score: participant.score + 5 });
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
