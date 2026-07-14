import type { CSSProperties } from "react";

export type PerfumeRankItem = {
  id: string;
  rank: string;
  name: string;
  brand: string;
  category: string;
  description: string;
  image: string;
  imageWidth: string;
  imageClassName: string;
  selected?: boolean;
};

type PerfumeRankCardProps = {
  perfume: PerfumeRankItem;
  isSelected: boolean;
  heartSrc: string;
  heartSelectedSrc: string;
  onHeartToggle: () => void;
};

function PerfumeHeartButton({
  isSelected,
  heartSrc,
  heartSelectedSrc,
  onToggle,
}: {
  isSelected: boolean;
  heartSrc: string;
  heartSelectedSrc: string;
  onToggle: () => void;
}) {
  const selectedHeartStyle: CSSProperties = {
    WebkitMask: `url(${heartSelectedSrc}) center / contain no-repeat`,
    mask: `url(${heartSelectedSrc}) center / contain no-repeat`,
  };

  return (
    <button
      aria-label={isSelected ? "찜 해제" : "찜하기"}
      aria-pressed={isSelected}
      className="absolute bottom-4 right-4 size-6"
      onClick={(event) => {
        event.stopPropagation();
        onToggle();
      }}
      onMouseDown={(event) => event.stopPropagation()}
      type="button"
    >
      {isSelected ? (
        <span className="block size-6 bg-point-orange" style={selectedHeartStyle} />
      ) : (
        <img alt="" className="block size-6" src={heartSrc} />
      )}
    </button>
  );
}

export function PerfumeRankCard({
  perfume,
  isSelected,
  heartSrc,
  heartSelectedSrc,
  onHeartToggle,
}: PerfumeRankCardProps) {
  return (
    <article
      aria-label={`${perfume.rank} ${perfume.brand} ${perfume.name}. ${perfume.description}`}
      className="relative h-[288px] w-[262px] shrink-0 overflow-hidden rounded-card border-[0.8px] border-light-grey bg-off-white"
    >
      <span className="absolute left-1/2 top-10 -translate-x-1/2 rounded-full bg-off-black px-3.5 py-1.5 text-base font-semibold leading-none tracking-[-0.02em] text-off-white">
        {perfume.rank}
      </span>
      <div className="absolute left-1/2 top-[85px] flex h-[110px] w-20 -translate-x-1/2 items-end justify-center overflow-visible">
        <div className={`relative h-[110px] ${perfume.imageWidth} overflow-hidden`}>
          <img
            alt={`${perfume.brand} ${perfume.name}`}
            className={`absolute max-w-none ${perfume.imageClassName}`}
            src={perfume.image}
          />
        </div>
      </div>
      <div className="absolute inset-x-[22px] top-[211px] text-center">
        <p className="truncate text-base font-semibold leading-none tracking-[-0.02em] text-off-black">
          {perfume.name}
        </p>
        <p className="mt-1 text-xs font-medium leading-none tracking-[-0.02em] text-grey">{perfume.brand}</p>
      </div>
      <PerfumeHeartButton
        heartSelectedSrc={heartSelectedSrc}
        heartSrc={heartSrc}
        isSelected={isSelected}
        onToggle={onHeartToggle}
      />
    </article>
  );
}
