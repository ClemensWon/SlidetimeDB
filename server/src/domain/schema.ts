import type { ReducerCtx, ViewCtx } from "spacetimedb/server";

import { schema } from "spacetimedb/server";
import { deck } from "./tables/deck";
import { slide } from "./tables/slide";
import { participant } from "./tables/participant";
import { quiz } from "./tables/quiz";
import { quizResponse } from "./tables/quizResponse";
import { quizOption } from "./tables/quizOption";

export const tables = {
  deck,
  slide,
  participant,
  quiz,
  quizOption,
  quizResponse,
};
export const spacetimedb = schema(tables);

export type CommandCtx = ReducerCtx<typeof spacetimedb.schemaType>;
export type QueryCtx = ViewCtx<typeof spacetimedb.schemaType>;

export type DbReadAccess = QueryCtx["db"];
