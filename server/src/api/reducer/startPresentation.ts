import { spacetimedb } from "../../domain/schema";
import { usePresentationCommand } from "../../services/presentationCommand";

export const startPresentation = spacetimedb.reducer({}, (ctx) => {
  const presentationCommand = usePresentationCommand(ctx);
  presentationCommand.startPresentation();
});
