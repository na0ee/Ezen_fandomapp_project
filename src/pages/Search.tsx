import { Clock3, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PerfumeCard,
  SearchBar,
  SearchFilters,
} from "../components/search/SearchComponents";
import { lazySundayMorning, type SearchTab } from "../components/search/SearchData";

const popularSearches = ["# 비누향", "# 여름 향수", "# 출근 향수"];
const recentSearches = ["르 라보 베르가못 22", "딥디크 오 데 썽", "블랑쉬"];

export default function Search() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<SearchTab>("전체");
  const [visibleRecentSearches, setVisibleRecentSearches] = useState(recentSearches);

  function openSearchResults(searchQuery = query) {
    const normalizedQuery = searchQuery.replace(/^#\s*/, "").trim();
    navigate(normalizedQuery ? `/search-results?q=${encodeURIComponent(normalizedQuery)}` : "/search-results");
  }

  return (
    <main className="min-h-dvh bg-off-white text-off-black">
      <div className="mx-auto flex min-h-dvh w-full max-w-[430px] flex-col overflow-x-hidden bg-off-white pb-6">
        <header className="w-full px-side pb-5 pt-[calc(24px+env(safe-area-inset-top))]">
          <SearchBar
            onBack={() => navigate(-1)}
            onQueryChange={setQuery}
            onSubmit={(event) => {
              event.preventDefault();
              openSearchResults();
            }}
            query={query}
          />
        </header>

        <div className="wrap flex flex-col gap-16">
          <section className="flex flex-col gap-[30px] px-side">
            <SearchFilters activeTab={activeTab} onTabChange={setActiveTab} />
            <div className="flex flex-col gap-[30px]">
              <h1 className="text-base font-bold leading-none tracking-[-0.02em]">인기 검색어</h1>
              <div className="flex items-center gap-3 overflow-hidden">
                {popularSearches.map((keyword) => (
                  <button
                    className="shrink-0 text-sm font-medium leading-none tracking-[-0.02em] text-off-black"
                    key={keyword}
                    onClick={() => openSearchResults(keyword)}
                    type="button"
                  >
                    {keyword}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section aria-label="최근 검색어" className="flex flex-col gap-[30px] px-side">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold leading-none tracking-[-0.02em]">최근 검색어</h2>
              <button
                className="text-xs leading-none tracking-[-0.02em]"
                onClick={() => setVisibleRecentSearches([])}
                type="button"
              >
                전체 삭제
              </button>
            </div>
            <div className="flex flex-col gap-[10px]">
              {visibleRecentSearches.map((keyword) => (
                <div className="flex w-full items-center justify-between" key={keyword}>
                  <button className="flex min-w-0 items-center gap-[10px]" onClick={() => openSearchResults(keyword)} type="button">
                    <Clock3 aria-hidden="true" className="size-[13px] shrink-0" strokeWidth={1.5} />
                    <span className="truncate text-sm font-medium leading-none tracking-[-0.02em]">{keyword}</span>
                  </button>
                  <button
                    aria-label={`${keyword} 삭제`}
                    className="flex size-4 shrink-0 items-center justify-center"
                    onClick={() => setVisibleRecentSearches((items) => items.filter((item) => item !== keyword))}
                    type="button"
                  >
                    <X aria-hidden="true" size={13} strokeWidth={1.5} />
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section aria-label="최근 본 향수" className="flex flex-col gap-[30px] px-side py-[10px]">
            <h2 className="text-base font-semibold leading-none tracking-[-0.02em]">최근 본 향수</h2>
            <div className="flex flex-col gap-[10px]">
              {Array.from({ length: 3 }, (_, index) => (
                <PerfumeCard key={`${lazySundayMorning.id}-${index}`} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
