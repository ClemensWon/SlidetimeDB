import { usePresentationCommand } from "./services/presentationCommand";
import { spacetimedb } from "./domain/schema";
export { goToSlide } from "./api/reducer/goToSlite";
export { joinDeck } from "./api/reducer/joinDeck";
export { claimDeck} from "./api/reducer/claimDeck"

export default spacetimedb;

export const init = spacetimedb.init((ctx) => {
  const presentationCommand = usePresentationCommand(ctx);
  presentationCommand.init();
});
