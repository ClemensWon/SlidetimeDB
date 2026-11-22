import Markdown from "react-markdown";

type TextSlideProps = {
  content: string;
};

export function TextSlideContent(props: TextSlideProps) {
  return (
    <div className="prose prose-xl dark:prose-invert max-w-none text-left">
      <Markdown>{props.content}</Markdown>
    </div>
  );
}
