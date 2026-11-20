import { t, table } from "spacetimedb/server";

export const user = table(
  {
    public: true,
  },
  {
    identity: t.identity().primaryKey(),
    userName: t.string(),
    score: t.i32(),
  },
);

export type UserRow = typeof user.rowType.type;
