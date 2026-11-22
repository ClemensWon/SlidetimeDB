import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { reducers } from "@/module_bindings";
import { useReducer } from "spacetimedb/react";
import { PHASE_LABEL, Rope, TEAM_TAGS, TEAMS, useTugOfWar } from "./shared";

export function TugOfWarAudienceSlide({ tugOfWarId }: { tugOfWarId: number }) {
  const { isReady, game, counts, myTeam, winner } = useTugOfWar(tugOfWarId);
  const joinTeam = useReducer(reducers.joinTeamTugOfWar);
  const pull = useReducer(reducers.pullOnTug);
  const [myPulls, setMyPulls] = useState(0);

  if (!isReady) return <div className="h-56 animate-pulse rounded-3xl bg-muted" />;
  if (!game) return <p className="text-muted-foreground">No tug of war available.</p>;

  const phase = game.state.tag;

  const status = {
    Scheduled: "Get ready, teams open soon.",
    JoiningTeams: myTeam
      ? `You're on ${TEAMS[myTeam].name}. Waiting for the start…`
      : "Tap a team to join.",
    Ongoing: myTeam ? `Your pulls: ${myPulls}` : "You're watching this round.",
    Results: !winner
      ? ""
      : myTeam === winner
        ? "Your team won! +3 points"
        : `${TEAMS[winner].name} won.`,
  }[phase];

  return (
    <article className="mx-auto flex min-h-full max-w-md flex-col justify-center gap-6">
      <header className="flex flex-col items-start gap-3">
        <Badge variant={phase === "Ongoing" ? "default" : "secondary"}>{PHASE_LABEL[phase]}</Badge>
        <h2 className="text-2xl font-semibold tracking-tight">Tug of war</h2>
      </header>

      {phase !== "Scheduled" && <Rope score={game.score} />}

      {phase === "JoiningTeams" && !myTeam && (
        <div role="group" aria-label="Teams" className="grid grid-cols-2 gap-3">
          {TEAM_TAGS.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => joinTeam({ teamType: { tag } })}
              className={cn(
                "flex h-32 touch-manipulation flex-col items-center justify-center gap-1 rounded-xl text-xl font-semibold transition-transform active:scale-95",
                TEAMS[tag].solid,
              )}
            >
              {TEAMS[tag].name}
              <span className="text-sm font-normal opacity-80">{counts[tag]} joined</span>
            </button>
          ))}
        </div>
      )}

      {phase === "Ongoing" && myTeam && (
        <button
          type="button"
          onClick={() => {
            setMyPulls((n) => n + 1);
            pull();
          }}
          className={cn(
            "h-56 touch-manipulation rounded-3xl text-5xl font-black tracking-widest select-none transition-transform active:scale-95",
            TEAMS[myTeam].solid,
          )}
        >
          PULL
        </button>
      )}

      <p aria-live="polite" className="text-base text-muted-foreground">
        {status}
      </p>
    </article>
  );
}
