import type { ReactNode } from "react";
import { CharacterLay } from "./CharacterLay";
import { ChatBubble } from "./ChatBubble";
import { QuickCategory } from "./QuickCategory";

type BotTurnChip = {
  label: string;
  variant?: "default" | "selected";
};

type BotTurnProps = {
  lines: string[];
  chips?: BotTurnChip[];
  onChipClick?: (label: string) => void;
  children?: ReactNode;
};

export function BotTurn({ lines, chips, onChipClick, children }: BotTurnProps) {
  return (
    <div className="flex w-full items-start gap-[13px]" data-chatbot-component="BotTurn">
      <CharacterLay />
      <div className="flex min-w-0 flex-1 flex-col gap-4">
        <ChatBubble className="w-full">
          <span className="block">
            {lines.map((line, index) => (
              <span className="block" key={index}>
                {line}
              </span>
            ))}
          </span>
        </ChatBubble>
        {chips && chips.length > 0 && (
          <div className="flex w-full flex-wrap items-start gap-2">
            {chips.map((chip) => (
              <QuickCategory
                key={chip.label}
                label={chip.label}
                onClick={() => onChipClick?.(chip.label)}
                variant={chip.variant ?? "default"}
              />
            ))}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
