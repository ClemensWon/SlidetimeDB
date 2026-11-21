import { spacetimedb } from "../../../domain/schema";
import { useQuizCommand } from "../../../services/commands/quizCommand";

export const showResults = spacetimedb.reducer({}, (ctx) => {
  const quizCommand = useQuizCommand(ctx);
  quizCommand.showResults();
});
