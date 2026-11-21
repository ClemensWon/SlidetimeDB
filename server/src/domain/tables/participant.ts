import { t, table } from "spacetimedb/server";

export const participant = table(
  {
    public: true,
  },
  {
    identity: t.identity().primaryKey(),
    name: t.string(),
    score: t.i32(),
  },
);

export type ParticipantRow = typeof participant.rowType.type;
