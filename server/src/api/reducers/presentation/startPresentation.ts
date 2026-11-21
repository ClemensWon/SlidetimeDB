import { spacetimedb } from "../../../domain/schema";
import { usePresentationCommand } from "../../../services/commands/presentationCommand";

export const startPresentation = spacetimedb.reducer({}, (ctx) => {
  const presentationCommand = usePresentationCommand(ctx);
  presentationCommand.startPresentation();
});
