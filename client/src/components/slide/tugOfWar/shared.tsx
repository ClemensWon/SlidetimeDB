import { cn } from "@/lib/utils";
import { tables } from "@/module_bindings";
import { useSpacetimeDB, useTable } from "spacetimedb/react";

// Must match the win threshold in pullTug on the server.
export const WIN_SCORE = 20;

export const TEAMS = {
  TeamA: {
    name: "Team A",
    solid: "bg-sky-500 text-white",
    border: "border-sky-500",
    soft: "bg-sky-500/10",
    text: "text-sky-500",
  },
  TeamB: {
    name: "Team B",
    solid: "bg-rose-500 text-white",
    border: "border-rose-500",
    soft: "bg-rose-500/10",
    text: "text-rose-500",
  },
} as const;

export type TeamTag = keyof typeof TEAMS;
export const TEAM_TAGS: TeamTag[] = ["TeamA", "TeamB"];

export const PHASE_LABEL = {
  Scheduled: "Starting soon",
  JoiningTeams: "Pick a team",
  Ongoing: "Pull!",
  Results: "Results",
} as const;

export function useTugOfWar(tugOfWarId: number) {
  const { identity } = useSpacetimeDB();
  const [games, gamesReady] = useTable(tables.tugOfWar);
  const [teams, teamsReady] = useTable(tables.team);

  const game = games.find((g) => g.id === tugOfWarId);

  const counts: Record<TeamTag, number> = { TeamA: 0, TeamB: 0 };
  let myTeam: TeamTag | undefined;
  for (const team of teams) {
    if (team.tugOfWarId !== tugOfWarId) continue;
    counts[team.teamType.tag] = team.members.length;
    if (identity && team.members.some((member) => member.isEqual(identity))) {
      myTeam = team.teamType.tag;
    }
  }

  // Team A pulls the score up, Team B pulls it down.
  const winner: TeamTag | undefined =
    game?.state.tag === "Results" ? (game.score > 0 ? "TeamA" : "TeamB") : undefined;

  return { isReady: gamesReady && teamsReady, game, counts, myTeam, winner };
}

export function Rope({ score, className }: { score: number; className?: string }) {
  const clamped = Math.max(-WIN_SCORE, Math.min(WIN_SCORE, score));
  // Team A sits on the left, so a rising score moves the knot left.
  const position = 50 - (clamped / WIN_SCORE) * 50;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between text-sm font-semibold">
        <span className={TEAMS.TeamA.text}>{TEAMS.TeamA.name}</span>
        <span className={TEAMS.TeamB.text}>{TEAMS.TeamB.name}</span>
      </div>
      <div
        role="img"
        aria-label={`Rope position ${score} of ${WIN_SCORE}`}
        className={cn("relative mx-4 h-4 rounded-full bg-muted", className)}
      >
        <div className="absolute inset-y-0 left-0 w-1/2 rounded-l-full bg-sky-500/25" />
        <div className="absolute inset-y-0 right-0 w-1/2 rounded-r-full bg-rose-500/25" />
        <div className="absolute -inset-y-2 left-1/2 w-0.5 -translate-x-1/2 bg-foreground/40" />
        <div
          className="absolute top-1/2 size-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-background bg-foreground shadow transition-[left] duration-150"
          style={{ left: `${position}%` }}
        />
      </div>
    </div>
  );
}
