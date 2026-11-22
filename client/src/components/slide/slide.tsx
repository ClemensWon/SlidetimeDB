import type { Deck, Participant, Slide } from "../../module_bindings/types";

import { useParticipant } from "@/hooks/useParticipant";
import { QuizAudienceSlide } from "./quiz/quizAudienceSlide";
import { TextSlideContent } from "./text-slide";
import { QuizPresenterSlide } from "./quiz/quizPresenterSlide";
import { TugOfWarPresenterSlide } from "./tugOfWar/TugOfWarPresenterSlide";
import { TugOfWarAudienceSlide } from "./tugOfWar/TugOfWarAudienceSlide";
import { CodeSlide } from "./code-slide";

type SlideProps = { slide: Slide; deck: Deck; particpiants: readonly Participant[] };

export function SlideView(props: SlideProps) {
  const { isPresenter } = useParticipant(props.deck, props.particpiants);
  switch (props.slide.kind.tag) {
    case "Text":
      return <TextSlideContent content={props.slide.kind.value} />;
    case "Code":
      return <CodeSlide code={props.slide.kind.value} />;
    case "Quiz":
      return isPresenter ? (
        <QuizPresenterSlide quizId={props.slide.kind.value} />
      ) : (
        <QuizAudienceSlide quizId={props.slide.kind.value} />
      );
    case "TugOfWar":
      return isPresenter ? (
        <TugOfWarPresenterSlide tugOfWarId={props.slide.kind.value} />
      ) : (
        <TugOfWarAudienceSlide tugOfWarId={props.slide.kind.value} />
      );
  }
}
