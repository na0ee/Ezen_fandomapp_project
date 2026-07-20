import type { HTMLAttributes } from "react";
import characterLayImage from "../../assets/chatbot/character-lay.png";

type CharacterLayProps = HTMLAttributes<HTMLDivElement>;

export function CharacterLay({ className = "", ...props }: CharacterLayProps) {
  return (
    <div
      className={`relative h-16 w-11 shrink-0 ${className}`}
      data-chatbot-component="CharacterLay"
      {...props}
    >
      <img alt="챗봇 레이 캐릭터" className="h-full w-full object-contain" src={characterLayImage} />
    </div>
  );
}
