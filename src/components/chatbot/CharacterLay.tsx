import type { HTMLAttributes } from "react";
import { useState } from "react";
import characterLayImage from "../../assets/chatbot/character-lay.png";
import characterLayVideo from "../../assets/chatbot/character_ani_transparent.webm";

type CharacterLayProps = HTMLAttributes<HTMLDivElement> & {
  animated?: boolean;
};

export function CharacterLay({ animated = false, className = "", ...props }: CharacterLayProps) {
  const [videoFailed, setVideoFailed] = useState(false);

  return (
    <div
      className={`relative h-16 w-11 shrink-0 ${className}`}
      data-chatbot-component="CharacterLay"
      role="img"
      aria-label="챗봇 레이 캐릭터"
      {...props}
    >
      {animated && !videoFailed ? (
        <>
          <video
            aria-hidden="true"
            autoPlay
            className="h-full w-full object-contain motion-reduce:hidden"
            loop
            muted
            onError={() => setVideoFailed(true)}
            playsInline
            poster={characterLayImage}
            preload="metadata"
            src={characterLayVideo}
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
