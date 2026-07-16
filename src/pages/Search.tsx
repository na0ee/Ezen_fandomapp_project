import { ChevronLeft, Clock3, Search as SearchIcon, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const popularSearches = ["# 최해수 쓰는 향수", "# 여름 향수", "# 출근 향수"];
const recentSearches = ["르 라보 베르가못 22", "딥디크 오 데 썽", "블랑쉬"];
const recommendationRows = [
  ["지속력 좋은 향수", "선물 추천", "봄에 어울리는 향", "깔끔한 향수"],
  ["우디 향수", "여행용 향수"],
];

function KeywordChip({ children }: { children: string }) {
  return (
    <button className="shrink-0 rounded-[50px] border-[0.8px] border-light-grey bg-off-white px-3.5 py-2 text-xs font-medium leading-normal tracking-[-0.02em] text-grey" type="button">
      {children}
    </button>
  );
}

export default function Search() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [visibleRecentSearches, setVisibleRecentSearches] = useState(recentSearches);

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-[430px] flex-col items-center gap-10 overflow-x-hidden bg-off-white pt-[var(--app-header-height)] pb-6 text-off-black">
      <div className="fixed top-0 left-1/2 z-50 w-full max-w-[430px] -translate-x-1/2 bg-off-white pt-[var(--app-safe-top)]">
        <div className="flex w-full items-center gap-3 px-side py-[13px]">
          <button aria-label="이전 페이지" className="size-6 shrink-0" onClick={() => navigate(-1)} type="button">
            <ChevronLeft aria-hidden="true" className="size-full" strokeWidth={1.6} />
          </button>
          <form
            className="flex min-w-0 flex-1 items-center gap-[11px] rounded-[24px] bg-[#EDEDED] px-5 py-[7px] text-left"
            onSubmit={(event) => {
              event.preventDefault();
              navigate(`/search-results?q=${encodeURIComponent(query.trim())}`);
            }}
          >
            <button aria-label="검색" className="size-[25px] shrink-0" type="submit">
              <SearchIcon aria-hidden="true" className="size-full" strokeWidth={1.5} />
            </button>
            <input
              aria-label="향수 검색어"
              className="min-w-0 flex-1 bg-transparent text-sm font-medium leading-none tracking-[-0.02em] text-[#4D4D4D] outline-none placeholder:text-[#4D4D4D]"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="향수, 브랜드, 노트로 검색"
              type="search"
              value={query}
            />
          </form>
        </div>
      </div>

      <section className="flex w-full flex-col items-start gap-2.5 px-side">
        <h1 className="text-base font-semibold leading-normal tracking-[-0.02em]">인기 검색어</h1>
        <div className="flex items-start justify-center gap-[5px]">
          {popularSearches.map((keyword) => (
            <KeywordChip key={keyword}>{keyword}</KeywordChip>
          ))}
        </div>
      </section>

      <section aria-label="최근 검색어" className="flex w-full flex-col items-start gap-5">
        {visibleRecentSearches.map((keyword) => (
          <div className="flex h-[19px] w-full items-center justify-between px-side" key={keyword}>
            <div className="flex items-center gap-3">
              <Clock3 aria-hidden="true" size={13} strokeWidth={1.5} />
              <span className="text-sm font-medium leading-normal tracking-[-0.02em]">{keyword}</span>
            </div>
            <button
              aria-label={`${keyword} 삭제`}
              className="size-2.5 shrink-0"
              onClick={() => setVisibleRecentSearches((items) => items.filter((item) => item !== keyword))}
              type="button"
            >
              <X aria-hidden="true" className="size-full" strokeWidth={1.2} />
            </button>
          </div>
        ))}
      </section>

      <section className="flex w-full flex-col items-start gap-2.5 px-side">
        <h2 className="text-base font-semibold leading-normal tracking-[-0.02em]">추천 키워드</h2>
        <div className="flex flex-col items-start gap-[5px]">
          {recommendationRows.map((row, rowIndex) => (
            <div className="flex items-start justify-center gap-[5px]" key={rowIndex}>
              {row.map((keyword) => (
                <KeywordChip key={keyword}>{keyword}</KeywordChip>
              ))}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
