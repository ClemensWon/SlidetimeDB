import { t, table } from "spacetimedb/server";

export const reaction = table(
  {
    event: true,
    public: true,
  },
  {
    emoji: t.string(),
  },
);
