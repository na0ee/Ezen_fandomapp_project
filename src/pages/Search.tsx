import { useState } from "react";
import { useNavigate } from "react-router-dom";
import batteryEnd from "../assets/search/figma/battery-end.svg";
import batteryFill from "../assets/search/figma/battery-fill.svg";
import batteryOutline from "../assets/search/figma/battery-outline.svg";
import clockIcon from "../assets/search/figma/clock.svg";
import closeIcon from "../assets/search/figma/close.svg";
import mobileSignal from "../assets/search/figma/mobile-signal.svg";
import wifi from "../assets/search/figma/wifi.svg";
import { PerfumeCard, SearchBar } from "../components/search/SearchComponents";
import { lazySundayMorning } from "../components/search/SearchData";

const popularSearches = ["# 비누향", "# 여름 향수", "# 출근 향수"];
const recentSearches = ["르 라보 베르가못 22", "딥디크 오 데 썽", "블랑쉬"];

function StatusBar() {
  return (
    <div
      aria-hidden="true"
      className="flex h-[64.555px] w-full shrink-0 items-end justify-center bg-off-white"
    >
      <div className="flex h-full min-w-0 flex-1 flex-col items-center justify-center pb-[3.282px] pl-[10.941px]">
        <span className="flex h-[22.977px] w-[59.084px] items-center justify-center pt-px font-sans text-[17.51px] font-semibold leading-[22.977px] tracking-[-0.32px] text-black">
          9:41
        </span>
      </div>

      <div className="flex h-full shrink-0 items-center justify-center">
        <div className="h-[40.483px] w-[136.768px] rounded-full bg-black" />
      </div>

      <div className="flex h-full min-w-0 flex-1 items-center justify-center pr-[12.036px]">
        <div className="flex items-start gap-[8.753px]">
          <img alt="" className="h-[13.13px] w-[19.695px]" src={mobileSignal} />
          <img alt="" className="h-[12.948px] w-[18.601px]" src={wifi} />
          <div className="relative h-[14.224px] w-[29.981px]">
            <img alt="" className="absolute inset-y-0 left-0 h-full w-[27.351px]" src={batteryOutline} />
            <img
              alt=""
              className="absolute right-0 top-[calc(50%+0.67px)] h-[4.618px] w-[1.533px] -translate-y-1/2"
              src={batteryEnd}
            />
            <img
              alt=""
              className="absolute left-[2.19px] top-1/2 h-[9.847px] w-[22.971px] -translate-y-1/2"
              src={batteryFill}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Search() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [visibleRecentSearches, setVisibleRecentSearches] = useState(recentSearches);

  function openSearchResults(searchQuery = query) {
    const normalizedQuery = searchQuery.replace(/^#\s*/, "").trim();
    navigate(normalizedQuery ? `/search-results?q=${encodeURIComponent(normalizedQuery)}` : "/search-results");
  }

  return (
    <main className="min-h-dvh bg-off-white text-off-black">
      <div className="mx-auto flex min-h-[932px] w-full max-w-[430px] flex-col overflow-x-hidden bg-off-white pb-6">
        <StatusBar />

        <header className="w-full px-side pb-5 pt-6">
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

        <div className="flex flex-col gap-8">
          <section className="flex flex-col gap-4 px-side">
            <h1 className="text-base font-bold leading-[normal] tracking-[-0.02em]">인기 검색어</h1>
            <div className="flex items-center gap-3 overflow-hidden">
              {popularSearches.map((keyword) => (
                <button
                  className="shrink-0 text-sm font-medium leading-[normal] tracking-[-0.02em] text-off-black"
                  key={keyword}
                  onClick={() => openSearchResults(keyword)}
                  type="button"
                >
                  {keyword}
                </button>
              ))}
            </div>
          </section>

          <section aria-label="최근 검색어" className="flex flex-col gap-4 overflow-hidden px-side">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold leading-[normal] tracking-[-0.02em]">최근 검색어</h2>
              <button
                className="text-xs font-normal leading-[normal] tracking-[-0.02em]"
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
                    <img alt="" className="h-[13px] w-[13px] shrink-0" src={clockIcon} />
                    <span className="truncate text-sm font-medium leading-[normal] tracking-[-0.02em]">{keyword}</span>
                  </button>
                  <button
                    aria-label={`${keyword} 삭제`}
                    className="flex h-[13px] w-[13px] shrink-0 items-center justify-center"
                    onClick={() => setVisibleRecentSearches((items) => items.filter((item) => item !== keyword))}
                    type="button"
                  >
                    <img alt="" className="h-[9px] w-[9px]" src={closeIcon} />
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section aria-label="최근 본 향수" className="flex flex-col gap-4 overflow-hidden px-side py-[10px]">
            <h2 className="text-base font-semibold leading-[normal] tracking-[-0.02em]">최근 본 향수</h2>
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
