import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { brands as brandList } from "../data/brands";
import { fragranceFamilies } from "../data/fragranceFamilies";

// 향 계열/브랜드 마스터 데이터에서 이름 목록 생성 (검색 결과와 1:1로 연결됨)
const scentFamilies = fragranceFamilies.map((family) => family.name);
const brands = brandList.map((brand) => brand.nameEn.toUpperCase());

type CategoryTab = "all" | "scent" | "brand";

const filterTabs: Array<{ id: CategoryTab; label: string }> = [
  { id: "all", label: "전체" },
  { id: "scent", label: "향 계열" },
  { id: "brand", label: "브랜드" },
];

function FilterTabs({
  activeTab,
  onChange,
}: {
  activeTab: CategoryTab;
  onChange: (tab: CategoryTab) => void;
}) {
  return (
    <div className="scrollbar-hidden flex w-full items-center gap-1.5 overflow-x-auto px-side">
      {filterTabs.map((tab) => (
        <button
          className={`shrink-0 rounded-[50px] px-3.5 py-2 text-xs font-medium leading-normal tracking-[-0.02em] ${
            activeTab === tab.id
              ? "bg-off-black text-off-white"
              : "border-[0.8px] border-light-grey bg-off-white text-grey"
          }`}
          key={tab.id}
          onClick={() => onChange(tab.id)}
          type="button"
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex h-[26px] w-full items-center justify-between px-side">
      <h2 className="whitespace-nowrap text-base font-semibold leading-[1.08] tracking-[-0.03em]">
        {title}
      </h2>
      <button
        className="flex items-center gap-1.5 text-sm font-medium leading-none tracking-[-0.02em] text-grey"
        type="button"
      ></button>
    </div>
  );
}

export default function Category() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<CategoryTab>("all");

  return (
    <main className="scrollbar-hidden mx-auto h-dvh w-full max-w-[430px] overflow-x-hidden overflow-y-auto overscroll-y-contain bg-off-white text-off-black [-webkit-overflow-scrolling:touch]">
      <div className="flex min-h-full w-full flex-col items-center pb-[max(24px,env(safe-area-inset-bottom))]">
        <div className="flex w-full flex-col gap-4">
          <div className="sticky top-0 z-50 flex w-full flex-col gap-3 bg-off-white pt-[var(--app-safe-top)]">
            <div className="flex w-full items-center gap-3 px-side py-[13px]">
              <button
                aria-label="이전 페이지"
                className="size-6 shrink-0"
                onClick={() => navigate(-1)}
                type="button"
              >
                <ChevronLeft
                  aria-hidden="true"
                  className="size-full"
                  strokeWidth={1.6}
                />
              </button>
              <form
                className="flex min-w-0 flex-1 items-center gap-[12px] rounded-[50px] bg-light2-grey px-5 py-[7px] text-left"
                onSubmit={(event) => {
                  event.preventDefault();
                  navigate(
                    `/search-results?q=${encodeURIComponent(query.trim())}`,
                  );
                }}
              >
                <button
                  aria-label="검색"
                  className="size-[25px] shrink-0"
                  type="submit"
                >
                  <Search
                    aria-hidden="true"
                    className="size-full"
                    strokeWidth={1.5}
                  />
                </button>
                <input
                  aria-label="향수 검색어"
                  className="min-w-0 flex-1 bg-transparent text-sm font-medium leading-none tracking-[-0.02em] text-off-black outline-none placeholder:text-subtext"
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="향수, 브랜드, 노트로 검색"
                  type="search"
                  value={query}
                />
              </form>
            </div>
            <FilterTabs activeTab={activeTab} onChange={setActiveTab} />
          </div>

          <div className="flex w-full flex-col gap-10">
            {(activeTab === "all" || activeTab === "scent") && (
              <section className="w-full">
                <SectionHeader title="향 계열" />
                <div className="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-3.5 px-[24px]">
                  {scentFamilies.map((scent) => (
                    <button
                      className="h-[54px] w-full rounded-[50px] border-[0.8px] border-light-grey bg-[#fff] text-xs leading-none tracking-[-0.02em] text-black"
                      key={scent}
                      onClick={() =>
                        navigate(`/search-results?q=${encodeURIComponent(scent)}`)
                      }
                      type="button"
                    >
                      {scent}
                    </button>
                  ))}
                </div>
              </section>
            )}

            {(activeTab === "all" || activeTab === "brand") && (
              <section className="w-full">
                <SectionHeader title="브랜드" />
                <div className="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-3.5 px-[24px]">
                  {brands.map((brand) => (
                    <button
                      className="h-[54px] w-full min-w-0 rounded-[50px] border-[0.8px] border-light-grey bg-[#fff] px-1 text-xs leading-none tracking-[-0.02em] text-black"
                      key={brand}
                      onClick={() =>
                        navigate(`/search-results?q=${encodeURIComponent(brand)}`)
                      }
                      type="button"
                    >
                      <span className="block truncate">{brand}</span>
                    </button>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
