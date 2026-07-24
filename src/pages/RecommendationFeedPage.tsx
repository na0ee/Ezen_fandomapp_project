import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import fireBadge from "../assets/mypage/fire-badge.svg";
import { BottomNavigation } from "../components/common/BottomNavigation";
import { HeaderActions } from "../components/common/HeaderActions";
import { BackHeader } from "../components/common/BackHeader";
import { getMyProfileMood, myProfile } from "../data/myProfile";
import { perfumeData } from "../data/perfumeData";
import { shuffledRecommendUsers } from "../data/recommendUsers";
import type { RecommendUser } from "../data/recommendUsers";

const asset = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

const receivedRecommendationProfiles = [
  {
    nickname: "chlgotn",
    message: "깨끗하고 포근한 분위기와 잘 어울릴 것 같아요.",
    detailMessage:
      "프로필을 보니 맑고 편안한 분위기가 이 향수와 잘 어울릴 것 같아요. 갓 세탁한 침구처럼 포근하게 남는 향이라 데일리로 추천드립니다. 가벼운 외출이나 쉬는 날에 뿌리면 특히 좋을 것 같아요. 위시에도 한번 담아보세요!",
    avatar: asset("/assets/figma/recommend-sheet-avatar.png"),
  },
  {
    nickname: "scent.zip",
    message: "따뜻한 우디 무드를 좋아하실 것 같아 골라봤어요.",
    detailMessage:
      "사진에서 느껴지는 차분하고 따뜻한 무드가 이 향수와 닮았어요. 장작과 바닐라가 포근하게 이어져서 쌀쌀한 날 니트에 뿌리기 좋답니다. 너무 달지 않게 잔향이 남아서 저녁 약속에도 잘 어울릴 것 같아요.",
    avatar: asset("/assets/recommend/katarina.png"),
  },
  {
    nickname: "muskday",
    message: "분위기 있는 밤에 잘 어울리는 향으로 추천해요.",
    detailMessage:
      "프로필의 시크하고 여유로운 분위기를 보고 바로 이 향수가 떠올랐어요. 럼과 타바코의 깊은 향 뒤에 바닐라가 부드럽게 남아서 밤 산책이나 늦은 약속에 특히 잘 어울려요. 우디 향과 레이어링해도 멋질 것 같아요!",
    avatar: asset("/assets/recommend/3an.png"),
  },
  {
    nickname: "summer.note",
    message: "싱그럽고 가벼운 인상에 잘 맞는 향수예요.",
    detailMessage:
      "밝고 산뜻한 분위기와 레몬 잎의 싱그러움이 정말 잘 어울릴 것 같아요. 첫 향은 상큼하지만 잔향은 부드럽고 깨끗해서 더운 날에도 부담 없이 사용할 수 있어요. 흰 셔츠나 가벼운 여름 코디에 꼭 한번 매치해보세요.",
    avatar: asset("/assets/recommend/yujin.png"),
  },
];

// 추천받은 향수 — 공용 향수 데이터(perfumeData)의 한글 이름·이미지를 사용
const receivedRecommendations = perfumeData.slice(0, 4).map((entry, index) => ({
  id: `received-${index + 1}`,
  perfume: entry.perfume.name,
  brand: "Maison Margiela Fragrances",
  nickname: receivedRecommendationProfiles[index].nickname,
  message: receivedRecommendationProfiles[index].message,
  detailMessage: receivedRecommendationProfiles[index].detailMessage,
  avatar: receivedRecommendationProfiles[index].avatar,
  image: asset(entry.perfume.image),
  detailImage:
    index === 2
      ? asset("/assets/figma/recommend-detail-perfume.png")
      : asset(entry.perfume.image),
  scentDescription: entry.perfume.description,
}));

const sentRecommendationProfiles = [
  {
    nickname: "Jennie",
    message: "차분하면서 포근한 무드와 잘 어울릴 것 같아 추천했어요.",
  },
  {
    nickname: "3an",
    message: "따뜻한 우디 향을 좋아한다고 해서 이 향수를 골랐어요.",
  },
  {
    nickname: "yujin",
    message: "밤 산책에 어울리는 깊고 분위기 있는 향으로 추천했어요.",
  },
  {
    nickname: "nanana",
    message: "상큼하고 가벼운 여름 향을 찾는다고 해서 추천했어요.",
  },
] as const;

type MainTab = "mine" | "recommend";
type RecommendationTab = "received" | "sent";

function RecommendationHeader() {
  return <BackHeader title="향 추천하기" action={<HeaderActions />} />;
}

function TopTabs({
  activeTab,
  onChange,
}: {
  activeTab: MainTab;
  onChange: (tab: MainTab) => void;
}) {
  return (
    <div className="sticky top-[54px] z-40 -mx-5 mb-5 flex h-[64px] items-start gap-2 bg-off-white px-5 pt-[34px]">
      {[
        ["mine", "내 피드"],
        ["recommend", "추천하기 피드"],
      ].map(([tab, label]) => {
        const isActive = activeTab === tab;

        return (
          <button
            className={`h-[30px] rounded-full px-3.5 text-xs font-medium leading-none tracking-[-0.02em] ${
              isActive
                ? "bg-off-black text-off-white"
                : "border border-light-grey bg-off-white text-off-black"
            }`}
            key={tab}
            onClick={() => onChange(tab as MainTab)}
            type="button"
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

function FeedCard({ item }: { item: RecommendUser }) {
  return (
    <Link
      aria-label={`${item.name} 향 추천 피드 보기`}
      className="relative flex h-[297px] flex-col items-start justify-between overflow-hidden rounded-[10px] bg-light2-grey p-[14px]"
      to={`/event/recommend-profile/${item.id}`}
    >
      {item.feedImages.map((image) => (
        <img
          alt=""
          className="absolute inset-0 h-full w-full rounded-[10px] object-cover"
          key={image}
          src={image}
        />
      ))}
      <div className="pointer-events-none absolute inset-0 rounded-[10px] bg-gradient-to-t from-black/60 via-black/5 to-transparent" />
      <span className="relative flex min-w-[102px] items-center justify-center rounded-[24px] bg-[rgba(26,26,26,0.5)] px-2.5 py-1">
        <span className="font-cormorant text-base font-bold leading-[normal] tracking-[-0.02em] text-[#ededed]">
          {item.mood}
        </span>
      </span>
      <div className="relative flex w-full flex-col items-start gap-2 text-off-white">
        <p className="max-w-full truncate text-xl font-bold leading-[normal] tracking-[-0.02em]">
          {item.name}
        </p>
        <div className="flex items-center gap-1.5 text-light-grey">
          <span className="text-sm font-medium leading-none tracking-[-0.02em]">
            {item.cta}
          </span>
          <ChevronRight aria-hidden="true" size={18} strokeWidth={1.6} />
        </div>
      </div>
    </Link>
  );
}

function RecommendFeedGrid() {
  return (
    <div className="grid grid-cols-2 gap-2">
      {shuffledRecommendUsers.map((item) => (
        <FeedCard item={item} key={item.id} />
      ))}
    </div>
  );
}

function MyFeedHero() {
  return (
    <section className="-mx-5">
      <div className="relative h-[560px] w-full overflow-hidden bg-off-black text-off-white">
        <img
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          src={myProfile.feedImages[0]}
        />
        <div className="absolute left-0 top-[-85px] h-[645px] w-full">
          <img
            alt=""
            className="h-full w-full object-cover"
            src={myProfile.feedImages[1]}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />
        <div className="absolute inset-x-5 bottom-5">
          <div className="flex items-center gap-1">
            <span className="inline-flex h-[24px] items-center gap-0.5 rounded-full bg-black/20 pr-1.5 text-sm font-bold leading-none">
              <img
                alt=""
                aria-hidden="true"
                className="size-[19px]"
                src={fireBadge}
              />
              {myProfile.badge}
            </span>
            <span className="rounded-full bg-black/50 px-2.5 py-1 font-cormorant text-base font-bold leading-none text-light2-grey">
              {getMyProfileMood()}
            </span>
          </div>
          <div className="mt-1 flex items-end gap-2 text-off-white">
            <h2 className="shrink-0 text-[30px] font-bold leading-[normal] tracking-[-0.02em]">
              {myProfile.name}
            </h2>
            <div className="flex items-center gap-3 pb-1 text-xs font-medium leading-[normal] tracking-[-0.02em]">
              <span>팔로우 {myProfile.followers}</span>
              <span>팔로잉 {myProfile.following}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RecommendationFilterTabs({
  activeTab,
  onChange,
}: {
  activeTab: RecommendationTab;
  onChange: (tab: RecommendationTab) => void;
}) {
  const tabs = [
    { id: "received", label: "추천받은" },
    { id: "sent", label: "내가 추천한" },
  ] as const;

  return (
    <div className="-mx-5 flex h-[30px] items-start gap-2 bg-off-white px-5">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <button
            className={`flex h-[30px] items-center justify-center gap-1.5 rounded-full px-3.5 text-xs font-medium tracking-[-0.02em] ${
              isActive
                ? "bg-off-black text-off-white"
                : "border border-light-grey bg-off-white text-off-black"
            }`}
            key={tab.id}
            onClick={() => onChange(tab.id)}
            type="button"
          >
            <span
              aria-hidden="true"
              className={`inline-flex size-3.5 shrink-0 items-center justify-center overflow-hidden rounded-full ${
                isActive
                  ? "bg-off-white text-off-black"
                  : "bg-off-black text-off-white"
              }`}
            >
              {tab.id === "received" ? (
                <RecommendationHeartIcon />
              ) : (
                <RecommendationActivityIcon />
              )}
            </span>
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

function RecommendationHeartIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-3.5"
      fill="none"
      viewBox="0 0 14 14"
    >
      <path
        d="M10.1515 4.80599C9.96944 4.62381 9.75324 4.47929 9.51528 4.38069C9.27731 4.28209 9.02226 4.23134 8.76468 4.23134C8.5071 4.23134 8.25204 4.28209 8.01408 4.38069C7.77611 4.47929 7.55991 4.62381 7.37782 4.80599L6.99991 5.1839L6.62199 4.80599C6.25418 4.43817 5.75531 4.23154 5.23513 4.23154C4.71496 4.23154 4.21609 4.43817 3.84827 4.80599C3.48045 5.17381 3.27382 5.67268 3.27382 6.19285C3.27382 6.71303 3.48045 7.21189 3.84827 7.57971L4.22618 7.95762L6.99991 10.7313L9.77363 7.95762L10.1515 7.57971C10.3337 7.39762 10.4782 7.18141 10.5768 6.94345C10.6754 6.70549 10.7262 6.45043 10.7262 6.19285C10.7262 5.93527 10.6754 5.68021 10.5768 5.44225C10.4782 5.20429 10.3337 4.98809 10.1515 4.80599Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function RecommendationActivityIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-3.5"
      fill="none"
      viewBox="0 0 14 14"
    >
      <path
        d="M11.1667 7H9.5L8.25 10.75L5.75 3.25L4.5 7H2.83333"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.16667"
      />
    </svg>
  );
}

function RecommendationCard({
  item,
  variant = "received",
  onOpen,
}: {
  item: (typeof receivedRecommendations)[number];
  variant?: RecommendationTab;
  onOpen: () => void;
}) {
  const primaryText = variant === "sent" ? item.nickname : item.perfume;
  const secondaryText = variant === "sent" ? item.perfume : item.nickname;

  return (
    <article className="flex h-[116px] w-full items-center gap-4 overflow-hidden rounded-[16px] border border-light2-grey bg-off-white p-2">
      <div className="flex size-[100px] shrink-0 items-center justify-center overflow-hidden rounded-[12px] bg-light2-grey">
        <img
          alt=""
          className="h-[76px] w-[76px] object-contain"
          src={item.image}
        />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex min-w-0 items-center gap-1">
          <p className="truncate text-base font-semibold leading-none tracking-[-0.02em] text-off-black">
            {primaryText}
          </p>
          <span className="shrink-0 text-xs font-medium leading-none tracking-[-0.02em] text-off-black">
            |
          </span>
          <p className="truncate text-xs font-medium leading-none tracking-[-0.02em] text-off-black">
            {secondaryText}
          </p>
        </div>
        <p className="mt-2 truncate text-sm font-normal leading-none tracking-[-0.02em] text-grey">
          {item.message}
        </p>
        {variant === "received" && (
          <button
            aria-haspopup="dialog"
            aria-label={`${item.perfume} 추천 상세 보기`}
            className="mt-[16px] flex items-center gap-1.5 text-sm font-medium leading-none tracking-[-0.02em] text-grey"
            onClick={onOpen}
            type="button"
          >
            자세히 보기
            <ChevronRight aria-hidden="true" size={18} strokeWidth={1.6} />
          </button>
        )}
      </div>
    </article>
  );
}

function RecommendationDetailSheet({
  isSaved,
  item,
  onClose,
  onSaveToggle,
}: {
  isSaved: boolean;
  item: (typeof receivedRecommendations)[number] | null;
  onClose: () => void;
  onSaveToggle: () => void;
}) {
  if (!item) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[80]" onClick={onClose}>
      <section
        aria-label={`${item.perfume} 추천 상세`}
        aria-modal="true"
        className="animate-[sheetUp_240ms_ease-out] absolute bottom-0 left-1/2 flex h-[560px] max-h-[85dvh] w-full max-w-[430px] -translate-x-1/2 flex-col items-center overflow-hidden rounded-t-2xl bg-off-white shadow-[0_-3px_9.9px_rgba(0,0,0,0.1)]"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
      >
        <button
          aria-label="추천 상세 닫기"
          className="mt-3.5 flex h-4 w-16 items-start justify-center"
          onClick={onClose}
          type="button"
        >
          <span className="h-1 w-8 rounded-[24px] bg-light-grey" />
        </button>

        <div className="mt-4 flex w-full items-center justify-between px-5">
          <div className="flex items-center gap-2.5">
            <img
              alt=""
              aria-hidden="true"
              className="size-[42px] rounded-full object-cover"
              src={item.avatar}
            />
            <div className="flex flex-col leading-none">
              <p className="text-base font-medium tracking-[-0.02em] text-off-black">
                {item.nickname}
              </p>
              <p className="text-xs font-medium tracking-[-0.02em] text-grey">
                5분 전
              </p>
            </div>
          </div>
          <button aria-label="추천 메뉴" className="size-6" type="button">
            <img
              alt=""
              aria-hidden="true"
              className="size-full"
              src={asset("/assets/figma/recommend-sheet-more.svg")}
            />
          </button>
        </div>

        <p className="mt-4 w-full px-5 text-sm font-normal leading-[normal] tracking-[-0.02em] text-off-black">
          {item.detailMessage}
        </p>

        <article className="mt-4 flex h-[108px] w-[calc(100%_-_40px)] items-center gap-3 overflow-hidden rounded-[8px] border-[0.5px] border-light2-grey bg-off-white p-2">
          <div className="size-[92px] shrink-0 overflow-hidden rounded-[8px] bg-light2-grey">
            <img
              alt={`${item.perfume} 향수`}
              className={`size-full ${item.id === "received-3" ? "object-cover" : "object-contain p-2"}`}
              src={item.detailImage}
            />
          </div>
          <div className="relative flex h-[71px] min-w-0 flex-1 flex-col justify-between">
            <div>
              <p className="truncate pr-5 text-xs font-medium leading-[normal] tracking-[-0.02em] text-grey">
                {item.brand}
              </p>
              <p className="truncate pr-5 text-base font-semibold leading-[normal] tracking-[-0.02em] text-[#171717]">
                {item.perfume}
              </p>
            </div>
            <div className="flex items-center justify-between gap-2">
              <p className="min-w-0 flex-1 truncate text-sm font-medium leading-[normal] tracking-[-0.02em] text-subtext">
                {item.scentDescription}
              </p>
              <button
                className="shrink-0 rounded-[16px] bg-off-black px-3.5 py-[5px] text-xs font-normal leading-none tracking-[-0.02em] text-off-white"
                type="button"
              >
                향수 보기
              </button>
            </div>
            <button
              aria-label={isSaved ? "향수 좋아요 취소" : "향수 좋아요"}
              aria-pressed={isSaved}
              className="absolute -right-1 -top-1.5 flex size-8 items-center justify-center"
              onClick={onSaveToggle}
              type="button"
            >
              <img
                alt=""
                aria-hidden="true"
                className="h-[19px] w-[22px]"
                src={asset(
                  isSaved
                    ? "/assets/figma/recommend-detail-heart.svg"
                    : "/assets/figma/recommend-detail-heart-outline.svg",
                )}
              />
            </button>
          </div>
        </article>
      </section>
    </div>
  );
}

function MyFeedContent() {
  const [activeRecommendationTab, setActiveRecommendationTab] =
    useState<RecommendationTab>("received");
  const [selectedRecommendation, setSelectedRecommendation] = useState<
    (typeof receivedRecommendations)[number] | null
  >(null);
  const [savedRecommendationIds, setSavedRecommendationIds] = useState<
    Set<string>
  >(() => new Set());
  const list =
    activeRecommendationTab === "received"
      ? receivedRecommendations
      : receivedRecommendations.map((item, index) => ({
          ...item,
          id: `sent-${index + 1}`,
          nickname: sentRecommendationProfiles[index].nickname,
          message: sentRecommendationProfiles[index].message,
        }));

  return (
    <div className="flex flex-col gap-5">
      <MyFeedHero />
      <section className="flex flex-col gap-4">
        <RecommendationFilterTabs
          activeTab={activeRecommendationTab}
          onChange={setActiveRecommendationTab}
        />
        <div className="flex flex-col gap-[10px]">
          {list.map((item) => (
            <RecommendationCard
              item={item}
              key={item.id}
              onOpen={() => setSelectedRecommendation(item)}
              variant={activeRecommendationTab}
            />
          ))}
        </div>
      </section>
      <RecommendationDetailSheet
        isSaved={
          selectedRecommendation
            ? savedRecommendationIds.has(selectedRecommendation.id)
            : false
        }
        item={selectedRecommendation}
        onClose={() => setSelectedRecommendation(null)}
        onSaveToggle={() => {
          if (!selectedRecommendation) {
            return;
          }

          setSavedRecommendationIds((currentIds) => {
            const nextIds = new Set(currentIds);

            if (nextIds.has(selectedRecommendation.id)) {
              nextIds.delete(selectedRecommendation.id);
            } else {
              nextIds.add(selectedRecommendation.id);
            }

            return nextIds;
          });
        }}
      />
    </div>
  );
}

export function RecommendationFeedPage() {
  const [activeTab, setActiveTab] = useState<MainTab>("recommend");

  return (
    <main className="min-h-dvh bg-black max-[430px]:bg-off-white text-off-black">
      <div className="relative mx-auto min-h-dvh w-full max-w-[430px] overflow-x-hidden bg-off-white">
        <RecommendationHeader />

        <section className="wrap px-5 pb-[132px] pt-[var(--app-header-height)]">
          <TopTabs activeTab={activeTab} onChange={setActiveTab} />
          {activeTab === "mine" ? <MyFeedContent /> : <RecommendFeedGrid />}
        </section>

        <BottomNavigation />
      </div>
    </main>
  );
}
