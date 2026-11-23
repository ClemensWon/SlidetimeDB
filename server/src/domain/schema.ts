import type { ReducerCtx, ViewCtx } from "spacetimedb/server";

// presentation
import { schema } from "spacetimedb/server";
import { deck } from "./tables/deck";
import { slide } from "./tables/slide";
import { participant } from "./tables/participant";

// quiz
import { quiz } from "./tables/quiz";
import { quizResponse } from "./tables/quizResponse";
import { quizOption } from "./tables/quizOption";

// tugOfWar
import { tugOfWar } from "./tables/tugOfWar";
import { team } from "./tables/teamMembership";

// reaction
import { reaction } from "./tables/reaction";

export const tables = {
  deck,
  slide,
  participant,
  quiz,
  quizOption,
  quizResponse,
  tugOfWar,
  team,
  reaction,
};
export const spacetimedb = schema(tables);

export type CommandCtx = ReducerCtx<typeof spacetimedb.schemaType>;
export type QueryCtx = ViewCtx<typeof spacetimedb.schemaType>;

export type DbReadAccess = QueryCtx["db"];
