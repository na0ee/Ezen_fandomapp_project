import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import type { PointerEvent, UIEvent } from "react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import headerBell from "../../assets/community/figma/header-bell.svg";
import contentGrowthImage from "../../assets/magazine/detail/content-growth.jpg";
import heroImage from "../../assets/magazine/detail/hero.jpg";
import introLeftImage from "../../assets/magazine/detail/intro-left.jpg";
import introRightImage from "../../assets/magazine/detail/intro-right.jpg";
import layeringLeftImage from "../../assets/magazine/detail/layering-left.jpg";
import layeringRightImage from "../../assets/magazine/detail/layering-right.jpg";
import moreCardDiptyqueImage from "../../assets/magazine/detail/more-card-diptyque.jpg";
import moreCardImage from "../../assets/magazine/detail/more-card.png";
import moreCardArrow from "../../assets/magazine/detail/more-card-arrow.svg";
import recommendationLeftImage from "../../assets/magazine/detail/recommendation-left.jpg";
import recommendationRightImage from "../../assets/magazine/detail/recommendation-right.jpg";
import { BottomNavigation } from "../../components/common/BottomNavigation";
import { PerfumeIcon } from "../../components/icons/PerfumeIcon";

const moreArticles = [
  {
    date: "2026.07.13",
    description: "봄, 여름, 가을 , 겨울\n어떤 향이 어울릴까?",
    href: "/magazine/seasonal-guide",
    image: moreCardImage,
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

type ArticleTextProps = {
  body: string;
  bodyClassName?: string;
  title: string;
};

function ArticleText({ body, bodyClassName = "w-full", title }: ArticleTextProps) {
  return (
    <section className="flex w-full flex-col items-start gap-1 px-side text-black [word-break:break-word]">
      <h2 className="w-full text-xl font-bold leading-[normal] tracking-[-0.02em]">{title}</h2>
      <p className={`${bodyClassName} text-base font-medium leading-6 tracking-[-0.02em]`}>{body}</p>
    </section>
  );
}

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
          alt="꽃과 향수로 얼굴을 표현한 니치 향수 화보"
          className="pointer-events-none absolute top-[-57px] left-0 h-[752.5px] w-full object-cover"
          src={heroImage}
        />
      </div>
      <div className="flex w-full items-center px-side">
        <div className="flex flex-1 flex-col items-start gap-[7px]">
          <span className="rounded-chip bg-off-black px-3.5 py-[5px] text-xs leading-[normal] tracking-[-0.02em] text-off-white">
            향수 트렌드
          </span>
          <h2 className="text-2xl font-semibold leading-[1.08] tracking-[-0.03em]">니치향수 트렌드</h2>
        </div>
      </div>
    </section>
  );
}

function ArticleBody() {
  return (
    <div className="flex w-full flex-col items-start gap-[50px]">
      <ArticleText
        body="최근 향수 시장은 대중적인 향수에서 벗어나 자신만의 취향과 개성을 표현할 수 있는 니치 향수 중심으로 빠르게 변화하고 있습니다. 특히 MZ세대를 중심으로 향수를 단순한 향기가 아닌 자신을 표현하는 하나의 아이덴티티로 인식하는 경향이 강해지고 있습니다."
        bodyClassName="w-[369px]"
        title={'"향으로 나를 표현하는 시대"'}
      />

      <div className="flex h-[242px] w-full items-end justify-end gap-2.5 px-side">
        <img alt="꽃 한 송이와 향수" className="h-[154px] w-[124px] shrink-0 object-cover" src={introLeftImage} />
        <div className="h-[242px] w-[222px] shrink-0 overflow-hidden">
          <img
            alt="꽃으로 연출한 니치 향수 화보"
            className="relative top-[-7.44%] left-[-0.09%] h-[114.88%] w-[100.18%] max-w-none"
            src={introRightImage}
          />
        </div>
      </div>

      <ArticleText
        body="과거에는 브랜드 인지도와 대중적인 향이 중요했다면, 최근에는 남들과 다른 향을 찾는 소비자가 증가하고 있습니다. 개성 있는 원료와 독창적인 스토리를 가진 니치 브랜드가 꾸준히 주목받는 이유입니다."
        title="나만의 향을 찾는 소비 증가"
      />

      <div className="flex h-[319px] w-full items-end justify-center px-side">
        <img
          alt="향수와 꽃을 조합한 레이어링 화보"
          className="mr-[-61px] h-[319px] w-[255px] shrink-0 object-cover"
          src={layeringLeftImage}
        />
        <div className="relative h-[138px] w-[166px] shrink-0 overflow-hidden">
          <img
            alt="다양한 향수 보틀"
            className="absolute top-[-50.43%] left-[-0.51%] h-[150.43%] w-[100.29%] max-w-none"
            src={layeringRightImage}
          />
        </div>
      </div>

      <ArticleText
        body="하나의 향수만 사용하는 것이 아니라 여러 향수를 조합하여 자신만의 향을 만드는 레이어링이 새로운 트렌드로 자리 잡고 있습니다. 향수를 직접 조합하며 취향을 탐색하는 경험 자체가 하나의 즐거움으로 인식되고 있습니다."
        title="레이어링 문화 확산"
      />

      <div className="flex h-[336px] w-full items-center justify-center px-side">
        <img alt="푸른 배경의 니치 향수" className="h-[336px] w-[269px] object-cover" src={contentGrowthImage} />
      </div>

      <ArticleText
        body="유튜브, SNS, 커뮤니티를 통해 향수 정보를 탐색하는 사용자가 증가하면서 향수 구매 방식 또한 변화하고 있습니다. 실제 리뷰와 사용자 경험을 기반으로 향수를 선택하는 경향이 강해지고 있습니다."
        title="온라인 향수 콘텐츠 소비 증가"
      />

      <div className="flex h-[250px] w-full items-center gap-2.5 px-side">
        <img
          alt="꽃과 향수로 연출한 추천 화보"
          className="h-[250px] w-[200px] shrink-0 object-cover"
          src={recommendationLeftImage}
        />
        <img
          alt="꽃으로 얼굴을 장식한 향수 화보"
          className="h-[249px] w-[200px] shrink-0 object-cover"
          src={recommendationRightImage}
        />
      </div>

      <ArticleText
        body="수천 개의 향수 중 자신에게 맞는 향을 찾기 어려워지면서 AI 추천, 향수 진단, 사용자 리뷰 등 개인화된 추천 서비스에 대한 수요가 지속적으로 증가하고 있습니다."
        title="취향 기반 추천 서비스의 성장"
      />
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
      nextIndex = Math.min(moreArticles.length - 1, Math.max(0, nextIndex));
    }

    scrollToIndex(nextIndex);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const scroller = scrollerRef.current;
    if (!dragState.current.isDragging || !scroller) return;
    if (event.buttons !== 1) return stopDragging(event);

    event.preventDefault();
    const dragDistance = event.clientX - dragState.current.startX;
    scroller.scrollLeft = dragState.current.scrollLeft - dragDistance * 1.2;
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
                <img
                  alt={`${article.title} 이미지`}
                  className={`absolute ${article.imageClassName}`}
                  src={article.image}
                />
              </div>
              <div className="absolute inset-x-0 top-px h-72 overflow-hidden rounded-card bg-gradient-to-b from-transparent to-black/80 text-off-white">
                <p className="absolute top-8 left-3.5 font-cormorant text-xs font-medium leading-[normal] tracking-[-0.02em]">
                  Scent Match
                </p>
                <div className="absolute top-44 left-[22px] flex flex-col gap-[7px]">
                  <h3 className="w-[167px] truncate text-base font-semibold leading-[normal] tracking-[-0.02em]">
                    {article.title}
                  </h3>
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
        <div
          className="absolute -top-2 left-0 grid h-4 w-full"
          style={{ gridTemplateColumns: `repeat(${moreArticles.length}, 1fr)` }}
        >
          {moreArticles.map((_, index) => (
            <button
              aria-label={`${index + 1}번 글로 이동`}
              aria-pressed={activeIndex === index}
              className="cursor-pointer"
              key={index}
              onClick={() => scrollToIndex(index)}
              type="button"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function MagazineNichTrend() {
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
