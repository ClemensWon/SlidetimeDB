import type { CommandCtx } from "../domain/schema";

import { SenderError } from "spacetimedb";
import { slides } from "../slides";

export function usePresentationCommand(ctx: CommandCtx) {
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
  }

  function goToSlide(slideNumber: number) {
    const slideExists = ctx.db.slide.slideNumber.find(slideNumber) !== null;
    if (!slideExists) {
      throw new SenderError("slide not available");
    }

    const deck = ctx.db.deck.id.find(0);

    if (!deck) {
      throw new SenderError("deck not available");
    }

    ctx.db.deck.id.update({ ...deck, currentSlide: slideNumber });
  }

  function claimdDeck() {
    const deck = ctx.db.deck.id.find(0);
    if (!deck) {
      throw new SenderError("deck not available");
    }
    ctx.db.deck.id.update({ ...deck, presenter: ctx.sender, state: { tag: "lobby" } });
  }

  function startPresentation() {
    const deck = ctx.db.deck.id.find(0);
    if (!deck) {
      throw new SenderError("deck not available");
    }

    ctx.db.deck.id.update({ ...deck, state: { tag: "ongoing" } });
  }

  return {
    init,
    goToSlide,
    claimdDeck,
    startPresentation,
  };
}
