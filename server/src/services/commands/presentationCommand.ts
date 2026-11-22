import type { CommandCtx } from "../../domain/schema";

import { SenderError } from "spacetimedb";
import { slides } from "../../presentation/slides";
import { useDeckQuery } from "../queries/deckQuery";
import { useUserQuery } from "../queries/userQuery";
import { options, quizes } from "../../presentation/quizes";
import { teams, tugOfWars } from "../../presentation/tugOfWar";

export function usePresentationCommand(ctx: CommandCtx) {
  const deckQuery = useDeckQuery(ctx.db);
  const userQuery = useUserQuery(ctx.db);

  function init() {
    ctx.db.deck.insert({
      id: 0,
      currentSlide: 0,
      presenter: undefined,
      state: { tag: "prepared" },
      name: "SlidetimeDB",
    });
    slides.forEach((slide, index) => {
      ctx.db.slide.insert({ ...slide, deckId: 0, slideNumber: index });
    });
    quizes.forEach((quiz) => {
      ctx.db.quiz.insert({ ...quiz, state: { tag: "scheduled" } });
    });
    options.forEach((option) => {
      ctx.db.quizOption.insert(option);
    });
    tugOfWars.forEach((tugOfWar) => {
      ctx.db.tugOfWar.insert({
        ...tugOfWar,
        score: 0,
        updateCount: 0,
        state: { tag: "scheduled" },
      });
    });
    teams.forEach((team) => {
      ctx.db.team.insert({ ...team, members: [] });
    });
  }

  function goToSlide(slideNumber: number) {
    userQuery.throwIfNotPresenter(ctx.sender);
    const slideExists = ctx.db.slide.slideNumber.find(slideNumber) !== null;
    if (!slideExists) {
      throw new SenderError("slide not available");
    }

    const deck = deckQuery.getDeckOrThrow();

    ctx.db.deck.id.update({ ...deck, currentSlide: slideNumber });
  }

  function claimdDeck() {
    const deck = deckQuery.getDeckOrThrow();

    ctx.db.deck.id.update({ ...deck, presenter: ctx.sender, state: { tag: "lobby" } });
  }

  function startPresentation() {
    userQuery.throwIfNotPresenter(ctx.sender);
    const deck = deckQuery.getDeckOrThrow();

    ctx.db.deck.id.update({ ...deck, state: { tag: "ongoing" } });
  }

  return {
    init,
    goToSlide,
    claimdDeck,
    startPresentation,
  };
}
