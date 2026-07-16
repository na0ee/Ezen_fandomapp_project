import type { InputHTMLAttributes, KeyboardEvent, Ref } from "react";
import { ChatbotSendIcon } from "../icons/ChatbotSendIcon";

type ChatInputVariant = "default" | "focused" | "typing";

type ChatInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  variant?: ChatInputVariant;
  onSend?: () => void;
  inputRef?: Ref<HTMLInputElement>;
};

const variantStyles: Record<ChatInputVariant, string> = {
  default: "bg-[#ededed]",
  focused: "bg-[#ededed] ring-1 ring-off-black",
  typing: "bg-[#ededed] ring-1 ring-off-black",
};

export function ChatInput({
  variant = "default",
  className = "",
  placeholder = "메시지를 입력하세요",
  onSend,
  inputRef,
  onKeyDown,
  ...props
}: ChatInputProps) {
  const hasValue = typeof props.value === "string" && props.value.length > 0;
  const resolvedVariant = hasValue ? "typing" : variant;

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !event.nativeEvent.isComposing) {
      event.preventDefault();
      onSend?.();
    }
    onKeyDown?.(event);
  };

  return (
    <div
      className={`flex h-[50px] w-full items-center gap-[15px] rounded-[32px] pl-4 pr-[9px] ${variantStyles[resolvedVariant]} ${className}`}
      data-chatbot-component="ChatInput"
    >
      <input
        className="h-[23px] min-w-0 flex-1 bg-transparent font-pretendard text-[18px] font-normal leading-[23px] tracking-[-0.02em] text-off-black outline-none placeholder:text-[#4d4d4d]"
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        ref={inputRef}
        {...props}
      />
      <button
        aria-label="메시지 보내기"
        className="flex size-8 shrink-0 items-center justify-center text-off-black disabled:text-grey"
        disabled={props.disabled}
        onClick={onSend}
        type="button"
      >
        <ChatbotSendIcon />
      </button>
    </div>
  );
}
