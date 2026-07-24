import type { PointerEvent, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, MessageCircle, MoreHorizontal } from "lucide-react";

import { BottomNavigation } from "../components/common/BottomNavigation";
import { HeaderActions } from "../components/common/HeaderActions";
import { BackHeader } from "../components/common/BackHeader";
import reviewProductOne from "../assets/mypage/perfume-santa.png";
import reviewProductThree from "../assets/mypage/perfume-MATIERE.png";
import reviewOne from "../assets/mypage/perfume-diptyque.png";
import perfumeLoewe from "../assets/mypage/perfume-loewe.png";
import perfumeByredo from "../assets/mypage/perfume-byredo.png";
import perfumeJomalone from "../assets/mypage/perfume-jomalone.png";

const pendingReviews = [
  {
    badge: "한달사용후기",
    title: "햇살 좋은 날의 베이지 룩",
    description:
      "따뜻한 햇살엔 부드럽고 깨끗한 향이 잘 어울리는 것 같아요. 블랑쉬로 포근하게 시작해서 오 로즈로 기분 전환해주고 마지막엔 잉글리쉬 페어로 잔향을 남겨줘요. 하루 종일 기분이 좋아지는 조합이에요.",
    image: reviewOne,
    rating: "5",
  },
  {
    badge: "후기작성하기",
    title: "로에베 아이레 수틸레사 오 드 뚜왈렛 50ml",
    description: "리뷰를 작성해주세요",
    image: perfumeLoewe,
    rating: "-",
  },
];

function CardScroller({ children, className = "" }: { children: ReactNode; className?: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({ active: false, startX: 0, scrollLeft: 0, pendingLeft: 0, rafId: 0 });

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || event.button !== 0 || !scrollRef.current) return;

    dragState.current = {
      active: true,
      startX: event.clientX,
      scrollLeft: scrollRef.current.scrollLeft,
      pendingLeft: scrollRef.current.scrollLeft,
      rafId: 0,
    };
    scrollRef.current.setPointerCapture(event.pointerId);
    scrollRef.current.classList.add("is-dragging");
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragState.current.active || !scrollRef.current) return;
    if (event.buttons !== 1) return stopDragging(event);

    event.preventDefault();
    dragState.current.pendingLeft = dragState.current.scrollLeft - (event.clientX - dragState.current.startX);

    if (!dragState.current.rafId) {
      dragState.current.rafId = requestAnimationFrame(() => {
        dragState.current.rafId = 0;
        if (scrollRef.current) scrollRef.current.scrollLeft = dragState.current.pendingLeft;
      });
    }
  };

  const stopDragging = (event: PointerEvent<HTMLDivElement>) => {
    const element = scrollRef.current;
    if (!dragState.current.active || !element) return;

    if (dragState.current.rafId) cancelAnimationFrame(dragState.current.rafId);
    dragState.current.active = false;
    dragState.current.rafId = 0;
    element.classList.remove("is-dragging");
    if (element.hasPointerCapture(event.pointerId)) element.releasePointerCapture(event.pointerId);
  };

  return (
    <div
      className={`horizontal-scroller scrollbar-hidden overflow-x-auto overscroll-x-contain touch-pan-x ${className}`}
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

const writtenReviews = [
  {
    brand: "SANTA MARIA NOVELLA",
    name: "엔젤 디 피렌체 오드코롱 100ml",
    image: reviewProductOne,
    date: "2026.xx.xx",
    likeCount: 42,
    commentCount: 8,
    title: "햇살 좋은 날의 베이지 룩",
    text: "따뜻한 햇살엔 부드럽고 깨끗한 향이 잘 어울리는 것 같아요. 블랑쉬로 포근하게 시작해서 오 로즈로 기분 전환해주고 마지막엔 잉글리쉬 페어로 잔향을 남겨줘요. 하루 종일 기분이 좋아지는 조합이에요.",
    hashtags: ["#데일리향수", "#베이지룩", "#플로럴머스크", "#지속력좋아요"],
  },
  {
    brand: "MATIERE PREMIERE",
    name: "마티에 프리미에르 메탈 라벤더 오 드 퍼퓸 50ml",
    image: reviewProductThree,
    date: "2026.xx.xx",
    likeCount: 42,
    commentCount: 8,
    title: "깔끔한 라벤더 향",
    text: "흔히 생각하는 방향제 같은 라벤더가 아니라 차가운 느낌의 라벤더 향수인듯 텁텁함 없이 투명한 향이라 계절 상관없이 미니멀하게 뿌리기 좋음",
    hashtags: ["#데일리향수"],
  },
];

const reviewableItems = [
  {
    brand: "LOEWE PERFUMES",
    name: "로에베 아이레 수틸레사 오 드 뚜왈렛 50ml",
    image: perfumeLoewe,
    date: "2026.xx.xx",
  }
];

function ReviewableCard({ item }: { item: typeof reviewableItems[number] }) {
  const navigate = useNavigate();

  return (
    <article className="rounded-card border-[0.8px] border-light-grey bg-off-white p-4">
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <div className="flex size-[50px] shrink-0 items-center justify-center overflow-hidden rounded-[8px] border-[0.8px] border-light-grey">
            <img alt="" className="size-full object-contain mix-blend-multiply" src={item.image} />
          </div>
          <div className="flex min-w-0 flex-col gap-1.5">
            <p className="truncate text-[12px] font-normal leading-none tracking-[-0.02em] text-grey uppercase" /* body1/regular-14px */>{item.brand}</p>
            <h2 className="truncate text-[14px] font-normal leading-[1.2] tracking-[-0.02em] text-off-black" /* body1/regular-14px */>{item.name}</h2>
          </div>
        </div>
        <button
          className="h-[32px] w-fit cursor-pointer self-end rounded-full border-[0.8px] border-light-grey bg-off-white px-3.5 text-[12px] font-medium leading-none tracking-[-0.02em] text-grey"
          onClick={() =>
            navigate("/community/write", {
              state: { perfume: { image: item.image, brand: item.brand, name: item.name } },
            })
          }
          type="button"
        >
          리뷰 작성하기
        </button>
      </div>
    </article>
  );
}

function DetailHeader({ title }: { title: string }) {
  return <BackHeader title={title} backTo="/mypage" action={<HeaderActions />} />;
}

function PendingReviewCard({ review }: { review: (typeof pendingReviews)[number] }) {
  return (
    <article className="flex h-[128px] w-[300px] shrink-0 flex-col gap-5 rounded-card border-[0.5px] border-light-grey bg-off-white p-4">
      <div className="flex h-[93px] items-start justify-between gap-4">
        <div className="flex h-[93px] w-full flex-col gap-3">
          <span className="w-fit rounded-badge bg-[#FFEDE6] px-2 py-[5px] text-[10px] font-semibold leading-none tracking-[-0.02em] text-point-orange">
            추천해요
          </span>
          <div className="flex h-[61px] w-full flex-col gap-1.5">
            <h2 className="line-clamp-2 w-full text-base font-semibold leading-[19px] tracking-[-0.02em]">{review.title}</h2>
            <p className="line-clamp-2 w-full text-sm font-normal leading-[17px] tracking-[-0.02em] text-subtext">{review.description}</p>
          </div>
        </div>
        <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-card border-[0.6px] border-light-grey">
          <img alt="" className="size-full object-contain" src={review.image} />
        </div>
      </div>
    </article>
  );
}

function WrittenReviewCard({ review, isFirst }: { review: (typeof writtenReviews)[number]; isFirst: boolean }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  return (
    <article className="rounded-card border-[0.8px] border-light-grey bg-off-white p-4">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1.5">
          <div className="flex w-full items-center justify-between">
            <span className="w-fit rounded-badge bg-[#FFEDE6] px-2 py-[5px] text-[10px] font-semibold leading-none tracking-[-0.02em] text-point-orange">
              추천해요
            </span>
            <div className="relative" ref={menuRef}>
              <button
                className="flex cursor-pointer items-center justify-center"
                onClick={() => setIsMenuOpen((current) => !current)}
                type="button"
              >
                <MoreHorizontal aria-hidden="true" className="shrink-0 text-off-black" size={24} strokeWidth={1.5} />
              </button>
              {isMenuOpen && (
                <div className="absolute right-0 top-full z-10 mt-1 w-24 overflow-hidden rounded-lg border-[0.8px] border-light-grey bg-off-white shadow-lg">
                  {["수정하기", "삭제하기"].map((label) => (
                    <button
                      className="w-full cursor-pointer px-4 py-2.5 text-center text-sm tracking-[-0.02em] text-off-black hover:bg-light2-grey transition-colors"
                      key={label}
                      onClick={() => setIsMenuOpen(false)}
                      type="button"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          {isFirst ? (
            <div className="flex items-start gap-3">
              {[reviewOne, perfumeByredo, perfumeJomalone].map((image, index) => (
                <div className="flex size-[50px] shrink-0 items-center justify-center overflow-hidden rounded-[8px] border-[0.8px] border-light-grey" key={index}>
                  <img alt="" className="size-full object-contain mix-blend-multiply" src={image} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-start gap-3">
              <div className="flex size-[50px] shrink-0 items-center justify-center overflow-hidden rounded-[8px] border-[0.8px] border-light-grey">
                <img alt="" className="size-full object-contain mix-blend-multiply" src={review.image} />
              </div>
              <div className="flex min-w-0 flex-col gap-1.5">
                <p className="truncate text-[12px] font-normal leading-none tracking-[-0.02em] text-grey uppercase" /* body1/regular-14px */>{review.brand}</p>
                <h2 className="truncate text-[14px] font-normal leading-[1.2] tracking-[-0.02em] text-off-black" /* body1/regular-14px */>{review.name}</h2>
              </div>
            </div>
          )}
        </div>
        <div>
          <h3 className="text-base font-semibold leading-none tracking-[-0.02em] text-off-black">{review.title}</h3>
          <p className="mt-1.5 text-sm font-normal leading-[1.4] tracking-[-0.02em] text-subtext">{review.text}</p>
          <div className="mt-3 flex items-center gap-2.5">
            {review.hashtags.map((hashtag) => (
              <span className="text-sm font-normal leading-none tracking-[-0.02em] text-subtext" key={hashtag}>
                {hashtag}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-6 flex w-full items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <Heart aria-hidden="true" className="text-grey" size={20} strokeWidth={1.5} />
            <span className="text-sm font-normal tracking-[-0.02em] text-grey">{review.likeCount}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MessageCircle aria-hidden="true" className="text-grey" size={20} strokeWidth={1.5} />
            <span className="text-sm font-normal tracking-[-0.02em] text-grey">{review.commentCount}</span>
          </div>
        </div>
        <p className="text-sm font-normal tracking-[-0.02em] text-grey">{review.date}</p>
      </div>
    </article>
  );
}

export default function MyReviewsPage() {
  const [activeTab, setActiveTab] = useState<"reviewable" | "written">("reviewable");

  return (
    <main className="mx-auto min-h-dvh w-full max-w-[430px] cursor-default select-none overflow-x-hidden bg-off-white text-off-black">
      <DetailHeader title="내 리뷰 관리하기" />

      <div className="wrap pb-[112px] pt-[calc(var(--app-header-height)+24px)]">
        <section className="px-side pb-px">
          <CardScroller className="flex gap-4">
            {pendingReviews.map((review) => (
              <PendingReviewCard key={review.title} review={review} />
            ))}
          </CardScroller>
        </section>

        <div className="mt-4 border-b-[0.8px] border-light-grey px-side">
          <div className="flex gap-6 pt-4">
            <button
              className={`relative z-10 pb-3 text-base font-medium leading-none tracking-[-0.02em] ${
                activeTab === "reviewable" ? "text-off-black" : "text-grey"
              }`}
              onClick={() => setActiveTab("reviewable")}
              type="button"
            >
              작성 가능한 리뷰
              {activeTab === "reviewable" && <span aria-hidden="true" className="absolute inset-x-0 -bottom-[1px] z-20 h-0.5 bg-point-orange" />}
            </button>
            <button
              className={`relative z-10 pb-3 text-base font-medium leading-none tracking-[-0.02em] ${
                activeTab === "written" ? "text-off-black" : "text-grey"
              }`}
              onClick={() => setActiveTab("written")}
              type="button"
            >
              작성한 리뷰
              {activeTab === "written" && <span aria-hidden="true" className="absolute inset-x-0 -bottom-[1px] z-20 h-0.5 bg-point-orange" />}
            </button>
          </div>
        </div>

        <section className="mt-[30px] flex flex-col gap-4 px-side">
          {activeTab === "reviewable"
            ? reviewableItems.map((item) => <ReviewableCard key={item.name} item={item} />)
            : writtenReviews.map((review, index) => <WrittenReviewCard key={review.name} review={review} isFirst={index === 0} />)}
        </section>
      </div>

      <BottomNavigation />
    </main>
  );
}
