import { ChevronLeft, MessageCircle, Star } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { BottomNavigation } from "../components/common/BottomNavigation";
import { HeaderActions } from "../components/common/HeaderActions";
import { HeartButton } from "../components/ui/HeartButton";
import reviewProductOne from "../assets/mypage/review-product-1.png";
import reviewProductTwo from "../assets/mypage/review-product-2.png";
import reviewProductThree from "../assets/mypage/review-product-3.png";

const pendingReviews = [
  {
    badge: "한달사용후기",
    title: "산타마리아노벨라 향수 후기",
    description: "비싼값하는거같음",
    image: reviewProductOne,
    rating: "5",
  },
  {
    badge: "후기작성하기",
    title: "로에베 아이레 수틸레사 오 드 뚜왈렛 50ml",
    description: "리뷰를 작성해주세요",
    image: reviewProductTwo,
    rating: "-",
  },
];

const writtenReviews = [
  {
    brand: "Santa Maria Novella",
    name: "엔젤 디 피렌체 오드코롱 100ml",
    image: reviewProductOne,
    date: "2026.xx.xx",
    text: "비싼값하는거같음",
  },
  {
    brand: "MATIERE PREMIERE",
    name: "마티에 프리미에르 메탈 라벤더 오 드 퍼퓸 50ml",
    image: reviewProductThree,
    date: "2026.xx.xx",
    text: "흔히 생각하는 방향제 같은 라벤더가 아니라 차가운 느낌의 라벤더 향수인듯 텁텁함 없이 투명한 향이라 계절 상관없이 미니멀하게 뿌리기 좋음",
  },
];

const reviewableItems = [
  {
    brand: "LOEWE PERFUMES",
    name: "로에베 아이레 수틸레사 오 드 뚜왈렛 50ml",
    image: reviewProductTwo,
    date: "2026.xx.xx",
  }
];

function EmptyStars() {
  return (
    <div className="flex gap-0.5 text-light-grey">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star aria-hidden="true" className="fill-light-grey text-light-grey" key={index} size={14} strokeWidth={1.4} />
      ))}
    </div>
  );
}

function ReviewableCard({ item }: { item: typeof reviewableItems[number] }) {
  return (
    <article className="rounded-card border-[0.8px] border-light-grey bg-off-white p-4">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-1.5">
          <EmptyStars />
          <span className="text-[13px] font-normal leading-none tracking-[-0.02em] text-grey">{item.date}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex size-[42px] shrink-0 items-center justify-center overflow-hidden rounded-[8px] bg-light2-grey">
            <img alt="" className="size-full object-contain mix-blend-multiply" src={item.image} />
          </div>
          <div className="flex min-w-0 flex-col gap-1.5">
            <p className="truncate text-[12px] font-normal leading-none tracking-[-0.02em] text-grey uppercase">{item.brand}</p>
            <h2 className="truncate text-[14px] font-normal leading-[1.2] tracking-[-0.02em] text-off-black">{item.name}</h2>
          </div>
        </div>
        <button className="h-[32px] w-fit rounded-full border-[0.8px] border-light-grey bg-off-white px-3.5 text-[12px] font-medium leading-none tracking-[-0.02em] text-grey" type="button">
          리뷰 작성하기
        </button>
      </div>
    </article>
  );
}

function DetailHeader({ title }: { title: string }) {
  return (
    <header className="fixed left-1/2 top-0 z-50 flex h-[var(--app-header-height)] w-full max-w-[430px] -translate-x-1/2 items-center justify-between bg-off-white px-side pt-[var(--app-safe-top)]">
      <div className="flex min-w-0 items-center">
        <Link aria-label="마이페이지로 돌아가기" className="-ml-1 flex size-7 items-center justify-center" to="/mypage">
          <ChevronLeft aria-hidden="true" size={24} strokeWidth={1.6} />
        </Link>
        <h1 className="truncate text-2xl font-semibold leading-[1.08] tracking-[-0.02em]">{title}</h1>
      </div>
      <HeaderActions />
    </header>
  );
}

function RatingStars() {
  return (
    <div className="flex gap-0.5 text-point-orange">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star aria-hidden="true" className="fill-point-orange" key={index} size={14} strokeWidth={1.4} />
      ))}
    </div>
  );
}

function PendingReviewCard({ review }: { review: (typeof pendingReviews)[number] }) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <article className="flex h-[159px] w-[260px] shrink-0 flex-col gap-5 rounded-2xl border-[0.5px] border-light-grey bg-off-white p-4">
      <div className="flex h-[93px] items-start justify-between gap-4">
        <div className="flex h-[93px] w-[132px] flex-col gap-3">
          <span className="w-fit rounded-badge bg-point-orange-40 px-2 py-[5px] text-[10px] font-semibold leading-none tracking-[-0.02em] text-point-orange">
            {review.badge}
          </span>
          <div className="flex h-[61px] flex-col gap-1.5">
            <h2 className="line-clamp-2 h-[38px] text-base font-semibold leading-[19px] tracking-[-0.02em]">{review.title}</h2>
            <p className="h-[17px] truncate text-sm font-normal leading-[17px] tracking-[-0.02em] text-off-black-70">{review.description}</p>
          </div>
        </div>
        <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-card bg-light-grey">
          <img alt="" className="size-full object-cover" src={review.image} />
        </div>
      </div>
      <div className="flex h-3.5 items-center gap-4">
        <HeartButton
          aria-label={`${review.title} 좋아요 ${isLiked ? "취소" : "누르기"}`}
          className="flex size-3.5 items-center justify-center"
          iconSize={14}
          isSelected={isLiked}
          onClick={() => setIsLiked((liked) => !liked)}
          tone="light"
        />
        <MessageCircle aria-hidden="true" className="text-light-grey" size={14} strokeWidth={1.5} />
        <span className="flex items-center gap-1 text-xs font-medium tracking-[-0.02em]">
          <Star aria-hidden="true" className="fill-point-orange text-point-orange" size={14} strokeWidth={1.4} />
          {review.rating}
        </span>
      </div>
    </article>
  );
}

function WrittenReviewCard({ review }: { review: (typeof writtenReviews)[number] }) {
  return (
    <article className="rounded-card border-[0.8px] border-light-grey bg-off-white p-4">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5">
            <RatingStars />
            <span className="text-sm font-normal leading-none tracking-[-0.02em] text-grey">{review.date}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex size-[38px] shrink-0 items-center justify-center overflow-hidden rounded-card bg-light-grey">
              <img alt="" className="size-full object-cover" src={review.image} />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-normal leading-none tracking-[-0.02em] text-grey">{review.brand}</p>
              <h2 className="mt-1 truncate text-sm font-normal leading-none tracking-[-0.02em]">{review.name}</h2>
            </div>
          </div>
        </div>
        <p className="text-base font-normal leading-[1.4] tracking-[-0.02em]">{review.text}</p>
      </div>
      <div className="mt-4 flex gap-2">
        {["수정", "삭제"].map((label) => (
          <button className="rounded-full border-[0.8px] border-light-grey px-3.5 py-2 text-xs font-medium leading-none tracking-[-0.02em] text-grey" key={label} type="button">
            {label}
          </button>
        ))}
      </div>
    </article>
  );
}

export default function MyReviewsPage() {
  const [activeTab, setActiveTab] = useState<"reviewable" | "written">("reviewable");

  return (
    <main className="mx-auto min-h-dvh w-full max-w-[430px] overflow-x-hidden bg-off-white text-off-black">
      <DetailHeader title="내 리뷰 관리하기" />

      <div className="wrap pb-[112px] pt-[calc(var(--app-header-height)+24px)]">
        <section className="overflow-x-auto px-side pb-px scrollbar-hidden">
          <div className="flex w-max gap-4">
            {pendingReviews.map((review) => (
              <PendingReviewCard key={review.title} review={review} />
            ))}
          </div>
        </section>

        <div className="mt-4 border-b-[0.8px] border-light-grey px-side">
          <div className="flex gap-6 pt-4">
            <button
              className={`relative z-10 h-[30px] text-base font-medium leading-none tracking-[-0.02em] ${
                activeTab === "reviewable" ? "text-off-black" : "text-grey"
              }`}
              onClick={() => setActiveTab("reviewable")}
              type="button"
            >
              작성 가능한 리뷰
              {activeTab === "reviewable" && <span aria-hidden="true" className="absolute inset-x-0 -bottom-[1px] z-20 h-0.5 bg-point-orange" />}
            </button>
            <button
              className={`relative z-10 h-[30px] text-base font-medium leading-none tracking-[-0.02em] ${
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
            : writtenReviews.map((review) => <WrittenReviewCard key={review.name} review={review} />)}
        </section>
      </div>

      <BottomNavigation />
    </main>
  );
}
