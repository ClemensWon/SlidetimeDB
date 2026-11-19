import Markdown from "react-markdown";

type TextSlideProps = {
  content: string;
};
export function TextSlideContent(props: TextSlideProps) {
  return <Markdown>{props.content}</Markdown>;
}
