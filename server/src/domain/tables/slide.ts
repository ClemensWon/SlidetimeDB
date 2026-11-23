import { t, table } from "spacetimedb/server";

const slideKind = t.enum("slideKind", {
  text: t.string(),
  quiz: t.u32(),
  tugOfWar: t.u32(),
  code: t.string(),
  freePoints: t.u8(),
  keyConcepts: t.unit(),
});

export const slide = table(
  {
    name: "slide",
    public: true,
    cachePolicy: "required_in_memory",
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
