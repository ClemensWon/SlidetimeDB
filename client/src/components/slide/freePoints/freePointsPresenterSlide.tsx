import { hype, PointsLeft } from "./pointsLeft";

type Props = { pointsLeft: number };

export function FreePointsPresenterSlide({ pointsLeft }: Props) {
  const { urgent } = hype(pointsLeft);
  const allGone = pointsLeft <= 0;

  const status = allGone
    ? "💨 Every point has been claimed."
    : urgent
      ? "🔥 Last chance, grab one on your phone!"
      : "📱 Grab a point on your phone before they run out.";

  return (
    <article className="mx-auto flex min-h-full max-w-5xl flex-col justify-center gap-8 lg:gap-12">
      <header className="flex flex-col items-start gap-3">
        <h2 className="text-3xl font-semibold tracking-tight lg:text-5xl">Free points</h2>
      </header>

      <PointsLeft value={pointsLeft} large />

      <p aria-live="polite" className="text-lg text-muted-foreground lg:text-xl">
        {status}
      </p>
    </article>
  );
}
