import { SenderError } from "spacetimedb";
import { CommandCtx } from "../../domain/schema";
import { useDeckQuery } from "../queries/deckQuery";
import { useSlideQuery } from "../queries/slideQuery";
import { useParticipantsQuery } from "../queries/participantQuery";

export function useFreePointsCommand(ctx: CommandCtx) {
  const deckQuery = useDeckQuery(ctx.db);
  const slideQuery = useSlideQuery(ctx.db);
  const participantQuery = useParticipantsQuery(ctx.db);

  function claimFreePoints() {
    const deck = deckQuery.getDeckOrThrow();
    const currentSlide = slideQuery.getBySlidenumberOrThrow(deck.currentSlide);
    if (currentSlide.kind.tag !== "freePoints") {
      throw new SenderError("can't claim free points on this type of slide");
    }

    const participant = participantQuery.getByIdentityOrThrow(ctx.sender);

    ctx.db.participant.identity.update({ ...participant, score: participant.score + 1 });

    const pointsleft = currentSlide.kind.value - 1;
    if (pointsleft < 0) {
      throw new SenderError("no points left");
    }

    ctx.db.slide.slideNumber.update({
      ...currentSlide,
      kind: {
        tag: "freePoints",
        value: pointsleft,
      },
    });
  }

  return { claimFreePoints };
}
