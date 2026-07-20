import { ChevronDown, Heart } from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";
import chevronLeftIcon from "../../assets/search/figma/chevron-left.svg";
import heartSelectedIcon from "../../assets/search/figma/heart-selected.svg";
import searchIcon from "../../assets/search/figma/search.svg";
import { Tab } from "../ui/Tab";
import { lazySundayMorning, searchTabs, type PerfumeSummary, type SearchTab } from "./SearchData";

type SearchBarProps = {
  query: string;
  onBack: () => void;
  onQueryChange: (query: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function SearchBar({ query, onBack, onQueryChange, onSubmit }: SearchBarProps) {
  return (
    <div className="flex w-full items-center gap-2">
      <button
        aria-label="이전 페이지"
        className="flex size-6 shrink-0 items-center justify-center text-off-black-70"
        onClick={onBack}
        type="button"
      >
        <img alt="" className="h-6 w-6" src={chevronLeftIcon} />
      </button>
      <form
        className="flex h-[39px] min-w-0 flex-1 items-center gap-[11px] rounded-[24px] bg-light2-grey px-5"
        onSubmit={onSubmit}
      >
        <button aria-label="검색" className="flex size-[25px] shrink-0 items-center justify-center text-off-black-70" type="submit">
          <img alt="" className="h-[25px] w-[25px]" src={searchIcon} />
        </button>
        <input
          aria-label="향수 검색어"
          className="min-w-0 flex-1 bg-transparent text-sm font-medium leading-none tracking-[-0.02em] text-off-black-70 outline-none placeholder:text-off-black-70"
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
  showSort?: boolean;
};

export function SearchFilters({ activeTab, onTabChange, showSort = false }: SearchFiltersProps) {
  return (
    <div className="flex w-full items-end justify-between gap-3 overflow-hidden">
      <div className="no-scrollbar flex min-w-0 items-center gap-2 overflow-x-auto">
        {searchTabs.map((tab) => (
          <Tab
            className="h-[30px] py-0"
            isActive={activeTab === tab}
            key={tab}
            label={tab}
            onClick={() => onTabChange(tab)}
          />
        ))}
      </div>
      {showSort && (
        <button className="flex h-[34px] shrink-0 items-center gap-1 text-xs font-medium leading-none tracking-[-0.02em] text-grey" type="button">
          여성 인기순
          <ChevronDown aria-hidden="true" size={14} strokeWidth={1.5} />
        </button>
      )}
    </div>
  );
}

type PerfumeCardProps = {
  perfume?: PerfumeSummary;
};

export function PerfumeCard({ perfume = lazySundayMorning }: PerfumeCardProps) {
  const [isLiked, setIsLiked] = useState(true);

  return (
    <article className="flex h-[115px] w-full items-center gap-4 overflow-hidden rounded-[16px] border border-light-grey bg-off-white p-[10px]">
      <div className="flex size-[92px] shrink-0 items-center justify-center overflow-hidden rounded-[12px] bg-light2-grey">
        <img
          alt={`${perfume.brand} ${perfume.name}`}
          className="h-[92px] w-[85.206px] max-w-none object-cover"
          src={perfume.image}
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col items-end justify-end gap-[18px] overflow-hidden">
        <div className="flex w-full min-w-0 flex-col items-start gap-1.5">
          <div className="min-w-0">
            <p className="truncate text-xs font-medium leading-[normal] tracking-[-0.02em] text-[#888]">{perfume.brand}</p>
            <h2 className="truncate text-base font-semibold leading-[normal] tracking-[-0.02em] text-[#171717]">{perfume.name}</h2>
          </div>
          <div className="flex min-w-0 gap-2 overflow-hidden text-xs font-medium leading-[normal] tracking-[-0.02em] text-grey">
            {perfume.keywords.map((keyword) => (
              <span className="shrink-0" key={keyword}>{keyword}</span>
            ))}
          </div>
        </div>

        <div className="flex w-full items-center justify-between">
          <button className="rounded-chip bg-off-black px-3.5 py-[5px] text-xs leading-[normal] tracking-[-0.02em] text-off-white" type="button">
            향수 보기
          </button>
          <button
            aria-label={isLiked ? `${perfume.name} 찜 해제` : `${perfume.name} 찜하기`}
            aria-pressed={isLiked}
            className="flex size-6 items-center justify-center"
            onClick={() => setIsLiked((selected) => !selected)}
            type="button"
          >
            {isLiked ? (
              <img alt="" className="h-[17px] w-5" src={heartSelectedIcon} />
            ) : (
              <Heart aria-hidden="true" className="text-light-grey" size={24} strokeWidth={1.6} />
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
