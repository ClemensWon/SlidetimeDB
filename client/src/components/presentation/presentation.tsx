import { reducers } from "@/module_bindings";
import type { Deck, Slide } from "@/module_bindings/types";
import { useEffect } from "react";
import { useReducer } from "spacetimedb/react";
import { SlideView } from "../slide/slide";

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

  return <SlideView key="slide" slide={slide} />;
}
