import type { JSX } from "react";
import type { Slide } from "../../module_bindings/types";
import { TextSlideContent } from "./text-slide";

type SlideProps = { slide: Slide };

function slideContent(slide: Slide): JSX.Element {
  switch (slide.kind.tag) {
    case "Text":
      return <TextSlideContent content={slide.kind.value} />;
  }
}

export function SlideView(props: SlideProps) {
  return (
    <article className="prose prose-xl dark:prose-invert">
      <h1>{props.slide.title}</h1>
      {slideContent(props.slide)}
    </article>
  );
}
