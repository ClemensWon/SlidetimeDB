import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { reducers, tables } from "@/module_bindings";
import { Check } from "lucide-react";
import { useReducer, useTable } from "spacetimedb/react";

const LETTERS = "ABCDEFGH";

const PHASE_LABEL = {
  Scheduled: "Not started",
  Ongoing: "Collecting answers",
  Analytics: "Results",
  Reveal: "Answer revealed",
} as const;

export function QuizPresenterSlide({ quizId }: { quizId: number }) {
  const [rows, isReady] = useTable(tables.quizView);
  const startQuiz = useReducer(reducers.startQuiz);
  const showResults = useReducer(reducers.showResults);
  const revealAnswers = useReducer(reducers.revealAnswers);

  if (!isReady) return <OptionPlaceholders />;

  const row = rows.find((quiz) => quiz.quiz.id === quizId);
  if (!row) return <p className="text-muted-foreground">No quiz available.</p>;

  const { quiz, responses } = row;
  // Rows arrive in no guaranteed order, so sort to keep A/B/C/D stable.
  const options = [...row.options].sort((a, b) => a.id - b.id);
  const phase = quiz.state.tag;

  const showBars = phase === "Analytics" || phase === "Reveal";
  const showAnswer = phase === "Reveal";

  const total = responses.length;
  const counts = new Map<number, number>();
  for (const r of responses) {
    counts.set(r.quizOptionId, (counts.get(r.quizOptionId) ?? 0) + 1);
  }
  const correctCount = options
    .filter((o) => o.isRight)
    .reduce((sum, o) => sum + (counts.get(o.id) ?? 0), 0);

  // One button walks the quiz through its phases.
  const nextStep = {
    Scheduled: { label: "Start quiz", run: () => startQuiz() },
    Ongoing: { label: "Show results", run: () => showResults() },
    Analytics: { label: "Reveal answer", run: () => revealAnswers() },
    Reveal: undefined,
  }[phase];

  const responsesLabel = `${total} ${total === 1 ? "response" : "responses"}`;
  const status = {
    Scheduled: "Waiting to start.",
    Ongoing: responsesLabel,
    Analytics: responsesLabel,
    Reveal: `${correctCount} of ${total} got it right`,
  }[phase];

  return (
    <article className="mx-auto flex min-h-full max-w-5xl flex-col justify-center gap-6 lg:gap-10">
      <header className="flex flex-col items-start gap-3">
        <Badge variant={phase === "Ongoing" ? "default" : "secondary"}>{PHASE_LABEL[phase]}</Badge>
        <h2 className="text-3xl font-semibold tracking-tight text-balance lg:text-5xl">
          {quiz.question}
        </h2>
      </header>

      {phase === "Scheduled" ? (
        <OptionPlaceholders />
      ) : (
        <ol aria-label="Answer options" className="grid gap-3 sm:grid-cols-2 lg:gap-4">
          {options.map((option, i) => {
            const count = counts.get(option.id) ?? 0;
            const percent = total > 0 ? Math.round((count / total) * 100) : 0;
            const correct = showAnswer && option.isRight;

            return (
              <li
                key={option.id}
                className={cn(
                  "relative flex min-h-20 items-center gap-4 overflow-hidden rounded-xl border-2 bg-background p-5 text-xl font-medium lg:min-h-24 lg:text-2xl",
                  correct && "border-emerald-500",
                  showAnswer && !option.isRight && "opacity-60",
                )}
              >
                {showBars && (
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-y-0 left-0 transition-[width] duration-500",
                      correct ? "bg-emerald-500/15" : "bg-primary/10",
                    )}
                    style={{ width: `${percent}%` }}
                  />
                )}

                <span
                  className={cn(
                    "relative flex size-10 shrink-0 items-center justify-center rounded-md border text-base font-semibold",
                    correct && "border-emerald-500 bg-emerald-500 text-white",
                  )}
                >
                  {correct ? <Check className="size-5" /> : LETTERS[i]}
                </span>

                <span className="relative flex-1">
                  {option.text}
                  {correct && <span className="sr-only"> (correct answer)</span>}
                </span>

                {showBars && (
                  <span className="relative text-right tabular-nums">
                    {percent}%
                    <span className="block text-sm text-muted-foreground">
                      {count} {count === 1 ? "vote" : "votes"}
                    </span>
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      )}

      <footer className="flex items-center justify-between gap-4">
        <p aria-live="polite" className="text-lg tabular-nums text-muted-foreground lg:text-xl">
          {status}
        </p>
        {nextStep && (
          <Button size="lg" onClick={nextStep.run}>
            {nextStep.label}
          </Button>
        )}
      </footer>
    </article>
  );
}

function OptionPlaceholders() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:gap-4">
      {Array.from({ length: 4 }, (_, i) => (
        <div key={i} className="h-20 animate-pulse rounded-xl bg-muted lg:h-24" />
      ))}
    </div>
  );
}
