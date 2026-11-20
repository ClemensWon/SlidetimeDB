import { reducers } from "@/module_bindings";
import type { Deck, Slide } from "@/module_bindings/types";
import { useEffect } from "react";
import { useReducer } from "spacetimedb/react";
import { Leaderboard, LeaderboardSheet, type Player } from "../leaderboard/leaderbord";
import { ReactionBar } from "../reactions/reaction-bar";
import { SlideView } from "../slide/slide";
import { SlideHeader } from "../slide/slide-header";

// TODO: replace with a useTable call once the player table exists
const MOCK_PLAYERS: Player[] = [
  { id: "1", name: "Anna", points: 420 },
  { id: "2", name: "Ben", points: 380 },
  { id: "3", name: "Chiara", points: 310 },
  { id: "4", name: "Deniz", points: 250 },
  { id: "5", name: "Emil", points: 120 },
  { id: "6", name: "Fatima", points: 90 },
];

export function Presentation({ deck, slides }: { deck: Deck; slides: readonly Slide[] }) {
  const goToSlide = useReducer(reducers.goToSlide);
  const currentSlideNumber = deck.currentSlide;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight")
        goToSlide({ slideNumber: Math.min(currentSlideNumber + 1, slides.length - 1) });
      if (e.key === "ArrowLeft") goToSlide({ slideNumber: Math.max(currentSlideNumber - 1, 0) });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [currentSlideNumber, slides.length, goToSlide]);

  const slide = slides.find((slide) => slide.id === currentSlideNumber);

  return (
    <div className="flex h-dvh gap-2 bg-muted p-2  lg:gap-4 lg:p-4">
      <div className="flex min-w-0 flex-1 flex-col gap-2 lg:gap-4">
        <SlideHeader
          title={slide?.title ?? ""}
          slideNumber={currentSlideNumber}
          slideCount={slides.length}
          actions={<LeaderboardSheet players={MOCK_PLAYERS} />}
        />

        <main className="min-h-0 flex-1 overflow-y-auto rounded-xl border bg-card p-4 text-card-foreground lg:p-8">
          {slide ? (
            <SlideView key={slide.id} slide={slide} />
          ) : (
            <p className="text-muted-foreground">Slide not found</p>
          )}
        </main>

        <ReactionBar onReact={(emoji) => console.log("reaction", emoji)} />
      </div>

      <aside className="hidden w-72 shrink-0 lg:block">
        <Leaderboard players={MOCK_PLAYERS} />
      </aside>
    </div>
  );
}