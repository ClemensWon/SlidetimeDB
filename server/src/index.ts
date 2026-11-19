import { usePresentationCommand } from "./services/presentationCommand";
import { spacetimedb } from "./domain/schema";
export { goToSlide } from "./api/reducer/goToSlite";

export default spacetimedb;

export const init = spacetimedb.init((ctx) => {
  const presentationCommand = usePresentationCommand(ctx);
  presentationCommand.init();
});
