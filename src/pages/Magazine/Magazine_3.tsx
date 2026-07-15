import { ChevronLeft, Search } from "lucide-react";
import type { PointerEvent } from "react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import headerBell from "../../assets/community/figma/header-bell.svg";
import { BottomNavigation } from "../../components/common/BottomNavigation";
import { PerfumeIcon } from "../../components/icons/PerfumeIcon";

const seasonalSlides = [
  {
    subtitle: "계절에 어울리는 향수 정보",
    bodyTitle: "계절에 따라 달라지는 향의 매력",
    body: "기온과 습도에 따라 향이 퍼지는 방식은 달라집니다. 계절에 어울리는 향을 선택하면 더욱 자연스럽고 매력적인 분위기를 연출할 수 있습니다.",
  },
  {
    subtitle: "Spring | 봄",
    bodyTitle: "부드럽고 화사한 플로럴 향",
    body: "따뜻한 날씨가 시작되는 봄에는 꽃이 피는 계절과 어울리는 가볍고 생기 있는 향이 잘 어울립니다.",
  },
  {
    subtitle: "Summer | 여름",
    bodyTitle: "상쾌하고 시원한 시트러스 향",
    body: "더운 날씨에는 무거운 향보다 가볍고 청량한 향이 더욱 쾌적하게 느껴집니다.",
  },
  {
    subtitle: "Autumn | 가을",
    bodyTitle: "깊고 분위기 있는 우디 향",
    body: "선선한 바람이 불기 시작하는 가을에는 따뜻하고 차분한 향이 더욱 매력적으로 느껴집니다.",
  },
  {
    subtitle: "Winter | 겨울",
    bodyTitle: "포근하고 달콤한 오리엔탈 향",
    body: "차가운 계절에는 풍부하고 묵직한 향이 오래 지속되며 더욱 깊게 느껴집니다.",
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

export default function Magazine3() {
  const [activeIndex, setActiveIndex] = useState(0);
  const swipeState = useRef({ active: false, startX: 0 });
  const activeSlide = seasonalSlides[activeIndex];

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;

    swipeState.current = { active: true, startX: event.clientX };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const finishSwipe = (event: PointerEvent<HTMLDivElement>) => {
    if (!swipeState.current.active) return;

    swipeState.current.active = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    const distance = event.clientX - swipeState.current.startX;
    if (Math.abs(distance) < 40) return;

    setActiveIndex((currentIndex) => {
      if (distance < 0) return Math.min(seasonalSlides.length - 1, currentIndex + 1);
      return Math.max(0, currentIndex - 1);
    });
  };

  return (
    <main className="min-h-dvh overflow-x-hidden bg-off-white text-off-black">
      <div className="mx-auto min-h-dvh w-full max-w-[430px] bg-off-white">
        <MagazineDetailHeader />

        <div className="flex flex-col items-center gap-10 pt-[119px] pb-[120px]">
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
                    onClick={() => setActiveIndex(index)}
                    type="button"
                  />
                ))}
              </div>
            </div>

            <div
              className="relative flex h-[507px] w-full cursor-grab select-none flex-col items-start justify-end gap-[7px] overflow-hidden bg-[#C4C4C4] px-[22px] pb-14 text-off-white active:cursor-grabbing [touch-action:pan-y]"
              onLostPointerCapture={() => {
                swipeState.current.active = false;
              }}
              onPointerCancel={finishSwipe}
              onPointerDown={handlePointerDown}
              onPointerUp={finishSwipe}
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
              <span className="relative rounded-chip bg-off-black px-3.5 py-[5px] text-xs leading-[normal] tracking-[-0.02em]">
                향수 상식
              </span>
              <div className="relative flex w-full flex-col items-start gap-1 [word-break:break-word]">
                <h2 className="text-2xl font-semibold leading-[1.08] tracking-[-0.03em]">계절별 향수 선택 가이드</h2>
                <p className="w-full text-base font-medium leading-[normal] tracking-[-0.02em]">{activeSlide.subtitle}</p>
              </div>
            </div>
          </section>

          <section className="flex w-full flex-col items-start gap-1 px-side text-black [word-break:break-word]" aria-live="polite">
            <h2 className="w-full text-xl font-bold leading-[normal] tracking-[-0.02em]">{activeSlide.bodyTitle}</h2>
            <p className={`${activeIndex === 0 ? "w-[369px]" : "w-full"} text-base font-medium leading-6 tracking-[-0.02em]`}>
              {activeSlide.body}
            </p>
          </section>
        </div>

        <BottomNavigation />
      </div>
    </main>
  );
}
