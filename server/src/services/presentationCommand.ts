import type { CommandCtx } from "../domain/schema";

import { SenderError } from "spacetimedb";
import { slides } from "../slides";

export function usePresentationCommand(ctx: CommandCtx) {
  function init() {
    ctx.db.deck.insert({
      id: 0,
      currentSlide: 0,
      presenter: undefined,
      deckState: { tag: "prepared" },
    });
    slides.forEach((slide, index) => {
      ctx.db.slide.insert({ ...slide, deckId: 0, id: index });
    });
  }

  function goToSlide(slideNumber: number) {
    const slideExists = ctx.db.slide.id.find(slideNumber) !== null;
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
    const deck = ctx.db.deck.id.find(0)
    if (!deck) {
      throw new SenderError("deck not available");
    }
    ctx.db.deck.id.update({...deck, presenter: ctx.sender, deckState: {tag: "lobby"}});
  }

  return {
    init,
    goToSlide,
    claimdDeck
  };
}
