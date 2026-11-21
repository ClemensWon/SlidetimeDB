import { t } from "spacetimedb/server";
import { spacetimedb } from "../../../domain/schema";
import { usePresentationCommand } from "../../../services/commands/presentationCommand";

export const goToSlide = spacetimedb.reducer({ slideNumber: t.u32() }, (ctx, { slideNumber }) => {
  const presentationCommand = usePresentationCommand(ctx);
  presentationCommand.goToSlide(slideNumber);
});
