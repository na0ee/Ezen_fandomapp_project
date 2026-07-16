import { HeartButton } from "../ui/HeartButton";

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
  onHeartToggle: () => void;
};

function PerfumeHeartButton({
  isSelected,
  onToggle,
}: {
  isSelected: boolean;
  onToggle: () => void;
}) {
  return (
    <HeartButton
      aria-label={isSelected ? "찜 해제" : "찜하기"}
      className="absolute bottom-4 right-4 size-6"
      isSelected={isSelected}
      onClick={(event) => {
        event.stopPropagation();
        onToggle();
      }}
      onMouseDown={(event) => event.stopPropagation()}
    />
  );
}

export function PerfumeRankCard({
  perfume,
  isSelected,
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
        isSelected={isSelected}
        onToggle={onHeartToggle}
      />
    </article>
  );
}
