import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  PerfumeCard,
  SearchBar,
  SearchFilters,
} from "../components/search/SearchComponents";
import {
  type PerfumeSummary,
  type SearchTab,
} from "../components/search/SearchData";
import { brands } from "../data/brands";
import { fragranceFamilies } from "../data/fragranceFamilies";
import { perfumeData } from "../data/perfumeData";

// perfumeData.js의 향수 목록을 카드용 요약 + 탭별 검색용 텍스트로 변환
const allPerfumes = perfumeData.map((item) => {
  const brand = brands.find((b) => b.id === item.perfume.brandId);
  const familyNames = item.perfume.familyIds.map(
    (familyId) =>
      fragranceFamilies.find((family) => family.id === familyId)?.name ?? "",
  );
  const summary: PerfumeSummary = {
    id: String(item.id),
    brand: brand?.nameEn.toUpperCase() ?? item.perfume.brandId,
    name: item.perfume.name,
    image: item.perfume.image,
    // 미들·베이스 노트 앞쪽 3개를 해시태그로 표시
    keywords: [...item.perfume.notes.middle, ...item.perfume.notes.base]
      .slice(0, 3)
      .map((note) => `#${note.replace(/\s+/g, "")}`),
  };
  return {
    summary,
    // 탭별로 검색 대상이 되는 텍스트
    nameText: item.perfume.name.toLowerCase(),
    brandText: [brand?.name ?? "", brand?.nameEn ?? "", item.perfume.brandId]
      .join(" ")
      .toLowerCase(),
    familyText: [...item.perfume.familyIds, ...familyNames]
      .join(" ")
      .toLowerCase(),
  };
});

// 검색어 + 활성 탭에 따라 필터링
function filterPerfumes(searchQuery: string, tab: SearchTab): PerfumeSummary[] {
  const keyword = searchQuery.trim().toLowerCase();

  return allPerfumes
    .filter((entry) => {
      if (!keyword) return true;
      if (tab === "향 계열") return entry.familyText.includes(keyword);
      if (tab === "브랜드") return entry.brandText.includes(keyword);
      // 전체: 이름·브랜드·향 계열 모두에서 검색
      return [entry.nameText, entry.brandText, entry.familyText]
        .join(" ")
        .includes(keyword);
    })
    .map((entry) => entry.summary);
}

export default function SearchResults() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const submittedQuery = searchParams.get("q")?.trim() ?? "";
  const [query, setQuery] = useState(submittedQuery);
  const [activeTab, setActiveTab] = useState<SearchTab>("전체");

  const results = useMemo(
    () => filterPerfumes(submittedQuery, activeTab),
    [submittedQuery, activeTab],
  );

  return (
    <main className="min-h-dvh text-off-black">
      <div className="mx-auto flex min-h-dvh w-full max-w-[430px] flex-col overflow-x-hidden bg-off-white pb-6">
        <header className="sticky top-0 z-50 w-full bg-off-white px-side pb-[13px] pt-[calc(var(--app-safe-top)+13px)]">
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

        <div className="wrap flex flex-col gap-4 pt-3">
          <div className="px-side">
            <SearchFilters activeTab={activeTab} onTabChange={setActiveTab} />
          </div>
          <section
            aria-label="향수 검색 결과"
            className="flex flex-col gap-4 px-side"
          >
            {results.length > 0 ? (
              results.map((perfume) => (
                <PerfumeCard key={perfume.id} perfume={perfume} />
              ))
            ) : (
              <p className="py-10 text-center text-sm text-grey">
                "{submittedQuery}"에 대한 검색 결과가 없어요.
              </p>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
