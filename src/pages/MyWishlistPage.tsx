import { Check, ChevronDown, ChevronLeft, Search, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { BottomNavigation } from "../components/common/BottomNavigation";
import { HeaderActions } from "../components/common/HeaderActions";
import { HeartButton } from "../components/ui/HeartButton";
import wishlistCardBuly from "../assets/mypage/wishlist-card-buly.png";
import wishlistCardBvlgari from "../assets/mypage/wishlist-card-bvlgari.png";
import wishlistCardReplicaOrange from "../assets/mypage/wishlist-card-replica-orange.png";
import wishlistCardReplicaWhite from "../assets/mypage/wishlist-card-replica-white.png";

const filterTabs = ["브랜드", "향 계열/향기", "용량"] as const;
type FilterTab = (typeof filterTabs)[number];

const categoryTabs = ["전체", ...filterTabs];

const filterOptions: Record<FilterTab, string[]> = {
  브랜드: ["메종 마르지엘라", "불가리", "불리"],
  "향 계열/향기": ["스위트/플로럴", "우디", "프레시/아로마", "웜/스파이시", "시트러스/프루티", "머스크/파우더"],
  용량: ["30ml 미만", "30ml ~ 50ml 미만", "50ml ~ 100ml 미만", "100ml ~ 200ml 미만", "200ml ~ 300ml 미만", "300ml ~ 500ml 미만"],
};

const selectedFilters = ["메종 마르지엘라", "100ml ~ 200ml 미만", "스위트/플로럴"];

const wishItems = [
  {
    brand: "MAISON MARGIELA FRAGRANCES",
    name: "체이싱 선셋 EDT 30ML",
    image: wishlistCardReplicaOrange,
    keywords: ["#망고 어코드", "#튜베로즈", "#샌달우드"],
  },
  {
    brand: "BVLGARI PERFUME",
    name: "불가리 옴니아 아메시스트 오 드 뚜왈렛 100ml",
    image: wishlistCardBvlgari,
    keywords: ["#파우더리", "#아이리스", "#바닐라"],
  },
  {
    brand: "BULY",
    name: "클래식 오 트리쁠 향수 75ml - 이리 드 말트",
    image: wishlistCardBuly,
    keywords: ["#레몬 그라스", "#아이리스", "#인센스"],
  },
  {
    brand: "MAISON MARGIELA FRAGRANCES",
    name: "레이지 선데이 모닝 EDT 100ML",
    image: wishlistCardReplicaWhite,
    keywords: ["#은방울꽃", "#아이리스", "#화이트 머스크"],
  },
];

function DetailHeader({ title }: { title: string }) {
  return (
    <header className="fixed left-1/2 top-0 z-50 flex h-[var(--app-header-height)] w-full max-w-[430px] -translate-x-1/2 items-center justify-between bg-off-white px-side pt-[var(--app-safe-top)]">
      <div className="flex min-w-0 items-center">
        <Link aria-label="마이페이지로 돌아가기" className="-ml-1 flex size-7 items-center justify-center" to="/mypage">
          <ChevronLeft aria-hidden="true" size={24} strokeWidth={1.6} />
        </Link>
        <h1 className="truncate text-2xl font-semibold leading-[1.08] tracking-[-0.02em]">{title}</h1>
      </div>
      <HeaderActions />
    </header>
  );
}

function WishCard({ item }: { item: (typeof wishItems)[number] }) {
  const [isFavorite, setIsFavorite] = useState(true);

  return (
    <article className="h-[390px] min-w-0">
      <div className="relative h-[254px] overflow-hidden bg-off-white">
        <img alt={item.name} className="size-full object-cover" src={item.image} />
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

      <button className="mt-3 h-[30px] w-fit rounded-full border-[0.8px] border-light-grey px-3.5 text-xs font-medium leading-none tracking-[-0.02em] text-grey" type="button">
        구매 완료
      </button>
    </article>
  );
}

function FilterSheet({ activeTab, onClose, onSelectTab }: { activeTab: FilterTab; onClose: () => void; onSelectTab: (tab: FilterTab) => void }) {
  const brandSubtitles: Record<string, string> = {
    "메종 마르지엘라": "MAISON MARGIELA FRAGRANCES",
    "불가리": "BVLGARI PERFUME",
    "불리": "BULY",
  };

  return (
    <div className="fixed inset-0 z-[60] flex justify-center bg-black/40">
      <button aria-label="필터 닫기" className="absolute inset-0 cursor-default" onClick={onClose} type="button" />
      <section className="absolute bottom-0 left-1/2 flex h-[546px] w-full max-w-[430px] -translate-x-1/2 flex-col overflow-hidden rounded-t-[20px] bg-off-white">
        <div className="mx-auto mt-3 h-1 w-8 shrink-0 rounded-[24px] bg-light-grey" />

        <div className="mt-4 shrink-0 border-b-[0.8px] border-light-grey px-side">
          <div className="flex gap-6">
            {filterTabs.map((tab) => (
              <button
                className={`flex h-10 items-center border-b-2 text-[15px] font-medium leading-none tracking-[-0.02em] transition-colors ${activeTab === tab ? "border-point-orange text-off-black" : "border-transparent text-grey"
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

        <div className="flex-1 overflow-y-auto pb-[159px]">
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
            {filterOptions[activeTab].map((option, index) => {
              const selected = selectedFilters.includes(option) || (activeTab === "향 계열/향기" && index === 0);

              if (activeTab === "브랜드") {
                return (
                  <button className="flex w-full items-center justify-between text-left" key={`${activeTab}-${option}`} type="button">
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
                <button className="flex items-center gap-2.5 text-left" key={`${activeTab}-${option}`} type="button">
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

        <div className="absolute bottom-0 left-0 flex h-[159px] w-full flex-col border-t-[0.8px] border-light-grey bg-off-white px-side pb-6 pt-4">
          <div className="flex gap-2 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden">
            {selectedFilters.map((filter) => (
              <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-light2-grey py-2 pl-3.5 pr-3 text-[13px] font-normal leading-none tracking-[-0.02em] text-off-black-70" key={filter}>
                {filter}
                <X aria-hidden="true" size={12} strokeWidth={2} className="text-grey" />
              </span>
            ))}
          </div>
          <div className="flex gap-3">
            <button className="h-[52px] w-[110px] shrink-0 rounded-full border-[1px] border-light-grey bg-off-white text-[15px] font-semibold tracking-[-0.02em] text-off-black" type="button">
              초기화
            </button>
            <button className="h-[52px] flex-1 rounded-full bg-off-black text-[15px] font-semibold tracking-[-0.02em] text-off-white" onClick={onClose} type="button">
              1개의 상품 보기
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function MyWishlistPage() {
  const [activeFilter, setActiveFilter] = useState<FilterTab | null>(null);

  return (
    <main className="mx-auto min-h-dvh w-full max-w-[430px] overflow-x-hidden bg-off-white text-off-black">
      <DetailHeader title="위시리스트" />

      <div className="wrap px-side pb-[112px] pt-[calc(var(--app-header-height)+24px)]">
        <p className="text-sm font-normal leading-none tracking-[-0.02em] text-grey">
          담아둔 향수 <span className="text-off-black">4</span>개 · 플로럴 계열에 관심이 많아요
        </p>

        <div className="mt-[30px] flex items-center justify-between gap-2">
          <div className="flex gap-1.5 overflow-x-auto [&::-webkit-scrollbar]:hidden">
            {categoryTabs.map((tab, index) => {
              const filterTab = filterTabs.includes(tab as FilterTab) ? (tab as FilterTab) : null;

              return (
                <button
                  aria-pressed={index === 0}
                  className={`whitespace-nowrap shrink-0 rounded-full px-3.5 py-2 text-[13px] font-medium leading-none tracking-[-0.02em] ${index === 0 ? "bg-off-black text-off-white" : "border-[0.8px] border-light-grey bg-off-white text-grey"
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
          <button className="flex shrink-0 items-center gap-1 rounded-full border-[0.8px] border-light-grey bg-off-white px-3 py-1.5 text-[12px] font-medium leading-none tracking-[-0.02em] text-grey" type="button">
            최신순
            <ChevronDown aria-hidden="true" size={14} strokeWidth={1.7} />
          </button>
        </div>

        <section className="mt-4 grid grid-cols-2 gap-2.5">
          {wishItems.map((item) => (
            <WishCard item={item} key={item.name} />
          ))}
        </section>
      </div>

      <BottomNavigation />
      {activeFilter && <FilterSheet activeTab={activeFilter} onClose={() => setActiveFilter(null)} onSelectTab={setActiveFilter} />}
    </main>
  );
}
