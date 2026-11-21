import type { CommandCtx } from "../../domain/schema";
import type { ParticipantRow } from "../../domain/tables/participant";

export function useUserCommand(ctx: CommandCtx) {
  function createOrUpdateUser(username: string) {
    const callingUserIdentity = ctx.sender;
    const userRow: ParticipantRow = {
      name: username,
      score: 0,
      identity: callingUserIdentity,
    };

    const existingUser = ctx.db.participant.identity.find(callingUserIdentity);
    if (existingUser === null) {
      ctx.db.participant.insert(userRow);
    } else {
      ctx.db.participant.identity.update(userRow);
    }
  }

  return { createOrUpdateUser };
}
