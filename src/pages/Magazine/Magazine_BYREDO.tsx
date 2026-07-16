import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import type { PointerEvent, UIEvent } from "react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import headerBell from "../../assets/community/figma/header-bell.svg";
import byredoHeroImage from "../../assets/magazine/byredo/hero.png";
import mojaveGhostImage from "../../assets/magazine/byredo/mojave-ghost.jpg";
import signatureImages from "../../assets/magazine/byredo/signatures.jpg";
import storyMotionImage from "../../assets/magazine/byredo/story-motion.jpg";
import storyObjectImage from "../../assets/magazine/byredo/story-object.jpg";
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
      <div className="relative h-[536px] w-full overflow-hidden bg-off-white">
        <img
          alt="과일과 바이레도 향수를 배치한 브랜드 화보"
          className="pointer-events-none absolute top-[-57px] left-0 h-[752.5px] w-full object-cover"
          src={byredoHeroImage}
        />
      </div>
      <div className="flex w-full items-center px-side">
        <div className="flex flex-1 flex-col items-start gap-[7px]">
          <span className="rounded-chip bg-off-black px-3.5 py-[5px] text-xs leading-[normal] tracking-[-0.02em] text-off-white">
            브랜드 스토리
          </span>
          <h2 className="font-cormorant text-2xl font-semibold leading-[1.08] tracking-[-0.03em]">BYREDO</h2>
        </div>
      </div>
    </section>
  );
}

function ArticleBody() {
  return (
    <div className="flex w-full flex-col items-start gap-[50px]">
      <section className="flex w-full flex-col items-start gap-1 px-side text-black [word-break:break-word]">
        <h2 className="w-full text-xl font-bold leading-[normal] tracking-[-0.02em]">기억과 감정을 향으로 담아내는 브랜드</h2>
        <p className="w-[369px] text-base font-medium leading-6 tracking-[-0.02em]">
          2006년 스웨덴 스톡홀름에서 설립된 바이레도는 단순히 좋은 향을 만드는 것을 넘어, 기억과 감정, 특정 순간의 분위기를 향으로 표현하는 것을 목표로 시작되었습니다.
        </p>
      </section>

      <div className="flex h-[448px] w-full items-start justify-end px-side">
        <div className="mr-[-56px] flex h-[448px] w-[242px] shrink-0 items-end">
          <img alt="흐릿한 바이레도 향수 보틀 화보" className="h-[187px] w-[242px] object-cover" src={storyObjectImage} />
        </div>
        <img alt="거울 위에 놓인 바이레도 향수" className="h-[225px] w-[206px] shrink-0 object-cover" src={storyMotionImage} />
      </div>

      <p className="w-full px-side text-base font-medium leading-6 tracking-[-0.02em] text-black [word-break:break-word]">
        창립자 벤 고햄(Ben Gorham)은 어린 시절의 경험과 여행에서 얻은 영감을 바탕으로 향수를 하나의 예술 작품처럼 풀어냈으며, 미니멀한 디자인과 독창적인 스토리텔링으로 니치 향수 시장을 대표하는 브랜드로 성장했습니다.
      </p>

      <div className="flex h-[393px] w-full items-center justify-center px-side">
        <img alt="바이레도 대표 향수 컬렉션" className="h-[393px] w-[310px] object-cover" src={signatureImages} />
      </div>

      <p className="w-full px-side text-base font-medium leading-6 tracking-[-0.02em] text-black [word-break:break-word]">
        대표 향수인 블랑쉬는 깨끗한 리넨의 감성을, 모하비 고스트는 사막에서 피어나는 꽃의 생명력을, 집시 워터는 자유로운 보헤미안 라이프스타일을 담아내며 많은 사랑을 받고 있습니다.
      </p>

      <div className="flex h-[318px] w-full items-center justify-center px-side">
        <img alt="초록 사과와 모하비 고스트 향수" className="h-[318px] w-[269px] object-cover" src={mojaveGhostImage} />
      </div>

      <MoreSection />
    </div>
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

export default function MagazineByredo() {
  return (
    <main className="min-h-dvh overflow-x-hidden bg-off-white text-off-black">
      <div className="mx-auto min-h-dvh w-full max-w-[430px] bg-off-white">
        <MagazineDetailHeader />
        <div className="flex flex-col gap-16 pt-[119px] pb-[140px]">
          <HeroSection />
          <ArticleBody />
        </div>
        <BottomNavigation />
      </div>
    </main>
  );
}
