import { CharacterLay } from "./CharacterLay";
import { ChatBubble } from "./ChatBubble";
import { QuickCategoryGroup } from "./QuickCategoryGroup";

type ChatbotIntroProps = {
  onChipClick?: (label: string) => void;
};

export function ChatbotIntro({ onChipClick }: ChatbotIntroProps) {
  return (
    <section className="w-full" data-chatbot-component="ChatbotIntro" data-node-id="1110:20630">
      <div className="flex w-full items-start gap-[13px]" data-node-id="1110:20631">
        <CharacterLay data-node-id="1110:20632" />
        <div className="flex min-w-0 flex-1 flex-col gap-4" data-node-id="1110:20634">
          <ChatBubble className="w-fit self-start" data-node-id="1110:20635">
            안녕하세요. 저는 챗봇 레이예요.
          </ChatBubble>
          <ChatBubble className="w-full" data-node-id="1110:20636">
            아래 메뉴를선택하거나, 자유롭게 질문해 주세요.
          </ChatBubble>
          <QuickCategoryGroup onChipClick={onChipClick} />
        </div>
      </div>
    </section>
  );
}
