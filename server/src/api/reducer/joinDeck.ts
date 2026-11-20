import { t } from "spacetimedb/server";
import { spacetimedb } from "../../domain/schema";
import { useUserCommand } from "../../services/userCommand";

export const joinDeck = spacetimedb.reducer({ username: t.string() }, (ctx, { username }) => {
  const userCommand = useUserCommand(ctx);
  userCommand.createOrUpdateUser(username);
});
