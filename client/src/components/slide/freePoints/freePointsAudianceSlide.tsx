import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { reducers } from "@/module_bindings";
import { useReducer } from "spacetimedb/react";
import { PointsLeft } from "./pointsLeft";

type Props = { pointsLeft: number };

function hype(pointsLeft: number) {
  if (pointsLeft <= 0) return { badge: "All gone 💨", caption: "nothing left", urgent: false };
  if (pointsLeft === 1) return { badge: "Last one 😱", caption: "who gets it?", urgent: true };
  if (pointsLeft <= 5)
    return { badge: `Only ${pointsLeft} left 🔥`, caption: "hurry!", urgent: true };
  if (pointsLeft <= 15) return { badge: "Going fast ⚡", caption: "points left", urgent: false };
  return { badge: "Free points 🎁", caption: "points up for grabs", urgent: false };
}

export function FreePointsAudienceSlide({ pointsLeft }: Props) {
  const claim = useReducer(reducers.claimPoins);
  const [claimed, setClaimed] = useState(0);
  const allGone = pointsLeft <= 0;
  const { badge } = hype(pointsLeft);

  async function handleClaim() {
    try {
      await claim();
      setClaimed((n) => n + 1);
    } catch {
      // Someone else took the last point first; the server rejected the claim.
    }
  }

  const points = `${claimed} ${claimed === 1 ? "point" : "points"}`;
  const status = allGone
    ? claimed > 0
      ? `🏆 You walked away with ${points}!`
      : "🐢 Too slow this time."
    : claimed > 0
      ? `🎉 You grabbed ${points}. Keep going!`
      : "👆 Tap fast, they won't last.";

  return (
    <article className="mx-auto flex min-h-full max-w-md flex-col justify-center gap-6">
      <header className="flex flex-col items-start gap-3">
        <Badge variant={allGone ? "secondary" : "default"}>{badge}</Badge>
        <h2 className="text-2xl font-semibold tracking-tight">Free points</h2>
      </header>

      <PointsLeft value={pointsLeft} />

      <button
        type="button"
        disabled={allGone}
        onClick={handleClaim}
        className={cn(
          "h-40 touch-manipulation rounded-3xl bg-primary text-4xl font-black text-primary-foreground select-none transition-transform active:scale-95",
          "disabled:bg-muted disabled:text-muted-foreground disabled:active:scale-100",
        )}
      >
        {allGone ? "All gone 💨" : "Claim +1 🤑"}
      </button>

      <p aria-live="polite" className="text-base text-muted-foreground">
        {status}
      </p>
    </article>
  );
}
