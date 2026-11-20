import { spacetimedb } from "../../domain/schema";
import { usePresentationCommand } from "../../services/presentationCommand";

export const claimDeck = spacetimedb.reducer({}, (ctx) => {
    const presentationCommand = usePresentationCommand(ctx);
    presentationCommand.claimdDeck();
})