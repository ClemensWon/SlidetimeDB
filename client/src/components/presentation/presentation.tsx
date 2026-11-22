import type { Deck, Slide, Participant } from "@/module_bindings/types";

import { useSpacetimeDB } from "spacetimedb/react";
import { AdminBar } from "../action-bar/admin-bar";
import { Leaderboard, LeaderboardSheet } from "../leaderboard/leaderbord";
import { ReactionBar } from "../action-bar/reaction-bar";
import { SlideView } from "../slide/slide";
import { SlideHeader } from "../slide/slide-header";
import { useParticipant } from "@/hooks/useParticipant";

export function Presentation({
  deck,
  slides,
  participants,
}: {
  deck: Deck;
  slides: readonly Slide[];
  participants: readonly Participant[];
}) {
  const { isPresenter, hasJoined } = useParticipant(deck, participants);

  const currentSlideNumber = deck.currentSlide;
  const slide = slides.find((slide) => slide.slideNumber === currentSlideNumber);

  return (
    <div className="flex h-dvh gap-2 p-2 lg:gap-4 lg:p-4">
      <div className="flex min-w-0 flex-1 flex-col gap-2 lg:gap-4">
        <SlideHeader
          title={slide?.title ?? ""}
          slideNumber={currentSlideNumber}
          slideCount={slides.length}
          actions={<LeaderboardSheet players={participants} />}
        />

        <main className="min-h-0 flex-1 overflow-y-auto rounded-xl border bg-card p-4 text-card-foreground lg:p-8">
          {slide ? (
            hasJoined ? (
              <SlideView
                key={slide.slideNumber}
                slide={slide}
                particpiants={participants}
                deck={deck}
              />
            ) : (
              <div>You didn't join</div>
            )
          ) : (
            <p className="text-muted-foreground">Slide not found</p>
          )}
        </main>

        {isPresenter ? (
          <AdminBar
            currentSlide={currentSlideNumber}
            slideCount={slides.length}
            participantCount={participants.length}
          />
        ) : (
          <ReactionBar onReact={(emoji) => console.log("reaction", emoji)} />
        )}
      </div>

      <aside className="hidden w-72 shrink-0 lg:block">
        <Leaderboard players={participants} />
      </aside>
    </div>
  );
}
