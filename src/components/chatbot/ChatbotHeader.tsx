import { ChevronLeft } from "lucide-react";

type ChatbotHeaderProps = {
  onBack: () => void;
};

export function ChatbotHeader({ onBack }: ChatbotHeaderProps) {
  return (
    <header
      className="relative flex h-14 w-full shrink-0 items-center bg-off-white px-5"
      data-chatbot-component="ChatbotHeader"
      data-node-id="1110:20626"
    >
      <button
        aria-label="이전 페이지"
        className="relative z-10 flex size-6 items-center justify-center"
        onClick={onBack}
        type="button"
      >
        <ChevronLeft size={24} strokeWidth={1.6} />
      </button>
      <h1 className="absolute inset-x-0 text-center font-pretendard text-2xl font-semibold leading-[26px] tracking-[-0.02em] text-off-black">
        챗봇레이
      </h1>
    </header>
  );
}
