import type { CommandCtx } from "../domain/schema";
import type { UserRow } from "../domain/tables/user";

export function useUserCommand(ctx: CommandCtx) {
  function createOrUpdateUser(username: string) {
    const callingUserIdentity = ctx.sender;
    const userRow: UserRow = {
      userName: username,
      score: 0,
      identity: callingUserIdentity,
    };

    const existingUser = ctx.db.user.identity.find(callingUserIdentity);
    if (existingUser === null) {
      ctx.db.user.insert(userRow);
    } else {
      ctx.db.user.identity.update(userRow);
    }
  }

  return { createOrUpdateUser };
}
