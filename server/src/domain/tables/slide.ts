import { t, table } from "spacetimedb/server";

const slideKind = t.enum("slideKind", {
  chapter: t.unit(),
  text: t.string(),
});

export const slide = table(
  {
    name: "slide",
    public: true,
  },
  {
    slideNumber: t.u32().primaryKey(),
    deckId: t.u32(),
    title: t.string(),
    kind: slideKind,
  },
);

export type SlideRow = typeof slide.rowType.type;
export type SlideValues = Omit<SlideRow, "slideNumber" | "deckId">;
