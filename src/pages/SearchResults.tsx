import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  PerfumeCard,
  SearchBar,
  SearchFilters,
} from "../components/search/SearchComponents";
import { lazySundayMorning, type SearchTab } from "../components/search/SearchData";

export default function SearchResults() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q")?.trim() ?? "");
  const [activeTab, setActiveTab] = useState<SearchTab>("전체");

  return (
    <main className="min-h-dvh bg-black max-[430px]:bg-off-white text-off-black">
      <div className="mx-auto flex min-h-dvh w-full max-w-[430px] flex-col overflow-x-hidden bg-off-white pb-6">
        <header className="w-full px-side pb-3 pt-[var(--app-safe-top)]">
          <SearchBar
            onBack={() => navigate(-1)}
            onQueryChange={setQuery}
            onSubmit={(event) => {
              event.preventDefault();
              setSearchParams(query.trim() ? { q: query.trim() } : {});
            }}
            query={query}
          />
        </header>

        <div className="wrap flex flex-col gap-[30px] pt-3">
          <div className="px-side">
            <SearchFilters activeTab={activeTab} onTabChange={setActiveTab} showSort />
          </div>
          <section aria-label="향수 검색 결과" className="flex flex-col gap-[10px] px-side">
            {Array.from({ length: 6 }, (_, index) => (
              <PerfumeCard key={`${lazySundayMorning.id}-result-${index}`} />
            ))}
          </section>
        </div>
      </div>
    </main>
  );
}
