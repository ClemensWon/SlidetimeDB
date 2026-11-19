import { t, table } from "spacetimedb/server";

export const deck = table(
  { public: true },
  {
    id: t.u32().primaryKey(),
    currentSlide: t.u32(),
    presenter: t.option(t.identity()),
  },
);
