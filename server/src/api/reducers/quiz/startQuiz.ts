import { spacetimedb } from "../../../domain/schema";
import { useQuizCommand } from "../../../services/commands/quizCommand";

export const startQuiz = spacetimedb.reducer({}, (ctx) => {
  const quizCommand = useQuizCommand(ctx);
  quizCommand.startQuiz();
});
