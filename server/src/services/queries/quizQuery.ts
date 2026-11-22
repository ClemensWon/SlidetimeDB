import { SenderError } from "spacetimedb";
import type { DbReadAccess } from "../../domain/schema";
import { useDeckQuery } from "./deckQuery";
import { useSlideQuery } from "./slideQuery";
import type { DisplayOption, QuizObject } from "../../domain/objects/quizResult";
import { useQuizResponseQuery } from "./quizResponse";
import { useQuizOption } from "./quizOptionQuery";

export function useQuizQuery(db: DbReadAccess) {
  const deckQuery = useDeckQuery(db);
  const slideQuery = useSlideQuery(db);
  const quizResponseQuery = useQuizResponseQuery(db);
  const quizOptionQuery = useQuizOption(db);

  function getByIdOrThrow(id: number) {
    const quiz = db.quiz.id.find(id);
    if (quiz === null) {
      throw new SenderError(`could not find quiz with id ${id}`);
    }
    return quiz;
  }

  function getCurrent() {
    const deck = deckQuery.getDeckOrThrow();
    const currentSlide = slideQuery.getBySlidenumberOrThrow(deck.currentSlide);
    if (currentSlide.kind.tag !== "quiz") {
      throw new SenderError(`cannot start quiz, the current slide is a ${currentSlide.kind}`);
    }
    return getByIdOrThrow(currentSlide.kind.value);
  }

  function getQuizObject(): QuizObject {
    const quiz = getCurrent();
    const revealAnswer = quiz.state.tag === "reveal";
    const responses = quizResponseQuery.getByQuizId(quiz.id);
    const options: DisplayOption[] = quizOptionQuery
      .getByQuizId(quiz.id)
      .map((option) => ({ ...option, isRight: revealAnswer ? option.isRight : undefined }));
    return {
      quiz,
      responses,
      options,
    };
  }

  return { getByIdOrThrow, getCurrent, getQuizObject };
}
