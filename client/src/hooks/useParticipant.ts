import { useSpacetimeDB } from "spacetimedb/react";
import type { Deck, Participant } from "../module_bindings/types";

export function useParticipant(deck: Deck, users: readonly Participant[]) {
  const { identity } = useSpacetimeDB();

  const currentUser = identity ? users.find((user) => user.identity.isEqual(identity)) : undefined;

  return {
    currentUser,
    isPresenter: !!identity && !!deck.presenter && deck.presenter.isEqual(identity),
    hasJoined: currentUser !== undefined,
  };
}
