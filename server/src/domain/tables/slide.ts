import { t, table } from "spacetimedb/server";

const slideType = t.enum("slideKind", {
  chapter: t.unit(),
  text: t.string(),
});

export const slide = table(
  {
    name: "slide",
    public: true,
  },
  {
    id: t.u32().primaryKey(),
    deckId: t.u32(),
    title: t.string(),
    kind: slideType,
  },
);

export type SlideRow = typeof slide.rowType.type;
export type SlideValues = Omit<SlideRow, "id" | "deckId">;
