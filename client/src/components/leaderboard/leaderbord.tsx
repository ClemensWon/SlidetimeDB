import { Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { Participant } from "@/module_bindings/types";

export type Player = { id: string; name: string; score: number };

type LeaderboardProps = { players: readonly Participant[] };

function PlayerList({ players }: LeaderboardProps) {
  const sorted = [...players].sort((a, b) => b.score - a.score);

  return (
    <ol className="space-y-1">
      {sorted.map((player, index) => (
        <li
          key={player.identity.toString()}
          className="flex items-center gap-3 rounded-md px-3 py-2 odd:bg-muted/50"
        >
          <span className="w-6 text-right tabular-nums text-muted-foreground">{index + 1}</span>
          <span className="min-w-0 flex-1 truncate font-medium">{player.name}</span>
          <span className="font-semibold tabular-nums">{player.score}</span>
        </li>
      ))}
    </ol>
  );
}

/** Sidebar version for large screens */
export function Leaderboard({ players }: LeaderboardProps) {
  return (
    <Card className="flex h-full flex-col gap-3 p-4">
      <h2 className="flex items-center gap-2 text-lg font-bold">
        <Trophy className="size-5" />
        Leaderboard
      </h2>
      <ScrollArea className="min-h-0 flex-1">
        <PlayerList players={players} />
      </ScrollArea>
    </Card>
  );
}

/** Trophy button + slide-in sheet for small screens */
export function LeaderboardSheet({ players }: LeaderboardProps) {
  return (
    <Sheet>
      <SheetTrigger>
        <Button
          variant="outline"
          size="icon"
          className="shrink-0 lg:hidden"
          aria-label="Show leaderboard"
        >
          <Trophy />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80 max-w-[85vw]">
        <SheetHeader>
          <SheetTitle>Leaderboard</SheetTitle>
          <SheetDescription>Points earned in the games</SheetDescription>
        </SheetHeader>
        <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-4">
          <PlayerList players={players} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
