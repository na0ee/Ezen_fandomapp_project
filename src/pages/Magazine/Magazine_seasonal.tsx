
import type { PointerEvent, UIEvent } from "react";
import { useRef, useState } from "react";

import autumnImage from "../../assets/magazine/seasonal/autumn.png";
import overviewImage from "../../assets/magazine/seasonal/overview.png";
import recommendationsImage from "../../assets/magazine/seasonal/recommendations.png";
import springImage from "../../assets/magazine/seasonal/spring.png";
import summerImage from "../../assets/magazine/seasonal/summer.png";
import winterImage from "../../assets/magazine/seasonal/winter-overlay.png";

import { BackHeader } from "../../components/common/BackHeader";
import { HeaderActions } from "../../components/common/HeaderActions";
import { HeartButton } from "../../components/ui/HeartButton";

type SeasonalSlide = {
  alt: string;
  body: string[];
  bodyTitle: string;
  image: string;
  keywords?: string[];
  recommendationsOffsetY?: number;
  rootHeight: number;
  subtitle: string;
};

const seasonalSlides: SeasonalSlide[] = [
  {
    alt: "향수와 캔들, 책이 놓인 계절별 향수 화보",
    body: [
      "향수는 단순히 같은 향을 뿌린다고 해서 항상 동일하게 느껴지지 않습니다. 기온과 습도, 피부 상태 등 주변 환경에 따라 향이 퍼지는 방식과 지속력이 달라지기 때문입니다. 특히 계절에 따라 향이 주는 인상은 크게 변화하며, 같은 향수라도 전혀 다른 분위기로 느껴질 수 있습니다.",
      "따뜻한 계절에는 향이 더욱 빠르게 확산되어 가볍고 산뜻한 향이 잘 어울리며, 추운 계절에는 향이 천천히 퍼지기 때문에 깊고 포근한 향이 더욱 매력적으로 느껴집니다. 계절에 어울리는 향을 선택하면 자신의 분위기를 더욱 자연스럽게 표현할 수 있을 뿐만 아니라, 일상 속에서도 계절만의 감성을 더욱 풍부하게 즐길 수 있습니다. 나에게 어울리는 계절의 향을 찾아보며 사계절마다 새로운 향의 매력을 경험해보세요.",
    ],
    bodyTitle: "계절에 따라 달라지는 향의 매력",
    image: overviewImage,
    rootHeight: 1044,
    subtitle: "계절에 어울리는 향수 정보",
  },
  {
    alt: "봄꽃 사이에 놓인 플로럴 향수",
    body: [
      "따뜻한 날씨가 시작되는 봄에는 꽃이 피는 계절과 어울리는 가볍고 생기 있는 향이 잘 어울립니다. 은은한 플로럴 향과 싱그러운 그린 노트는 봄 특유의 화사하고 산뜻한 분위기를 더욱 돋보이게 해줍니다. 새로운 시작과 설렘이 가득한 계절인 만큼, 부드럽고 밝은 느낌의 향수가 특히 매력적으로 느껴집니다.",
    ],
    bodyTitle: "부드럽고 화사한 플로럴 향",
    image: springImage,
    keywords: ["#피오니", "#체리블라썸", "#로즈", "#프리지아", "#화이트 머스크"],
    rootHeight: 984,
    subtitle: "Spring | 봄",
  },
  {
    alt: "레몬과 흰 꽃 사이에 놓인 시트러스 향수",
    body: [
      "더운 날씨에는 무거운 향보다 가볍고 청량한 향이 더욱 쾌적하게 느껴집니다. 레몬, 베르가못, 자몽과 같은 시트러스 계열 향은 답답함을 덜어주며 마치 갓 샤워한 듯한 깨끗하고 산뜻한 분위기를 연출해줍니다. 강한 향이 부담스러워지는 여름철, 시원하고 생기 있는 시트러스 향은 데일리 향수로 많은 사랑을 받고 있습니다.",
    ],
    bodyTitle: "상쾌하고 시원한 시트러스 향",
    image: summerImage,
    keywords: ["# 레몬", "# 베르가못", "# 자몽", "# 네롤리", "# 바다 소금"],
    rootHeight: 984,
    subtitle: "Summer | 여름",
  },
  {
    alt: "마른 단풍과 나무 사이에 놓인 우디 향수",
    body: [
      "선선한 바람이 불기 시작하는 가을에는 따뜻하고 차분한 향이 더욱 매력적으로 느껴집니다. 샌달우드, 시더우드, 앰버와 같은 우디 계열 향은 깊이 있고 포근한 분위기를 더해주며, 가을 특유의 감성과 잘 어우러집니다. 차분하면서도 세련된 인상을 주기 때문에 분위기 있는 계절 향수로 많은 사랑을 받고 있습니다.",
    ],
    bodyTitle: "깊고 분위기 있는 우디 향",
    image: autumnImage,
    keywords: ["#  샌달우드", "#  시더우드", "#  무화과", "#  카다멈", "#  앰버"],
    rootHeight: 984,
    subtitle: "Autumn | 가을",
  },
  {
    alt: "니트와 촛불 사이에 놓인 오리엔탈 향수",
    body: [
      "차가운 계절에는 풍부하고 묵직한 향이 오래 지속되며 더욱 깊게 느껴집니다. 바닐라, 앰버, 머스크와 같은 오리엔탈 계열 향은 차가운 공기 속에서 더욱 따뜻하고 포근한 분위기를 만들어주며, 겨울만의 아늑한 감성을 더해줍니다. 달콤하면서도 깊이 있는 향은 연말 시즌과도 잘 어울려 특별하고 매력적인 분위기를 연출해줍니다.",
    ],
    bodyTitle: "포근하고 달콤한 오리엔탈 향",
    image: winterImage,
    keywords: ["#  바닐라", "#  통카빈", "#  머스크", "#  파출리", "#  초콜릿"],
    recommendationsOffsetY: 886,
    rootHeight: 1008,
    subtitle: "Winter | 겨울",
  },
];

function MagazineDetailHeader() {
  return (
    <BackHeader title="매거진" backTo="/magazine" action={<HeaderActions />} />
  );
}

function SeasonalArticle({ index, slide }: { index: number; slide: SeasonalSlide }) {
  const hasRecommendations = Boolean(slide.keywords);
  const [isSaved, setIsSaved] = useState(true);

  return (
    <article className="relative w-full shrink-0 snap-start bg-off-white" style={{ minHeight: slide.rootHeight }}>
      <div className="absolute top-[119px] left-side h-0.5 w-[calc(100%_-_40px)] bg-[#d9d9d9]">
        <div
          className="h-0.5 w-1/5 bg-off-black transition-transform duration-200"
          style={{ transform: `translateX(${index * 100}%)` }}
        />
      </div>

      <section className="relative mt-[141px] h-[507px] w-full overflow-hidden text-off-white">
        <img alt={slide.alt} className="absolute inset-0 size-full object-cover" draggable="false" src={slide.image} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/55" />
        <div className="absolute left-[22px] top-[375px] flex flex-col items-start">
          <span className="rounded-chip bg-off-black px-3.5 py-[5px] text-xs leading-[normal] tracking-[-0.02em]">
            향수 상식
          </span>
          <h2 className="mt-[7px] text-2xl font-semibold leading-[1.08] tracking-[-0.03em]">계절별 향수 선택 가이드</h2>
          <p className="mt-1 w-[386px] text-base font-medium leading-[normal] tracking-[-0.02em]">{slide.subtitle}</p>
        </div>
      </section>

      <section className="px-side pt-5 text-off-black [word-break:break-word]">
        <div className="flex w-full items-center justify-between">
          <h3 className="text-xl font-bold leading-[normal] tracking-[-0.02em]">{slide.bodyTitle}</h3>
          <HeartButton
            className="size-6 shrink-0"
            isSelected={isSaved}
            onClick={() => setIsSaved((saved) => !saved)}
          />
        </div>
        <div className="mt-3.5 flex flex-col gap-2.5 text-base font-medium leading-[1.4] tracking-[-0.02em]">
          {slide.body.map((paragraph) => (
            <p className="w-full" key={paragraph}>
              {paragraph}
            </p>
          ))}
        </div>

        {slide.keywords && (
          <ul
            aria-label="추천 향 노트"
            className={`${slide.subtitle.startsWith("Winter") ? "mt-3" : "mt-4"} flex w-full flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium leading-[normal] tracking-[-0.02em] text-grey`}
          >
            {slide.keywords.map((keyword) => (
              <li className="whitespace-nowrap" key={keyword}>
                {keyword}
              </li>
            ))}
          </ul>
        )}
      </section>

      {hasRecommendations && (
        <img
          alt="계절별 추천 향수"
          className="absolute left-5 h-[70px] w-[372px]"
          draggable="false"
          src={recommendationsImage}
          style={{ top: slide.recommendationsOffsetY ?? 864 }}
        />
      )}
    </article>
  );
}

export default function MagazineSeasonal() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({ active: false, startIndex: 0, startScrollLeft: 0, startX: 0 });
  const dragFrameRef = useRef<number | null>(null);
  const pendingScrollLeftRef = useRef(0);

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
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    const scroller = scrollerRef.current;
    if (event.pointerType !== "mouse" || event.button !== 0 || !scroller) return;

    event.preventDefault();
    if (dragFrameRef.current !== null) {
      cancelAnimationFrame(dragFrameRef.current);
      dragFrameRef.current = null;
    }
    pendingScrollLeftRef.current = scroller.scrollLeft;
    dragState.current = {
      active: true,
      startIndex: getIndexFromScroll(scroller),
      startScrollLeft: scroller.scrollLeft,
      startX: event.clientX,
    };
    scroller.setPointerCapture(event.pointerId);
    scroller.classList.add("is-dragging");
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const scroller = scrollerRef.current;
    if (!dragState.current.active || !scroller) return;
    if (event.buttons !== 1) return finishDragging(event);

    event.preventDefault();
    pendingScrollLeftRef.current = dragState.current.startScrollLeft - (event.clientX - dragState.current.startX);

    if (dragFrameRef.current === null) {
      dragFrameRef.current = requestAnimationFrame(() => {
        if (scrollerRef.current) {
          scrollerRef.current.scrollLeft = pendingScrollLeftRef.current;
        }
        dragFrameRef.current = null;
      });
    }
  };

  const finishDragging = (event: PointerEvent<HTMLDivElement>) => {
    const scroller = scrollerRef.current;
    if (!dragState.current.active || !scroller) return;

    if (dragFrameRef.current !== null) {
      cancelAnimationFrame(dragFrameRef.current);
      dragFrameRef.current = null;
      scroller.scrollLeft = pendingScrollLeftRef.current;
    }

    const distance = event.clientX - dragState.current.startX;
    let nextIndex = getIndexFromScroll(scroller);

    if (Math.abs(distance) >= 18) {
      nextIndex = dragState.current.startIndex + (distance < 0 ? 1 : -1);
    }

    dragState.current.active = false;
    scroller.classList.remove("is-dragging");
    if (scroller.hasPointerCapture(event.pointerId)) {
      scroller.releasePointerCapture(event.pointerId);
    }

    scrollToIndex(nextIndex);
  };

  const handleLostPointerCapture = () => {
    const scroller = scrollerRef.current;
    if (!dragState.current.active || !scroller) return;

    dragState.current.active = false;
    scroller.classList.remove("is-dragging");
    scrollToIndex(getIndexFromScroll(scroller));
  };

  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    if (dragState.current.active) return;

    getIndexFromScroll(event.currentTarget);
  };

  return (
    <main className="min-h-dvh overflow-x-hidden bg-black max-[430px]:bg-off-white text-off-black">
      <div className="mx-auto min-h-dvh w-full max-w-[430px] bg-off-white">
        <MagazineDetailHeader />

        <div
          aria-label="계절별 향수 가이드"
          className="horizontal-scroller scrollbar-hidden flex w-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth touch-pan-x"
          onDragStart={(event) => event.preventDefault()}
          onLostPointerCapture={handleLostPointerCapture}
          onPointerCancel={finishDragging}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={finishDragging}
          onScroll={handleScroll}
          ref={scrollerRef}
        >
          {seasonalSlides.map((slide, index) => (
            <SeasonalArticle index={index} key={slide.subtitle} slide={slide} />
          ))}
        </div>
      </div>
    </main>
  );
}
