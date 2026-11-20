import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const REACTIONS = ["👍", "❤️", "😂", "🎉", "🤯", "👏"] as const;
export type Reaction = (typeof REACTIONS)[number];

type ReactionBarProps = { onReact: (emoji: Reaction) => void };

export function ReactionBar({ onReact }: ReactionBarProps) {
  return (
    <Card className="flex flex-row justify-center gap-1 p-2 sm:gap-2">
      {REACTIONS.map((emoji) => (
        <Button
          key={emoji}
          variant="ghost"
          className="h-12 max-w-16 flex-1 px-0 text-2xl transition-transform active:scale-125"
          aria-label={`React with ${emoji}`}
          onClick={() => onReact(emoji)}
        >
          {emoji}
        </Button>
      ))}
    </Card>
  );
}