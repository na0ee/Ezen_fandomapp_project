import type { HTMLAttributes } from "react";
import { useState } from "react";
import characterLayImage from "../../assets/chatbot/character-lay.png";
import characterLayAnimation from "../../assets/chatbot/character_ani_transparent.webp";

type CharacterLayProps = HTMLAttributes<HTMLDivElement> & {
  animated?: boolean;
};

export function CharacterLay({ animated = false, className = "", ...props }: CharacterLayProps) {
  const [animationFailed, setAnimationFailed] = useState(false);

  return (
    <div
      className={`relative h-16 w-11 shrink-0 ${className}`}
      data-chatbot-component="CharacterLay"
      role="img"
      aria-label="챗봇 레이 캐릭터"
      {...props}
    >
      {animated && !animationFailed ? (
        <>
          <img
            alt=""
            aria-hidden="true"
            className="h-full w-full object-contain motion-reduce:hidden"
            onError={() => setAnimationFailed(true)}
            src={characterLayAnimation}
          />
          <img
            alt=""
            aria-hidden="true"
            className="hidden h-full w-full object-contain motion-reduce:block"
            src={characterLayImage}
          />
        </>
      ) : (
        <img alt="" aria-hidden="true" className="h-full w-full object-contain" src={characterLayImage} />
      )}
    </div>
  );
}
