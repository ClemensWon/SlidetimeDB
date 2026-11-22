import { Identity, SenderError } from "spacetimedb";
import { DbReadAccess } from "../../domain/schema";

export function useParticipantsQuery(db: DbReadAccess) {
  function getByIdentityOrThrow(identity: Identity) {
    const participant = db.participant.identity.find(identity);
    if (participant === null) {
      throw new SenderError("participant not found");
    }
    return participant;
  }

  return {
    getByIdentityOrThrow,
  };
}
