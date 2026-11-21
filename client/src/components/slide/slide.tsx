import type { Slide } from "../../module_bindings/types";
import { QuizSlide } from "./quizSlide";
import { TextSlideContent } from "./text-slide";

type SlideProps = { slide: Slide };

export function SlideView({ slide }: SlideProps) {
  switch (slide.kind.tag) {
    case "Text":
      return <TextSlideContent content={slide.kind.value} />;
    case "Quiz":
      return <QuizSlide />;
  }
}
