import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";

type SlideHeaderProps = {
  title: string;
  slideNumber: number; // 0-based
  slideCount: number;
  actions?: ReactNode;
};

export function SlideHeader({ title, slideNumber, slideCount, actions }: SlideHeaderProps) {
  return (
    <Card className="flex flex-row items-center gap-4 px-4 py-3 lg:px-6 lg:py-4">
      <h1 className="min-w-0 flex-1 truncate text-xl font-bold lg:text-3xl">{title}</h1>
      <span className="shrink-0 text-sm tabular-nums text-muted-foreground lg:text-base">
        {slideNumber + 1} / {slideCount}
      </span>
      {actions}
    </Card>
  );
}