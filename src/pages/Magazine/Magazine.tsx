import { ChevronRight } from "lucide-react";
import type { MouseEvent, PointerEvent, ReactNode, UIEvent } from "react";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import brandByredoImage from "../../assets/magazine/byredo/hero.png";
import brandDiptyqueImage from "../../assets/magazine/detail/more-card-diptyque.jpg";
import brandJoMaloneImage from "../../assets/magazine/main/brand-jo-malone.jpg";
import popularNewFragranceImage from "../../assets/magazine/main/popular-new-fragrance.jpg";
import trendHeroImage from "../../assets/magazine/detail/hero.jpg";
import moreCardArrow from "../../assets/magazine/detail/more-card-arrow.svg";
import moreCardSeasonalImage from "../../assets/magazine/detail/more-card.png";
import longevityImage from "../../assets/magazine/longevity/hero.png";
import { BottomNavigation } from "../../components/common/BottomNavigation";

import { Header } from "../../components/common/Header";
import { HeaderActions } from "../../components/common/HeaderActions";

const categories = ["전체", "향수 상식", "추천", "트렌드", "선물", "브랜드"];

const popularArticles = [
  {
    title: "향수 지속력 높이는 꿀팁",
    description: "같은 향도 오래 남기는 사용법",
    href: "/magazine/perfume-longevity",
    image: longevityImage,
    variant: "tall",
  },
  {
    title: "JO MALONE LONDON",
    description: "나만의 향을 완성해가는 레이어링의 시작",
    href: "/magazine/jo-malone",
    image: brandJoMaloneImage,
    variant: "short",
  },
];

const brandStories = [
  {
    eyebrow: "About Byredo",
    title: "BYREDO",
    description: "기억과 감정을 향으로 담아내는 브랜드",
    href: "/magazine/byredo",
    image: brandByredoImage,
  },
  {
    eyebrow: "About Diptyque",
    title: "DIPTYQUE",
    description: "예술과 여행이 향으로 만나다",
    href: "/magazine/diptyque",
    image: brandDiptyqueImage,
  },
  {
    eyebrow: "About Jo Malone",
    title: "JO MALONE LONDON",
    description: "나만의 향을 완성해가는 레이어링의 시작",
    href: "/magazine/jo-malone",
    image: brandJoMaloneImage,
  },
];

const exploreArticles = [
  {
    date: "2026.07.13",
    description: "봄, 여름, 가을 , 겨울\n어떤 향이 어울릴까?",
    eyebrow: "Guide",
    href: "/magazine/seasonal-guide",
    image: moreCardSeasonalImage,
    imageClassName: "inset-0 size-full object-cover",
    title: "계절별 향수 선택 가이드",
  },
  {
    date: "2026.05.10",
    description: "올해 가장 주목해야 할 새로운 향수들",
    eyebrow: "Trend",
    href: "/magazine/fragrance-collection",
    image: popularNewFragranceImage,
    imageClassName: "inset-0 size-full object-cover",
    title: "New Fragrance Collection 2026",
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
    if (event.target instanceof Element && event.target.closest("a, button")) return;

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
    scrollRef.current.scrollLeft = dragState.current.scrollLeft - distance * 1.2;
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
    let nextIndex = getIndexFromScroll(element);

    if (Math.abs(dragDistance) >= 18) {
      nextIndex = dragState.current.startIndex + (dragDistance < 0 ? 1 : -1);
      nextIndex = Math.min(itemCount - 1, Math.max(0, nextIndex));
    }

    onActiveIndexChange?.(nextIndex);
    scrollToIndex(nextIndex);
  };

  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    onActiveIndexChange?.(getIndexFromScroll(event.currentTarget));
  };

  return (
    <div
      className={`horizontal-scroller scrollbar-hidden snap-x snap-proximity overflow-x-auto overscroll-x-contain touch-pan-x ${className}`}
      onDragStart={(event) => event.preventDefault()}
      onLostPointerCapture={() => {
        dragState.current.isDragging = false;
        scrollRef.current?.classList.remove("is-dragging");
      }}
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

function MoreLabel({ color = "grey", href }: { color?: "black" | "grey" | "white"; href?: string }) {
  const navigate = useNavigate();
  const className = `flex shrink-0 items-center gap-1.5 text-sm font-medium leading-[normal] tracking-[-0.02em] ${
    color === "white" ? "text-off-white" : color === "black" ? "text-off-black" : "text-grey"
  }`;
  const content = (
    <>
      전체보기
      <ChevronRight aria-hidden="true" size={18} strokeWidth={1.5} />
    </>
  );

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!href) return;

    event.preventDefault();
    event.stopPropagation();
    navigate(href);
  };

  return href ? (
    <Link
      className={`${className} relative z-10 cursor-pointer`}
      draggable={false}
      onClick={handleClick}
      onPointerDown={(event) => event.stopPropagation()}
      to={href}
    >
      {content}
    </Link>
  ) : (
    <span className={className}>{content}</span>
  );
}

function SectionHead({ moreHref, showMore = false, title }: { moreHref?: string; showMore?: boolean; title: string }) {
  return (
    <div className="flex h-[26px] w-full items-start justify-between overflow-hidden">
      <h2 className="text-2xl font-semibold leading-[1.08] tracking-[-0.03em]">{title}</h2>
      {showMore && <MoreLabel href={moreHref} />}
    </div>
  );
}

type IndicatorProps = {
  activeIndex: number;
  itemCount: number;
  onSelect?: (index: number) => void;
};

function WideIndicator({ activeIndex, itemCount, onSelect }: IndicatorProps) {
  const position = itemCount > 1 ? activeIndex / (itemCount - 1) : 0;

  return (
    <div className="relative h-0.5 w-full bg-[#d9d9d9]">
      <div
        className="absolute top-0 left-0 h-0.5 w-1/2 bg-off-black transition-transform duration-200 ease-out"
        style={{ transform: `translateX(${position * 100}%)` }}
      />
      {onSelect && (
        <div className="absolute -top-[10px] left-0 grid h-5 w-full" style={{ gridTemplateColumns: `repeat(${itemCount}, 1fr)` }}>
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
      )}
    </div>
  );
}

function MagazineHeader() {
  return (
    <Header title="매거진" action={<HeaderActions />} />
  );
}

function TrendSection() {
  return (
    <section className="px-side">
      <SectionHead title="향수 트렌드" />
      <article className="relative mt-[14px] h-[176px] overflow-hidden rounded-card bg-grey text-off-white">
        <div className="absolute top-0 left-0 h-[196px] w-full">
          <img alt="꽃과 향수로 얼굴을 표현한 니치 향수 화보" className="size-full object-cover" src={trendHeroImage} />
        </div>
        <div className="absolute bottom-3 left-3 flex flex-col gap-2.5">
          <h3 className="text-xl font-bold leading-[normal] tracking-[-0.02em]">니치 향수 트렌드</h3>
          <Link
            className="flex items-center gap-1.5 text-sm font-medium leading-[normal] tracking-[-0.02em]"
            to="/magazine/niche-trend"
          >
            지금 읽어보기
            <ChevronRight aria-hidden="true" size={18} strokeWidth={1.5} />
          </Link>
        </div>
      </article>
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
      <div className="px-side">
        <SectionHead title="많이 읽은 글" />
      </div>
      <HorizontalScroller
        className="mt-[30px] scroll-px-side"
        itemCount={popularArticles.length}
        onActiveIndexChange={setActiveIndex}
        ref={scrollerRef}
      >
        <div className="flex w-max gap-2.5 px-side">
          {popularArticles.map((article) => (
            <article
              className={`flex h-[336px] w-[262px] shrink-0 snap-start flex-col gap-4 overflow-hidden rounded-card border-[0.5px] border-[#BEBEBE] bg-off-white px-4 ${
                article.variant === "short" ? "py-6" : "py-4"
              }`}
              key={article.title}
            >
              <img
                alt={`${article.title} 이미지`}
                className={`w-full rounded-card object-cover ${
                  article.variant === "short" ? "h-[190px] shrink-0" : "min-h-0 flex-1"
                }`}
                src={article.image}
              />
              <div className="flex w-full shrink-0 flex-col gap-1">
                <h3 className="w-[230px] truncate text-base font-semibold leading-[normal] tracking-[-0.02em] text-off-black">
                  {article.title}
                </h3>
                <p className="w-full truncate text-sm font-medium leading-[normal] tracking-[-0.02em] text-off-black">
                  {article.description}
                </p>
              </div>
              <MoreLabel href={article.href} />
            </article>
          ))}
        </div>
      </HorizontalScroller>
      <div className="mt-3 px-side">
        <WideIndicator activeIndex={activeIndex} itemCount={popularArticles.length} onSelect={handleIndicatorSelect} />
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
      <div className="px-side">
        <SectionHead title="브랜드 스토리" />
      </div>
      <HorizontalScroller
        className="mt-[30px] scroll-px-side"
        itemCount={brandStories.length}
        onActiveIndexChange={setActiveIndex}
        ref={scrollerRef}
      >
        <div className="flex w-max gap-2.5 px-side">
          {brandStories.map((story) => (
            <article
              className="relative flex h-[520px] w-[368px] shrink-0 snap-start flex-col items-end justify-end overflow-hidden rounded-magazine p-2.5"
              key={story.title}
            >
              <img alt={`${story.title} 이미지`} className="absolute inset-0 size-full rounded-magazine object-cover" src={story.image} />
              <div className="relative flex h-[100px] w-5 shrink-0 items-center justify-center">
                <div className="rotate-90 whitespace-nowrap font-cormorant text-base italic leading-[normal] text-off-black">
                  {story.eyebrow}
                </div>
              </div>
              <div className="relative flex w-full shrink-0 flex-col items-start gap-[30px] rounded-[20px] bg-off-black-70 p-4 text-off-white">
                <div className="flex w-[204px] flex-col gap-1.5">
                  <h3 className="truncate text-xl font-semibold leading-[normal] tracking-[-0.02em]">{story.title}</h3>
                  <p className="text-xs font-medium leading-[normal] tracking-[-0.02em]">{story.description}</p>
                </div>
                <MoreLabel color="white" href={story.href} />
              </div>
            </article>
          ))}
        </div>
      </HorizontalScroller>
      <div className="mt-3 px-side">
        <WideIndicator activeIndex={activeIndex} itemCount={brandStories.length} onSelect={handleIndicatorSelect} />
      </div>
    </section>
  );
}

function ExploreSection() {
  return (
    <section className="flex w-full flex-col items-center">
      <div className="w-[calc(100%_-_40px)] max-w-[390px]">
        <SectionHead moreHref="/magazine/more-view" showMore title="더 둘러보기" />
      </div>
      <div className="mt-[30px] flex w-[calc(100%_-_40px)] max-w-[390px] items-center gap-2.5 overflow-x-auto scrollbar-hidden">
        {categories.map((category, index) => (
          <span
            className={`shrink-0 rounded-full px-3.5 py-2 text-xs font-medium leading-[normal] tracking-[-0.02em] ${
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
        className="mt-4 w-[calc(100%_-_40px)] max-w-[390px]"
        itemCount={exploreArticles.length}
      >
        <div className="flex w-max gap-4">
          {exploreArticles.map((article) => (
            <article className="relative h-72 w-[262px] shrink-0 snap-start" key={article.title}>
              <div className="absolute inset-x-0 top-0 h-72 overflow-hidden rounded-card border-[0.8px] border-light-grey">
                <img alt={`${article.title} 이미지`} className={`absolute ${article.imageClassName}`} src={article.image} />
              </div>
              <div className="absolute inset-x-0 top-0 h-72 overflow-hidden rounded-card bg-gradient-to-b from-transparent to-black/80 text-off-white">
                <p className="absolute top-8 left-3.5 font-cormorant text-xs font-medium leading-[normal] tracking-[-0.02em]">
                  {article.eyebrow}
                </p>
                <div className="absolute top-44 left-[22px] flex flex-col gap-2">
                  <h3 className="w-[168px] truncate text-base font-semibold leading-[normal] tracking-[-0.02em]">
                    {article.title}
                  </h3>
                  <p className="h-[30px] w-[128px] whitespace-pre-line text-xs font-medium leading-[normal] tracking-[-0.02em]">
                    {article.description}
                  </p>
                </div>
                <p className="absolute top-[254px] left-[22px] h-3.5 w-[60px] text-xs leading-[normal] tracking-[-0.02em]">
                  {article.date}
                </p>
                {article.href ? (
                  <Link
                    aria-label={`${article.title} 읽기`}
                    className="absolute top-[240px] left-[216px] z-10 flex size-11 items-center justify-center"
                    onPointerDown={(event) => event.stopPropagation()}
                    to={article.href}
                  >
                    <img alt="" aria-hidden="true" className="size-6" src={moreCardArrow} />
                  </Link>
                ) : (
                  <img alt="" aria-hidden="true" className="absolute top-[248px] left-[226px] size-6" src={moreCardArrow} />
                )}
              </div>
            </article>
          ))}
        </div>
      </HorizontalScroller>
    </section>
  );
}

export default function MagazinePage() {
  return (
    <main className="min-h-dvh bg-black max-[430px]:bg-off-white text-off-black">
      <div className="mx-auto min-h-dvh w-full max-w-[430px] overflow-x-hidden bg-off-white">
        <MagazineHeader />
        <div className="flex flex-col gap-20 pt-[calc(var(--app-header-height)+64px)] pb-[160px]">
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
