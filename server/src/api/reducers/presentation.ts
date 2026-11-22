import { t } from "spacetimedb/server";
import { spacetimedb } from "../../domain/schema";
import { usePresentationCommand } from "../../services/commands/presentationCommand";
import { useUserCommand } from "../../services/commands/userCommand";

export const claimDeck = spacetimedb.reducer({}, (ctx) => {
  const presentationCommand = usePresentationCommand(ctx);
  presentationCommand.claimdDeck();
});

export const goToSlide = spacetimedb.reducer({ slideNumber: t.u32() }, (ctx, { slideNumber }) => {
  const presentationCommand = usePresentationCommand(ctx);
  presentationCommand.goToSlide(slideNumber);
});

export const joinDeck = spacetimedb.reducer({ username: t.string() }, (ctx, { username }) => {
  const userCommand = useUserCommand(ctx);
  userCommand.createOrUpdateUser(username);
});

export const startPresentation = spacetimedb.reducer({}, (ctx) => {
  const presentationCommand = usePresentationCommand(ctx);
  presentationCommand.startPresentation();
});
