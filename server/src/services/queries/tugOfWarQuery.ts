import { SenderError } from "spacetimedb";
import { DbReadAccess } from "../../domain/schema";
import { useDeckQuery } from "./deckQuery";
import { useSlideQuery } from "./slideQuery";

export function useTugOfWarQuery(db: DbReadAccess) {
  const deckQuery = useDeckQuery(db);
  const slideQuery = useSlideQuery(db);

  function getCurrent() {
    const deck = deckQuery.getDeckOrThrow();
    const slide = slideQuery.getBySlidenumberOrThrow(deck.currentSlide);

    if (slide.kind.tag !== "tugOfWar") {
      throw new SenderError("current slide isn't tug of war");
    }

    const tugOfWar = db.tugOfWar.id.find(slide.kind.value);
    if (tugOfWar === null) {
      throw new SenderError("could not find tug of war");
    }

    return tugOfWar;
  }

  return {
    getCurrent,
  };
}
