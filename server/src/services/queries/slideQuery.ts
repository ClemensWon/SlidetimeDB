import { SenderError } from "spacetimedb";
import type { DbReadAccess } from "../../domain/schema";

export function useSlideQuery(db: DbReadAccess) {
  function getBySlidenumberOrThrow(slideNumber: number) {
    const slide = db.slide.slideNumber.find(slideNumber);
    if (slide === null) {
      throw new SenderError(`slide not found with number ${slideNumber}`);
    }
    return slide;
  }

  return {
    getBySlidenumberOrThrow,
  };
}
