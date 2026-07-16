import { ChevronLeft, Heart, Search } from "lucide-react";
import type { PointerEvent, ReactNode } from "react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import headerBell from "../../assets/community/figma/header-bell.svg";
import byredoImage from "../../assets/magazine/fragrance-collection/byredo.png";
import diorImage from "../../assets/magazine/fragrance-collection/dior.png";
import fragranceHeroImage from "../../assets/magazine/fragrance-collection/hero.png";
import maisonMargielaImage from "../../assets/magazine/fragrance-collection/maison-margiela.png";
import milkyGourmandImage from "../../assets/magazine/fragrance-collection/milky-gourmand.png";
import { BottomNavigation } from "../../components/common/BottomNavigation";
import { PerfumeIcon } from "../../components/icons/PerfumeIcon";

const fragranceCollections = [
  {
    brand: "Dior",
    description:
      "프랑스 리비에라의 휴양지의 분위기를 담았습니다. 만다린의 상큼함과 아몬드, 통카빈의 부드러운 달콤함이 어우러져 여름 휴가를 떠올리게 하는 향으로 주목받고 있습니다.",
    image: diorImage,
    name: "Paradise",
  },
  {
    brand: "Maison Margiela",
    description:
      "노을이 지는 해변의 순간을 표현한 향수로, 망고와 플로럴 노트, 샌달우드가 조화를 이룹니다. 과일의 생동감과 따뜻한 여름 저녁의 분위기를 동시에 느낄 수 있는 것이 특징입니다.",
    image: maisonMargielaImage,
    name: "Replica Chasing Sunsets",
  },
  {
    brand: "Byredo",
    description:
      "코코넛과 앰버를 중심으로 한 부드럽고 따뜻한 향으로, 올해 주목받고 있는 스킨센트 트렌드를 반영한 컬렉션입니다. 피부에 자연스럽게 스며드는 듯한 은은한 분위기가 특징입니다.",
    image: byredoImage,
    name: "Alto Astral",
  },
  {
    brand: "Trend",
    description:
      "2026년에는 바닐라, 라이스, 밀크 노트를 활용한 밀키 구르망 향수가 큰 인기를 얻고 있습니다. 달콤하면서도 포근한 분위기를 연출해 사계절 데일리 향수로 주목받고 있습니다.",
    image: milkyGourmandImage,
    name: "Milky Gourmand",
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

function CollectionScroller({ children }: { children: ReactNode }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({ isDragging: false, startX: 0, scrollLeft: 0, startIndex: 0 });
  const dragFrameRef = useRef<number | null>(null);
  const pendingScrollLeftRef = useRef(0);
  const cardStride = 272;

  const getIndexFromScroll = (scroller: HTMLDivElement) => {
    return Math.min(fragranceCollections.length - 1, Math.max(0, Math.round(scroller.scrollLeft / cardStride)));
  };

  const scrollToIndex = (index: number) => {
    const safeIndex = Math.min(fragranceCollections.length - 1, Math.max(0, index));

    scrollerRef.current?.scrollTo({
      behavior: "smooth",
      left: safeIndex * cardStride,
    });
    setActiveIndex(safeIndex);
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
      isDragging: true,
      scrollLeft: scroller.scrollLeft,
      startIndex: getIndexFromScroll(scroller),
      startX: event.clientX,
    };
    scroller.setPointerCapture(event.pointerId);
    scroller.classList.add("is-dragging");
  };

  const stopDragging = (event: PointerEvent<HTMLDivElement>) => {
    const scroller = scrollerRef.current;
    if (!dragState.current.isDragging || !scroller) return;

    if (dragFrameRef.current !== null) {
      cancelAnimationFrame(dragFrameRef.current);
      dragFrameRef.current = null;
      scroller.scrollLeft = pendingScrollLeftRef.current;
    }
    dragState.current.isDragging = false;
    scroller.classList.remove("is-dragging");
    if (scroller.hasPointerCapture(event.pointerId)) {
      scroller.releasePointerCapture(event.pointerId);
    }

    const dragDistance = event.clientX - dragState.current.startX;
    let nextIndex = getIndexFromScroll(scroller);
    if (Math.abs(dragDistance) >= 18) {
      nextIndex = dragState.current.startIndex + (dragDistance < 0 ? 1 : -1);
      nextIndex = Math.min(fragranceCollections.length - 1, Math.max(0, nextIndex));
    }
    scrollToIndex(nextIndex);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const scroller = scrollerRef.current;
    if (!dragState.current.isDragging || !scroller) return;
    if (event.buttons !== 1) return stopDragging(event);

    event.preventDefault();
    pendingScrollLeftRef.current = dragState.current.scrollLeft - (event.clientX - dragState.current.startX);

    if (dragFrameRef.current === null) {
      dragFrameRef.current = requestAnimationFrame(() => {
        if (scrollerRef.current) {
          scrollerRef.current.scrollLeft = pendingScrollLeftRef.current;
        }
        dragFrameRef.current = null;
      });
    }
  };

  const indicatorPosition =
    fragranceCollections.length > 1 ? activeIndex / (fragranceCollections.length - 1) : 0;

  return (
    <div className="flex w-[390px] flex-col items-center gap-[30px]">
      <div
        className="horizontal-scroller scrollbar-hidden w-full snap-x snap-proximity overflow-x-auto overscroll-x-contain touch-pan-x select-none"
        onDragStart={(event) => event.preventDefault()}
        onLostPointerCapture={() => {
          if (dragFrameRef.current !== null) {
            cancelAnimationFrame(dragFrameRef.current);
            dragFrameRef.current = null;
          }
          dragState.current.isDragging = false;
          scrollerRef.current?.classList.remove("is-dragging");
        }}
        onPointerCancel={stopDragging}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={stopDragging}
        onScroll={(event) => setActiveIndex(getIndexFromScroll(event.currentTarget))}
        ref={scrollerRef}
      >
        {children}
      </div>

      <div className="relative h-0.5 w-[120px] bg-grey">
        <div
          className="absolute top-0 left-0 h-0.5 w-10 bg-off-black transition-transform duration-200 ease-out"
          style={{ transform: `translateX(${indicatorPosition * 80}px)` }}
        />
        <div
          className="absolute -top-[9px] left-0 grid h-5 w-full"
          style={{ gridTemplateColumns: `repeat(${fragranceCollections.length}, 1fr)` }}
        >
          {fragranceCollections.map((collection, index) => (
            <button
              aria-label={`${collection.name} 카드로 이동`}
              aria-pressed={activeIndex === index}
              className="cursor-pointer"
              key={collection.name}
              onClick={() => scrollToIndex(index)}
              type="button"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function FragranceCard({ collection }: { collection: (typeof fragranceCollections)[number] }) {
  return (
    <article className="relative flex h-[336px] w-[262px] shrink-0 snap-start flex-col items-start justify-end gap-4 overflow-hidden rounded-card border-[0.5px] border-[#BEBEBE] px-[22px] py-6 text-off-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-card">
        <img alt="" className="absolute inset-0 size-full object-cover" src={collection.image} />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <p className="relative whitespace-nowrap text-xl font-bold leading-[normal] tracking-[-0.02em]">{collection.brand}</p>
      <div className="relative flex w-full flex-col items-start gap-[7px] [word-break:break-word]">
        <h2 className="whitespace-nowrap text-base font-semibold leading-[normal] tracking-[-0.02em]">{collection.name}</h2>
        <p className="w-[218px] text-xs font-medium leading-[1.5] tracking-[-0.05em]">{collection.description}</p>
      </div>
    </article>
  );
}

export default function MagazineFragranceCollection() {
  const [isSaved, setIsSaved] = useState(true);

  return (
    <main className="min-h-dvh overflow-x-hidden bg-off-white text-off-black">
      <div className="mx-auto min-h-dvh w-full max-w-[430px] bg-off-white">
        <MagazineDetailHeader />

        <div className="flex flex-col items-start gap-[30px] px-[22px] pt-[119px] pb-[160px]">
          <section className="flex w-full flex-col items-start gap-[7px]">
            <div className="flex w-full items-start justify-between">
              <span className="rounded-chip bg-off-black px-3.5 py-[5px] text-xs leading-[normal] tracking-[-0.02em] text-off-white">
                향수 트렌드
              </span>
              <button
                aria-label={isSaved ? "New Fragrance Collection 2026 저장 취소" : "New Fragrance Collection 2026 저장"}
                aria-pressed={isSaved}
                className="flex size-6 items-center justify-center"
                onClick={() => setIsSaved((saved) => !saved)}
                type="button"
              >
                <Heart
                  aria-hidden="true"
                  className={isSaved ? "fill-point-orange text-point-orange" : "text-grey"}
                  size={24}
                  strokeWidth={1.5}
                />
              </button>
            </div>
            <h2 className="whitespace-nowrap text-2xl font-semibold leading-[1.08] tracking-[-0.03em]">
              New Fragrance Collection 2026
            </h2>
          </section>

          <div className="flex flex-col items-start gap-16">
            <section className="flex w-[388px] flex-col items-center gap-4">
              <div className="relative aspect-[1200/675] w-full overflow-hidden">
                <img
                  alt="따뜻한 무드의 패브릭과 오브제 사이에 놓인 다양한 향수"
                  className="pointer-events-none absolute top-[-118.48%] left-[0.02%] h-[237.31%] w-full max-w-none"
                  src={fragranceHeroImage}
                />
              </div>
              <div className="flex w-96 flex-col items-start gap-1 [word-break:break-word]">
                <h2 className="w-full text-xl font-bold leading-[normal] tracking-[-0.02em]">올해 가장 주목해야 할 새로운 향수들</h2>
                <p className="w-full text-base font-medium leading-6 tracking-[-0.05em]">
                  2026년 향수 시장은 여행의 감성을 담은 향, 부드러운 스킨센트, 그리고 달콤한 밀키 구르망 계열이 새로운 트렌드로 떠오르고 있습니다. 개성을 중시하는 소비 트렌드와 함께, 향수 역시 단순한 향기가 아닌 하나의 라이프스타일로 확장되고 있습니다.
                </p>
              </div>
            </section>

            <CollectionScroller>
              <div className="flex w-max gap-2.5">
                {fragranceCollections.map((collection) => (
                  <FragranceCard collection={collection} key={collection.name} />
                ))}
              </div>
            </CollectionScroller>
          </div>
        </div>

        <BottomNavigation />
      </div>
    </main>
  );
}
