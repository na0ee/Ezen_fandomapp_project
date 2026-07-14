import {
  ArrowRight,
  ChevronRight,
  Heart,
  Search,
} from "lucide-react";
import type { PointerEvent, ReactNode, UIEvent } from "react";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { BottomNavigation } from "../components/common/BottomNavigation";
import { PerfumeIcon } from "../components/icons/PerfumeIcon";
import headerBell from "../assets/community/figma/header-bell.svg";
import articleCardBase from "../assets/magazine/article-card-base.png";
import articleCardOverlay from "../assets/magazine/article-card-overlay.png";
import byredoStory from "../assets/magazine/byredo-story.png";
import citrusCardBase from "../assets/magazine/citrus-card-base.png";
import citrusCardOverlay from "../assets/magazine/citrus-card-overlay.png";
import scentMatch from "../assets/magazine/scent-match.png";
import trendBanner from "../assets/magazine/trend-banner.png";

const categories = ["전체", "향수 상식", "추천", "트렌드", "선물", "브랜드"];

const trendSlides = [
  {
    title: "니치 향수 트렌드 리포트",
    description: "지금 읽어보기",
    image: trendBanner,
    textColor: "text-off-black",
  },
  {
    title: "기억에 남는 우디 노트",
    description: "새로운 향 만나보기",
    image: byredoStory,
    textColor: "text-off-black",
  },
  {
    title: "밤을 닮은 깊은 향기",
    description: "에디터 추천 읽기",
    image: scentMatch,
    textColor: "text-off-white",
  },
];

const popularArticles = [
  {
    title: "향수 지속력을 높이는 꿀팁",
    description: "같은 향도 오래 남기는 나만의 작은 습관들",
    imageBase: articleCardBase,
    imageOverlay: articleCardOverlay,
  },
  {
    title: "여름에 어울리는 시트러스 향수",
    description: "무더운 계절을 산뜻하게 채우는 향",
    imageBase: citrusCardBase,
    imageOverlay: citrusCardOverlay,
  },
  {
    title: "처음 만나는 우디 향수 가이드",
    description: "차분하고 포근한 우디 노트를 고르는 방법",
    imageBase: articleCardBase,
    imageOverlay: byredoStory,
  },
  {
    title: "분위기를 바꾸는 나이트 향수",
    description: "저녁 약속에 어울리는 깊고 은은한 향기",
    imageBase: articleCardBase,
    imageOverlay: scentMatch,
  },
];

const brandStories = [
  {
    title: "BYREDO Story",
    description: "기억과 감정을 향으로 표현하는 스웨덴 니치 향수 브랜드",
    image: byredoStory,
  },
  {
    title: "LE LABO Story",
    description: "도시와 장인 정신이 만나는 감각적인 퍼퓸 하우스",
    image: articleCardOverlay,
  },
  {
    title: "DIPTYQUE Story",
    description: "예술과 여행의 기억을 독창적인 향으로 풀어낸 브랜드",
    image: scentMatch,
  },
];

type HorizontalScrollerProps = {
  children: ReactNode;
  className?: string;
  itemCount: number;
  onActiveIndexChange?: (index: number) => void;
};

type HorizontalScrollerHandle = {
  scrollToIndex: (index: number) => void;
};

const HorizontalScroller = forwardRef<HorizontalScrollerHandle, HorizontalScrollerProps>(function HorizontalScroller(
  { children, className = "", itemCount, onActiveIndexChange },
  ref,
) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({ isDragging: false, startX: 0, scrollLeft: 0, startIndex: 0 });

  const getIndexFromScroll = (element: HTMLDivElement) => {
    const maxScrollLeft = element.scrollWidth - element.clientWidth;
    if (maxScrollLeft <= 0 || itemCount <= 1) return 0;

    return Math.round((element.scrollLeft / maxScrollLeft) * (itemCount - 1));
  };

  const scrollToIndex = (index: number, behavior: ScrollBehavior = "smooth") => {
    const element = scrollRef.current;
    if (!element || itemCount <= 1) return;

    const safeIndex = Math.min(itemCount - 1, Math.max(0, index));
    const maxScrollLeft = element.scrollWidth - element.clientWidth;

    element.scrollTo({
      left: (maxScrollLeft * safeIndex) / (itemCount - 1),
      behavior,
    });
  };

  useImperativeHandle(ref, () => ({ scrollToIndex }));

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || event.button !== 0 || !scrollRef.current) return;

    event.preventDefault();
    dragState.current = {
      isDragging: true,
      startX: event.clientX,
      scrollLeft: scrollRef.current.scrollLeft,
      startIndex: getIndexFromScroll(scrollRef.current),
    };
    scrollRef.current.setPointerCapture(event.pointerId);
    scrollRef.current.classList.add("is-dragging");
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragState.current.isDragging || !scrollRef.current) return;

    if (event.pointerType === "mouse" && event.buttons !== 1) {
      stopDragging(event);
      return;
    }

    event.preventDefault();
    const distance = event.clientX - dragState.current.startX;
    const dragSensitivity = 1.2;
    scrollRef.current.scrollLeft = dragState.current.scrollLeft - distance * dragSensitivity;
  };

  const stopDragging = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragState.current.isDragging || !scrollRef.current) return;

    const element = scrollRef.current;
    dragState.current.isDragging = false;
    element.classList.remove("is-dragging");
    if (element.hasPointerCapture(event.pointerId)) {
      element.releasePointerCapture(event.pointerId);
    }
    const dragDistance = event.clientX - dragState.current.startX;
    const dragThreshold = 18;
    let nextIndex = getIndexFromScroll(element);

    if (Math.abs(dragDistance) >= dragThreshold) {
      nextIndex = dragState.current.startIndex + (dragDistance < 0 ? 1 : -1);
      nextIndex = Math.min(itemCount - 1, Math.max(0, nextIndex));
    }

    onActiveIndexChange?.(nextIndex);
    scrollToIndex(nextIndex);
  };

  const handleLostPointerCapture = () => {
    dragState.current.isDragging = false;
    scrollRef.current?.classList.remove("is-dragging");
  };

  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    onActiveIndexChange?.(getIndexFromScroll(event.currentTarget));
  };

  return (
    <div
      className={`horizontal-scroller scrollbar-hidden snap-x snap-proximity overflow-x-auto overscroll-x-contain touch-pan-x ${className}`}
      onDragStart={(event) => event.preventDefault()}
      onLostPointerCapture={handleLostPointerCapture}
      onPointerCancel={stopDragging}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={stopDragging}
      onScroll={handleScroll}
      ref={scrollRef}
    >
      {children}
    </div>
  );
});

function MoreLabel({ color = "grey", label = "전체보기" }: { color?: "grey" | "white"; label?: string }) {
  return (
    <span
      className={`flex shrink-0 items-center gap-1.5 text-sm font-medium leading-none tracking-[-0.02em] ${
        color === "white" ? "text-off-white" : "text-grey"
      }`}
    >
      {label}
      <ChevronRight aria-hidden="true" size={color === "white" ? 20 : 18} />
    </span>
  );
}

function SectionHead({ title }: { title: string }) {
  return (
    <div className="section-title flex h-[26px] items-start justify-between">
      <h2 className="text-2xl font-semibold leading-[1.08] tracking-[-0.02em]">{title}</h2>
      <MoreLabel />
    </div>
  );
}

type IndicatorProps = {
  activeIndex: number;
  itemCount: number;
  onSelect: (index: number) => void;
};

function Indicator({ activeIndex, itemCount, onSelect }: IndicatorProps) {
  const travelDistance = 80;
  const position = itemCount > 1 ? activeIndex / (itemCount - 1) : 0;

  return (
    <div className="relative mx-auto h-0.5 w-[120px] bg-grey">
      <div
        className="absolute left-0 top-0 h-0.5 w-10 bg-off-black transition-transform duration-200 ease-out"
        style={{ transform: `translateX(${position * travelDistance}px)` }}
      />
      <div className="absolute -top-[9px] left-0 grid h-5 w-full" style={{ gridTemplateColumns: `repeat(${itemCount}, 1fr)` }}>
        {Array.from({ length: itemCount }, (_, index) => (
          <button
            aria-label={`${index + 1}번 카드로 이동`}
            aria-pressed={activeIndex === index}
            className="cursor-pointer"
            key={index}
            onClick={() => onSelect(index)}
            type="button"
          />
        ))}
      </div>
    </div>
  );
}

function MagazineHeader() {
  return (
    <header className="header fixed top-0 left-1/2 z-50 flex h-[54px] w-full max-w-[430px] -translate-x-1/2 flex-col items-center justify-center bg-off-white px-5">
      <div className="flex w-full items-center justify-between">
        <div className="flex shrink-0 items-center">
          <h1 className="whitespace-nowrap text-center text-2xl font-semibold leading-[1.08] tracking-[-0.02em]">
            매거진
          </h1>
        </div>
        <div className="flex shrink-0 items-start justify-end gap-5" aria-label="매거진 메뉴">
          <Link aria-label="검색" className="size-7 shrink-0" to="/search">
            <Search aria-hidden="true" className="size-full" strokeWidth={1.8} />
          </Link>
          <img alt="" aria-hidden="true" className="size-7 shrink-0" src={headerBell} />
          <Link aria-label="향수 카테고리" to="/category">
            <PerfumeIcon />
          </Link>
        </div>
      </div>
    </header>
  );
}

function TrendSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollerRef = useRef<HorizontalScrollerHandle>(null);

  const handleIndicatorSelect = (index: number) => {
    setActiveIndex(index);
    scrollerRef.current?.scrollToIndex(index);
  };

  return (
    <section className="px-5">
      <SectionHead title="향수 트렌드" />
      <div className="mt-[30px]">
        <HorizontalScroller
          itemCount={3}
          onActiveIndexChange={setActiveIndex}
          ref={scrollerRef}
        >
          <div className="flex w-max gap-2.5">
            {trendSlides.map((slide) => (
              <article
                className="relative h-[177px] w-[calc(100vw-40px)] max-w-[390px] shrink-0 snap-start overflow-hidden rounded-card bg-grey"
                key={slide.title}
              >
                <img alt="" className="absolute inset-0 h-full w-full object-cover" src={slide.image} />
                <div className="absolute inset-0 bg-gradient-to-r from-white/35 via-transparent to-transparent" />
                <div className={`absolute left-4 top-[39px] ${slide.textColor}`}>
                  <p className="text-base font-medium leading-none tracking-[-0.02em]">{slide.title}</p>
                  <div className="mt-[17px] flex items-center gap-1.5 text-sm font-medium leading-none tracking-[-0.02em]">
                    <span>{slide.description}</span>
                    <ChevronRight aria-hidden="true" size={18} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </HorizontalScroller>
        <div className="mt-[30px]">
          <Indicator
            activeIndex={activeIndex}
            itemCount={3}
            onSelect={handleIndicatorSelect}
          />
        </div>
      </div>
    </section>
  );
}

function PopularSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollerRef = useRef<HorizontalScrollerHandle>(null);

  const handleIndicatorSelect = (index: number) => {
    setActiveIndex(index);
    scrollerRef.current?.scrollToIndex(index);
  };

  return (
    <section>
      <div className="px-5">
        <SectionHead title="많이 읽은 글" />
      </div>
      <div className="mt-[30px]">
        <div className="flex justify-center gap-2.5 px-5">
          {categories.map((category, index) => (
            <span
              className={`shrink-0 rounded-full px-3.5 py-2 text-xs font-medium leading-none tracking-[-0.02em] ${
                index === 0
                  ? "bg-off-black text-off-white"
                  : "border-[0.8px] border-light-grey bg-off-white text-grey"
              }`}
              key={category}
            >
              {category}
            </span>
          ))}
        </div>
        <HorizontalScroller
          className="mt-4"
          itemCount={3}
          onActiveIndexChange={setActiveIndex}
          ref={scrollerRef}
        >
          <div className="flex w-max gap-2.5 px-5">
            {popularArticles.map((article) => (
              <article
                className="flex h-[336px] w-[262px] shrink-0 snap-start flex-col rounded-card border-[0.5px] border-[#BEBEBE] bg-off-white px-4 py-6"
                key={article.title}
              >
                <div className="relative h-[190px] w-[230px] overflow-hidden rounded-card">
                  <img alt="" className="absolute inset-0 h-full w-full object-cover" src={article.imageBase} />
                  <img
                    alt={`${article.title} 이미지`}
                    className="absolute inset-0 h-full w-full object-cover"
                    src={article.imageOverlay}
                  />
                </div>
                <div className="mt-4 min-w-0">
                  <h3 className="truncate text-base font-semibold leading-none tracking-[-0.02em]">{article.title}</h3>
                  <p className="mt-2.5 truncate text-sm font-medium leading-none tracking-[-0.02em]">
                    {article.description}
                  </p>
                </div>
                <div className="mt-auto flex items-center justify-between">
                  <MoreLabel />
                  <Heart aria-label="찜한 글" className="fill-point-orange text-point-orange" size={24} />
                </div>
              </article>
            ))}
          </div>
        </HorizontalScroller>
        <div className="mt-[30px]">
          <Indicator
            activeIndex={activeIndex}
            itemCount={3}
            onSelect={handleIndicatorSelect}
          />
        </div>
      </div>
    </section>
  );
}

function BrandStorySection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollerRef = useRef<HorizontalScrollerHandle>(null);

  const handleIndicatorSelect = (index: number) => {
    setActiveIndex(index);
    scrollerRef.current?.scrollToIndex(index);
  };

  return (
    <section>
      <div className="px-5">
        <SectionHead title="브랜드 스토리" />
      </div>
      <HorizontalScroller
        className="mt-[30px] pl-5"
        itemCount={3}
        onActiveIndexChange={setActiveIndex}
        ref={scrollerRef}
      >
        <div className="flex w-max gap-2.5 pr-5">
          {brandStories.map((story) => (
            <article className="relative h-[520px] w-[368px] shrink-0 snap-start overflow-hidden rounded-magazine" key={story.title}>
              <img alt={`${story.title} 향수`} className="h-full w-full object-cover" src={story.image} />
              <div className="glassDark absolute bottom-2.5 left-2.5 flex w-[348px] flex-col gap-[30px] rounded-[20px] p-4 text-off-white">
                <div className="flex w-[255px] flex-col gap-1.5">
                  <h3 className="font-cormorant text-xl font-semibold leading-none tracking-[-0.02em]">{story.title}</h3>
                  <p className="text-xs font-medium leading-[1.4] tracking-[-0.02em]">
                    {story.description}
                  </p>
                </div>
                <MoreLabel color="white" />
              </div>
            </article>
          ))}
        </div>
      </HorizontalScroller>
      <div className="mt-[30px]">
        <Indicator
          activeIndex={activeIndex}
          itemCount={3}
          onSelect={handleIndicatorSelect}
        />
      </div>
    </section>
  );
}

function ExploreSection() {
  const exploreItems = [0, 1, 2];
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollerRef = useRef<HorizontalScrollerHandle>(null);

  const handleIndicatorSelect = (index: number) => {
    setActiveIndex(index);
    scrollerRef.current?.scrollToIndex(index);
  };

  return (
    <section>
      <div className="px-5">
        <SectionHead title="더 둘러보기" />
      </div>
      <HorizontalScroller
        className="mt-[30px] pl-4"
        itemCount={3}
        onActiveIndexChange={setActiveIndex}
        ref={scrollerRef}
      >
        <div className="flex w-max gap-3 pr-4">
          {exploreItems.map((item) => (
            <article className="relative h-72 w-[262px] shrink-0 snap-start overflow-hidden rounded-card" key={item}>
              <img alt="어두운 공간의 향수" className="h-full w-full object-cover" src={scentMatch} />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80" />
              <p className="absolute left-3.5 top-8 font-cormorant text-xs font-medium tracking-[-0.02em] text-off-white">
                Scent Match
              </p>
              <div className="absolute left-[23px] top-44 text-off-white">
                <h3 className="text-base font-semibold leading-none tracking-[-0.02em]">계절별 향수 선택 가이드</h3>
                <p className="mt-2 w-[127px] text-xs font-medium leading-[1.25] tracking-[-0.02em]">
                  봄, 여름, 가을 , 겨울
                  <br />어떤 향이 어울릴까?
                </p>
              </div>
              <p className="absolute bottom-5 left-[23px] text-xs leading-none tracking-[-0.02em] text-off-white">
                2026.07.13
              </p>
              <ArrowRight aria-hidden="true" className="absolute bottom-[15px] right-3 text-off-white" size={24} />
            </article>
          ))}
        </div>
      </HorizontalScroller>
      <div className="mt-[30px]">
        <Indicator
          activeIndex={activeIndex}
          itemCount={3}
          onSelect={handleIndicatorSelect}
        />
      </div>
    </section>
  );
}

export default function MagazinePage() {
  return (
    <main className="min-h-dvh bg-off-white">
      <div className="mx-auto flex min-h-dvh w-full max-w-[430px] flex-col bg-off-white">
        <MagazineHeader />
        <div className="wrap flex flex-col gap-16 pt-[118px] pb-[112px]">
          <TrendSection />
          <PopularSection />
          <BrandStorySection />
          <ExploreSection />
        </div>
        <BottomNavigation />
      </div>
    </main>
  );
}
