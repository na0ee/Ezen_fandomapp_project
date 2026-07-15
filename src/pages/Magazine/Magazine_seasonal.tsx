import { ChevronLeft, Search } from "lucide-react";
import type { PointerEvent, UIEvent } from "react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import headerBell from "../../assets/community/figma/header-bell.svg";
import autumnImage from "../../assets/magazine/seasonal/autumn.png";
import overviewImage from "../../assets/magazine/seasonal/overview.png";
import springImage from "../../assets/magazine/seasonal/spring.png";
import summerImage from "../../assets/magazine/seasonal/summer.png";
import winterImage from "../../assets/magazine/seasonal/winter-overlay.png";
import { BottomNavigation } from "../../components/common/BottomNavigation";
import { PerfumeIcon } from "../../components/icons/PerfumeIcon";

type SeasonalSlide = {
  alt: string;
  body: string;
  bodyTitle: string;
  image: string;
  keywords?: string[];
  subtitle: string;
};

const seasonalSlides: SeasonalSlide[] = [
  {
    alt: "향수와 캔들, 책이 놓인 계절별 향수 화보",
    subtitle: "계절에 어울리는 향수 정보",
    bodyTitle: "계절에 따라 달라지는 향의 매력",
    body: "기온과 습도에 따라 향이 퍼지는 방식은 달라집니다. 계절에 어울리는 향을 선택하면 더욱 자연스럽고 매력적인 분위기를 연출할 수 있습니다.",
    image: overviewImage,
  },
  {
    alt: "봄꽃 사이에 놓인 플로럴 향수",
    subtitle: "Spring | 봄",
    bodyTitle: "부드럽고 화사한 플로럴 향",
    body: "따뜻한 날씨가 시작되는 봄에는 꽃이 피는 계절과 어울리는 가볍고 생기 있는 향이 잘 어울립니다.",
    image: springImage,
    keywords: ["#피오니", "#체리블라썸", "#로즈", "#프리지아", "#화이트 머스크"],
  },
  {
    alt: "레몬과 흰 꽃 사이에 놓인 시트러스 향수",
    subtitle: "Summer | 여름",
    bodyTitle: "상쾌하고 시원한 시트러스 향",
    body: "더운 날씨에는 무거운 향보다 가볍고 청량한 향이 더욱 쾌적하게 느껴집니다.",
    image: summerImage,
    keywords: ["# 레몬", "# 베르가못", "# 자몽", "# 네롤리", "# 바다 소금"],
  },
  {
    alt: "마른 단풍과 나무 사이에 놓인 우디 향수",
    subtitle: "Autumn | 가을",
    bodyTitle: "깊고 분위기 있는 우디 향",
    body: "선선한 바람이 불기 시작하는 가을에는 따뜻하고 차분한 향이 더욱 매력적으로 느껴집니다.",
    image: autumnImage,
    keywords: ["# 샌달우드", "# 시더우드", "# 무화과", "# 카다멈", "# 앰버"],
  },
  {
    alt: "니트와 촛불 사이에 놓인 오리엔탈 향수",
    subtitle: "Winter | 겨울",
    bodyTitle: "포근하고 달콤한 오리엔탈 향",
    body: "차가운 계절에는 풍부하고 묵직한 향이 오래 지속되며 더욱 깊게 느껴집니다.",
    image: winterImage,
    keywords: ["# 바닐라", "# 통카빈", "# 머스크", "# 파출리", "# 초콜릿"],
  },
];

function MagazineDetailHeader() {
  return (
    <header className="fixed top-0 left-1/2 z-50 flex h-[54px] w-full max-w-[430px] -translate-x-1/2 items-center justify-between bg-off-white px-side">
      <div className="flex items-center">
        <Link aria-label="매거진으로 돌아가기" className="flex size-[21px] items-center justify-center" to="/magazine">
          <ChevronLeft aria-hidden="true" size={21} strokeWidth={1.4} />
        </Link>
        <h1 className="text-2xl font-semibold leading-[1.08] tracking-[-0.03em]">매거진</h1>
      </div>
      <div aria-label="매거진 메뉴" className="flex items-center gap-5">
        <Link aria-label="검색" className="size-7" to="/search">
          <Search aria-hidden="true" className="size-full" strokeWidth={1.8} />
        </Link>
        <img alt="" aria-hidden="true" className="size-7" src={headerBell} />
        <Link aria-label="향수 카테고리" to="/category">
          <PerfumeIcon />
        </Link>
      </div>
    </header>
  );
}

export default function MagazineSeasonal() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({ active: false, startIndex: 0, startScrollLeft: 0, startX: 0 });
  const bodyTransform = `translate3d(${-activeIndex * 100}%, 0, 0)`;

  const getIndexFromScroll = (scroller: HTMLDivElement) => {
    if (scroller.clientWidth === 0) return 0;

    return Math.min(seasonalSlides.length - 1, Math.max(0, Math.round(scroller.scrollLeft / scroller.clientWidth)));
  };

  const scrollToIndex = (index: number, behavior: ScrollBehavior = "smooth") => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const nextIndex = Math.min(seasonalSlides.length - 1, Math.max(0, index));
    scroller.scrollTo({
      behavior,
      left: nextIndex * scroller.clientWidth,
    });
    setActiveIndex(nextIndex);
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;

    event.preventDefault();
    dragState.current = {
      active: true,
      startIndex: getIndexFromScroll(event.currentTarget),
      startScrollLeft: event.currentTarget.scrollLeft,
      startX: event.clientX,
    };
    event.currentTarget.style.scrollBehavior = "auto";
    event.currentTarget.style.scrollSnapType = "none";
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragState.current.active) return;

    event.preventDefault();
    event.currentTarget.scrollLeft = dragState.current.startScrollLeft - (event.clientX - dragState.current.startX);
  };

  const finishDragging = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragState.current.active) return;

    const distance = event.clientX - dragState.current.startX;
    let nextIndex = getIndexFromScroll(event.currentTarget);

    if (Math.abs(distance) >= 20) {
      nextIndex = dragState.current.startIndex + (distance < 0 ? 1 : -1);
    }

    dragState.current.active = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    event.currentTarget.style.removeProperty("scroll-behavior");
    event.currentTarget.style.removeProperty("scroll-snap-type");
    setIsDragging(false);
    scrollToIndex(nextIndex);
  };

  const handleLostPointerCapture = () => {
    if (!dragState.current.active) return;

    dragState.current.active = false;
    setIsDragging(false);
    const scroller = scrollerRef.current;
    if (!scroller) return;

    scroller.style.removeProperty("scroll-behavior");
    scroller.style.removeProperty("scroll-snap-type");
    scrollToIndex(getIndexFromScroll(scroller));
  };

  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    if (dragState.current.active) return;

    setActiveIndex(getIndexFromScroll(event.currentTarget));
  };

  return (
    <main className="min-h-dvh overflow-x-hidden bg-off-white text-off-black">
      <div className="mx-auto min-h-dvh w-full max-w-[430px] bg-off-white">
        <MagazineDetailHeader />

        <div className="flex flex-col items-center gap-10 pt-[119px] pb-[55px]">
          <section className="flex w-full flex-col items-center gap-5">
            <div className="relative h-0.5 w-[390px] bg-[#D9D9D9]">
              <div
                className="absolute top-0 left-0 h-0.5 bg-off-black transition-[width] duration-300 ease-out"
                style={{ width: `${((activeIndex + 1) / seasonalSlides.length) * 100}%` }}
              />
              <div className="absolute -top-2 left-0 grid h-4 w-full grid-cols-5">
                {seasonalSlides.map((slide, index) => (
                  <button
                    aria-label={`${slide.subtitle} 보기`}
                    aria-pressed={activeIndex === index}
                    key={slide.subtitle}
                    onClick={() => scrollToIndex(index)}
                    type="button"
                  />
                ))}
              </div>
            </div>

            <div
              className={`horizontal-scroller scrollbar-hidden relative flex h-[507px] w-full select-none overflow-x-auto overscroll-x-contain bg-[#C4C4C4] text-off-white ${
                isDragging ? "cursor-grabbing snap-none scroll-auto" : "cursor-grab snap-x snap-mandatory scroll-smooth"
              }`}
              onDragStart={(event) => event.preventDefault()}
              onLostPointerCapture={handleLostPointerCapture}
              onPointerCancel={finishDragging}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={finishDragging}
              onScroll={handleScroll}
              ref={scrollerRef}
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {seasonalSlides.map((slide, index) => (
                <article
                  aria-hidden={activeIndex !== index}
                  className="pointer-events-none relative flex h-full w-full shrink-0 snap-start snap-always flex-col items-start justify-end gap-[7px] px-[22px] pb-14"
                  key={slide.subtitle}
                >
                  <img alt={slide.alt} className="absolute inset-0 size-full object-cover" draggable="false" src={slide.image} />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
                  <span className="relative rounded-chip bg-off-black px-3.5 py-[5px] text-xs leading-[normal] tracking-[-0.02em]">
                    향수 상식
                  </span>
                  <div className="relative flex w-full flex-col items-start gap-1 [word-break:break-word]">
                    <h2 className="text-2xl font-semibold leading-[1.08] tracking-[-0.03em]">계절별 향수 선택 가이드</h2>
                    <p className="w-full text-base font-medium leading-[normal] tracking-[-0.02em]">{slide.subtitle}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <div className="w-full overflow-hidden" aria-live="polite">
            <div
              className="flex transition-transform duration-300 ease-out [will-change:transform]"
              style={{ transform: bodyTransform }}
            >
              {seasonalSlides.map((slide, index) => (
                <section
                  aria-hidden={activeIndex !== index}
                  className="flex min-h-[100px] w-full shrink-0 flex-col items-start gap-1 px-side text-black [word-break:break-word]"
                  key={slide.subtitle}
                >
                  <h2 className="w-full text-xl font-bold leading-[normal] tracking-[-0.02em]">{slide.bodyTitle}</h2>
                  <p className={`${index === 0 ? "w-[369px]" : "w-full"} text-base font-medium leading-6 tracking-[-0.02em]`}>
                    {slide.body}
                  </p>
                  {slide.keywords && (
                    <ul aria-label="추천 향 노트" className="flex w-full flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium leading-[normal] tracking-[-0.02em] text-grey">
                      {slide.keywords.map((keyword) => (
                        <li className="whitespace-nowrap" key={keyword}>
                          {keyword}
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>
          </div>
        </div>

        <BottomNavigation placement="frame" />
      </div>
    </main>
  );
}
