import { DbReadAccess } from "../../domain/schema";

export function useTeamQuery(db: DbReadAccess) {
  function getByTugOfWarId(tugOfWarId: number) {
    return Array.from(db.team.tugOfWarId.filter(tugOfWarId));
  }

  return {
    getByTugOfWarId,
  };
}
