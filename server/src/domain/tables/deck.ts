import { t, table } from "spacetimedb/server";

export const deckState = t.enum("deckState", {
  prepared: t.unit(),
  lobby: t.unit(),
  ongoing: t.unit(),
  completed: t.unit(),
});

export const deck = table(
  { public: true },
  {
    id: t.u32().primaryKey(),
    currentSlide: t.u32(),
    presenter: t.option(t.identity()),
    state: deckState,
    name: t.string(),
  },
);
