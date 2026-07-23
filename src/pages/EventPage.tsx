import { useRef, useState } from "react";
import type { DragEvent, MouseEvent, UIEvent } from "react";
import {
  BellRing,
  ChevronRight,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import fireBadge from "../assets/mypage/fire-badge.svg";
import { BottomNavigation } from "../components/common/BottomNavigation";
import { HeaderActions } from "../components/common/HeaderActions";
import { Header } from "../components/common/Header";
import { SectionTitle } from "../components/common/SectionTitle";
import { shuffledRecommendUsers } from "../data/recommendUsers";
import type { RecommendUser } from "../data/recommendUsers";

const figmaNode = {
  screen: "737:13784",
  header: "764:15033",
  wrap: "737:13787",
  mainChallenge: "737:13788",
  challenge: "737:13799",
  gallery: "737:13810",
  raffle: "737:13834",
  bottomNavigation: "737:14472",
};

const assets = Object.fromEntries(
  Object.entries({
  mainHeroBase: "/assets/figma/f67b7258-6ae0-4f61-bed3-cd9775794c64.jpg",
  mainHeroLight: "/assets/figma/3b211a80-f9bf-4367-bdaa-13d870ef377e.png",
  mainHeroBottle: "/assets/figma/8d3c9982-c240-4b55-9042-391add55bbf2.png",
  challengeRecord: "/assets/figma/3293fc45-b402-49ca-8630-72da55e39eae.png",
  challengeCommunityBase: "/assets/figma/98a29d2b-52a8-4b21-bee8-39f4612df3d7.png",
  challengeCommunity: "/assets/figma/65d50c3e-e53a-4435-a1e7-e1c102ed11d2.png",
  challengeDna: "/assets/figma/a2012ffa-cea9-489e-9b2a-4c857215a489.png",
  challengeRegister: "/assets/figma/100041c6-070d-47ec-b061-1750bc2b3337.png",
  raffleToday: "/assets/figma/1a1cf807-eb4f-4aa5-a14f-c60de2901496.png",
    raffleBottle: "/assets/figma/2a366440-329b-4758-b5e1-73f3ebe99526.png",
  }).map(([key, path]) => [key, `${import.meta.env.BASE_URL}${path.slice(1)}`]),
) as Record<string, string>;

const challengeCards = [
  {
    title: "향수 기록하기",
    label: "Record",
    images: [assets.challengeRecord],
    description: "이번 주 2일 기록했어요",
    record: true,
    to: "/mypage/perfumes",
  },
  {
    title: "커뮤니티 이용하기",
    label: "Challenge",
    images: [assets.challengeCommunityBase, assets.challengeCommunity],
    description: "질문・답변 남기고 최대 75p받기",
    to: "/community",
  },
  {
    title: "MY LAYER",
    label: "Challenge",
    images: [assets.challengeDna],
    description: "첫 진단시 100p, 취향 공유하면 추가로 30p!",
    to: "/onboarding/1",
  },
  {
    title: "내 향수 등록하기",
    label: "Challenge",
    images: [assets.challengeRegister],
    description: "내 보유향수 첫 등록 시 30p, 등록할 때 마다 5p씩",
    to: "/mypage/perfumes",
  },
];

const storyCards = shuffledRecommendUsers.slice(0, 3);

const raffleItems = [
  {
    id: "lazy-sunday-today",
    brand: "MAISON MARGIELA FRAGRANCES",
    name: "Lazy Sunday Morning",
    nameKo: "레이지 선데이 모닝",
    image: assets.raffleToday,
    disabled: true,
    today: true,
  },
  {
    id: "blackberry-bay",
    brand: "JO MALONE LONDON",
    name: "Blackberry & Bay Cologne",
    nameKo: "블랙베리 앤 베이 코롱",
    image: assets.raffleToday,
  },
  {
    id: "lazy-sunday-bottle",
    brand: "MAISON MARGIELA FRAGRANCES",
    name: "Lazy Sunday Morning",
    nameKo: "레이지 선데이 모닝",
    image: assets.raffleBottle,
  },
];

function EventHeader() {
  return <Header title="이벤트" action={<HeaderActions />} />;
}

function SectionHead({ hideViewAll = false, href, title }: { hideViewAll?: boolean; href?: string; title: string }) {
  return <SectionTitle moreHref={href} showMore={!hideViewAll} title={title} variant="detail" />;
}

function ScrollIndicator({
  position,
  thumbWidth,
  className = "",
  onProgressSelect,
}: {
  position: number;
  thumbWidth: number;
  className?: string;
  onProgressSelect?: (progress: number) => void;
}) {
  const safePosition = Math.min(100, Math.max(0, position));
  const safeThumbWidth = Math.min(100, Math.max(0, thumbWidth));
  const fillWidth = safeThumbWidth + (safePosition / 100) * (100 - safeThumbWidth);

  return (
    <div
      className={`h-0.5 overflow-hidden bg-grey ${onProgressSelect ? "cursor-pointer" : ""} ${className}`}
      onClick={(event) => {
        if (!onProgressSelect) {
          return;
        }

        const rect = event.currentTarget.getBoundingClientRect();
        const clickProgress = ((event.clientX - rect.left) / rect.width) * 100;
        onProgressSelect(Math.min(100, Math.max(0, clickProgress)));
      }}
    >
      <div
        className="h-full bg-off-black transition-[width] duration-150 ease-out"
        style={{ width: `${fillWidth}%` }}
      />
    </div>
  );
}

function getHorizontalScrollProgress(event: UIEvent<HTMLDivElement>) {
  const target = event.currentTarget;
  const maxScrollLeft = target.scrollWidth - target.clientWidth;

  if (maxScrollLeft <= 0) {
    return 0;
  }

  return (target.scrollLeft / maxScrollLeft) * 100;
}

function getElementScrollProgress(element: HTMLDivElement) {
  const maxScrollLeft = element.scrollWidth - element.clientWidth;

  if (maxScrollLeft <= 0) {
    return 0;
  }

  return (element.scrollLeft / maxScrollLeft) * 100;
}

function useHorizontalDragScroll(onProgressChange?: (progress: number) => void) {
  const startX = useRef(0);
  const startScrollLeft = useRef(0);
  const [isDragging, setIsDragging] = useState(false);

  function handleMouseDown(event: MouseEvent<HTMLDivElement>) {
    const target = event.currentTarget;

    event.preventDefault();
    setIsDragging(true);
    startX.current = event.clientX;
    startScrollLeft.current = target.scrollLeft;
  }

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    if (!isDragging) {
      return;
    }

    event.preventDefault();

    const target = event.currentTarget;
    target.scrollLeft = startScrollLeft.current - (event.clientX - startX.current);
    onProgressChange?.(getElementScrollProgress(target));
  }

  function handleMouseUp(event: MouseEvent<HTMLDivElement>) {
    setIsDragging(false);
    onProgressChange?.(getElementScrollProgress(event.currentTarget));
  }

  return {
    dragClassName: isDragging ? "cursor-grabbing select-none" : "cursor-grab",
    dragHandlers: {
      onDragStart: (event: DragEvent<HTMLDivElement>) => event.preventDefault(),
      onMouseDown: handleMouseDown,
      onMouseLeave: handleMouseUp,
      onMouseMove: handleMouseMove,
      onMouseUp: handleMouseUp,
    },
  };
}

function MainChallengeSection() {
  return (
    <section className="shrink-0 px-5" data-node-id={figmaNode.mainChallenge}>
      <div className="inner flex flex-col gap-[30px]">
        <SectionHead hideViewAll title="오늘의 메인 챌린지" />
        <div className="flex flex-col gap-[10px]">
          <Link className="relative block h-[272px] overflow-hidden rounded-[20px]" to="/chatbot?intent=gift">
            <img alt="" className="absolute inset-0 h-full w-full object-cover" src={assets.mainHeroBase} />
            <img alt="" className="absolute left-0 top-[-46.26%] h-[170.3%] w-full max-w-none" src={assets.mainHeroLight} />
            <img alt="" className="absolute left-0 top-[-28.36%] h-[144.14%] w-[99.92%] max-w-none" src={assets.mainHeroBottle} />
            <div className="glassDark absolute inset-x-[10px] bottom-[10px] flex flex-col gap-[30px] rounded-[20px] p-4 text-off-white">
              <div className="flex max-w-[296px] flex-col gap-1.5">
                <p className="text-xl font-bold leading-none tracking-[-0.02em]">Gift with AI</p>
                <p className="text-xs font-medium leading-none tracking-[-0.02em]">
                  상대와 어울리는 향수, AI가 찾아드려요 · 참여 시 최대 95p!
                </p>
              </div>
              <div className="flex items-center gap-1 text-base font-medium leading-none tracking-[-0.02em]">
                <span>참여하기</span>
                <ChevronRight aria-hidden="true" size={20} strokeWidth={1.6} />
              </div>
            </div>
          </Link>
          <p className="text-[13px] font-normal leading-[1.3] tracking-[-0.02em] text-grey">
            매주 새 챌린지가 업데이트돼요
          </p>
        </div>
      </div>
    </section>
  );
}

function ChallengeCard({ card }: { card: (typeof challengeCards)[number] }) {
  return (
    <article className="relative flex w-[230px] shrink-0 flex-col items-center gap-[26px] overflow-hidden rounded-card border-[0.5px] border-light-grey bg-off-white px-4 py-[22px]">
      <p className="max-w-full truncate text-xl font-medium leading-[normal] tracking-[-0.02em] text-off-black">
        {card.title}
      </p>
      <div className="relative h-[190px] w-full rounded-[9px]">
        {card.images.map((image) => (
          <img
            alt=""
            className="absolute inset-0 h-full w-full rounded-[9px] object-cover"
            key={image}
            src={image}
          />
        ))}
        <span className="absolute left-1/2 top-[-8.5px] -translate-x-1/2 rounded-full bg-off-black px-3 py-1 font-cormorant text-sm font-bold leading-[normal] text-off-white">
          {card.label}
        </span>
      </div>
      <div className="flex w-full flex-col gap-2.5">
        <p className="min-w-full truncate text-base font-medium leading-[normal] tracking-[-0.02em] text-off-black">
          {card.record ? (
            <>
              이번 주 <span className="text-point-orange">2일</span> 기록했어요
            </>
          ) : (
            card.description
          )}
        </p>
        {card.to ? (
          <Link
            className="text-xs font-medium leading-[normal] tracking-[-0.02em] text-point-orange underline"
            to={card.to}
          >
            참여하기
          </Link>
        ) : (
          <p className="text-xs font-medium leading-[normal] tracking-[-0.02em] text-point-orange underline">
            참여하기
          </p>
        )}
      </div>
    </article>
  );
}

function ChallengeSection() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { dragClassName, dragHandlers } = useHorizontalDragScroll(setScrollProgress);

  function handleIndicatorClick(progress: number) {
    const target = scrollContainerRef.current;

    if (!target) {
      return;
    }

    const maxScrollLeft = target.scrollWidth - target.clientWidth;
    target.scrollTo({ behavior: "smooth", left: (progress / 100) * maxScrollLeft });
    setScrollProgress(progress);
  }

  return (
    <section className="shrink-0 px-5" data-node-id={figmaNode.challenge}>
      <div className="inner">
        <SectionHead href="/event/challenges" title="챌린지" />
        <div
          className={`mt-[30px] -mr-5 overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${dragClassName}`}
          onScroll={(event) => setScrollProgress(getHorizontalScrollProgress(event))}
          ref={scrollContainerRef}
          {...dragHandlers}
        >
          <div className="flex w-max gap-[10px]">
            {challengeCards.map((card) => (
              <ChallengeCard card={card} key={card.title} />
            ))}
          </div>
        </div>
        <ScrollIndicator
          className="mx-auto mt-[38px] w-[120px]"
          onProgressSelect={handleIndicatorClick}
          position={scrollProgress}
          thumbWidth={33.33}
        />
      </div>
    </section>
  );
}

function StoryCard({ story }: { story: RecommendUser }) {
  return (
    <article className="relative flex h-[460px] w-[296px] shrink-0 flex-col items-start justify-end overflow-hidden rounded-[10px] p-[18px]">
      {story.feedImages.map((image) => (
        <img alt="" className="absolute inset-0 h-full w-full rounded-[10px] object-cover" key={image} src={image} />
      ))}
      <div className="pointer-events-none absolute inset-0 rounded-[10px] bg-gradient-to-t from-black/60 via-black/5 to-transparent" />
      <div className="relative flex w-full flex-col items-start gap-3">
        <div className="flex flex-col items-start gap-2">
          <div className="flex items-center gap-1">
            <span className="flex items-center gap-1">
              <img alt="" aria-hidden="true" className="size-[19px] shrink-0 object-contain" src={fireBadge} />
              <span className="font-geist text-sm font-bold leading-[1.4] tracking-[-0.02em] text-off-white">
                {story.badge}
              </span>
            </span>
            <span className="flex items-center rounded-[24px] bg-[rgba(26,26,26,0.5)] px-2.5 py-1">
              <span className="font-cormorant text-base font-bold leading-[normal] tracking-[-0.02em] text-[#ededed]">
                {story.mood}
              </span>
            </span>
          </div>
          <p className="text-2xl font-semibold leading-[1.08] tracking-[-0.02em] text-off-white">
            {story.name}
          </p>
        </div>
        <Link
          aria-label={`${story.name} 프로필에서 향수 추천하기`}
          className="flex items-center gap-1.5 text-light-grey"
          to={`/event/recommend-profile/${story.id}`}
        >
          <span className="text-sm font-medium leading-none tracking-[-0.02em]">{story.cta}</span>
          <ChevronRight aria-hidden="true" size={18} strokeWidth={1.6} />
        </Link>
      </div>
    </article>
  );
}

function GallerySection() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { dragClassName, dragHandlers } = useHorizontalDragScroll(setScrollProgress);

  function handleIndicatorClick(progress: number) {
    const target = scrollContainerRef.current;

    if (!target) {
      return;
    }

    const maxScrollLeft = target.scrollWidth - target.clientWidth;
    target.scrollTo({ behavior: "smooth", left: (progress / 100) * maxScrollLeft });
    setScrollProgress(progress);
  }

  return (
    <section className="h-[556px] shrink-0 overflow-visible px-5" data-node-id={figmaNode.gallery}>
      <div className="inner flex h-full flex-col items-center">
        <SectionHead href="/event/recommend-feed" title="향 추천하기" />
        <div
          className={`mt-[30px] h-[460px] w-full shrink-0 overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${dragClassName}`}
          onScroll={(event) => setScrollProgress(getHorizontalScrollProgress(event))}
          ref={scrollContainerRef}
          {...dragHandlers}
        >
          <div className="flex w-max gap-[14px]">
            {storyCards.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        </div>
        <ScrollIndicator
          className="mt-[38px] w-[120px]"
          onProgressSelect={handleIndicatorClick}
          position={scrollProgress}
          thumbWidth={33.33}
        />
      </div>
    </section>
  );
}

function RaffleCard({
  isAlarmOn,
  item,
  onAlarmToggle,
  onOpen,
}: {
  isAlarmOn: boolean;
  item: (typeof raffleItems)[number];
  onAlarmToggle: () => void;
  onOpen?: () => void;
}) {
  return (
    <article className="flex h-[108px] w-full items-center gap-4 overflow-hidden rounded-[16px] border border-light-grey bg-off-white p-2">
      <div className="relative size-[92px] shrink-0 overflow-hidden rounded-[12px] bg-light2-grey">
        <img alt="" className="absolute inset-0 h-full w-full object-cover" src={item.image} />
        {item.today && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/45 text-center text-off-white">
            <span className="text-xs font-bold leading-none tracking-[-0.02em]">오늘</span>
            <span className="mt-0.5 text-base font-bold leading-none tracking-[-0.02em]">20:00</span>
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-medium leading-tight tracking-[-0.02em] text-grey">
          {item.brand}
        </p>
        <p className="mt-1 truncate text-base font-bold leading-[1.15] tracking-[-0.02em] text-off-black">
          {item.nameKo ?? item.name}
        </p>
        <div className="mt-4 flex items-center gap-2">
          <button
            className={`rounded-chip px-3.5 py-[5px] text-xs font-normal leading-none tracking-[-0.02em] text-off-white ${
              item.disabled ? "bg-light-grey" : "bg-off-black"
            }`}
            disabled={item.disabled}
            onClick={onOpen}
            type="button"
          >
            참여하기
          </button>
            <button
              aria-label={`${item.name} 알림 ${isAlarmOn ? "끄기" : "켜기"}`}
              aria-pressed={isAlarmOn}
              className={`flex size-5 items-center justify-center ${
                isAlarmOn ? "text-point-orange" : "text-off-black"
              }`}
              onClick={onAlarmToggle}
              type="button"
            >
              <BellRing aria-hidden="true" size={13} strokeWidth={1.8} />
            </button>
          </div>
        </div>
      </article>
  );
}

function RaffleSection() {
  const navigate = useNavigate();
  const [alarmStates, setAlarmStates] = useState(() =>
    Object.fromEntries(raffleItems.map((item) => [item.id, Boolean(item.disabled)])),
  );

  function handleAlarmToggle(id: string) {
    setAlarmStates((current) => ({
      ...current,
      [id]: !current[id],
    }));
  }

  return (
    <section className="shrink-0 px-5" data-node-id={figmaNode.raffle}>
      <div className="inner flex flex-col gap-[30px]">
        <SectionHead href="/event/raffles" title="래플 응모하기" />
        <div className="flex flex-col gap-[10px]">
          {raffleItems.map((item) => (
            <RaffleCard
              isAlarmOn={Boolean(alarmStates[item.id])}
              item={item}
              key={item.id}
              onAlarmToggle={() => handleAlarmToggle(item.id)}
              onOpen={item.disabled ? undefined : () => navigate(`/event/raffles/${item.id}`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export function EventPage() {
  return (
    <main className="min-h-dvh bg-black max-[430px]:bg-off-white" data-node-id={figmaNode.screen}>
      <div className="relative mx-auto flex min-h-dvh w-full max-w-[430px] flex-col overflow-x-hidden bg-off-white">
        <EventHeader />
        <div
          className="wrap flex flex-1 flex-col gap-[64px] pt-[94px] pb-[160px]"
          data-node-id={figmaNode.wrap}
        >
          <MainChallengeSection />
          <ChallengeSection />
          <GallerySection />
          <RaffleSection />
        </div>
        <div data-node-id={figmaNode.bottomNavigation}>
          <BottomNavigation />
        </div>
      </div>
    </main>
  );
}
