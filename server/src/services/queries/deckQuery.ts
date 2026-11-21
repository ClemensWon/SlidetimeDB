import { SenderError } from "spacetimedb";
import type { DbReadAccess } from "../../domain/schema";

export function useDeckQuery(db: DbReadAccess) {
  function getDeckOrThrow() {
    const deck = db.deck.id.find(0);
    if (deck === null) {
      throw new SenderError("no deck configured");
    }
    return deck;
  }

  return {
    getDeckOrThrow,
  };
}
