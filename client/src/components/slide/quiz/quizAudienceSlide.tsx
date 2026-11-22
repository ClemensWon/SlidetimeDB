import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { reducers, tables } from "@/module_bindings";
import { Check, X } from "lucide-react";
import { useReducer, useSpacetimeDB, useTable } from "spacetimedb/react";

const LETTERS = "ABCDEFGH";

const PHASE_LABEL = {
  Scheduled: "Starting soon",
  Ongoing: "Answer now",
  Analytics: "Results",
  Reveal: "Answer revealed",
} as const;

export function QuizAudienceSlide({ quizId }: { quizId: number }) {
  const { identity } = useSpacetimeDB();
  const [rows, isReady] = useTable(tables.quizView);
  const respondToQuiz = useReducer(reducers.respondToQuiz);

  if (!isReady) return <OptionPlaceholders />;

  const row = rows.find((quiz) => quiz.quiz.id === quizId);
  if (!row) return <p className="text-muted-foreground">No quiz available.</p>;

  const { quiz, responses } = row;
  // Rows arrive in no guaranteed order, so sort to keep A/B/C/D stable.
  const options = [...row.options].sort((a, b) => a.id - b.id);
  const phase = quiz.state.tag;

  const myResponse = identity ? responses.find((r) => r.identity.isEqual(identity)) : undefined;
  const myOption = options.find((o) => o.id === myResponse?.quizOptionId);

  const canAnswer = phase === "Ongoing" && !myResponse;
  const showResults = phase === "Analytics" || phase === "Reveal";
  const showAnswer = phase === "Reveal";

  const total = responses.length;
  const counts = new Map<number, number>();
  for (const r of responses) {
    counts.set(r.quizOptionId, (counts.get(r.quizOptionId) ?? 0) + 1);
  }

  const status = {
    Scheduled: "Get ready, the options appear when the quiz starts.",
    Ongoing: myResponse
      ? "Answer locked in. Waiting for everyone else…"
      : "Tap an option to answer.",
    Analytics: `${total} ${total === 1 ? "response" : "responses"}`,
    Reveal: !myOption
      ? "You didn't answer this one."
      : myOption.isRight
        ? "You got it right!"
        : "Not quite this time.",
  }[phase];

  return (
    <article className="mx-auto flex min-h-full max-w-4xl flex-col justify-center gap-6 lg:gap-8">
      <header className="flex flex-col items-start gap-3">
        <Badge variant={phase === "Ongoing" ? "default" : "secondary"}>{PHASE_LABEL[phase]}</Badge>
        <h2 className="text-2xl font-semibold tracking-tight text-balance lg:text-4xl">
          {quiz.question}
        </h2>
      </header>

      {phase === "Scheduled" ? (
        <OptionPlaceholders />
      ) : (
        <div
          role="group"
          aria-label="Answer options"
          className="grid gap-3 sm:grid-cols-2 lg:gap-4"
        >
          {options.map((option, i) => {
            const selected = option.id === myResponse?.quizOptionId;
            const count = counts.get(option.id) ?? 0;
            const percent = total > 0 ? Math.round((count / total) * 100) : 0;
            const correct = showAnswer && option.isRight;
            const wrongPick = showAnswer && selected && !option.isRight;

            return (
              <button
                key={option.id}
                type="button"
                disabled={!canAnswer}
                aria-pressed={selected}
                onClick={() => respondToQuiz({ choiceId: option.id })}
                className={cn(
                  "relative flex min-h-16 items-center gap-3 overflow-hidden rounded-xl border-2 bg-background p-4 text-left text-base font-medium transition-colors lg:min-h-20 lg:text-lg",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  canAnswer && "cursor-pointer hover:border-primary hover:bg-accent",
                  selected && "border-primary",
                  correct && "border-emerald-500",
                  wrongPick && "border-destructive",
                  showAnswer && !option.isRight && !selected && "opacity-60",
                )}
              >
                {showResults && (
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
                    "relative flex size-8 shrink-0 items-center justify-center rounded-md border text-sm font-semibold",
                    selected && "border-primary bg-primary text-primary-foreground",
                    correct && "border-emerald-500 bg-emerald-500 text-white",
                    wrongPick && "border-destructive bg-destructive text-white",
                  )}
                >
                  {correct ? (
                    <Check className="size-4" />
                  ) : wrongPick ? (
                    <X className="size-4" />
                  ) : (
                    LETTERS[i]
                  )}
                </span>

                <span className="relative flex-1">
                  {option.text}
                  {correct && <span className="sr-only"> (correct answer)</span>}
                </span>

                {showResults && (
                  <span className="relative text-sm tabular-nums text-muted-foreground">
                    {percent}%
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      <p aria-live="polite" className="text-sm text-muted-foreground lg:text-base">
        {status}
      </p>
    </article>
  );
}

function OptionPlaceholders() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:gap-4">
      {Array.from({ length: 4 }, (_, i) => (
        <div key={i} className="h-16 animate-pulse rounded-xl bg-muted lg:h-20" />
      ))}
    </div>
  );
}
