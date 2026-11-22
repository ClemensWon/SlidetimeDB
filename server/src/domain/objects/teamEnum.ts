import { t } from "spacetimedb/server";

export const teamType = t.enum("teamType", {
  TeamA: t.unit(),
  TeamB: t.unit(),
});

export type TeamType = typeof teamType.type;
