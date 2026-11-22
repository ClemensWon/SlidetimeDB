import type { SlideValues } from "../domain/tables/slide";

export const slides: SlideValues[] = [
  {
    title: "Hello",
    kind: {
      tag: "text",
      value: `a presentation about *SpacetimeDB* in *SpacetimeDB*`,
    },
  },
  {
    title: "Your screen just changed",
    kind: {
      tag: "text",
      value: "nobody wrote an api for that",
    },
  },
  {
    title: "Performance of Languages",
    kind: {
      tag: "quiz",
      value: 0,
    },
  },
  {
    title: "Lets do a performance test",
    kind: {
      tag: "tugOfWar",
      value: 0,
    },
  },
  {
    title: "and another one",
    kind: {
      tag: "tugOfWar",
      value: 1,
    },
  },
];
