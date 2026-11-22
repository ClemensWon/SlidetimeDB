import { spacetimedb } from "../../domain/schema";
import { useFreePointsCommand } from "../../services/commands/freePointsCommand";

export const claimPoins = spacetimedb.reducer({}, (ctx) => {
  const freePointsCommand = useFreePointsCommand(ctx);
  freePointsCommand.claimFreePoints();
});
