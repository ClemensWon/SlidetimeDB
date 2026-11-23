import { useCallback, useMemo, useState } from "react";
import { tables } from "@/module_bindings";
import { useTable } from "spacetimedb/react";

type FloatingReaction = { id: number; emoji: string; left: number };

const MAX_ON_SCREEN = 40;
let nextId = 0;

export function ReactionOverlay() {
  const [floating, setFloating] = useState<FloatingReaction[]>([]);

  const spawn = useCallback((emoji: string) => {
    const reaction = { id: nextId++, emoji, left: 5 + Math.random() * 90 };
    setFloating((current) => [...current.slice(-(MAX_ON_SCREEN - 1)), reaction]);
  }, []);

  const callbacks = useMemo(
    () => ({ onInsert: (row: { emoji: string }) => spawn(row.emoji) }),
    [spawn],
  );
  useTable(tables.reaction, callbacks);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {floating.map((reaction) => (
        <span
          key={reaction.id}
          className="absolute bottom-16 animate-[float-up_2.5s_ease-out_forwards] text-4xl lg:text-6xl"
          style={{ left: `${reaction.left}%` }}
          onAnimationEnd={() =>
            setFloating((current) => current.filter((r) => r.id !== reaction.id))
          }
        >
          {reaction.emoji}
        </span>
      ))}
    </div>
  );
}
