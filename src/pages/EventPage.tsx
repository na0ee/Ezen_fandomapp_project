import { useRef, useState } from "react";
import type { DragEvent, MouseEvent, UIEvent } from "react";
import {
  BellRing,
  ChevronRight,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { BottomNavigation } from "../components/common/BottomNavigation";
import { HeaderActions } from "../components/common/HeaderActions";
import { SectionTitle } from "../components/common/SectionTitle";

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
  storyOneBase: "/assets/figma/e7f85eba-5c40-42f9-9816-f5f832b73194.png",
  storyOne: "/assets/figma/f14bfcee-7044-4182-b366-ad50ccf0406d.png",
  storyTwo: "/assets/figma/9247c529-923f-43e1-9805-4d330e0a63e2.png",
  storyThree: "/assets/figma/d2bb8d2a-613a-4a65-8aa9-94f1d1caccde.png",
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
  },
  {
    title: "커뮤니티 이용하기",
    label: "Challenge",
    images: [assets.challengeCommunityBase, assets.challengeCommunity],
    description: "질문・답변 남기고 최대 75p받기",
    to: "/community",
  },
  {
    title: "Scent DNA",
    label: "Challenge",
    images: [assets.challengeDna],
    description: "첫 진단시 100p, 취향 공유하면 추가로 30p!",
    complete: true,
  },
  {
    title: "내 향수 등록하기",
    label: "Challenge",
    images: [assets.challengeRegister],
    description: "내 보유향수 첫 등록 시 30p, 등록할 때 마다 5p씩",
  },
];

type StoryCardItem = {
  id: string;
  title: string;
  cta: string;
  count?: string;
  images: string[];
};

const storyCards: StoryCardItem[] = [
  {
    id: "story-one",
    title: "Juhoon",
    cta: "추천하러 가기",
    images: [assets.storyOneBase, assets.storyOne],
  },
  {
    id: "story-two",
    title: "Juhoon",
    cta: "추천하러 가기",
    images: [assets.storyOneBase, assets.storyOne],
  },
  {
    id: "story-three",
    title: "Juhoon",
    cta: "추천하러 가기",
    images: [assets.storyOneBase, assets.storyOne],
  },
];

const raffleItems = [
  {
    id: "lazy-sunday-today",
    brand: "Maison Margiela Fragrances",
    name: "Lazy Sunday Morning",
    image: assets.raffleToday,
    disabled: true,
    today: true,
  },
  {
    id: "blackberry-bay",
    brand: "Jo Malone London",
    name: "Blackberry & Bay Cologne",
    image: assets.raffleToday,
  },
  {
    id: "lazy-sunday-bottle",
    brand: "Maison Margiela Fragrances",
    name: "Lazy Sunday Morning",
    image: assets.raffleBottle,
  },
];

function EventHeader() {
  return (
    <header
      className="header fixed top-0 left-1/2 z-50 flex h-[var(--app-header-height)] w-full max-w-[430px] -translate-x-1/2 items-center justify-between bg-off-white px-5 pt-[var(--app-safe-top)]"
      data-node-id={figmaNode.header}
    >
      <h1 className="text-2xl font-semibold leading-none tracking-[-0.02em] text-off-black">
        이벤트
      </h1>
      <HeaderActions />
    </header>
  );
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
          <Link className="relative block h-[272px] overflow-hidden rounded-[16px]" to="/chatbot?intent=gift">
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
    <article className="relative flex h-[340px] w-[190px] shrink-0 flex-col items-center justify-center gap-4 overflow-hidden rounded-card border-[0.5px] border-light-grey bg-off-white px-3.5 py-6">
      <div className="flex flex-col items-center gap-2">
        <p className="max-w-[150px] truncate text-xs font-medium leading-none tracking-[-0.02em] text-off-black">
          {card.title}
        </p>
        <span className="h-px w-5 bg-off-black" />
      </div>
      <div className="relative h-[190px] w-full rounded-[9px]">
        {card.images.map((image) => (
          <img
            alt=""
            className="absolute inset-0 h-full w-full rounded-[9px] object-cover"
            key={image}
            src={image}
          />
        ))}
        <span className="absolute left-1/2 top-[-7px] flex w-[50px] -translate-x-1/2 justify-center rounded-full bg-off-black px-1.5 py-0.5 font-cormorant text-[8px] font-bold leading-none text-off-white">
          {card.label}
        </span>
      </div>
      <div className="flex w-full flex-col gap-2 text-xs font-medium leading-none tracking-[-0.02em] text-off-black">
        <div className="flex items-center justify-between px-0.5">
          <span>07</span>
          <span className="h-px w-[120px] bg-off-black" />
          <span>11</span>
        </div>
        <p className="truncate text-left">
          {card.record ? (
            <>
              이번 주 <span className="text-point-orange">2일</span> 기록했어요
            </>
          ) : (
            card.description
          )}
        </p>
        {card.record ? (
          <div className="flex items-center justify-between px-0.5">
            {Array.from({ length: 7 }).map((_, index) => (
              <span
                className={`size-2 rounded-full border ${
                  index < 2
                    ? "border-point-orange bg-point-orange"
                    : index === 3
                      ? "border-off-black bg-off-black"
                      : "border-off-black bg-off-white"
                }`}
                key={index}
              />
            ))}
          </div>
        ) : card.to ? (
          <Link
            className="text-center text-xs font-medium leading-none tracking-[-0.02em] text-point-orange underline"
            to={card.to}
          >
            참여하기
          </Link>
        ) : (
          <p className="text-center text-xs font-medium leading-none tracking-[-0.02em] text-point-orange underline">
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
          className={`mt-[30px] -mx-5 overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${dragClassName}`}
          onScroll={(event) => setScrollProgress(getHorizontalScrollProgress(event))}
          ref={scrollContainerRef}
          {...dragHandlers}
        >
          <div className="flex w-max gap-[10px] px-5">
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

function StoryCard({ story }: { story: StoryCardItem }) {
  const hasCount = Boolean(story.count);

  return (
    <article className="relative h-[453px] w-[312px] shrink-0 overflow-hidden rounded-[10px]">
      {story.images.map((image) => (
        <img alt="" className="absolute inset-0 h-full w-full object-cover" key={image} src={image} />
      ))}
      {story.count && (
        <span className="absolute right-5 top-4 rounded-full bg-[rgba(31,27,25,0.86)] px-3.5 py-2 font-geist text-base font-medium leading-none tracking-[-0.02em] text-off-white">
          {story.count}
        </span>
      )}
      <p
        className={`absolute w-[264px] truncate text-[30px] tracking-[-0.02em] text-off-white ${
          hasCount
            ? "left-6 top-[299px] font-geist font-extrabold leading-[1.12]"
            : "left-[14px] top-[369px] font-bold leading-none"
        }`}
      >
        {story.title}
      </p>
      <Link
        aria-label={`${story.title} 프로필에서 향수 추천하기`}
        className={`absolute left-[14px] flex items-center gap-2 rounded-card border border-off-white/25 bg-off-white/15 px-2.5 py-[7px] text-off-white shadow-[0_8px_24px_rgba(0,0,0,0.18)] backdrop-blur-md ${
          hasCount ? "top-[405px]" : "top-[409px] h-[27px]"
        }`}
        to={`/event/recommend-profile/${story.id}`}
      >
        <span
          className={`font-geist font-bold leading-none tracking-[-0.02em] ${hasCount ? "text-xl" : "text-[15px]"}`}
        >
          ↳
        </span>
        <span
          className={`font-geist leading-none tracking-[-0.02em] ${
            hasCount ? "text-[15px] font-medium" : "text-xs font-normal"
          }`}
        >
          {story.cta}
        </span>
      </Link>
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
    <section className="h-[549px] shrink-0 overflow-visible px-5" data-node-id={figmaNode.gallery}>
      <div className="inner flex h-full flex-col items-center">
        <SectionHead href="/event/recommend-feed" title="향 추천하기" />
        <div
          className={`mt-[30px] h-[453px] w-full shrink-0 overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${dragClassName}`}
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
        <p className="mt-1 truncate text-base font-bold leading-none tracking-[-0.02em] text-off-black">
          {item.name}
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
    <main className="min-h-dvh bg-off-white" data-node-id={figmaNode.screen}>
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
