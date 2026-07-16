import { Activity, ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import fireBadge from "../assets/mypage/fire-badge.svg";
import { BottomNavigation } from "../components/common/BottomNavigation";
import { HeaderActions } from "../components/common/HeaderActions";

const assets = Object.fromEntries(
  Object.entries({
    storyBase: "/assets/figma/e7f85eba-5c40-42f9-9816-f5f832b73194.png",
    storyOverlay: "/assets/figma/f14bfcee-7044-4182-b366-ad50ccf0406d.png",
    blond: "/assets/figma/b8ae253f-9654-4c82-9435-8a5d7821a8f0.png",
    perfumeBed: "/assets/community/figma/post-image-one.png",
    perfumeShelf: "/assets/community/figma/post-image-two.png",
    carouselTwo: "/assets/community/figma/carousel-two.png",
    carouselThree: "/assets/community/figma/carousel-three.png",
    jazzClub: "/assets/figma/1a1cf807-eb4f-4aa5-a14f-c60de2901496.png",
    myHeroBase: "/assets/figma/recommend-my-hero-base.png",
    myHeroPhoto: "/assets/figma/recommend-my-hero-overlay.png",
  }).map(([key, path]) => [key, `${import.meta.env.BASE_URL}${path.slice(1)}`]),
) as Record<string, string>;

const feedItems = [
  { id: "story-one", images: [assets.perfumeBed], tags: "#비 오는 날 #꾸안꾸", user: "ch1g0tn" },
  { id: "story-two", images: [assets.storyBase, assets.storyOverlay], tags: "#여행 #예쁘다", user: "Jennie" },
  { id: "story-three", images: [assets.blond], tags: "#밤산책 #향수추천", user: "Juhoon" },
  { id: "story-four", images: [assets.carouselTwo], tags: "#여름 #서울한강", user: "nanana" },
  { id: "story-five", images: [assets.perfumeShelf], tags: "#여름스웩 #한산한날", user: "nanana." },
  { id: "story-six", images: [assets.carouselThree], tags: "#겨울의향 #하얀눈", user: "lalalala" },
];

const receivedRecommendations = Array.from({ length: 4 }, (_, index) => ({
  id: `received-${index + 1}`,
  perfume: "Jazz Club",
  nickname: "chlgotn",
  message: "프로필을 보니 미러리해서 이 향수가 잘...",
  image: assets.jazzClub,
}));

type MainTab = "mine" | "recommend";
type RecommendationTab = "received" | "sent";

function RecommendationHeader() {
  const navigate = useNavigate();

  return (
    <header className="header fixed top-0 left-1/2 z-50 flex h-[var(--app-header-height)] w-full max-w-[430px] -translate-x-1/2 items-center justify-between bg-off-white px-5 pt-[var(--app-safe-top)]">
      <div className="flex min-w-0 items-center">
        <button
          aria-label="이전 페이지로 돌아가기"
          className="-ml-1 flex size-[21px] shrink-0 items-center justify-center text-off-black"
          onClick={() => navigate(-1)}
          type="button"
        >
          <ChevronLeft aria-hidden="true" size={21} strokeWidth={1.7} />
        </button>
        <h1 className="ml-1 truncate text-2xl font-semibold leading-[1.08] tracking-[-0.02em] text-off-black">
          향 추천하기
        </h1>
      </div>
      <HeaderActions />
    </header>
  );
}

function TopTabs({ activeTab, onChange }: { activeTab: MainTab; onChange: (tab: MainTab) => void }) {
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
              isActive ? "bg-off-black text-off-white" : "border border-light-grey bg-off-white text-off-black"
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

function FeedCard({ item }: { item: (typeof feedItems)[number] }) {
  return (
    <Link
      aria-label={`${item.user} 향 추천 피드 보기`}
      className="relative block h-[243px] overflow-hidden rounded-[10px] bg-light2-grey"
      to={`/event/recommend-profile/${item.id}`}
    >
      {item.images.map((image) => (
        <img alt="" className="absolute inset-0 h-full w-full object-cover" key={image} src={image} />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 px-3 pb-3 text-off-white">
        <p className="truncate text-xs font-medium leading-none tracking-[-0.02em]">{item.tags}</p>
        <p className="truncate text-xl font-bold leading-none tracking-[-0.02em]">{item.user}</p>
      </div>
    </Link>
  );
}

function RecommendFeedGrid() {
  return (
    <div className="grid grid-cols-2 gap-2">
      {feedItems.map((item) => (
        <FeedCard item={item} key={item.id} />
      ))}
    </div>
  );
}

function MyFeedHero() {
  return (
    <section className="-mx-5">
      <div className="relative h-[560px] w-full overflow-hidden bg-off-black text-off-white">
        <img alt="" className="absolute inset-0 h-full w-full object-cover" src={assets.myHeroBase} />
        <div className="absolute left-0 top-[-85px] h-[645px] w-full">
          <img alt="" className="h-full w-full object-cover" src={assets.myHeroPhoto} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />
        <div className="absolute inset-x-5 bottom-5">
          <div className="flex items-center gap-1">
            <span className="inline-flex h-[24px] items-center gap-0.5 rounded-full bg-black/20 pr-1.5 text-sm font-bold leading-none">
              <img alt="" aria-hidden="true" className="size-[19px]" src={fireBadge} />
              LOVER
            </span>
            <span className="rounded-full bg-black/50 px-2.5 py-1 font-cormorant text-base font-bold leading-none text-light2-grey">
              Mood Shifter
            </span>
          </div>
          <h2 className="mt-1 text-[34px] font-bold leading-[1.3] tracking-[-0.02em]">chlgotn</h2>
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
              isActive ? "bg-off-black text-off-white" : "border border-light-grey bg-off-white text-off-black"
            }`}
            key={tab.id}
            onClick={() => onChange(tab.id)}
            type="button"
          >
            <span aria-hidden="true" className={`inline-flex size-3.5 shrink-0 items-center justify-center rounded-full ${isActive ? "bg-off-white" : "bg-off-black"}`}>
              {tab.id === "received" ? <HeartIcon active={isActive} /> : <ActivityIcon active={isActive} />}
            </span>
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

function HeartIcon({ active }: { active: boolean }) {
  return <Heart aria-hidden="true" className={active ? "text-off-black" : "text-off-white"} size={11} strokeWidth={1.5} />;
}

function ActivityIcon({ active }: { active: boolean }) {
  return <Activity aria-hidden="true" className={active ? "text-off-black" : "text-off-white"} size={11} strokeWidth={1.5} />;
}

function RecommendationCard({
  item,
  variant = "received",
}: {
  item: (typeof receivedRecommendations)[number];
  variant?: RecommendationTab;
}) {
  const primaryText = variant === "sent" ? item.nickname : item.perfume;
  const secondaryText = variant === "sent" ? item.perfume : item.nickname;

  return (
    <article
      className="flex h-[116px] w-full items-center gap-4 overflow-hidden rounded-[16px] border border-light2-grey bg-off-white p-2"
    >
      <div className="flex size-[100px] shrink-0 items-center justify-center overflow-hidden rounded-[12px] bg-light2-grey">
        <img alt="" className="h-[76px] w-[76px] object-contain" src={item.image} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex min-w-0 items-center gap-1">
          <p className="truncate text-base font-semibold leading-none tracking-[-0.02em] text-off-black">
            {primaryText}
          </p>
          <span className="shrink-0 text-xs font-medium leading-none tracking-[-0.02em] text-off-black">|</span>
          <p className="truncate text-xs font-medium leading-none tracking-[-0.02em] text-off-black">
            {secondaryText}
          </p>
        </div>
        <p className="mt-2 truncate text-sm font-normal leading-none tracking-[-0.02em] text-grey">
          {item.message}
        </p>
        <button
          className="mt-[17px] flex items-center gap-1.5 text-sm font-medium leading-none tracking-[-0.02em] text-grey"
          type="button"
        >
          자세히 보기
          <ChevronRight aria-hidden="true" size={18} strokeWidth={1.6} />
        </button>
      </div>
    </article>
  );
}

function MyFeedContent() {
  const [activeRecommendationTab, setActiveRecommendationTab] = useState<RecommendationTab>("received");
  const list =
    activeRecommendationTab === "received"
      ? receivedRecommendations
      : receivedRecommendations.map((item, index) => ({
          ...item,
          id: `sent-${index + 1}`,
          nickname: "Juhoon",
          message: "상대의 무드에 맞춰 이 향수를 추천했어요.",
        }));

  return (
    <div className="flex flex-col gap-16">
      <MyFeedHero />
      <section className="flex flex-col gap-[30px]">
        <RecommendationFilterTabs activeTab={activeRecommendationTab} onChange={setActiveRecommendationTab} />
        <div className="flex flex-col gap-[10px]">
          {list.map((item) => (
            <RecommendationCard item={item} key={item.id} variant={activeRecommendationTab} />
          ))}
        </div>
      </section>
    </div>
  );
}

export function RecommendationFeedPage() {
  const [activeTab, setActiveTab] = useState<MainTab>("recommend");

  return (
    <main className="min-h-dvh bg-off-white text-off-black">
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
