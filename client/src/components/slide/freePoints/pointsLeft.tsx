import { cn } from "cn";

export function hype(pointsLeft: number) {
  if (pointsLeft <= 0) return { badge: "All gone 💨", caption: "nothing left", urgent: false };
  if (pointsLeft === 1) return { badge: "Last one 😱", caption: "who gets it?", urgent: true };
  if (pointsLeft <= 5)
    return { badge: `Only ${pointsLeft} left 🔥`, caption: "hurry!", urgent: true };
  if (pointsLeft <= 15) return { badge: "Going fast ⚡", caption: "points left", urgent: false };
  return { badge: "Free points 🎁", caption: "points up for grabs", urgent: false };
}

export function PointsLeft({ value, large }: { value: number; large?: boolean }) {
  const { caption, urgent } = hype(value);

  return (
    <div className="flex flex-col items-center gap-2 rounded-xl border-2 p-6">
      <span
        className={cn(
          "font-black tabular-nums",
          large ? "text-8xl lg:text-9xl" : "text-7xl",
          urgent && "animate-pulse text-destructive",
          value <= 0 && "text-muted-foreground",
        )}
      >
        {Math.max(value, 0)}
      </span>
      <span className="text-sm text-muted-foreground lg:text-base">{caption}</span>
    </div>
  );
}
