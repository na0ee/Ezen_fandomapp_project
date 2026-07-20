import type { HTMLAttributes } from "react";

type ChatPerfumeCardProps = HTMLAttributes<HTMLElement> & {
  brand?: string;
  name?: string;
  keywords?: string[];
  imageSrc?: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
};

export function ChatPerfumeCard({
  brand = "LAYER Pick",
  name = "취향에 맞는 향수",
  keywords = [],
  imageSrc,
  ctaLabel = "향수 보기",
  onCtaClick,
  className = "",
  ...props
}: ChatPerfumeCardProps) {
  return (
    <article
      className={`flex w-full max-w-[337px] items-center gap-4 rounded-chip border border-light-grey bg-off-white p-[10px] ${className}`}
      data-chatbot-component="ChatPerfumeCard"
      {...props}
    >
      <div className="size-[92px] shrink-0 overflow-hidden rounded-xl bg-light2-grey">
        {imageSrc && <img alt="" className="h-full w-full object-cover" src={imageSrc} />}
      </div>
      <div className="flex min-w-0 flex-1 flex-col items-end gap-[18px]">
        <div className="flex w-full flex-col items-start gap-1.5">
          <p className="truncate font-pretendard text-xs font-medium leading-tight tracking-[-0.02em] text-grey">{brand}</p>
          <h3 className="truncate font-pretendard text-base font-semibold leading-none tracking-[-0.02em] text-off-black">
            {name}
          </h3>
          {keywords.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              {keywords.map((keyword) => (
                <span
                  className="font-pretendard text-xs font-medium leading-none tracking-[-0.02em] text-grey"
                  key={keyword}
                >
                  #{keyword}
                </span>
              ))}
            </div>
          )}
        </div>
        <button
          className="shrink-0 rounded-chip bg-off-black px-3.5 py-[5px] font-pretendard text-xs font-normal leading-none tracking-[-0.02em] text-off-white"
          onClick={onCtaClick}
          type="button"
        >
          {ctaLabel}
        </button>
      </div>
    </article>
  );
}
