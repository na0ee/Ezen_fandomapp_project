import { ChevronLeft, Search } from "lucide-react";
import type { PointerEvent, ReactNode } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import headerBell from "../../assets/community/figma/header-bell.svg";
import longevityHero from "../../assets/magazine/longevity/hero.png";
import tipImageOne from "../../assets/magazine/longevity/tip-1.png";
import tipImageTwo from "../../assets/magazine/longevity/tip-2.png";
import tipImageThree from "../../assets/magazine/longevity/tip-3.png";
import tipImageFour from "../../assets/magazine/longevity/tip-4.png";
import tipImageFive from "../../assets/magazine/longevity/tip-5.png";
import { BottomNavigation } from "../../components/common/BottomNavigation";
import { PerfumeIcon } from "../../components/icons/PerfumeIcon";

const tips = [
  {
    number: "01.",
    accentNumber: true,
    title: "보습 후 향수를 뿌려보세요",
    description: (
      <>
        건조한 피부는 향이 빠르게 날아갑니다.<br />
        피부를 충분히 보습한 후 향수를 사용하면<br />
        향이 더욱 오래 지속됩니다.
      </>
    ),
    image: tipImageOne,
    imageClassName: "left-0 top-[-26.52%] h-[152.82%] w-full",
    overlayClassName: "bg-black/50",
  },
  {
    number: "02.",
    accentNumber: true,
    title: "맥박이 뛰는 부위에 사용하세요",
    description: "손목, 목 뒤, 귀 뒤처럼 체온이 높은 부위는 향이 자연스럽게 퍼지도록 도와줍니다. 자연스러운 향을 위해서 1~2회 뿌리는게 좋습니다",
    image: tipImageTwo,
    imageClassName: "left-[0.08%] top-[-6.93%] h-[138.62%] w-full",
    overlayClassName: "bg-black/30",
  },
  {
    number: "03.",
    title: "문지르지 마세요",
    description: "향수를 뿌린 후 손목에 비비는 것은 본래의 향을 변화시킬 수 있습니다. 가볍게 자연 건조시키는 것이 좋습니다.",
    image: tipImageThree,
    imageClassName: "inset-0 size-full object-cover",
    overlayClassName: "bg-black/40",
  },
  {
    number: "04.",
    title: "머리카락과 옷에도 뿌려보세요",
    description: "머리카락이나 옷은 피부보다 향이 오래 남습니다. 다만 변색이나 손상을 방지하기 위해 거리를 두고 가볍게 분사하는 것을 추천합니다.",
    image: tipImageFour,
    imageClassName: "inset-0 size-full object-cover object-bottom",
  },
  {
    number: "05.",
    title: "향수 보관 방법도 중요해요",
    description: "직사광선이나 높은 온도는 향의 변질을 빠르게 만듭니다. 향수는 서늘하고 빛이 닿지 않는 곳에 보관하는 것이 가장 좋습니다.",
    image: tipImageFive,
    imageClassName: "inset-0 size-full object-cover",
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

function SmoothScroller({ children }: { children: ReactNode }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({ isDragging: false, startX: 0, scrollLeft: 0, startIndex: 0 });
  const cardStride = 272;

  const getIndexFromScroll = (scroller: HTMLDivElement) => {
    return Math.min(tips.length - 1, Math.max(0, Math.round(scroller.scrollLeft / cardStride)));
  };

  const scrollToIndex = (index: number) => {
    scrollerRef.current?.scrollTo({
      left: index * cardStride,
      behavior: "smooth",
    });
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    const scroller = scrollerRef.current;
    if (event.pointerType !== "mouse" || event.button !== 0 || !scroller) return;

    event.preventDefault();
    dragState.current = {
      isDragging: true,
      startX: event.clientX,
      scrollLeft: scroller.scrollLeft,
      startIndex: getIndexFromScroll(scroller),
    };
    scroller.setPointerCapture(event.pointerId);
    scroller.classList.add("is-dragging");
  };

  const stopDragging = (event: PointerEvent<HTMLDivElement>) => {
    const scroller = scrollerRef.current;
    if (!dragState.current.isDragging || !scroller) return;

    dragState.current.isDragging = false;
    scroller.classList.remove("is-dragging");
    if (scroller.hasPointerCapture(event.pointerId)) {
      scroller.releasePointerCapture(event.pointerId);
    }

    const dragDistance = event.clientX - dragState.current.startX;
    let nextIndex = getIndexFromScroll(scroller);
    if (Math.abs(dragDistance) >= 18) {
      nextIndex = dragState.current.startIndex + (dragDistance < 0 ? 1 : -1);
      nextIndex = Math.min(tips.length - 1, Math.max(0, nextIndex));
    }
    scrollToIndex(nextIndex);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const scroller = scrollerRef.current;
    if (!dragState.current.isDragging || !scroller) return;
    if (event.buttons !== 1) return stopDragging(event);

    event.preventDefault();
    scroller.scrollLeft = dragState.current.scrollLeft - (event.clientX - dragState.current.startX) * 1.2;
  };

  return (
    <div
      className="horizontal-scroller scrollbar-hidden w-[390px] snap-x snap-proximity overflow-x-auto overscroll-x-contain touch-pan-x"
      onDragStart={(event) => event.preventDefault()}
      onLostPointerCapture={() => {
        dragState.current.isDragging = false;
        scrollerRef.current?.classList.remove("is-dragging");
      }}
      onPointerCancel={stopDragging}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={stopDragging}
      ref={scrollerRef}
    >
      {children}
    </div>
  );
}

function TipCard({ tip }: { tip: (typeof tips)[number] }) {
  return (
    <article className="relative flex h-[336px] w-[262px] shrink-0 snap-start flex-col items-start justify-end gap-4 overflow-hidden rounded-card border-[0.5px] border-[#BEBEBE] px-[22px] py-6 text-off-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-card">
        <div className="absolute inset-0 overflow-hidden rounded-card">
          <img alt="" className={`absolute max-w-none ${tip.imageClassName}`} src={tip.image} />
        </div>
        {tip.overlayClassName && <div className={`absolute inset-0 rounded-card ${tip.overlayClassName}`} />}
      </div>

      <p className="relative text-xl font-bold leading-[normal] tracking-[-0.02em]">
        {tip.accentNumber ? (
          <>
            <span>0</span>
            <span className="text-point-orange">{tip.number.slice(1)}</span>
          </>
        ) : tip.number}
      </p>
      <div className="relative flex w-full flex-col items-start gap-[7px] [word-break:break-word]">
        <h2 className="whitespace-nowrap text-base font-semibold leading-[normal] tracking-[-0.02em]">{tip.title}</h2>
        <p className="w-[218px] text-xs font-medium leading-[1.5] tracking-[-0.05em]">{tip.description}</p>
      </div>
    </article>
  );
}

export default function Magazine2() {
  return (
    <main className="min-h-dvh overflow-x-hidden bg-off-white text-off-black">
      <div className="mx-auto min-h-dvh w-full max-w-[430px] bg-off-white">
        <MagazineDetailHeader />

        <div className="flex flex-col items-start gap-[30px] px-[22px] pt-[119px] pb-[112px]">
          <section className="flex w-full flex-col items-start gap-[7px]">
            <span className="rounded-chip bg-off-black px-3.5 py-[5px] text-xs leading-[normal] tracking-[-0.02em] text-off-white">
              향수상식
            </span>
            <h2 className="text-2xl font-semibold leading-[1.08] tracking-[-0.03em]">향수 지속력을 높이는 꿀팁</h2>
          </section>

          <div className="flex flex-col items-start gap-16">
            <section className="flex w-[388px] flex-col items-center gap-4">
              <img alt="손에 든 향수 보틀" className="aspect-[1200/675] w-full object-cover" src={longevityHero} />
              <div className="flex w-96 flex-col items-start gap-1 [word-break:break-word]">
                <h2 className="w-full text-xl font-bold leading-[normal] tracking-[-0.02em]">오래 기억되는 향을 위한 작은 습관</h2>
                <p className="w-full text-base font-medium leading-6 tracking-[-0.05em]">
                  향수는 뿌리는 방법에 따라 지속 시간이 크게 달라질 수 있습니다. 같은 향수라도 올바르게 사용하면 더욱 오래,<br />
                  깊게 향을 즐길 수 있습니다.
                </p>
              </div>
            </section>

            <SmoothScroller>
              <div className="flex w-max gap-2.5">
                {tips.map((tip) => (
                  <TipCard key={tip.number} tip={tip} />
                ))}
              </div>
            </SmoothScroller>
          </div>
        </div>

        <BottomNavigation />
      </div>
    </main>
  );
}
