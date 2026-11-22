import { t, table } from "spacetimedb/server";

const tugOfWarState = t.enum("tugOfWarState", {
  scheduled: t.unit(),
  joiningTeams: t.unit(),
  ongoing: t.unit(),
  results: t.unit(),
});

export const tugOfWar = table(
  {
    public: true,
  },
  {
    id: t.u32().primaryKey(),
    name: t.string(),
    score: t.i32(),
    updateCount: t.u32(),
    state: tugOfWarState,
  },
);

type TugOfWarRow = typeof tugOfWar.rowType.type;
export type TugOfWarValues = Omit<TugOfWarRow, "score" | "state" | "updateCount">;
export type TugOfWarState = typeof tugOfWarState.type;
