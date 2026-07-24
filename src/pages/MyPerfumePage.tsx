import { Check, ChevronRight, ChevronDown, Search, X } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { BottomNavigation } from "../components/common/BottomNavigation";
import { HeaderActions } from "../components/common/HeaderActions";
import { BackHeader } from "../components/common/BackHeader";
import { brands } from "../data/brands";
import { fragranceFamilies } from "../data/fragranceFamilies";
import perfumeLoewe from "../assets/mypage/perfume-loewe.png";
import perfumeSanta from "../assets/mypage/perfume-santa.png";
import reviewProductThree from "../assets/mypage/perfume-MATIERE.png";
import bottleByredo from "../assets/mypage/bottle-byredo.svg";
import bottleDiptyque from "../assets/mypage/bottle-diptyque.svg";
import bottleMissdior from "../assets/mypage/bottle-missdior.svg";
import bottleNormal from "../assets/mypage/bottle-normal.svg";
import bottleTomford from "../assets/mypage/bottle-tomford.svg";

const filterTabs = ["브랜드", "향 계열/향기", "용량"] as const;
type FilterTab = (typeof filterTabs)[number];

const categoryTabs = ["전체", ...filterTabs];

const volumeOptions = ["30ml 미만", "30ml ~ 50ml 미만", "50ml ~ 100ml 미만", "100ml ~ 200ml 미만", "200ml ~ 300ml 미만", "300ml ~ 500ml 미만"];

const filterOptions: Record<FilterTab, string[]> = {
  브랜드: brands.map((brand) => brand.name).sort((a, b) => a.localeCompare(b, "ko")),
  "향 계열/향기": fragranceFamilies.map((family) => family.name),
  용량: volumeOptions,
};

const brandNames = brands.map((brand) => brand.name);

const defaultSelectedFilters: string[] = [];

const weekDays = [
  { day: "Mon", date: "6", active: true, bottle: bottleTomford },
  { day: "Tue", date: "7", active: true, bottle: bottleByredo },
  { day: "Wed", date: "8", active: true, bottle: bottleByredo },
  { day: "Thu", date: "9", active: true, bottle: bottleDiptyque },
  { day: "Fri", date: "10", active: false, bottle: bottleNormal },
  { day: "Sat", date: "11", active: true, bottle: bottleMissdior },
  { day: "Sun", date: "12", active: false, weekend: true, bottle: bottleNormal },
];

const perfumes = [
  {
    brandId: "santa-maria-novella",
    brand: "SANTA MARIA NOVELLA",
    name: "엔젤 디 피렌체 오드코롱 100ml",
    status: "2일 전 사용",
    memo: "간단한 메모",
    savedMemo: "비싼값하는듯 굿",
    image: perfumeSanta,
  },
  {
    brandId: "",
    brand: "LOEWE PERFUMES",
    name: "로에베 아이레 수틸레사 오 드 뚜왈렛 50ml",
    status: "3일 전 사용",
    memo: "간단한 메모",
    savedMemo: "",
    image: perfumeLoewe,
  },
  {
    brandId: "",
    brand: "MATIERE PREMIERE",
    name: "마티에 프리미에르 메탈 라벤더 오 드 퍼퓸 50ml",
    status: "3일 전 사용",
    memo: "간단한 메모",
    savedMemo: "",
    image: reviewProductThree,
  },
];

function DetailHeader({ title }: { title: string }) {
  return <BackHeader title={title} backTo="/mypage" action={<HeaderActions />} />;
}

function PerfumeRecordCard({ perfume }: { perfume: (typeof perfumes)[number] & { fromRegistration?: boolean } }) {
  const [savedMemo, setSavedMemo] = useState(perfume.savedMemo);
  const [memo, setMemo] = useState("");
  const [isEditing, setIsEditing] = useState(savedMemo === "");
  const canSave = memo.trim() !== "";
  const displayMemo = savedMemo === "간단한 메모" ? "" : savedMemo;
  const hasContent = savedMemo && savedMemo !== "간단한 메모";

  return (
    <article className="flex items-start gap-2.5 rounded-card border-[0.8px] border-light-grey bg-off-white p-[12px]">
      <div className="flex size-[100px] shrink-0 items-center justify-center overflow-hidden rounded-lg bg-light2-grey">
        {perfume.image ? (
          perfume.fromRegistration ? (
            <img alt={perfume.name} className="h-[70px] w-auto object-contain" src={perfume.image} />
          ) : (
            <img alt={perfume.name} className="size-full object-contain mix-blend-multiply" src={perfume.image} />
          )
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-light2-grey" />
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <p className="truncate text-[12px] font-normal leading-none tracking-[-0.02em] text-grey uppercase" /* caption/regular-12px */>{perfume.brand}</p>
        <h2 className="mt-1 truncate text-[16px] font-semibold leading-[1.2] tracking-[-0.02em] text-off-black">{perfume.name}</h2>
        <p className="mt-2 text-[12px] font-normal leading-none tracking-[-0.02em] text-subtext">{perfume.status}</p>
        <div className="mt-[12px] flex h-[34px] w-full items-center gap-2.5 self-stretch rounded-lg bg-[#EDEDED] p-2">
          {isEditing ? (
            <>
              <input
                className="w-full min-w-0 bg-transparent text-[12px] font-normal tracking-[-0.02em] text-subtext outline-none"
                onChange={(event) => setMemo(event.target.value)}
                placeholder={perfume.memo}
                type="text"
                value={memo}
              />
              {canSave && (
                <button
                  className="shrink-0 rounded-full bg-off-black px-2.5 py-1 text-[11px] font-medium tracking-[-0.02em] text-off-white"
                  onClick={() => {
                    setSavedMemo(memo);
                    setIsEditing(false);
                  }}
                  type="button"
                >
                  저장
                </button>
              )}
            </>
          ) : (
            <>
              <p className={`w-full min-w-0 truncate text-[12px] font-normal tracking-[-0.02em] ${hasContent ? "text-subtext" : "text-grey"}`}>
                {displayMemo || "간단한 메모"}
              </p>
              {hasContent && (
                <button
                  className="shrink-0 rounded-full border-[0.8px] border-light-grey bg-off-white px-2.5 py-1 text-[11px] font-medium tracking-[-0.02em] text-subtext"
                  onClick={() => {
                    setMemo(savedMemo);
                    setIsEditing(true);
                  }}
                  type="button"
                >
                  수정
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </article>
  );
}

function FilterSheet({
  activeTab,
  matchCount,
  onClose,
  onReset,
  onSelectTab,
  onToggleFilter,
  selectedFilters,
}: {
  activeTab: FilterTab;
  matchCount: number;
  onClose: () => void;
  onReset: () => void;
  onSelectTab: (tab: FilterTab) => void;
  onToggleFilter: (option: string) => void;
  selectedFilters: string[];
}) {
  const brandSubtitles: Record<string, string> = Object.fromEntries(
    brands.map((brand) => [brand.name, brand.nameEn.toUpperCase()]),
  );

  return (
    <div className="fixed inset-0 z-[60] flex justify-center bg-black/40">
      <button aria-label="필터 닫기" className="absolute inset-0 cursor-default" onClick={onClose} type="button" />
      <section className="absolute bottom-0 left-1/2 flex h-[546px] w-full max-w-[430px] -translate-x-1/2 flex-col overflow-hidden rounded-t-[20px] bg-off-white">
        <div className="mx-auto mt-3 h-1 w-8 shrink-0 rounded-[24px] bg-light-grey" />

        <div className="mt-4 shrink-0 border-b-[0.8px] border-light-grey px-side">
          <div className="flex gap-6">
            {filterTabs.map((tab) => (
              <button
                className={`flex h-10 cursor-pointer items-center border-b-2 text-[15px] font-medium leading-none tracking-[-0.02em] transition-colors ${activeTab === tab ? "border-point-orange text-off-black" : "border-transparent text-grey"
                  }`}
                key={tab}
                onClick={() => onSelectTab(tab)}
                type="button"
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="scrollbar-thin flex-1 overflow-y-auto pb-[159px]">
          {activeTab === "브랜드" && (
            <div className="px-side pt-6">
              <div className="flex h-[42px] items-center gap-2.5 rounded-full border-[1px] border-light-grey bg-off-white px-4">
                <Search size={18} className="text-grey" />
                <input
                  type="text"
                  placeholder="검색해서 찾기"
                  className="flex-1 bg-transparent text-[14px] outline-none placeholder:text-grey"
                />
              </div>
            </div>
          )}

          <div className={`px-side pt-7 pb-10 ${activeTab === "브랜드" ? "flex flex-col gap-7" : "grid grid-cols-2 gap-x-5 gap-y-6"}`}>
            {filterOptions[activeTab].map((option) => {
              const selected = selectedFilters.includes(option);

              if (activeTab === "브랜드") {
                return (
                  <button
                    className="flex w-full cursor-pointer items-center justify-between text-left"
                    key={`${activeTab}-${option}`}
                    onClick={() => onToggleFilter(option)}
                    type="button"
                  >
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[15px] font-medium leading-none tracking-[-0.02em] text-off-black">{option}</span>
                      <span className="text-[11px] font-normal leading-none tracking-[-0.02em] text-grey uppercase">
                        {brandSubtitles[option] || ""}
                      </span>
                    </div>
                    <span
                      className={`flex size-6 shrink-0 items-center justify-center rounded-full border-[1px] ${selected ? "border-point-orange bg-point-orange text-off-white" : "border-light-grey bg-off-white text-light-grey"
                        }`}
                    >
                      <Check aria-hidden="true" size={14} strokeWidth={3} />
                    </span>
                  </button>
                );
              }

              return (
                <button
                  className="flex cursor-pointer items-center gap-2.5 text-left"
                  key={`${activeTab}-${option}`}
                  onClick={() => onToggleFilter(option)}
                  type="button"
                >
                  <span
                    className={`flex size-[22px] shrink-0 items-center justify-center rounded-full border-[1px] ${selected ? "border-point-orange bg-point-orange text-off-white" : "border-light-grey bg-off-white text-light-grey"
                      }`}
                  >
                    <Check aria-hidden="true" size={14} strokeWidth={3} />
                  </span>
                  <span className={`text-[14px] font-normal leading-none tracking-[-0.02em] ${selected ? "text-off-black" : "text-grey"}`}>{option}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 flex w-full flex-col border-t-[0.8px] border-light-grey bg-off-white px-side pb-[30px] pt-4">
          {selectedFilters.length > 0 && (
            <div className="flex gap-2 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden">
              {selectedFilters.map((filter) => (
                <button
                  className="flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full bg-light2-grey py-2 pl-3.5 pr-3 text-[13px] font-normal leading-none tracking-[-0.02em] text-off-black-70"
                  key={filter}
                  onClick={() => onToggleFilter(filter)}
                  type="button"
                >
                  {filter}
                  <X aria-hidden="true" size={12} strokeWidth={2} className="text-grey" />
                </button>
              ))}
            </div>
          )}
          <div className="flex gap-3">
            <button
              className="h-[52px] w-[110px] shrink-0 cursor-pointer rounded-full border-[1px] border-light-grey bg-off-white text-[15px] font-semibold tracking-[-0.02em] text-off-black"
              onClick={onReset}
              type="button"
            >
              초기화
            </button>
            <button
              className="h-[52px] flex-1 cursor-pointer rounded-full bg-off-black text-[15px] font-semibold tracking-[-0.02em] text-off-white"
              onClick={onClose}
              type="button"
            >
              {matchCount}개의 상품 보기
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function MyPerfumePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeFilter, setActiveFilter] = useState<FilterTab | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<string[]>(defaultSelectedFilters);

  const newPerfume = (location.state as { newPerfume?: (typeof perfumes)[number] } | null)?.newPerfume;
  const allPerfumes = newPerfume ? [{ ...newPerfume, fromRegistration: true }, ...perfumes] : perfumes;

  const toggleFilter = (option: string) => {
    setSelectedFilters((current) =>
      current.includes(option) ? current.filter((filter) => filter !== option) : [...current, option],
    );
  };

  const selectedBrandFilters = selectedFilters.filter((filter) => brandNames.includes(filter));
  const filteredPerfumes =
    selectedBrandFilters.length === 0
      ? allPerfumes
      : allPerfumes.filter((perfume) => selectedBrandFilters.includes(brands.find((brand) => brand.id === perfume.brandId)?.name ?? ""));

  return (
    <main className="mx-auto min-h-dvh w-full max-w-[430px] cursor-default select-none overflow-x-hidden bg-off-white text-off-black">
      <DetailHeader title="내 향수 관리하기" />

      <div className="wrap px-side pb-[112px] pt-[calc(var(--app-header-height)+24px)]">
        <button
          className="flex h-[43px] w-full cursor-pointer items-center justify-between rounded-card bg-point-orange px-3 text-sm font-medium tracking-[-0.02em] text-off-white"
          onClick={() => navigate("/mypage/perfumes/new")}
          type="button"
        >
          <span className="text-left">새로운 향수 등록하기</span>
          <ChevronRight aria-hidden="true" size={18} strokeWidth={1.8} />
        </button>

        <div className="mt-[30px] flex items-center justify-between">
          <p className="text-sm font-normal leading-none tracking-[-0.02em] text-grey">
            이번 주 <span className="text-off-black">5일</span> 기록했어요
          </p>
          <button
            className="flex cursor-pointer items-center gap-1 text-xs font-medium leading-none tracking-[-0.02em] text-grey"
            onClick={() => navigate("/mypage/perfumes/record")}
            type="button"
          >
            기록하기
            <ChevronRight aria-hidden="true" size={14} strokeWidth={1.5} />
          </button>
        </div>

        <section className="mt-[22px] flex items-start justify-between">
          {weekDays.map((item) => {
            const isWeekend = item.weekend;
            return (
              <div className="flex w-10 flex-col items-center gap-2" key={item.day}>
                <span className={`text-[12px] font-semibold leading-none tracking-[-0.02em] ${isWeekend ? "text-point-orange" : "text-grey"}`}>
                  {item.day}
                </span>
                <div className="relative flex h-[40px] w-[40px] flex-col items-center">
                  <img alt="" className="absolute top-0 left-0 size-full object-contain" src={item.bottle} />
                  <span className={`absolute top-[16px] text-[12px] font-semibold tracking-[-0.02em] ${isWeekend ? "text-point-orange" : "text-off-white"}`}>
                    {item.date}
                  </span>
                </div>
              </div>
            );
          })}
        </section>

        <div className="mt-[30px] flex items-center justify-between gap-2">
          <div className="flex gap-1.5 overflow-x-auto [&::-webkit-scrollbar]:hidden">
            {categoryTabs.map((tab) => {
              const filterTab = filterTabs.includes(tab as FilterTab) ? (tab as FilterTab) : null;
              const isActive = filterTab
                ? filterOptions[filterTab].some((option) => selectedFilters.includes(option))
                : selectedFilters.length === 0;

              return (
                <button
                  aria-pressed={isActive}
                  className={`cursor-pointer whitespace-nowrap shrink-0 rounded-full px-3.5 py-2 text-[13px] font-medium leading-none tracking-[-0.02em] ${isActive ? "bg-off-black text-off-white" : "border-[0.8px] border-light-grey bg-off-white text-grey"
                    }`}
                  key={tab}
                  onClick={() => {
                    if (filterTab) setActiveFilter(filterTab);
                  }}
                  type="button"
                >
                  {tab}
                </button>
              );
            })}
          </div>
          <button className="flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full border-[0.8px] border-light-grey bg-off-white py-2 pl-3.5 pr-3 text-[13px] font-medium leading-none tracking-[-0.02em] text-grey" type="button">
            최신순
            <ChevronDown size={14} strokeWidth={1.5} />
          </button>
        </div>

        <section className="mt-[16px] flex flex-col gap-4">
          {filteredPerfumes.map((perfume) => (
            <PerfumeRecordCard key={perfume.name} perfume={perfume} />
          ))}
        </section>
      </div>

      <BottomNavigation />
      {activeFilter && (
        <FilterSheet
          activeTab={activeFilter}
          matchCount={filteredPerfumes.length}
          onClose={() => setActiveFilter(null)}
          onReset={() => setSelectedFilters([])}
          onSelectTab={setActiveFilter}
          onToggleFilter={toggleFilter}
          selectedFilters={selectedFilters}
        />
      )}
    </main>
  );
}
