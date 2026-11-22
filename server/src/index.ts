import { usePresentationCommand } from "./services/commands/presentationCommand";
import { spacetimedb } from "./domain/schema";

// reducers
export { goToSlide, joinDeck, claimDeck, startPresentation } from "./api/reducers/presentation";
export { startQuiz, respondToQuiz, revealAnswers, showResults } from "./api/reducers/quiz";
export {
  joinTeamTugOfWar,
  openTeamsTugOfWar,
  pullOnTug,
  startTugOfWar,
} from "./api/reducers/tugOfWar";

// views

export { quizView } from "./api/views/quiz";

export default spacetimedb;

export const init = spacetimedb.init((ctx) => {
  const presentationCommand = usePresentationCommand(ctx);
  presentationCommand.init();
});
