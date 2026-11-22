import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { reducers } from "@/module_bindings";
import { Trophy } from "lucide-react";
import { useReducer } from "spacetimedb/react";
import { PHASE_LABEL, Rope, TEAM_TAGS, TEAMS, useTugOfWar } from "./shared";

export function TugOfWarPresenterSlide({ tugOfWarId }: { tugOfWarId: number }) {
  const { isReady, game, counts, winner } = useTugOfWar(tugOfWarId);
  const openTeams = useReducer(reducers.openTeamsTugOfWar);
  const start = useReducer(reducers.startTugOfWar);

  if (!isReady) return <div className="h-64 animate-pulse rounded-xl bg-muted" />;
  if (!game) return <p className="text-muted-foreground">No tug of war available.</p>;

  const phase = game.state.tag;
  const players = counts.TeamA + counts.TeamB;

  // The game ends on its own, so only the first two phases have a button.
  const nextStep = {
    Scheduled: { label: "Open teams", run: () => openTeams() },
    JoiningTeams: { label: "Start pulling", run: () => start() },
    Ongoing: undefined,
    Results: undefined,
  }[phase];

  const status = {
    Scheduled: "Waiting to open teams.",
    JoiningTeams: `${players} ${players === 1 ? "player" : "players"} joined`,
    Ongoing: `${game.updateCount} pulls`,
    Results: winner ? `${TEAMS[winner].name} wins after ${game.updateCount} pulls` : "",
  }[phase];

  return (
    <article className="mx-auto flex min-h-full max-w-5xl flex-col justify-center gap-8 lg:gap-12">
      <header className="flex flex-col items-start gap-3">
        <Badge variant={phase === "Ongoing" ? "default" : "secondary"}>{PHASE_LABEL[phase]}</Badge>
        <h2 className="text-3xl font-semibold tracking-tight lg:text-5xl">{game.name}</h2>
      </header>

      <div className="grid grid-cols-2 gap-4 lg:gap-8">
        {TEAM_TAGS.map((tag) => (
          <div
            key={tag}
            className={cn(
              "flex flex-col items-center gap-2 rounded-xl border-2 p-6 transition-opacity",
              TEAMS[tag].border,
              TEAMS[tag].soft,
              winner && winner !== tag && "opacity-40",
            )}
          >
            <p
              className={cn(
                "flex items-center gap-3 text-3xl font-bold lg:text-4xl",
                TEAMS[tag].text,
              )}
            >
              {winner === tag && <Trophy className="size-8" />}
              {TEAMS[tag].name}
            </p>
            <p className="text-lg tabular-nums text-muted-foreground">
              {counts[tag]} {counts[tag] === 1 ? "player" : "players"}
            </p>
          </div>
        ))}
      </div>

      <Rope score={game.score} className="h-6" />

      <footer className="flex items-center justify-between gap-4">
        <p aria-live="polite" className="text-lg tabular-nums text-muted-foreground lg:text-xl">
          {status}
        </p>
        {nextStep && (
          <Button size="lg" onClick={nextStep.run}>
            {nextStep.label}
          </Button>
        )}
      </footer>
    </article>
  );
}
