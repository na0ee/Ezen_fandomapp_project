import { ChevronLeft, Search, Send, UserCheck, UserPlus } from "lucide-react";
import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import fireBadge from "../assets/mypage/fire-badge.svg";
import { brands } from "../data/brands";
import { perfumeData } from "../data/perfumeData";
import type { PerfumeEntry } from "../data/perfumeData";
import { findRecommendUser } from "../data/recommendUsers";

const assets = Object.fromEntries(
  Object.entries({
    perfume: "/assets/figma/1a1cf807-eb4f-4aa5-a14f-c60de2901496.png",
  }).map(([key, path]) => [key, `${import.meta.env.BASE_URL}${path.slice(1)}`]),
) as Record<string, string>;

type RecommendPerfumeItem = {
  brand: string;
  image: string;
  name: string;
};

const brandNames = Object.fromEntries(brands.map((brand) => [brand.id, brand]));

function getBrandName(brandId: string) {
  return brandNames[brandId]?.nameEn ?? brandId;
}

function getPerfumeSearchText(entry: PerfumeEntry) {
  const brand = brandNames[entry.perfume.brandId];

  return [
    entry.perfume.name,
    entry.perfume.description,
    entry.perfume.brandId,
    brand?.name,
    brand?.nameEn,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function toRecommendPerfumeItem(entry: PerfumeEntry): RecommendPerfumeItem {
  return {
    brand: getBrandName(entry.perfume.brandId),
    image: `${import.meta.env.BASE_URL}${entry.perfume.image.slice(1)}`,
    name: entry.perfume.name,
  };
}

const perfumeItems: RecommendPerfumeItem[] = [
  {
    brand: "Jo Malone London",
    name: "Blackberry & Bay Cologne",
    image: assets.perfume,
  },
  {
    brand: "Jo Malone London",
    name: "Blackberry & Bay Cologne",
    image: assets.perfume,
  },
];

export default function UserProfilePage() {
  const navigate = useNavigate();
  const { profileId = "story-one" } = useParams();
  const [isFollowing, setIsFollowing] = useState(false);
  const [isRecommendSheetOpen, setIsRecommendSheetOpen] = useState(false);
  const [isCompleteOpen, setIsCompleteOpen] = useState(false);
  const profile = findRecommendUser(profileId);

  const handleRecommendComplete = () => {
    setIsRecommendSheetOpen(false);
    setIsCompleteOpen(true);
  };

  return (
    <main className="mx-auto min-h-dvh w-full max-w-[430px] overflow-x-hidden bg-off-white text-off-black">
      <header className="fixed left-1/2 top-0 z-50 flex h-[var(--app-header-height)] w-full max-w-[430px] -translate-x-1/2 flex-col bg-off-white pt-[var(--app-safe-top)]">
        <button
          aria-label="이벤트로 돌아가기"
          className="flex h-[54px] w-14 items-center justify-center"
          onClick={() => navigate("/event/recommend-feed")}
          type="button"
        >
          <ChevronLeft aria-hidden="true" size={26} strokeWidth={1.4} />
        </button>
      </header>

      <section className="wrap pt-[var(--app-header-height)]">
        <div className="relative h-[560px] overflow-hidden bg-off-black text-off-white">
          {profile.profileImages.map((image) => (
            <img alt="" className="absolute inset-0 h-full w-full object-cover" key={image} src={image} />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />
          <div className="absolute inset-x-5 bottom-6">
            <div className="flex items-center gap-2 text-sm font-bold leading-none">
              <span className="inline-flex items-center gap-1 rounded-full bg-black/30 py-1 pl-1 pr-2">
                <img alt="" aria-hidden="true" className="size-[19px] object-contain" src={fireBadge} />
                {profile.badge}
              </span>
              <span className="rounded-full bg-black/35 px-2 py-1 font-cormorant text-base">{profile.mood}</span>
            </div>
            <h1 className="mt-2 text-[34px] font-bold leading-none tracking-[-0.02em]">{profile.name}</h1>
          </div>
        </div>

        <div className="px-5 pb-10 pt-6">
          <p className="whitespace-pre-line text-sm font-medium leading-[1.32] tracking-[-0.02em]">
            {profile.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-sm font-medium tracking-[-0.02em]">
            {profile.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <p className="mt-4 text-xs font-medium tracking-[-0.02em] text-grey">{profile.date}</p>

          <div className="mx-auto mt-8 flex w-[325px] gap-2">
            <button
              aria-pressed={isFollowing}
              className="flex h-14 w-[164px] items-center justify-center gap-2 rounded-[32px] border border-light-grey bg-off-white text-xl font-bold tracking-[-0.02em]"
              onClick={() => setIsFollowing((current) => !current)}
              type="button"
            >
              {isFollowing ? (
                <UserCheck aria-hidden="true" size={24} strokeWidth={2} />
              ) : (
                <UserPlus aria-hidden="true" size={24} strokeWidth={2} />
              )}
              {isFollowing ? "팔로잉" : "팔로우"}
            </button>
            <button
              className="flex h-14 w-[153px] items-center justify-center rounded-[32px] bg-off-black text-xl font-bold tracking-[-0.02em] text-off-white"
              onClick={() => setIsRecommendSheetOpen(true)}
              type="button"
            >
              추천하기
            </button>
          </div>
        </div>
      </section>

      <RecommendBottomSheet
        isOpen={isRecommendSheetOpen}
        onClose={() => setIsRecommendSheetOpen(false)}
        onComplete={handleRecommendComplete}
      />
      <RecommendCompleteDialog isOpen={isCompleteOpen} onClose={() => setIsCompleteOpen(false)} />
    </main>
  );
}

function RecommendBottomSheet({
  isOpen,
  onClose,
  onComplete,
}: {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}) {
  const dragStartY = useRef<number | null>(null);
  const [activeSource, setActiveSource] = useState("내 위시리스트");
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState("");
  const normalizedSearchQuery = searchQuery.trim().toLowerCase();
  const visiblePerfumeItems =
    activeSource === "전체"
      ? normalizedSearchQuery
        ? perfumeData
            .filter((entry) => getPerfumeSearchText(entry).includes(normalizedSearchQuery))
            .slice(0, 1)
            .map(toRecommendPerfumeItem)
        : []
      : perfumeItems;

  if (!isOpen) {
    return null;
  }

  const handleDragStart = (event: React.PointerEvent<HTMLButtonElement>) => {
    dragStartY.current = event.clientY;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleDragEnd = (event: React.PointerEvent<HTMLButtonElement>) => {
    const startY = dragStartY.current;
    dragStartY.current = null;
    if (startY !== null && event.clientY - startY > 36) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex justify-center bg-black/35"
      onClick={onClose}
    >
      <div className="fixed bottom-0 left-1/2 w-full max-w-[430px] -translate-x-1/2" onClick={(event) => event.stopPropagation()}>
        <section
          aria-label="향수 추천하기"
          aria-modal="true"
          className="flex h-[399px] animate-[sheetUp_240ms_ease-out] flex-col rounded-t-[20px] bg-off-white px-5 pt-4"
          role="dialog"
        >
          <button
            aria-label="아래로 드래그해서 닫기"
            className="mx-auto flex h-3 w-16 touch-none items-start justify-center"
            onPointerCancel={() => {
              dragStartY.current = null;
            }}
            onPointerDown={handleDragStart}
            onPointerUp={handleDragEnd}
            type="button"
          >
            <span className="h-1 w-8 rounded-[24px] bg-light2-grey" />
          </button>

          <label className="mt-3 flex h-[39px] items-center rounded-[20px] bg-light2-grey px-5">
            <Search aria-hidden="true" className="shrink-0 text-off-black/70" size={25} strokeWidth={1.5} />
            <span className="sr-only">향수 검색</span>
            <input
              className="ml-3 min-w-0 flex-1 bg-transparent text-sm font-medium tracking-[-0.02em] text-off-black outline-none placeholder:text-off-black-70"
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="향수, 브랜드, 노트로 검색"
              type="search"
              value={searchQuery}
            />
          </label>

          <div className="mt-4 flex gap-2">
            {["전체", "내 위시리스트", "내 보관함"].map((label) => (
              <button
                aria-pressed={activeSource === label}
                className={`h-[30px] rounded-[16px] border px-3.5 text-xs font-medium tracking-[-0.02em] ${
                  activeSource === label
                    ? "border-off-black bg-off-black text-off-white"
                    : "border-light-grey bg-off-white text-off-black"
                }`}
                key={label}
                onClick={() => setActiveSource(label)}
                type="button"
              >
                {label}
              </button>
            ))}
          </div>

          <div className="mt-2 flex flex-col gap-2">
            {visiblePerfumeItems.map((item, index) => (
              <button
                className="flex h-[78px] w-full items-center rounded-[16px] border border-light-grey bg-off-white p-2 text-left"
                key={`${item.name}-${index}`}
                type="button"
              >
                <span className="flex size-[62px] shrink-0 items-center justify-center overflow-hidden rounded-[8px] bg-light2-grey">
                  <img alt="" className="h-full w-full object-cover" src={item.image} />
                </span>
                <span className="ml-4 min-w-0">
                  <span className="block truncate text-xs font-medium leading-none tracking-[-0.02em] text-grey">
                    {item.brand}
                  </span>
                  <span className="mt-1 block truncate font-geist text-[15px] font-semibold leading-none tracking-[-0.02em]">
                    {item.name}
                  </span>
                </span>
              </button>
            ))}
          </div>

          <div className="mt-6 flex h-[50px] items-start gap-2.5">
            <label className="flex h-[42px] min-w-0 flex-1 items-center rounded-[10px] border border-light-grey px-[18px]">
              <span className="sr-only">추가 메시지</span>
              <input
                className="w-full bg-transparent font-geist text-[13px] tracking-[-0.02em] text-off-black outline-none placeholder:text-grey"
                onChange={(event) => setMessage(event.target.value)}
                placeholder="추가 메세지를 입력하세요"
                type="text"
                value={message}
              />
            </label>
            <button
              aria-label="추천 보내기"
              className="flex size-[50px] shrink-0 items-center justify-center rounded-full bg-off-black text-off-white"
              onClick={onComplete}
              type="button"
            >
              <Send aria-hidden="true" size={18} strokeWidth={1.8} />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

function RecommendCompleteDialog({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/35 px-10"
      onClick={onClose}
    >
      <section
        aria-label="추천 완료"
        aria-modal="true"
        className="w-full max-w-[320px] rounded-[20px] bg-off-white px-6 py-7 text-center shadow-[0_18px_50px_rgba(0,0,0,0.22)]"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
      >
        <h2 className="text-xl font-bold tracking-[-0.02em]">추천 완료</h2>
        <p className="mt-3 text-sm font-medium leading-[1.45] tracking-[-0.02em] text-grey">
          Juhoon님에게 향수 추천을 보냈어요.
        </p>
        <button
          className="mt-6 h-12 w-full rounded-[32px] bg-off-black text-base font-bold tracking-[-0.02em] text-off-white"
          onClick={onClose}
          type="button"
        >
          확인
        </button>
      </section>
    </div>
  );
}
