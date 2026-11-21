import { Identity, SenderError } from "spacetimedb";
import type { DbReadAccess } from "../../domain/schema";
import { useDeckQuery } from "./deckQuery";

export function useUserQuery(db: DbReadAccess) {
  const deckQuery = useDeckQuery(db);

  function throwIfNotPresenter(sender: Identity) {
    const deck = deckQuery.getDeckOrThrow();

    if (deck.presenter === undefined) {
      throw new SenderError("no presenter configured");
    }

    if (!sender.equals(deck.presenter)) {
      throw new SenderError("this operation can only performed by a presenter");
    }
  }
  return {
    isSenderPresenter: throwIfNotPresenter,
  };
}
