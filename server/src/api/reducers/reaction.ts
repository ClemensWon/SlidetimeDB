import { SenderError, t } from "spacetimedb/server";
import { spacetimedb } from "../../domain/schema";

const REACTIONS = new Set(["👍", "❤️", "😂", "🎉", "🤯", "👏"]);

export const sendReaction = spacetimedb.reducer({ emoji: t.string() }, (ctx, { emoji }) => {
  if (!REACTIONS.has(emoji)) {
    throw new SenderError("invalid reaction");
  }
  ctx.db.reaction.insert({ emoji });
});
