import type { HTMLAttributes, ReactNode } from "react";

type ChatBubbleVariant = "bot" | "user" | "loading";

type ChatBubbleProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
  variant?: ChatBubbleVariant;
};

const variantStyles: Record<Exclude<ChatBubbleVariant, "loading">, string> = {
  bot: "border border-light-grey bg-off-white text-off-black",
  user: "ml-auto w-fit self-end bg-light-grey text-off-black",
};

export function ChatBubble({ children, variant = "bot", className = "", ...props }: ChatBubbleProps) {
  if (variant === "loading") {
    return (
      <div
        aria-label="응답 작성 중"
        className={`flex h-[55px] items-center gap-1.5 ${className}`}
        data-chatbot-component="Bubble"
        {...props}
      >
        <span className="size-1.5 animate-[typingBounce_1s_ease-in-out_infinite] rounded-full bg-grey [animation-delay:0ms]" />
        <span className="size-1.5 animate-[typingBounce_1s_ease-in-out_infinite] rounded-full bg-grey [animation-delay:150ms]" />
        <span className="size-1.5 animate-[typingBounce_1s_ease-in-out_infinite] rounded-full bg-grey [animation-delay:300ms]" />
      </div>
    );
  }

  return (
    <div
      className={`flex min-h-[55px] max-w-[337px] items-center rounded-[20px] px-[22px] py-4 font-pretendard text-[18px] font-normal leading-[23px] tracking-[-0.02em] ${variantStyles[variant]} ${className}`}
      data-chatbot-component="Bubble"
      {...props}
    >
      {children}
    </div>
  );
}
