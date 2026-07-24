import { ChevronDown, ChevronUp, Search, X } from "lucide-react";
import { useState } from "react";
import { BottomNavigation } from "../components/common/BottomNavigation";
import { BackHeader } from "../components/common/BackHeader";
import { HeartButton } from "../components/ui/HeartButton";
import { Tab } from "../components/ui/Tab";

const perfumeRecords = [
  {
    id: 1,
    brand: "MAISON MARGIELA FRAGRANCES",
    name: "체이싱 선셋 EDT 30ML",
    image: "https://www.figma.com/api/mcp/asset/7252c713-6dd7-4a63-89d3-2cc504b82536",
    isLiked: false,
  },
  {
    id: 2,
    brand: "BVLGARI PERFUME",
    name: "불가리 옴니아 아메시스트",
    image: "https://www.figma.com/api/mcp/asset/eee783e8-942e-4de2-a60c-68b7d94fe8ef",
    isLiked: false,
  },
  {
    id: 3,
    brand: "BULY",
    name: "클래식 오 트리쁠 향수 75ml - 이리 드 말트",
    image: "https://www.figma.com/api/mcp/asset/1f8ac282-4466-4a86-b26a-d075286621a5",
    isLiked: false,
  },
];

const filterKeywords = ["메종 마르지엘라", "100ml ~ 200ml 미만", "스위트/플로럴"];
const categoryTabs = ["브랜드", "향 계열/향기", "용량"];
const brandList = [
  { name: "메종 마르지엘라", nameEn: "MAISON MARGIELA FRAGRANCES", isSelected: true },
  { name: "불가리", nameEn: "BVLGARI PERFUME", isSelected: false },
  { name: "불리", nameEn: "BULY", isSelected: false },
];

export default function MyPerfumeRecordPage() {
  const [perfumes, setPerfumes] = useState(perfumeRecords);
  const [activeTab, setActiveTab] = useState(categoryTabs[0]);
  const [filters, setFilters] = useState(filterKeywords);

  const toggleLike = (id: number) => {
    setPerfumes(perfumes.map((p) => (p.id === id ? { ...p, isLiked: !p.isLiked } : p)));
  };

  const removeFilter = (keyword: string) => {
    setFilters(filters.filter((f) => f !== keyword));
  };

  return (
    <main className="mx-auto min-h-dvh w-full max-w-[430px] bg-off-white">
      <BackHeader title="향수 기록하기" backTo="/mypage/perfumes" />

      <div className="wrap flex flex-col gap-16 px-5 pb-[112px] pt-[calc(var(--app-header-height,54px)+24px)]">
        {/* Calendar Section */}
        <section className="rounded-lg border-[0.8px] border-light-grey bg-off-white p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold leading-none tracking-[-0.02em] text-off-black">2026년 7월</h2>
            <div className="flex gap-2">
              <button type="button" className="flex h-[30px] w-[30px] items-center justify-center">
                <ChevronUp size={20} className="text-grey" />
              </button>
              <button type="button" className="flex h-[30px] w-[30px] items-center justify-center">
                <ChevronDown size={20} className="text-grey" />
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="mt-4 grid grid-cols-7 gap-2 text-center">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-xs font-medium leading-none tracking-[-0.02em] text-grey">
                {day}
              </div>
            ))}
            {Array.from({ length: 31 }, (_, i) => (
              <div key={i + 1} className="text-xs font-normal leading-none tracking-[-0.02em] text-off-black">
                {i + 1}
              </div>
            ))}
          </div>
        </section>

        {/* Search & Filter Section */}
        <section className="space-y-4">
          {/* Search Input */}
          <div className="flex items-center gap-2.5 rounded-full bg-light2-grey px-5 py-[7px]">
            <Search size={18} className="shrink-0 text-grey" />
            <input
              type="text"
              placeholder="향수, 브랜드, 노트로 검색"
              className="min-w-0 flex-1 bg-transparent text-sm font-medium leading-none tracking-[-0.02em] text-off-black outline-none placeholder:text-grey"
            />
          </div>

          {/* Filter Chips */}
          {filters.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {filters.map((keyword) => (
                <button
                  key={keyword}
                  type="button"
                  className="flex shrink-0 items-center gap-1.5 rounded-full bg-light2-grey py-2 pl-3.5 pr-3 text-xs font-normal leading-none tracking-[-0.02em] text-off-black-70"
                  onClick={() => removeFilter(keyword)}
                >
                  {keyword}
                  <X aria-hidden="true" size={12} className="text-grey" />
                </button>
              ))}
            </div>
          )}

          {/* Category Tabs */}
          <div className="border-b-[0.8px] border-light-grey">
            <div className="flex gap-6">
              {categoryTabs.map((tab) => (
                <Tab
                  key={tab}
                  label={tab}
                  isActive={activeTab === tab}
                  onClick={() => setActiveTab(tab)}
                  className="border-b-2 border-transparent px-0 py-2 text-sm"
                />
              ))}
            </div>
          </div>

          {/* Brand List */}
          <div className="space-y-4">
            {brandList.map((brand) => (
              <div key={brand.name} className="flex items-center justify-between">
                <div className="min-w-0">
                  <p className="text-sm font-medium leading-none tracking-[-0.02em] text-off-black">{brand.name}</p>
                  <p className="mt-1 text-[10px] font-normal leading-none tracking-[-0.02em] text-grey uppercase">
                    {brand.nameEn}
                  </p>
                </div>
                <div
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-lg ${
                    brand.isSelected
                      ? "bg-point-orange"
                      : "border-[0.8px] border-light-grey bg-off-white"
                  }`}
                >
                  {brand.isSelected && (
                    <svg className="h-3 w-3 text-off-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Perfume Records List */}
        <section className="space-y-4">
          {perfumes.map((perfume) => (
            <article
              key={perfume.id}
              className="flex gap-5 rounded-lg border-[0.8px] border-light-grey bg-off-white p-3"
            >
              <div className="h-[100px] w-[100px] flex-shrink-0 overflow-hidden rounded-lg bg-light2-grey">
                <img
                  alt={perfume.name}
                  className="h-full w-full object-cover"
                  src={perfume.image}
                />
              </div>
              <div className="flex flex-1 flex-col justify-between min-w-0">
                <div className="min-w-0">
                  <p className="truncate text-xs font-normal leading-none tracking-[-0.02em] text-grey uppercase">
                    {perfume.brand}
                  </p>
                  <h3 className="mt-1 truncate text-base font-semibold leading-[1.2] tracking-[-0.02em] text-off-black">
                    {perfume.name}
                  </h3>
                </div>
                <div className="flex justify-end">
                  <HeartButton
                    isSelected={perfume.isLiked}
                    iconSize={24}
                    onClick={() => toggleLike(perfume.id)}
                  />
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>

      <BottomNavigation />
    </main>
  );
}
