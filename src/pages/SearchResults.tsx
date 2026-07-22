import { Bookmark, ChevronLeft, Search } from "lucide-react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PERFUMES } from "../data/perfumes";
import aesopImage from "../assets/search-results/aesop.png";
import byredoImage from "../assets/search-results/byredo.png";
import fredericMalleImage from "../assets/search-results/frederic-malle.png";
import leLaboImage from "../assets/search-results/le-labo.png";

const searchResults = [
  { ...PERFUMES.gypsyWater, image: byredoImage },
  { ...PERFUMES.portraitOfALady, image: fredericMalleImage },
  { ...PERFUMES.tacit, image: aesopImage },
  { ...PERFUMES.another13, image: leLaboImage },
];

function ResultCard({ result }: { result: (typeof searchResults)[number] }) {
  return (
    <article className="relative flex h-[108px] w-full items-center gap-3 overflow-hidden rounded-card border-[0.5px] border-light2-grey bg-off-white p-2">
      <div className="size-[92px] shrink-0 overflow-hidden rounded-card bg-[#EDEDED]">
        <img alt={`${result.brand} ${result.name}`} className="size-full object-cover" src={result.image} />
      </div>

      <div className="flex min-w-0 items-end gap-2.5 overflow-hidden">
        <div className="flex h-[71px] w-[175px] shrink-0 flex-col items-start justify-between leading-none tracking-[-0.02em]">
          <div className="w-full">
            <p className="w-[87px] truncate text-xs font-medium text-grey">{result.brand}</p>
            <h2 className="w-full truncate text-base font-semibold text-[#171717]">{result.name}</h2>
          </div>
          <p className="w-full truncate text-sm font-medium text-[#4D4D4D]">{result.notes}</p>
        </div>
        <button className="shrink-0 rounded-chip bg-off-black px-3.5 py-[5px] text-xs leading-none tracking-[-0.02em] text-off-white" type="button">
          향수 보기
        </button>
      </div>

      <Bookmark aria-label="향수 저장" className="absolute right-5 top-[18px] text-light-grey" size={13} strokeWidth={1.2} />
    </article>
  );
}

export default function SearchResults() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q")?.trim() || "우디");

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-[430px] flex-col items-center overflow-x-hidden bg-off-white pb-6 text-off-black">
      <div className="w-full">
        <div className="flex w-full items-center gap-3 px-side py-[13px]">
          <button aria-label="이전 페이지" className="size-6 shrink-0" onClick={() => navigate(-1)} type="button">
            <ChevronLeft aria-hidden="true" className="size-full" strokeWidth={1.6} />
          </button>
          <form
            className="flex min-w-0 flex-1 items-center gap-[11px] rounded-[24px] bg-[#EDEDED] px-5 py-[7px]"
            onSubmit={(event) => {
              event.preventDefault();
              setSearchParams(query.trim() ? { q: query.trim() } : {});
            }}
          >
            <button aria-label="검색" className="size-[25px] shrink-0" type="submit">
              <Search aria-hidden="true" className="size-full" strokeWidth={1.5} />
            </button>
            <input
              aria-label="향수 검색어"
              className="min-w-0 flex-1 bg-transparent text-sm font-medium leading-none tracking-[-0.02em] text-[#4D4D4D] outline-none"
              onChange={(event) => setQuery(event.target.value)}
              type="search"
              value={query}
            />
          </form>
        </div>

        <div className="mt-2.5 flex h-8 w-full items-center gap-[5px] overflow-hidden px-side">
          <button className="h-8 shrink-0 rounded-[50px] bg-off-black px-3.5 text-xs font-medium leading-none tracking-[-0.02em] text-off-white" type="button">
            전체
          </button>
          <button className="h-8 shrink-0 rounded-[50px] border-[0.8px] border-light-grey bg-off-white px-3.5 text-xs font-medium leading-none tracking-[-0.02em] text-grey" type="button">
            향 계열
          </button>
          <button className="h-8 shrink-0 rounded-[50px] border-[0.8px] border-light-grey bg-off-white px-3.5 text-xs font-medium leading-none tracking-[-0.02em] text-grey" type="button">
            브랜드
          </button>
        </div>
      </div>

      <div className="mt-[38px] flex w-full flex-col items-center px-side">
        <section aria-label="향수 검색 결과" className="flex w-full flex-col gap-[15px]">
          {searchResults.map((result) => (
            <ResultCard key={result.name} result={result} />
          ))}
        </section>

        <button className="mt-[84px] flex h-[50px] w-full items-center justify-center rounded-cta border border-off-black bg-off-black px-10 font-pretendard text-lg font-bold leading-none tracking-[-0.02em] text-off-white" type="button">
          더보기
        </button>
      </div>
    </main>
  );
}
