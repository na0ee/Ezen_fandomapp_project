import { useEffect, useRef, useState } from "react";
import type { MouseEvent, UIEvent } from "react";
import {
  ChevronRight,
  SlidersHorizontal,
} from "lucide-react";
import { BottomNavigation } from "../components/common/BottomNavigation";
import { HeaderActions } from "../components/common/HeaderActions";
import { SectionTitle } from "../components/common/SectionTitle";
import { PerfumeRankCard } from "../components/perfume/PerfumeRankCard";
import type { PerfumeRankItem } from "../components/perfume/PerfumeRankCard";

const figmaNode = {
  screen: "726:6574",
  wrap: "726:6578",
  hero: "726:6579",
  todaysScent: "726:6629",
  challenge: "726:6648",
  rank: "726:6659",
  magazine: "726:6696",
  gift: "726:6713",
  header: "726:6718",
  bottomNavigation: "737:14605",
};

const assets = Object.fromEntries(
  Object.entries({
  heroFirst: "/assets/figma/home-hero-first.png",
  heroSecond: "/assets/figma/home-hero-second.png",
  heroThird: "/assets/figma/home-hero-third.png",
  heroDiptyque: "/assets/figma/3bb914a7-b4df-4526-8d2f-259d0b60c660.png",
  heroJomalone: "/assets/figma/4b9a3ff2-070c-4905-ba08-e6a4776fa09d.png",
  scentForest: "/assets/figma/ac764b67-8c19-45c1-9335-2c516ec3fbd1.png",
  challengeRecord: "/assets/figma/544911c3-f91f-4825-9e2d-ab79304a8b35.png",
  challengeCommunity: "/assets/figma/6904c812-042a-47db-92bf-3bf9a017791d.png",
  challengeDna: "/assets/figma/f76dfbf7-5de8-4b35-a8c8-90b5bf837b40.png",
  challengeRegister: "/assets/figma/cef0dad5-920f-406d-9f4e-bac218428f99.png",
  rankOne: "/assets/figma/b8ae253f-9654-4c82-9435-8a5d7821a8f0.png",
  rankTwo: "/assets/figma/347dc7c9-ab3e-46a4-8fef-cb759308244d.png",
  rankThree: "/assets/figma/d89aa68f-ffec-492c-a293-1b46bb118478.png",
  magazineOne: "/assets/figma/604cad28-ee28-4352-a88f-57b5c6cdb1ae.png",
  magazineTwo: "/assets/figma/cae4a0ad-1f49-46d9-81c0-f893afb376e1.png",
    gift: "/assets/figma/21ec3215-67f3-40e5-a91d-630537632bb9.png",
  }).map(([key, path]) => [key, `${import.meta.env.BASE_URL}${path.slice(1)}`]),
) as Record<string, string>;

const heroSlides = [
  {
    nodeId: "726:6580",
    image: assets.heroFirst,
    imageClassName: "inset-0 h-full w-full",
    overlayClassName: "bg-black/10",
    logoClassName: "text-off-white",
    label: (
      <>
        <span className="font-pretendard text-base font-medium tracking-[-0.02em]">나의 향수</span>
        <span className="px-1 font-cormorant text-lg font-bold tracking-[-0.02em]">MBTI</span>
        <span className="font-pretendard text-base font-medium tracking-[-0.02em]">진단하기</span>
      </>
    ),
    ctaClassName: "text-off-white",
  },
  {
    nodeId: "726:6596",
    image: assets.heroThird,
    imageClassName: "inset-0 h-full w-full translate-x-[6px] scale-[1.03]",
    overlayClassName: "bg-black/10",
    logoClassName: "text-off-white",
    label: "래플 응모하기",
    ctaClassName: "text-off-white",
  },
  {
    nodeId: "726:6614",
    image: assets.heroSecond,
    imageClassName: "inset-0 h-full w-full [object-position:22%_center]",
    overlayClassName: "bg-black/10",
    logoClassName: "text-off-white",
    label: "인기향수 보러가기",
    ctaClassName: "text-off-white",
  },
];

const challengeCards = [
  {
    title: "향수 기록하기",
    eyebrow: "Record",
    image: assets.challengeRecord,
    body: "이번 주 2일 기록했어요",
    isRecord: true,
  },
  {
    title: "커뮤니티 이용하기",
    eyebrow: "Challenge",
    image: assets.challengeCommunity,
    body: "질문 · 답변 남기고 최대 75p받기",
  },
  {
    title: "Scent DNA",
    eyebrow: "Challenge",
    image: assets.challengeDna,
    body: "첫 진단시 100p, 취향 공유하면 추가로 30p!",
    isComplete: true,
  },
  {
    title: "내 향수 등록하기",
    eyebrow: "Challenge",
    image: assets.challengeRegister,
    body: "내 보유향수 첫 등록 시 30p, 등록할 때 마다 5p씩",
  },
];

const rankCards: PerfumeRankItem[] = [
  {
    id: "jo-malone-blackberry-bay",
    rank: "1위",
    name: "블랙베리 앤 베이 30ml",
    brand: "JO MALONE LONDON",
    category: "fruity",
    description: "블랙베리의 달콤함과 베이 리프의 그린함이 겹쳐지는 향",
    image: assets.rankOne,
    imageWidth: "w-12",
    imageClassName: "h-[154.55%] w-[354.17%] left-[-127.08%] top-[-27.27%]",
    selected: true,
  },
  {
    id: "diptyque-fleur-de-peau",
    rank: "2위",
    name: "플레르 드 뽀 50ml",
    brand: "DIPTYQUE",
    category: "musk",
    description: "부드러운 머스크와 파우더리한 향이 오래 남는 향수",
    image: assets.rankTwo,
    imageWidth: "w-[63px]",
    imageClassName: "h-[106.25%] w-[184.78%] left-[-42.39%] top-0",
  },
  {
    id: "chanel-no5",
    rank: "3위",
    name: "넘버 파이브",
    brand: "CHANEL",
    category: "floral",
    description: "알데하이드와 플로럴 부케가 중심이 되는 클래식 플로럴 향",
    image: assets.rankThree,
    imageWidth: "w-[67px]",
    imageClassName: "h-[142.86%] w-[232.88%] left-[-65.75%] top-[-21.85%]",
    selected: true,
  },
];

const tabs = ["전체", "선물", "여성", "20대", "30대", "남성"];

function SectionTitle({
  title,
  subtitle,
  viewAllLabel = "전체보기",
  viewAllTo,
}: {
  title: string;
  subtitle?: string;
  viewAllLabel?: string;
  viewAllTo?: string;
}) {
  const viewAllContent = (
    <>
      <span>{viewAllLabel}</span>
      <ChevronRight aria-hidden="true" size={18} strokeWidth={1.6} />
    </>
  );

  return (
    <div className="section-title flex w-full items-start justify-between gap-4">
      <div className="min-w-0">
        <h2 className="font-cormorant text-[28px] font-bold leading-none tracking-[-0.02em] text-off-black">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1.5 text-base font-medium leading-none tracking-[-0.02em] text-off-black">
            {subtitle}
          </p>
        )}
      </div>
      {viewAllTo ? (
        <Link
          className="flex shrink-0 items-center gap-1.5 text-sm font-medium leading-none tracking-[-0.02em] text-grey"
          to={viewAllTo}
        >
          {viewAllContent}
        </Link>
      ) : (
        <div className="flex shrink-0 items-center gap-1.5 text-sm font-medium leading-none tracking-[-0.02em] text-grey">
          {viewAllContent}
        </div>
      )}
    </div>
  );
}

function SlideIndicator({ progress = 33, className = "" }: { progress?: number; className?: string }) {
  const progressStyle = { width: `${progress}%` };

  return (
    <div className={`h-0.5 bg-grey ${className}`}>
      <div className="h-full bg-off-black transition-[width] duration-500 ease-out" style={progressStyle} />
    </div>
  );
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
  const indicatorStyle = {
    width: `${fillWidth}%`,
  };

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
      <div className="h-full bg-off-black transition-[width] duration-150 ease-out" style={indicatorStyle} />
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
      onMouseDown: handleMouseDown,
      onMouseLeave: handleMouseUp,
      onMouseMove: handleMouseMove,
      onMouseUp: handleMouseUp,
    },
  };
}

function HomeHeader() {
  const [hasSolidBackground, setHasSolidBackground] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setHasSolidBackground(window.scrollY >= 536);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`header fixed left-1/2 top-0 z-50 flex h-[var(--app-header-height)] w-full max-w-[430px] -translate-x-1/2 items-center justify-between px-5 pt-[var(--app-safe-top)] transition-colors duration-200 ${
        hasSolidBackground ? "bg-off-white" : "bg-transparent"
      }`}
      data-node-id={figmaNode.header}
    >
      <p
        className={`font-cormorant text-2xl font-semibold leading-none tracking-[-0.02em] ${
          hasSolidBackground ? "text-off-black" : "text-off-white"
        }`}
      >
        Layer
      </p>
      <HeaderActions iconClassName={hasSolidBackground ? "text-off-black" : "text-off-white [&_img]:invert"} />
    </header>
  );
}

function HeroSection() {
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const activeSlide = heroSlides[activeHeroIndex];
  const activeProgress = ((activeHeroIndex + 1) / heroSlides.length) * 100;
  const trackStyle = { transform: `translateX(-${activeHeroIndex * 100}%)` };

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveHeroIndex((currentIndex) => (currentIndex + 1) % heroSlides.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[536px] w-full shrink-0 overflow-hidden" data-node-id={figmaNode.hero}>
      <div
        className="flex h-full w-full transition-transform duration-500 ease-out"
        style={trackStyle}
      >
        {heroSlides.map((slide) => (
          <div
            className="relative h-[536px] w-full shrink-0 overflow-hidden bg-black"
            data-node-id={slide.nodeId}
            key={slide.nodeId}
          >
            <img
              alt=""
              className={`absolute max-w-none object-cover ${slide.imageClassName}`}
              src={slide.image}
            />
            <div className={`absolute inset-0 ${slide.overlayClassName}`} />
          </div>
        ))}
      </div>
      <p
        className={`pointer-events-none absolute left-1/2 top-1/2 z-10 mix-blend-difference opacity-80 -translate-x-1/2 -translate-y-1/2 font-cormorant text-[98px] font-bold leading-none tracking-[-0.02em] ${activeSlide.logoClassName}`}
      >
        LAYER
      </p>
      <div className="absolute inset-x-0 bottom-[42px] z-10 flex flex-col items-center px-4">
        <div
          className={`flex h-[42px] w-full max-w-[263px] items-center justify-center rounded-cta border-[0.5px] border-off-white/60 bg-off-white/15 px-10 text-center text-base font-medium leading-none tracking-[-0.02em] shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_8px_24px_rgba(0,0,0,0.12)] backdrop-blur-[10px] backdrop-saturate-150 ${activeSlide.ctaClassName}`}
        >
          {activeSlide.label}
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-5 flex justify-center px-4">
        <div className="relative w-[120px]">
          <SlideIndicator progress={activeProgress} />
          <div className="absolute inset-x-0 top-[-9px] flex h-5">
            {heroSlides.map((indicatorSlide, index) => (
              <button
                aria-label={`히어로 ${index + 1}번 보기`}
                className="h-5 flex-1"
                key={indicatorSlide.nodeId}
                onClick={() => setActiveHeroIndex(index)}
                type="button"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TodaysScentSection() {
  return (
    <section className="px-5" data-node-id={figmaNode.todaysScent}>
      <SectionTitle title="TODAY'S Scent" viewAllLabel="찾아보기" viewAllTo="/chatbot?intent=recommend" />
      <div className="mt-[30px] flex min-h-[258px] items-start justify-between gap-4">
        <div className="shrink-0 pt-1">
          <p className="text-xl font-bold leading-none tracking-[-0.02em] text-off-black">비 온 뒤의 숲</p>
          <p className="mt-1.5 text-base font-medium leading-none tracking-[-0.02em] text-off-black">
            오늘의 무드를 담은 향
          </p>
        </div>
        <img
          alt=""
          className="aspect-[215/258] w-[55%] max-w-[215px] rounded-card object-cover"
          src={assets.scentForest}
        />
      </div>
    </section>
  );
}

function ChallengeCard({
  card,
}: {
  card: (typeof challengeCards)[number];
}) {
  return (
    <article className="relative flex h-[340px] w-[190px] shrink-0 flex-col items-center justify-center gap-4 overflow-hidden rounded-card border-[0.5px] border-light-grey bg-off-white px-3.5 py-6">
      <div className="flex flex-col items-center gap-2">
        <p className="max-w-[150px] truncate text-xs font-medium leading-none tracking-[-0.02em] text-off-black">
          {card.title}
        </p>
        <span className="h-px w-5 bg-off-black" />
      </div>
      <div className="relative h-[190px] w-full rounded-[9px]">
        <img alt="" className="h-full w-full rounded-[9px] object-cover" src={card.image} />
        <span className="absolute left-1/2 top-[-7px] flex w-[50px] -translate-x-1/2 justify-center rounded-full bg-black px-1.5 py-0.5 font-cormorant text-[8px] font-bold leading-none text-off-white">
          {card.eyebrow}
        </span>
      </div>
      <div className="flex w-full flex-col gap-2 text-xs font-medium leading-none tracking-[-0.02em] text-off-black">
        <div className="flex items-center justify-between px-0.5">
          <span>07</span>
          <span className="h-px w-[120px] bg-off-black" />
          <span>11</span>
        </div>
        <p className="truncate">
          {card.isRecord ? (
            <>
              이번 주 <span className="text-point-orange">2일</span> 기록했어요
            </>
          ) : (
            card.body
          )}
        </p>
        {card.isRecord ? (
          <div className="flex items-center justify-between px-0.5">
            {Array.from({ length: 7 }).map((_, index) => (
              <span
                className={`size-2 rounded-full border border-off-black ${
                  index < 2 ? "bg-point-orange border-point-orange" : index === 3 ? "bg-off-black" : "bg-off-white"
                }`}
                key={index}
              />
            ))}
          </div>
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
    <section className="px-5" data-node-id={figmaNode.challenge}>
      <SectionTitle showMore title="Challenge" subtitle="함께하는 챌린지로 꾸준함을 만들어요" />
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
    </section>
  );
}

function RankSection() {
  const { dragClassName, dragHandlers } = useHorizontalDragScroll();
  const [selectedRanks, setSelectedRanks] = useState(() => rankCards.map((item) => Boolean(item.selected)));

  function handleRankHeartToggle(index: number) {
    setSelectedRanks((currentRanks) =>
      currentRanks.map((isSelected, currentIndex) => (currentIndex === index ? !isSelected : isSelected)),
    );
  }

  return (
    <section className="px-5" data-node-id={figmaNode.rank}>
      <SectionTitle showMore title="TODAY'S Rank" subtitle="지금 가장 많은 사랑을 받는 향을 보여드려요" />
      <div className="mt-[30px] flex items-center justify-between gap-5">
        <div className="flex flex-nowrap gap-1.5">
          {tabs.map((tab, index) => (
            <span
              className={`shrink-0 whitespace-nowrap rounded-full px-3.5 py-2 text-xs font-medium leading-none tracking-[-0.02em] ${
                index === 0
                  ? "bg-off-black text-off-white"
                  : "border-[0.8px] border-light-grey bg-off-white text-grey"
              }`}
              key={tab}
            >
              {tab}
            </span>
          ))}
        </div>
        <div className="flex shrink-0 items-center gap-1.5 whitespace-nowrap text-xs font-medium leading-none tracking-[-0.02em] text-grey">
          <SlidersHorizontal aria-hidden="true" size={16} strokeWidth={1.5} />
          가격
        </div>
      </div>
      <div
        className={`mt-4 -mx-5 overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${dragClassName}`}
        {...dragHandlers}
      >
        <div className="flex w-max gap-3 px-5">
          {rankCards.map((item, index) => (
            <PerfumeRankCard
              isSelected={selectedRanks[index]}
              key={item.id}
              onHeartToggle={() => handleRankHeartToggle(index)}
              perfume={item}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function MagazineSection() {
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
    <section className="px-5" data-node-id={figmaNode.magazine}>
      <SectionTitle showMore title="Magazine" subtitle="당신의 향을 이야기해요" />
      <div
        className={`mt-[30px] -mr-5 overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${dragClassName}`}
        onScroll={(event) => setScrollProgress(getHorizontalScrollProgress(event))}
        ref={scrollContainerRef}
        {...dragHandlers}
      >
        <div className="flex w-max gap-[10px]">
          {[
            {
              image: assets.magazineOne,
              title: "향수 지속력 높이는 꿀팁",
              body: "같은 향도 오래 남기는 사용법",
              dark: true,
            },
            {
              image: assets.magazineTwo,
              title: "이번주 가장 핫한 소식",
              body: "무슨무슨 향수 브랜드가 한국에 들어온대요",
            },
          ].map((item) => (
            <article
              className="relative h-[520px] w-[368px] shrink-0 overflow-hidden rounded-magazine"
              key={item.title}
            >
              <img alt="" className="absolute inset-0 h-full w-full rounded-magazine object-cover" src={item.image} />
              <div className="absolute bottom-[142px] right-2.5 flex h-[94px] w-5 items-center justify-center">
                <p
                  className={`rotate-90 whitespace-nowrap text-right font-cormorant text-base italic leading-none ${
                    item.dark ? "text-off-black" : "text-off-white"
                  }`}
                >
                  Fragrance Tip
                </p>
              </div>
              <div
                className={`absolute inset-x-2.5 bottom-2.5 flex flex-col gap-[30px] rounded-[20px] p-4 ${
                  item.dark ? "bg-off-black-70 text-off-white" : "bg-off-white-70 text-off-black"
                }`}
              >
                <div>
                  <p className="truncate text-xl font-semibold leading-none tracking-[-0.02em]">{item.title}</p>
                  <p className="mt-1.5 text-xs font-medium leading-none tracking-[-0.02em]">{item.body}</p>
                </div>
                <div className="flex items-center gap-1 text-base font-medium leading-none tracking-[-0.02em]">
                  전체보기
                  <ChevronRight aria-hidden="true" size={20} strokeWidth={1.6} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      <ScrollIndicator
        className="mt-3 w-full"
        onProgressSelect={handleIndicatorClick}
        position={scrollProgress}
        thumbWidth={50}
      />
    </section>
  );
}

function GiftSection() {
  return (
    <section className="px-5" data-node-id={figmaNode.gift}>
      <SectionTitle
        subtitle="AI챗봇과 함께 그 사람에게 꼭 맞는 향수를 찾아요"
        title="Gift"
        viewAllLabel="찾아보기"
        viewAllTo="/chatbot?intent=gift"
      />
      <img
        alt=""
        className="mt-[30px] h-[469px] w-full rounded-magazine object-cover"
        src={assets.gift}
      />
    </section>
  );
}

export function HomePage() {
  return (
    <main className="min-h-dvh bg-off-white" data-node-id={figmaNode.screen}>
      <div className="relative mx-auto flex min-h-dvh w-full max-w-[430px] flex-col bg-off-white">
        <HomeHeader />
        <div className="wrap flex flex-1 flex-col gap-[64px] pb-[160px]" data-node-id={figmaNode.wrap}>
          <HeroSection />
          <TodaysScentSection />
          <ChallengeSection />
          <RankSection />
          <MagazineSection />
          <GiftSection />
        </div>
        <BottomNavigation />
      </div>
    </main>
  );
}
