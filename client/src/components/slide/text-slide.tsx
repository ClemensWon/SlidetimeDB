import Markdown from "react-markdown";

type TextSlideProps = {
  content: string;
};

export function TextSlideContent(props: TextSlideProps) {
  return (
    <article className="prose prose-lg max-w-none dark:prose-invert lg:prose-xl">
      <Markdown>{props.content}</Markdown>
    </article>
  );
}
