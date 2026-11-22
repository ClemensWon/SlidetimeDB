import { useHighlightedCode } from "@/hooks/use-highlighted-code";
import { CodeBlock, CodeBlockContent, CodeBlockLine } from "@/components/ui/code-block";

type CodeSlideProps = {
  code: string;
};

export function CodeSlide(props: CodeSlideProps) {
  const lines = useHighlightedCode(props.code, "ts");

  return (
    <div className="w-full max-w-lg">
      <CodeBlock>
        <CodeBlockContent wrap={true} lineNumbers>
          {lines.map((line, index) => (
            <CodeBlockLine key={index}>{line}</CodeBlockLine>
          ))}
        </CodeBlockContent>
      </CodeBlock>
    </div>
  );
}
