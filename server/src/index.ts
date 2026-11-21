import { usePresentationCommand } from "./services/commands/presentationCommand";
import { spacetimedb } from "./domain/schema";

// reducers
export { goToSlide } from "./api/reducers/presentation/goToSlite";
export { joinDeck } from "./api/reducers/presentation/joinDeck";
export { claimDeck } from "./api/reducers/presentation/claimDeck";
export { startPresentation } from "./api/reducers/presentation/startPresentation";
export { revealAnswers } from "./api/reducers/quiz/revealAnswers";
export { showResults } from "./api/reducers/quiz/showResults";
export { respondToQuiz } from "./api/reducers/quiz/respondToQuiz";

// views

export { quizView } from "./api/views/quiz";

export default spacetimedb;

export const init = spacetimedb.init((ctx) => {
  const presentationCommand = usePresentationCommand(ctx);
  presentationCommand.init();
});
