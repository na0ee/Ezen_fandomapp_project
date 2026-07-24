import { Check, ChevronDown, Search, X } from "lucide-react";
import { useState } from "react";

import { BottomNavigation } from "../components/common/BottomNavigation";
import { HeaderActions } from "../components/common/HeaderActions";
import { BackHeader } from "../components/common/BackHeader";
import { HeartButton } from "../components/ui/HeartButton";
import { brands } from "../data/brands";
import { fragranceFamilies } from "../data/fragranceFamilies";
import { perfumeData } from "../data/perfumeData";
import wishlistCardBuly from "../assets/mypage/wishlist-card-buly.png";
import wishlistCardBvlgari from "../assets/mypage/wishlist-card-bvlgari.png";
import wishlistCardReplicaOrange from "../assets/mypage/wishlist-card-replica-orange.png";
import wishlistCardReplicaWhite from "../assets/mypage/wishlist-card-replica-white.png";

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

const perfumeImageById = (id: number) => perfumeData.find((item) => item.id === id)?.perfume.image ?? "";

const wishItems = [
  {
    brandId: "maison-margiela",
    brand: "MAISON MARGIELA FRAGRANCES",
    name: "체이싱 선셋 EDT 30ML",
    image: wishlistCardReplicaOrange,
    keywords: ["#망고 어코드", "#튜베로즈", "#샌달우드"],
  },
  {
    brandId: "bvlgari",
    brand: "BVLGARI PERFUME",
    name: "불가리 옴니아 아메시스트 오 드 뚜왈렛 100ml",
    image: wishlistCardBvlgari,
    keywords: ["#파우더리", "#아이리스", "#바닐라"],
  },
  {
    brandId: "buly",
    brand: "BULY",
    name: "클래식 오 트리쁠 향수 75ml - 이리 드 말트",
    image: wishlistCardBuly,
    keywords: ["#레몬 그라스", "#아이리스", "#인센스"],
  },
  {
    brandId: "maison-margiela",
    brand: "MAISON MARGIELA FRAGRANCES",
    name: "레이지 선데이 모닝 EDT 100ML",
    image: wishlistCardReplicaWhite,
    keywords: ["#은방울꽃", "#아이리스", "#화이트 머스크"],
  },
  {
    brandId: "jo-malone",
    brand: "JO MALONE",
    name: "우드 세이지 앤 씨 솔트 코롱 100ML",
    image: perfumeImageById(17),
    keywords: ["#암브레트 씨드", "#씨 솔트", "#드리프트우드"],
    centeredImage: true,
  },
  {
    brandId: "byredo",
    brand: "BYREDO",
    name: "블랑쉬 오 드 퍼퓸 100ML",
    image: perfumeImageById(21),
    keywords: ["#알데하이드", "#장미", "#화이트 머스크"],
    centeredImage: true,
  },
  {
    brandId: "le-labo",
    brand: "LE LABO",
    name: "산탈 33 오 드 퍼퓸 100ML",
    image: perfumeImageById(26),
    keywords: ["#샌들우드", "#시더우드", "#레더"],
    centeredImage: true,
  },
  {
    brandId: "diptyque",
    brand: "DIPTYQUE",
    name: "오 데 상스 오 드 뚜왈렛 100ML",
    image: perfumeImageById(36),
    keywords: ["#비터 오렌지", "#오렌지 블로섬", "#파촐리"],
    centeredImage: true,
  },
];

function DetailHeader({ title }: { title: string }) {
  return <BackHeader title={title} backTo="/mypage" action={<HeaderActions />} />;
}

function WishCard({ item }: { item: (typeof wishItems)[number] }) {
  const [isFavorite, setIsFavorite] = useState(true);
  const [isRegisteredOpen, setIsRegisteredOpen] = useState(false);

  return (
    <article className="h-[390px] min-w-0">
      <div className="relative flex h-[254px] items-center justify-center overflow-hidden bg-off-white">
        {item.centeredImage ? (
          <img alt={item.name} className="h-[150px] w-auto object-contain" src={item.image} />
        ) : (
          <img alt={item.name} className="size-full object-cover" src={item.image} />
        )}
        <HeartButton
          aria-label={`${item.name} ${isFavorite ? "위시리스트에서 제거" : "위시리스트에 추가"}`}
          className="absolute bottom-4 right-4 size-6"
          isSelected={isFavorite}
          onClick={() => setIsFavorite((favorite) => !favorite)}
        />
      </div>

      <div className="mt-3 flex h-14 flex-col gap-1">
        <p className="truncate text-xs font-normal leading-none tracking-[-0.02em] text-grey">{item.brand}</p>
        <h2 className="line-clamp-2 text-base font-semibold leading-[19px] tracking-[-0.02em]">{item.name}</h2>
      </div>

      <div className="mt-3 flex h-3.5 flex-wrap gap-x-2 gap-y-1 overflow-hidden">
        {item.keywords.map((keyword) => (
          <span className="text-xs font-medium leading-none tracking-[-0.02em] text-grey" key={keyword}>
            {keyword}
          </span>
        ))}
      </div>

      <button
        className="mt-3 h-[30px] w-fit cursor-pointer rounded-full border-[0.8px] border-light-grey px-3.5 text-xs font-medium leading-none tracking-[-0.02em] text-grey"
        onClick={() => setIsRegisteredOpen(true)}
        type="button"
      >
        구매 완료
      </button>

      {isRegisteredOpen && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/35 px-10" onClick={() => setIsRegisteredOpen(false)}>
          <section
            aria-label="내 향수 등록 완료"
            aria-modal="true"
            className="w-full max-w-[320px] rounded-[20px] bg-off-white px-6 py-7 text-center shadow-[0_18px_50px_rgba(0,0,0,0.22)]"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
          >
            <h2 className="text-xl font-bold tracking-[-0.02em]">내 향수 등록 완료</h2>
            <p className="mt-3 text-sm font-medium leading-[1.45] tracking-[-0.02em] text-grey">
              내 향수에 등록되었어요.
            </p>
            <button
              className="mt-6 h-12 w-full cursor-pointer rounded-[32px] bg-off-black text-base font-bold tracking-[-0.02em] text-off-white"
              onClick={() => setIsRegisteredOpen(false)}
              type="button"
            >
              확인
            </button>
          </section>
        </div>
      )}
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

export default function MyWishlistPage() {
  const [activeFilter, setActiveFilter] = useState<FilterTab | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<string[]>(defaultSelectedFilters);

  const toggleFilter = (option: string) => {
    setSelectedFilters((current) =>
      current.includes(option) ? current.filter((filter) => filter !== option) : [...current, option],
    );
  };

  const selectedBrandFilters = selectedFilters.filter((filter) => brandNames.includes(filter));
  const filteredWishItems =
    selectedBrandFilters.length === 0
      ? wishItems
      : wishItems.filter((item) => selectedBrandFilters.includes(brands.find((brand) => brand.id === item.brandId)?.name ?? ""));

  return (
    <main className="mx-auto min-h-dvh w-full max-w-[430px] cursor-default select-none overflow-x-hidden bg-off-white text-off-black">
      <DetailHeader title="위시리스트" />

      <div className="wrap px-side pb-[112px] pt-[calc(var(--app-header-height)+24px)]">
        <p className="text-sm font-normal leading-none tracking-[-0.02em] text-grey">
          담아둔 향수 <span className="text-off-black">{wishItems.length}</span>개 · 플로럴 계열에 관심이 많아요
        </p>

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
            <ChevronDown aria-hidden="true" size={14} strokeWidth={1.7} />
          </button>
        </div>

        <section className="mt-4 grid grid-cols-2 gap-x-2.5 gap-y-[30px]">
          {filteredWishItems.map((item) => (
            <WishCard item={item} key={item.name} />
          ))}
        </section>
      </div>

      <BottomNavigation />
      {activeFilter && (
        <FilterSheet
          activeTab={activeFilter}
          matchCount={filteredWishItems.length}
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
