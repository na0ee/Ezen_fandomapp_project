import { Heart } from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import chevronLeftIcon from "../../assets/search/figma/chevron-left.svg";
import heartSelectedIcon from "../../assets/search/figma/heart-selected.svg";
import searchIcon from "../../assets/search/figma/search.svg";
import {
  lazySundayMorning,
  searchTabs,
  type PerfumeSummary,
  type SearchTab,
} from "./SearchData";

type SearchBarProps = {
  query: string;
  onBack: () => void;
  onQueryChange: (query: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function SearchBar({
  query,
  onBack,
  onQueryChange,
  onSubmit,
}: SearchBarProps) {
  return (
    <div className="flex w-full items-center gap-3">
      <button
        aria-label="이전 페이지"
        className="flex size-6 shrink-0 items-center justify-center text-off-black-70"
        onClick={onBack}
        type="button"
      >
        <img alt="" className="h-6 w-6" src={chevronLeftIcon} />
      </button>
      <form
        className="flex min-w-0 flex-1 items-center gap-[12px] rounded-[50px] bg-light2-grey px-5 py-[7px]"
        onSubmit={onSubmit}
      >
        <button
          aria-label="검색"
          className="flex size-[25px] shrink-0 items-center justify-center text-off-black-70"
          type="submit"
        >
          <img alt="" className="h-[25px] w-[25px]" src={searchIcon} />
        </button>
        <input
          aria-label="향수 검색어"
          className="min-w-0 flex-1 bg-transparent text-sm font-medium leading-none tracking-[-0.02em] text-off-black outline-none placeholder:text-subtext"
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="향수, 브랜드, 노트로 검색"
          type="search"
          value={query}
        />
      </form>
    </div>
  );
}

type SearchFiltersProps = {
  activeTab: SearchTab;
  onTabChange: (tab: SearchTab) => void;
};

export function SearchFilters({ activeTab, onTabChange }: SearchFiltersProps) {
  return (
    <div className="flex w-full items-center justify-between gap-3 overflow-hidden">
      <div className="scrollbar-hidden flex min-w-0 items-center gap-1.5 overflow-x-auto">
        {searchTabs.map((tab) => (
          <button
            className={`shrink-0 rounded-[50px] px-4 py-2 text-xs font-medium leading-normal tracking-[-0.02em] ${
              activeTab === tab
                ? "bg-off-black text-off-white"
                : "border-[0.8px] border-light-grey bg-off-white text-grey"
            }`}
            key={tab}
            onClick={() => onTabChange(tab)}
            type="button"
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}

type PerfumeCardProps = {
  perfume?: PerfumeSummary;
};

export function PerfumeCard({ perfume = lazySundayMorning }: PerfumeCardProps) {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(true);

  return (
    <article
      className="flex h-[124px] w-full cursor-pointer items-center gap-4 overflow-hidden rounded-[8px] border border-light-grey bg-off-white p-[12px]"
      onClick={() => navigate(`/perfume/${perfume.id}`)}
    >
      <div className="flex size-[100px] shrink-0 items-center justify-center overflow-hidden rounded-[12px] bg-light2-grey">
        <img
          alt={`${perfume.brand} ${perfume.name}`}
          className="max-h-[92px] max-w-[85px] object-contain"
          src={perfume.image}
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col items-end justify-end gap-[18px] overflow-hidden">
        <div className="flex w-full min-w-0 flex-col items-start gap-3">
          <div className="min-w-0">
            <p className="truncate text-xs font-medium leading-[normal] tracking-[-0.02em] text-grey">
              {perfume.brand}
            </p>
            <h2 className="truncate text-base font-semibold leading-[normal] pt-1 tracking-[-0.02em] text-off-black">
              {perfume.name}
            </h2>
          </div>
          <div className="flex min-w-0 gap-2 overflow-hidden text-xs font-medium leading-[normal] tracking-[-0.02em] text-grey">
            {perfume.keywords.map((keyword) => (
              <span className="shrink-0" key={keyword}>
                {keyword}
              </span>
            ))}
          </div>
        </div>

        <div className="flex w-full items-center justify-end">
          <button
            aria-label={
              isLiked ? `${perfume.name} 찜 해제` : `${perfume.name} 찜하기`
            }
            aria-pressed={isLiked}
            className="flex size-6 items-center justify-center"
            onClick={(event) => {
              event.stopPropagation(); // 카드 클릭(상세 이동)과 분리
              setIsLiked((selected) => !selected);
            }}
            type="button"
          >
            {isLiked ? (
              <img alt="" className="h-[17px] w-5" src={heartSelectedIcon} />
            ) : (
              <Heart
                aria-hidden="true"
                className="text-light-grey"
                size={24}
                strokeWidth={1.6}
              />
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
