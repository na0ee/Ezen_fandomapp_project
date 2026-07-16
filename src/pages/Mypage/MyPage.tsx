import {
  ChevronRight,
  CircleHelp,
  Search,
  Star,
  UserRoundCog,
} from "lucide-react";
import type { PointerEvent, ReactNode } from "react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { BottomNavigation } from "../../components/common/BottomNavigation";
import { PerfumeIcon } from "../../components/icons/PerfumeIcon";
import { HeartButton } from "../../components/ui/HeartButton";
import headerBell from "../../assets/community/figma/header-bell.svg";
import fireBadge from "../../assets/mypage/fire-badge.svg";
import perfumeLoewe from "../../assets/mypage/perfume-loewe.png";
import perfumeSanta from "../../assets/mypage/perfume-santa.png";
import profileAvatar from "../../assets/mypage/avatar.png";
import profileBackground from "../../assets/mypage/profile-bg.png";
import reviewOne from "../../assets/mypage/review-1.png";
import reviewTwo from "../../assets/mypage/review-2.png";
import recentMagazineArrow from "../../assets/mypage/recent-magazine-arrow.svg";
import recentMagazine from "../../assets/mypage/saved-magazine.png";
import wishlistOne from "../../assets/mypage/wishlist-1.png";
import wishlistTwo from "../../assets/mypage/wishlist-2.png";
import wishlistThree from "../../assets/mypage/wishlist-3.png";

const perfumes = [
  {
    brand: "Santa Maria Novella",
    name: "엔젤 디 피렌체 오드코롱 100ml",
    image: perfumeSanta,
  },
  {
    brand: "LOEWE PERFUMES",
    name: "로에베 아이레 수틸레사 오 드 뚜왈렛 50ML",
    image: perfumeLoewe,
  },
  {
    brand: "Santa Maria Novella",
    name: "엔젤 디 피렌체 오드코롱 100ml",
    image: perfumeSanta,
  },
];

const wishlist = [
  {
    brand: "MAISON MARGIELA FRAGRANCES",
    name: "체이싱 선셋 EDT 30ML",
    image: wishlistOne,
  },
  {
    brand: "BVLGARI PERFUME",
    name: "불가리 옴니아 아메시스트",
    image: wishlistTwo,
  },
  {
    brand: "BULY",
    name: "클래식 오 트리쁠 향수 75ml - 이리 드 말트",
    image: wishlistThree,
  },
];

function CardScroller({ children, className = "" }: { children: ReactNode; className?: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({ active: false, startX: 0, scrollLeft: 0 });

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || event.button !== 0 || !scrollRef.current) return;

    dragState.current = {
      active: true,
      startX: event.clientX,
      scrollLeft: scrollRef.current.scrollLeft,
    };
    scrollRef.current.setPointerCapture(event.pointerId);
    scrollRef.current.classList.add("is-dragging");
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragState.current.active || !scrollRef.current) return;
    if (event.buttons !== 1) return stopDragging(event);

    event.preventDefault();
    scrollRef.current.scrollLeft = dragState.current.scrollLeft - (event.clientX - dragState.current.startX);
  };

  const stopDragging = (event: PointerEvent<HTMLDivElement>) => {
    const element = scrollRef.current;
    if (!dragState.current.active || !element) return;

    dragState.current.active = false;
    element.classList.remove("is-dragging");
    if (element.hasPointerCapture(event.pointerId)) element.releasePointerCapture(event.pointerId);
  };

  return (
    <div
      className={`horizontal-scroller scrollbar-hidden snap-x snap-mandatory overflow-x-auto overscroll-x-contain touch-pan-x ${className}`}
      onDragStart={(event) => event.preventDefault()}
      onLostPointerCapture={() => {
        dragState.current.active = false;
        scrollRef.current?.classList.remove("is-dragging");
      }}
      onPointerCancel={stopDragging}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={stopDragging}
      ref={scrollRef}
    >
      {children}
    </div>
  );
}

function SectionTitle({ children, to }: { children: string; to?: string }) {
  const actionClassName = "flex items-center gap-1.5 text-sm font-medium leading-none tracking-[-0.02em] text-grey";

  return (
    <div className="flex h-[26px] items-center justify-between">
      <h2 className="text-2xl font-semibold leading-[1.08] tracking-[-0.02em]">{children}</h2>
      <Link className={actionClassName} to={to ?? "#"}>
        <span>전체보기</span>
        <ChevronRight aria-hidden="true" size={18} strokeWidth={1.5} />
      </Link>
    </div>
  );
}

function ProfileSection() {
  return (
    <section className="relative h-[500px] overflow-hidden bg-off-black">
      <img alt="" className="absolute inset-0 size-full object-cover" src={profileBackground} />
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(26,26,26,0.62)] via-[rgba(26,26,26,0.18)] to-transparent" />
      <div className="absolute inset-x-0 bottom-0">
        <div className="mb-[9px] flex items-center gap-2 px-side text-off-white">
          <div className="size-10 shrink-0 overflow-hidden rounded-[200px]">
            <img alt="북극곰 프로필" className="size-full object-cover" src={profileAvatar} />
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <span className="whitespace-nowrap text-2xl font-semibold leading-[1.08] tracking-[-0.03em]">북극곰</span>
            <span className="whitespace-nowrap rounded-[24px] bg-off-black/50 px-2.5 py-1 font-cormorant text-base font-bold leading-normal tracking-[-0.02em] text-[#EDEDED]">
              Mood Shifter
            </span>
          </div>
        </div>

        <div className="rounded-t-[24px] bg-off-white px-side pb-5 pt-3.5">
          <div className="mx-auto mb-5 h-1 w-8 rounded-[24px] bg-light-grey" />
          <div className="rounded-card border-[0.8px] border-light-grey px-[18px] py-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img alt="" className="h-[59px] w-[60px] object-contain" src={fireBadge} />
                <div>
                  <p className="text-xl font-bold leading-[1.3] tracking-[-0.02em]">LOVER</p>
                  <p className="mt-1 text-sm leading-[1.4] tracking-[-0.02em] text-grey">
                    포인트 <span className="font-medium text-point-orange">99,999</span>
                  </p>
                </div>
              </div>
              <button className="rounded-chip border border-off-black px-3.5 py-[5px] text-xs leading-[1.4] tracking-[-0.02em]" type="button">
                멤버십 등급 보기
              </button>
            </div>
            <p className="mt-6 pl-1.5 text-sm font-medium leading-[1.4] tracking-[-0.02em] text-grey">
              <span className="text-base font-semibold text-off-black">1,200P</span> 더 쌓으면 다음 등급으로 올라갈 수 있어요!
            </p>
          </div>
          <button className="mt-5 flex h-[43px] w-full items-center justify-between rounded-card bg-point-orange/80 px-3 text-sm font-medium tracking-[-0.02em] text-off-white" type="button">
            <span className="flex-1 text-center">온보딩 테스트 다시하기</span>
            <ChevronRight aria-hidden="true" size={18} strokeWidth={1.8} />
          </button>
        </div>
      </div>
    </section>
  );
}

function PerfumeSection() {
  return (
    <section className="px-side">
      <SectionTitle to="/mypage/perfumes">내 향수 관리하기</SectionTitle>
      <CardScroller className="-mr-side mt-title-gap flex gap-4 pb-px pr-side">
        {perfumes.map((perfume, index) => (
          <article className="flex h-[337px] w-[241px] shrink-0 snap-start items-center justify-center overflow-hidden rounded-card border-[0.8px] border-light-grey bg-off-white px-3 py-[30px]" key={`${perfume.brand}-${index}`}>
            <div className="flex w-[217px] flex-col items-center gap-[30px]">
              <div className="relative size-[150px] shrink-0 overflow-hidden rounded-card">
                {perfume.brand === "LOEWE PERFUMES" ? (
                  <div className="absolute left-1/2 top-1/2 h-[100px] w-[32.291px] -translate-x-1/2 -translate-y-1/2 overflow-hidden">
                    <img alt={perfume.name} className="absolute left-[-151.51%] top-[-133.5%] h-[352.89%] w-[728.55%] max-w-none" src={perfume.image} />
                  </div>
                ) : (
                  <div className="absolute left-[38.9px] top-1/2 h-[100.813px] w-[72.009px] -translate-y-1/2 overflow-hidden">
                    <img alt={perfume.name} className="absolute left-[-54.03%] top-[-85.2%] h-[221.7%] w-[207.29%] max-w-none" src={perfume.image} />
                  </div>
                )}
              </div>
              <div className="flex w-full flex-col items-center gap-4 whitespace-nowrap text-center leading-none tracking-[-0.02em]">
                <div className="flex w-full flex-col items-center gap-1.5 overflow-hidden">
                  <h3 className="max-w-full truncate text-xl font-bold">{perfume.brand}</h3>
                  <p className="w-full truncate text-base font-medium text-grey">{perfume.name}</p>
                </div>
                <div className="flex flex-col items-center gap-1 text-xs text-grey">
                  <p>개봉일&nbsp; 202X.XX.XX</p>
                  <p>유통기한&nbsp; 202X.XX.XX</p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </CardScroller>
    </section>
  );
}

function MagazineSection() {
  return (
    <section className="px-side">
      <SectionTitle to="/magazine">최근 본 매거진</SectionTitle>
      <CardScroller className="-mr-side mt-title-gap flex gap-4 pr-side">
        {[0, 1, 2].map((item) => (
          <article className="relative h-72 w-[262px] shrink-0 snap-start overflow-hidden rounded-card border-[0.8px] border-light-grey text-off-white" key={item}>
            <img alt="계절별 향수 선택 가이드" className="absolute inset-0 size-full object-cover" src={recentMagazine} />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80" />
            <div className="absolute inset-0 flex flex-col p-5">
              <p className="font-cormorant text-xs font-medium leading-[normal]">Scent Match</p>
              <div className="mt-[124px]">
                <h3 className="h-[19px] w-[167px] truncate text-base font-semibold leading-[19px] tracking-[-0.02em]">계절별 향수 선택 가이드</h3>
                <p className="mt-[7px] h-[34px] w-[167px] text-xs font-medium leading-[1.4] tracking-[-0.02em]">봄, 여름, 가을 , 겨울<br />어떤 향이 어울릴까?</p>
                <div className="mt-5 flex h-4 w-[219px] items-center justify-between text-xs leading-[normal] tracking-[-0.02em]">
                  <span>2026.07.13</span>
                  <img alt="" aria-hidden="true" className="size-4" src={recentMagazineArrow} />
                </div>
              </div>
            </div>
          </article>
        ))}
      </CardScroller>
    </section>
  );
}

function WishlistSection() {
  const [favoriteItems, setFavoriteItems] = useState(() => wishlist.map(() => true));

  return (
    <section className="px-side">
      <SectionTitle to="/mypage/wishlist">위시리스트</SectionTitle>
      <div className="mt-title-gap flex w-full flex-col items-start gap-4">
        {wishlist.map((item, index) => (
          <article className="relative flex h-[124px] w-full shrink-0 items-end justify-end gap-5 overflow-hidden rounded-card border-[0.8px] border-light-grey bg-off-white p-3" key={item.name}>
            <div className="flex min-w-0 flex-1 items-start gap-5 self-start">
              <div className="relative size-[100px] shrink-0 overflow-hidden rounded-card bg-[#EDEDED]">
                {item.brand === "BVLGARI PERFUME" ? (
                  <img alt={item.name} className="absolute left-[-43.47%] top-[-28.37%] h-[134.96%] w-[145.37%] max-w-none" src={item.image} />
                ) : item.brand === "BULY" ? (
                  <img alt={item.name} className="absolute left-[-29.96%] top-0 size-[160.32%] max-w-none" src={item.image} />
                ) : (
                  <img alt={item.name} className="size-full object-cover" src={item.image} />
                )}
              </div>
              <div className="flex h-[37px] min-w-0 flex-1 flex-col justify-center gap-1 overflow-hidden">
                <p className="w-full truncate text-xs leading-none tracking-[-0.02em] text-grey">{item.brand}</p>
                <h3 className="w-full truncate text-base font-semibold leading-none tracking-[-0.02em]">{item.name}</h3>
              </div>
            </div>
            <HeartButton
              aria-label={`${item.name} ${favoriteItems[index] ? "위시리스트에서 삭제" : "위시리스트에 추가"}`}
              className="absolute bottom-3 right-3 size-6"
              isSelected={favoriteItems[index]}
              onClick={() =>
                setFavoriteItems((currentItems) =>
                  currentItems.map((isFavorite, currentIndex) => (currentIndex === index ? !isFavorite : isFavorite)),
                )
              }
            />
          </article>
        ))}
      </div>
    </section>
  );
}

function ReviewSection() {
  const reviews = [
    { image: reviewOne, rating: 5, text: "향이좋네염" },
    { image: reviewTwo, rating: 2, text: "제 취향은 아니에요" },
  ];
  return (
    <section className="px-side">
      <SectionTitle to="/mypage/reviews">내 리뷰 관리하기</SectionTitle>
      <div className="mt-title-gap flex flex-col gap-4">
        {reviews.map((review) => (
          <article className="flex h-14 items-center gap-3 rounded-[24px] border-[0.8px] border-light-grey p-3.5" key={review.text}>
            <img alt="" className="size-7 rounded-full object-cover" src={review.image} />
            <span className="flex items-center gap-0.5 text-xs font-medium tracking-[-0.02em]">
              <Star className="fill-[#FFBB00] text-[#FFBB00]" size={14} strokeWidth={1.5} />{review.rating}
            </span>
            <p className="text-sm font-medium tracking-[-0.02em]">{review.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function AccountSection() {
  const items = [
    { label: "고객센터", Icon: CircleHelp },
    { label: "계정정보", Icon: UserRoundCog },
  ];
  return (
    <section className="flex flex-col gap-4 px-side">
      {items.map(({ label, Icon }) => (
        <button className="flex h-14 items-center gap-3 rounded-[24px] border-[0.8px] border-light-grey p-3.5 text-sm font-medium tracking-[-0.02em]" key={label} type="button">
          <span className="flex size-7 items-center justify-center rounded-full bg-off-black text-off-white">
            <Icon aria-hidden="true" size={16} strokeWidth={1.7} />
          </span>
          {label}
        </button>
      ))}
    </section>
  );
}

export default function MyPage() {
  return (
    <main className="mx-auto min-h-dvh w-full max-w-[430px] overflow-x-hidden bg-off-white text-off-black">
      <header className="fixed top-0 left-1/2 z-50 flex h-[54px] w-full max-w-[430px] -translate-x-1/2 items-center justify-between bg-off-white px-side">
        <h1 className="text-2xl font-semibold leading-[1.3] tracking-[-0.02em]">마이페이지</h1>
        <div className="flex items-center gap-5">
          <Link aria-label="검색" className="size-7" to="/search">
            <Search aria-hidden="true" className="size-full" strokeWidth={1.5} />
          </Link>
          <img alt="알림" className="size-7" src={headerBell} />
          <Link aria-label="향수 카테고리" to="/category">
            <PerfumeIcon />
          </Link>
        </div>
      </header>

      <div className="flex flex-col gap-section pt-[var(--app-header-height)] pb-[112px]">
        <ProfileSection />
        <PerfumeSection />
        <MagazineSection />
        <WishlistSection />
        <ReviewSection />
        <AccountSection />
      </div>

      <BottomNavigation />
    </main>
  );
}
