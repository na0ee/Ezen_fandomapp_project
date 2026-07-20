import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const scentFamilies = [
  "시트러스",
  "플로럴",
  "우디",
  "머스크",
  "아쿠아틱",
  "파우더리",
  "구르망",
  "스파이시",
];

const brands = ["LE RABO", "JO MALONE", "DIPTYQUE", "TAMBURINS", "CHANEL", "CREED"];

function FilterTabs() {
  return (
    <div className="scrollbar-hidden flex w-full items-center gap-[5px] overflow-x-auto px-side">
      <button className="shrink-0 rounded-[50px] bg-off-black px-3.5 py-2 text-xs font-medium leading-normal tracking-[-0.02em] text-off-white" type="button">
        전체
      </button>
      <button className="shrink-0 rounded-[50px] border-[0.8px] border-light-grey bg-off-white px-3.5 py-2 text-xs font-medium leading-normal tracking-[-0.02em] text-grey" type="button">
        향 계열
      </button>
      <button className="shrink-0 rounded-[50px] border-[0.8px] border-light-grey bg-off-white px-3.5 py-2 text-xs font-medium leading-normal tracking-[-0.02em] text-grey" type="button">
        브랜드
      </button>
    </div>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex h-[26px] w-full items-center justify-between px-side">
      <h2 className="whitespace-nowrap text-2xl font-semibold leading-[1.08] tracking-[-0.03em]">{title}</h2>
      <button className="flex items-center gap-1.5 text-sm font-medium leading-none tracking-[-0.02em] text-grey" type="button">
        <span>전체보기</span>
        <ChevronRight aria-hidden="true" size={18} strokeWidth={1.5} />
      </button>
    </div>
  );
}

export default function Category() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  return (
    <main className="scrollbar-hidden mx-auto h-dvh w-full max-w-[430px] overflow-x-hidden overflow-y-auto overscroll-y-contain bg-off-white text-off-black [-webkit-overflow-scrolling:touch]">
      <div className="flex min-h-full w-full flex-col items-center pb-[max(24px,env(safe-area-inset-bottom))]">
        <div className="flex w-full flex-col gap-10">
          <div className="sticky top-0 z-50 flex w-full flex-col gap-2.5 bg-off-white pt-[var(--app-safe-top)]">
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
                  <Search aria-hidden="true" className="size-full" strokeWidth={1.5} />
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
            <FilterTabs />
          </div>

          <div className="flex w-full flex-col gap-10">
            <section className="w-full">
              <SectionHeader title="향 계열" />
              <div className="mt-[18px] grid w-full grid-cols-2 gap-x-2.5 gap-y-3 px-[22px]">
                {scentFamilies.map((scent) => (
                  <button className="h-[54px] w-full rounded-[21px] border border-[#F3F4F6] bg-[#FEFEFE] text-xs leading-none tracking-[-0.02em] text-black" key={scent} type="button">
                    {scent}
                  </button>
                ))}
              </div>
            </section>

            <section className="w-full">
              <SectionHeader title="브랜드" />
              <div className="mt-[18px] grid w-full grid-cols-3 gap-2.5 px-[34px]">
                {brands.map((brand) => (
                  <button className="h-[54px] w-full min-w-0 rounded-[21px] border border-[#F3F4F6] bg-[#FEFEFE] px-1 text-xs leading-none tracking-[-0.02em] text-black" key={brand} type="button">
                    <span className="block truncate">{brand}</span>
                  </button>
                ))}
              </div>
            </section>
          </div>
        </div>

        <div className="mt-auto w-full px-[18px] pt-10">
          <button className="flex h-[50px] w-full shrink-0 items-center justify-center rounded-cta border border-off-black bg-off-black px-10 font-pretendard text-lg font-bold leading-none tracking-[-0.02em] text-off-white" type="button">
            더보기
          </button>
        </div>
      </div>
    </main>
  );
}
