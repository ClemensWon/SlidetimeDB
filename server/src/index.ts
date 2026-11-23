import { usePresentationCommand } from "./services/commands/presentationCommand";
import { spacetimedb } from "./domain/schema";
import { sendReaction } from "./api/reducers/reaction";

// reducers
export {
  goToSlide,
  joinDeck,
  claimDeck,
  startPresentation,
  resetPresentation,
} from "./api/reducers/presentation";
export { startQuiz, respondToQuiz, revealAnswers, showResults } from "./api/reducers/quiz";
export {
  joinTeamTugOfWar,
  openTeamsTugOfWar,
  pullOnTug,
  startTugOfWar,
} from "./api/reducers/tugOfWar";
export { claimPoins } from "./api/reducers/freePoints";
export { sendReaction };

// views
export { quizView } from "./api/views/quiz";

export default spacetimedb;

export const init = spacetimedb.init((ctx) => {
  const presentationCommand = usePresentationCommand(ctx);
  presentationCommand.init();
});
