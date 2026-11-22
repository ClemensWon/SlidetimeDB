import { t } from "spacetimedb/server";
import { spacetimedb } from "../../domain/schema";
import { useQuizCommand } from "../../services/commands/quizCommand";

export const respondToQuiz = spacetimedb.reducer({ choiceId: t.u32() }, (ctx, { choiceId }) => {
  const quizCommand = useQuizCommand(ctx);
  quizCommand.respondToQuiz(choiceId);
});

export const revealAnswers = spacetimedb.reducer({}, (ctx) => {
  const quizCommand = useQuizCommand(ctx);
  quizCommand.revealCorrectAnswer();
});

export const showResults = spacetimedb.reducer({}, (ctx) => {
  const quizCommand = useQuizCommand(ctx);
  quizCommand.showResults();
});

export const startQuiz = spacetimedb.reducer({}, (ctx) => {
  const quizCommand = useQuizCommand(ctx);
  quizCommand.startQuiz();
});
