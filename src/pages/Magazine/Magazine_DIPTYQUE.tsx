import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import type { PointerEvent, UIEvent } from "react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import headerBell from "../../assets/community/figma/header-bell.svg";
import diptyqueHeroImage from "../../assets/magazine/diptyque/hero.png";
import memoryLeftImage from "../../assets/magazine/diptyque/memory-left.png";
import memoryRightImage from "../../assets/magazine/diptyque/memory-right.png";
import signatureImage from "../../assets/magazine/diptyque/signature.png";
import storyLeftImage from "../../assets/magazine/diptyque/story-left.png";
import storyRightImage from "../../assets/magazine/diptyque/story-right.png";
import moreCardArrow from "../../assets/magazine/detail/more-card-arrow.svg";
import moreCardDiptyqueImage from "../../assets/magazine/detail/more-card-diptyque.jpg";
import moreCardSeasonalImage from "../../assets/magazine/detail/more-card.png";
import { BottomNavigation } from "../../components/common/BottomNavigation";
import { PerfumeIcon } from "../../components/icons/PerfumeIcon";

const moreArticles = [
  {
    date: "2026.07.13",
    description: "봄, 여름, 가을 , 겨울\n어떤 향이 어울릴까?",
    href: "/magazine/seasonal-guide",
    image: moreCardSeasonalImage,
    imageClassName: "inset-0 size-full object-cover",
    title: "계절별 향수 선택 가이드",
  },
  {
    date: "2026.05.10",
    description: "예술과 여행이\n향으로 만나다",
    href: "/magazine/diptyque",
    image: moreCardDiptyqueImage,
    imageClassName: "top-[-18.76%] left-[0.05%] h-[161.73%] w-full max-w-none",
    title: "DIPTYQUE",
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

function HeroSection() {
  return (
    <section className="flex w-full flex-col gap-2.5">
      <div className="h-[536px] w-full overflow-hidden bg-off-white">
        <img alt="컬러풀한 잎 위에 놓인 딥티크 향수 컬렉션" className="pointer-events-none size-full" src={diptyqueHeroImage} />
      </div>
      <div className="flex w-full items-center px-side">
        <div className="flex flex-1 flex-col items-start gap-[7px]">
          <span className="rounded-chip bg-off-black px-3.5 py-[5px] text-xs leading-[normal] tracking-[-0.02em] text-off-white">
            브랜드 스토리
          </span>
          <h2 className="font-cormorant text-2xl font-semibold leading-[1.08] tracking-[-0.03em]">DIPTYQUE</h2>
        </div>
      </div>
    </section>
  );
}

function ArticleBody() {
  return (
    <article className="flex w-full flex-col items-start gap-[50px]">
      <section className="flex w-full flex-col items-start gap-1 px-side text-black [word-break:break-word]">
        <h2 className="w-full text-xl font-bold leading-[normal] tracking-[-0.02em]">예술과 여행이 향으로 만나다</h2>
        <p className="w-full text-base font-medium leading-6 tracking-[-0.02em]">
          1961년 프랑스 파리에서 세 명의 예술가가 설립한 딥티크는 브랜드의 시작부터 일반적인 향수 브랜드와는 달랐습니다.
        </p>
      </section>

      <div className="flex h-[356px] w-full items-end justify-end pr-side">
        <div className="mr-[-17px] flex h-[356px] w-[223px] shrink-0 items-start">
          <img alt="청록색 화병에 꽂힌 꽃" className="h-[299px] w-[223px]" src={storyLeftImage} />
        </div>
        <img alt="물가에 놓인 딥티크 캔들" className="h-[153px] w-[204px] shrink-0" src={storyRightImage} />
      </div>

      <p className="w-full px-side text-base font-medium leading-6 tracking-[-0.02em] text-black [word-break:break-word]">
        패브릭과 인테리어 소품을 제작하던 세 창립자는 여행 중 만난 풍경과 기억, 예술적 영감을 향으로 표현하기 시작했고, 이는 오늘날 딥티크만의 감성적인 세계관으로 이어졌습니다.
      </p>

      <div className="flex h-[319px] w-full items-start gap-[13px] px-side">
        <img alt="분홍빛 배경에 놓인 딥티크 향수" className="h-[195px] w-[145px] shrink-0" src={memoryLeftImage} />
        <div className="h-[319px] w-[254px] shrink-0 overflow-hidden bg-[#c4c4c4]">
          <img alt="꽃 사이로 보이는 딥티크 향수" className="h-[319px] w-[252px] max-w-none" src={memoryRightImage} />
        </div>
      </div>

      <p className="w-full px-side text-base font-medium leading-6 tracking-[-0.02em] text-black [word-break:break-word]">
        딥티크의 향수는 하나의 장소와 순간을 떠올리게 하는 것이 특징입니다. 대표 향수인 도 손은 베트남 해안의 기억을, 오르페옹은 1960년대 파리 재즈바의 분위기를, 플레르 드 뽀는 따뜻한 피부의 온기를 담아내고 있습니다.
      </p>

      <div className="flex h-[252px] w-full items-center justify-center px-side">
        <img alt="딥티크 매장 전경" className="h-[252px] w-[329px]" src={signatureImage} />
      </div>
    </article>
  );
}

function MoreSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({ isDragging: false, startX: 0, scrollLeft: 0, startIndex: 0 });

  const getIndexFromScroll = (scroller: HTMLDivElement) => {
    const maxScrollLeft = scroller.scrollWidth - scroller.clientWidth;
    if (maxScrollLeft <= 0) return 0;

    return Math.round((scroller.scrollLeft / maxScrollLeft) * (moreArticles.length - 1));
  };

  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    setActiveIndex(getIndexFromScroll(event.currentTarget));
  };

  const scrollToIndex = (index: number) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const safeIndex = Math.min(moreArticles.length - 1, Math.max(0, index));
    const maxScrollLeft = scroller.scrollWidth - scroller.clientWidth;
    scroller.scrollTo({
      left: (maxScrollLeft * safeIndex) / (moreArticles.length - 1),
      behavior: "smooth",
    });
    setActiveIndex(safeIndex);
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    const scroller = scrollerRef.current;
    if (event.pointerType !== "mouse" || event.button !== 0 || !scroller) return;
    if (event.target instanceof Element && event.target.closest("a, button")) return;

    dragState.current = {
      isDragging: true,
      startX: event.clientX,
      scrollLeft: scroller.scrollLeft,
      startIndex: getIndexFromScroll(scroller),
    };
    event.preventDefault();
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
    <section className="flex w-full flex-col items-center gap-[30px]">
      <div className="flex h-[26px] w-[390px] items-start justify-between overflow-hidden">
        <h2 className="text-2xl font-semibold leading-[1.08] tracking-[-0.03em]">더 둘러보기</h2>
        <Link className="flex items-center gap-1.5 text-sm font-medium leading-[normal] tracking-[-0.02em] text-grey" to="/magazine">
          전체보기
          <ChevronRight aria-hidden="true" size={18} strokeWidth={1.5} />
        </Link>
      </div>

      <div
        className="horizontal-scroller scrollbar-hidden w-[calc(100%_-_32px)] max-w-[398px] snap-x snap-proximity overflow-x-auto overscroll-x-contain touch-pan-x"
        onDragStart={(event) => event.preventDefault()}
        onLostPointerCapture={() => {
          dragState.current.isDragging = false;
          scrollerRef.current?.classList.remove("is-dragging");
        }}
        onPointerCancel={stopDragging}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={stopDragging}
        onScroll={handleScroll}
        ref={scrollerRef}
      >
        <div className="flex w-max gap-3">
          {moreArticles.map((article) => (
            <article className="relative h-[289px] w-[262px] shrink-0 snap-start" key={article.title}>
              <div className="absolute inset-x-0 top-0 h-72 overflow-hidden rounded-card border-[0.8px] border-light-grey">
                <img alt={`${article.title} 이미지`} className={`absolute ${article.imageClassName}`} src={article.image} />
              </div>
              <div className="absolute inset-x-0 top-px h-72 overflow-hidden rounded-card bg-gradient-to-b from-transparent to-black/80 text-off-white">
                <p className="absolute top-8 left-3.5 font-cormorant text-xs font-medium leading-[normal] tracking-[-0.02em]">
                  Scent Match
                </p>
                <div className="absolute top-44 left-[22px] flex flex-col gap-[7px]">
                  <h3 className="w-[167px] truncate text-base font-semibold leading-[normal] tracking-[-0.02em]">{article.title}</h3>
                  <p className="h-[30px] w-[127px] whitespace-pre-line text-xs font-medium leading-[normal] tracking-[-0.02em]">
                    {article.description}
                  </p>
                </div>
                <p className="absolute top-[254px] left-[23px] h-3.5 w-[60px] text-xs leading-[normal] tracking-[-0.02em]">
                  {article.date}
                </p>
                {article.href ? (
                  <Link
                    aria-label={`${article.title} 읽기`}
                    className="absolute top-[239px] left-[216px] z-10 flex size-11 items-center justify-center"
                    onPointerDown={(event) => event.stopPropagation()}
                    to={article.href}
                  >
                    <img alt="" aria-hidden="true" className="size-6" src={moreCardArrow} />
                  </Link>
                ) : (
                  <img alt="" aria-hidden="true" className="absolute top-[249px] left-[226px] size-6" src={moreCardArrow} />
                )}
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="relative h-0.5 w-[120px] bg-grey">
        <div
          className="absolute top-0 left-0 h-0.5 w-10 bg-off-black transition-transform duration-200"
          style={{ transform: `translateX(${(activeIndex / (moreArticles.length - 1)) * 80}px)` }}
        />
        <div className="absolute -top-2 left-0 grid h-4 w-full" style={{ gridTemplateColumns: `repeat(${moreArticles.length}, 1fr)` }}>
          {moreArticles.map((article, index) => (
            <button
              aria-label={`${article.title} 보기`}
              aria-pressed={activeIndex === index}
              className="cursor-pointer"
              key={article.title}
              onClick={() => scrollToIndex(index)}
              type="button"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function MagazineDiptyque() {
  return (
    <main className="min-h-dvh overflow-x-hidden bg-off-white text-off-black">
      <div className="mx-auto min-h-dvh w-full max-w-[430px] bg-off-white">
        <MagazineDetailHeader />
        <div className="flex flex-col gap-16 pt-[119px] pb-[140px]">
          <HeroSection />
          <ArticleBody />
          <MoreSection />
        </div>
        <BottomNavigation />
      </div>
    </main>
  );
}
