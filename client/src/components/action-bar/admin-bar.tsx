import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { reducers } from "@/module_bindings";
import { ChevronLeft, ChevronRight, RotateCcw, Users } from "lucide-react";
import { useReducer } from "spacetimedb/react";

export function AdminBar({
  currentSlide,
  slideCount,
  participantCount,
}: {
  currentSlide: number;
  slideCount: number;
  participantCount: number;
}) {
  const goToSlide = useReducer(reducers.goToSlide);
  const resetPresentation = useReducer(reducers.resetPresentation);
  const [confirmingReset, setConfirmingReset] = useState(false);

  const hasPrevious = currentSlide > 0;
  const hasNext = currentSlide < slideCount - 1;

  // PageUp/PageDown are what most presentation clickers send.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "ArrowRight" || e.key === "PageDown") && hasNext) {
        goToSlide({ slideNumber: currentSlide + 1 });
      }
      if ((e.key === "ArrowLeft" || e.key === "PageUp") && hasPrevious) {
        goToSlide({ slideNumber: currentSlide - 1 });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [currentSlide, hasNext, hasPrevious, goToSlide]);

  // Disarm the reset button if it isn't confirmed within a few seconds.
  useEffect(() => {
    if (!confirmingReset) return;
    const timer = setTimeout(() => setConfirmingReset(false), 3000);
    return () => clearTimeout(timer);
  }, [confirmingReset]);

  return (
    <div
      role="toolbar"
      aria-label="Presenter controls"
      className="flex items-center gap-2 rounded-xl border bg-card p-2 text-card-foreground"
    >
      <Button
        variant="outline"
        size="icon"
        aria-label="Previous slide"
        disabled={!hasPrevious}
        onClick={() => goToSlide({ slideNumber: currentSlide - 1 })}
      >
        <ChevronLeft />
      </Button>
      <span className="min-w-16 text-center text-sm tabular-nums text-muted-foreground">
        {currentSlide + 1} / {slideCount}
      </span>
      <Button
        variant="outline"
        size="icon"
        aria-label="Next slide"
        disabled={!hasNext}
        onClick={() => goToSlide({ slideNumber: currentSlide + 1 })}
      >
        <ChevronRight />
      </Button>

      <span className="ml-auto flex items-center gap-1.5 px-2 text-sm tabular-nums text-muted-foreground">
        <Users className="size-4" aria-hidden />
        {participantCount}
        <span className="sr-only"> participants</span>
      </span>

      <Button
        variant={confirmingReset ? "destructive" : "ghost"}
        onClick={async () => {
          if (!confirmingReset) return setConfirmingReset(true);
          setConfirmingReset(false);
          await resetPresentation();
        }}
      >
        <RotateCcw />
        {confirmingReset ? "Click again to reset" : "Reset"}
      </Button>
    </div>
  );
}
