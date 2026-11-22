import { t, table } from "spacetimedb/server";
import { teamType } from "../objects/teamEnum";

export const team = table(
  {
    public: true,
  },
  {
    id: t.u32().primaryKey(),
    tugOfWarId: t.u32().index(),
    members: t.array(t.identity()),
    name: t.string(),
    teamType: teamType,
  },
);

type TeamRow = typeof team.rowType.type;
export type TeamValues = Omit<TeamRow, "members">;
