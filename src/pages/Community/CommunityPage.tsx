import { useRef, useState } from "react";
import {
  Bookmark,
  ChevronRight,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Send,
} from "lucide-react";
import { Link } from "react-router-dom";
import { PageLayout } from "../../components/common/PageLayout";
import { HeartButton } from "../../components/ui/HeartButton";
import avatarHaesu from "../../assets/community/figma/avatar-haesu.png";
import avatarYeeun from "../../assets/community/figma/avatar-yeeun.png";
import carouselFour from "../../assets/community/figma/carousel-four.png";
import carouselThree from "../../assets/community/figma/carousel-three.png";
import carouselTwo from "../../assets/community/figma/carousel-two.png";

import joMalone from "../../assets/community/figma/jo-malone.png";
import plusImageOne from "../../assets/community/figma/plus-image-one.svg";
import plusImageTwo from "../../assets/community/figma/plus-image-two.svg";
import postImageOne from "../../assets/community/figma/post-image-one.png";
import postImageTwo from "../../assets/community/figma/post-image-two.png";
import productOverlayThumbnail from "../../assets/community/figma/product-overlay-thumbnail.png";
import reviewImage from "../../assets/community/figma/review-image.png";
import { HeaderActions } from "../../components/common/HeaderActions";
import { myProfile } from "../../data/myProfile";
import { brands } from "../../data/brands";
import { perfumeData } from "../../data/perfumeData";

// GitHub Pages 배포 시 base 경로를 붙여주는 헬퍼 (public/ 에셋용)
const asset = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

// 제품 태그용: 향수 id → { 이미지, 브랜드(영문), 이름(한글) }
const perfumeById = Object.fromEntries(
  perfumeData.map((entry) => {
    const brand = brands.find((b) => b.id === entry.perfume.brandId);
    return [
      entry.id,
      {
        image: asset(entry.perfume.image),
        brand: brand?.nameEn ?? entry.perfume.brandId,
        name: entry.perfume.name,
      },
    ];
  }),
);

// 피그마 리뷰 사진별로 실제 찍힌 향수 + 태그 좌표(x,y는 390x430 슬라이드 기준)
// 사진에 없는 딥티크 오 로즈/오 파피에는 같은 브랜드·계열로 대체(도손·플뢰르 드 포)
const slidePresets = {
  // 3종: 좌상 딥티크(도손)·우 블랑쉬·하 잉글리쉬 페어
  threeBottles: {
    src: postImageOne,
    fit: "object-bottom",
    tags: [
      { id: 38, x: 110, y: 90 },
      { id: 21, x: 280, y: 150 },
      { id: 16, x: 210, y: 240 },
    ],
  },
  paperInHand: {
    src: postImageTwo,
    fit: "object-cover",
    tags: [{ id: 37, x: 280, y: 155 }],
  },
  diptyqueRose: {
    src: carouselTwo,
    fit: "object-cover",
    tags: [{ id: 38, x: 180, y: 120 }],
  },
  joMaloneWoodSage: {
    src: carouselThree,
    fit: "object-cover",
    tags: [{ id: 17, x: 220, y: 130 }],
  },
  byredoBlanche: {
    src: carouselFour,
    fit: "object-cover",
    tags: [{ id: 21, x: 195, y: 150 }],
  },
} as const;

function Tabs() {
  return (
    <nav
      className="flex items-start gap-6 px-5 pt-4"
      aria-label="커뮤니티 메뉴"
    >
      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center justify-center">
          <span className="whitespace-nowrap text-base font-medium leading-normal tracking-[-0.02em] text-off-black">
            후기 · 리뷰
          </span>
        </div>
        <span className="h-0.5 w-full bg-[#ff4800]" aria-hidden="true" />
      </div>
      <Link
        className="flex h-[30px] items-start justify-center"
        to="/community/question"
      >
        <span className="whitespace-nowrap text-base font-medium leading-normal tracking-[-0.02em] text-grey">
          질문 게시판
        </span>
      </Link>
    </nav>
  );
}

function HotReviews() {
  const hotReviews = [
    {
      image: joMalone,
      brand: "JO MALONE LONDON",
      name: "블랙베리 앤 베이 30ml",
      description: "파우더리한 플로럴 향",
      tags: "#포근함 #플로럴",
    },
    {
      image: reviewImage,
      brand: "CHANEL",
      name: "N°5 오 드 빠르펭",
      description: "우아하고 깊은 알데하이드 향",
      tags: "#클래식 #우아함",
    },
  ];

  return (
    <section className="overflow-hidden" data-node-id="891:4456">
      <h2 className="px-5 text-[24px] font-semibold leading-[1.08] tracking-[-0.03em]">
        오늘의 HOT리뷰
      </h2>
      <div
        className="no-scrollbar mt-[30px] flex w-full snap-x snap-mandatory gap-2.5 overflow-x-auto overflow-y-hidden pl-[20px] pr-[20px]"
        style={{ scrollPaddingInline: "20px" }}
      >
        {hotReviews.map((review) => (
          <article
            className="relative h-[300px] w-[245px] shrink-0 snap-start overflow-hidden rounded-[16px]"
            key={review.name}
          >
            <img
              className="absolute inset-0 h-full w-full object-cover"
              src={review.image}
              alt={`${review.brand} ${review.name}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(26,26,26,.5)] to-transparent" />
            <div className="relative flex h-full flex-col justify-between p-5 text-white">
              <div>
                <p className="text-xs font-medium tracking-[-0.02em]">
                  {review.brand}
                </p>
                <p className="mt-[5px] text-xl font-bold tracking-[-0.02em]">
                  {review.name}
                </p>
              </div>
              <div>
                <p className="text-sm opacity-85">{review.description}</p>
                <p className="text-sm opacity-85">{review.tags}</p>
                <Link
                  className="mt-3 flex items-center gap-1.5 text-sm font-medium"
                  to="/community/hot-reviews"
                >
                  전체보기 <ChevronRight size={18} />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

const posts = [
  {
    author: "예은티비",
    time: "5분 전",
    avatar: avatarYeeun,
    title: "햇살 좋은 날의 베이지 룩",
    body: "따뜻한 햇살엔 부드럽고 깨끗한 향이 잘 어울리는 것 같아요. 블랑쉬로 포근하게 시작해서 오 로즈로 기분 전환해주고 마지막엔 잉글리수 페어로 잔향을 남겨줘요. 하루 종일 기분이 좋아지는 조합이에요.",
    tags: ["# 데일리향수", "# 베이지룩", "# 플로럴머스크", "# 지속력좋아요"],
    // 3장
    images: [
      slidePresets.threeBottles,
      slidePresets.byredoBlanche,
      slidePresets.diptyqueRose,
    ],
  },
  {
    author: "최해수",
    time: "30분 전",
    avatar: avatarHaesu,
    title: "하얀 종이에 스며든 포근한 머스크 향",
    body: "처음엔 깨끗하고 보송한 느낌으로 시작하고 시간이 지날수록 피부에 은은하게 남는 머스크 향이 올라와요. 향이 강하게 튀기보다는 가까이 있을 때 부드럽게 느껴지는 향이라 데일리로 쓰기 좋아요.",
    tags: ["# 머스크향", "# 살냄새향수", "# 보송한향", "# 은은한향"],
    // 1장
    images: [slidePresets.paperInHand],
  },
  {
    author: "향기로운하루",
    time: "1시간 전",
    avatar: avatarYeeun,
    title: "비 오는 날 더 생각나는 우디 향",
    body: "촉촉한 공기와 잘 어울리는 차분한 우디 향을 골라봤어요. 처음에는 싱그럽게 시작하지만 시간이 지나면 포근한 나무 향이 남아서 편안한 분위기를 만들어줘요.",
    tags: ["# 우디향", "# 비오는날", "# 차분한향", "# 데일리추천"],
    // 2장
    images: [slidePresets.joMaloneWoodSage, slidePresets.byredoBlanche],
  },
  {
    author: "무드컬렉터",
    time: "2시간 전",
    avatar: avatarHaesu,
    title: "선반 위에 모아둔 클린 & 우디 컬렉션",
    body: "요즘 손이 자주 가는 향수들을 한자리에 모아봤어요. 바이레도 3종은 데일리로 부담 없고, 불가리 두 개는 무게감 있게 마무리하고 싶을 때 좋아요. 햇살 드는 오후에 하나씩 꺼내 뿌리는 재미가 있어요.",
    tags: ["# 바이레도", "# 불가리", "# 클린향", "# 우디"],
    images: [
      // slide-1 트레이: 선데이즈드·모하비 고스트·집시 워터
      {
        src: asset("/assets/community/review-byredo/slide-1.jpg"),
        fit: "object-cover",
        tags: [
          { id: 25, x: 85, y: 150 },
          { id: 23, x: 205, y: 140 },
          { id: 24, x: 305, y: 180 },
        ],
      },
      // slide-2 나무 테이블: 불가리 맨·집시 워터·선데이즈드·모하비 고스트
      {
        src: asset("/assets/community/review-byredo/slide-2.jpg"),
        fit: "object-cover",
        tags: [
          { id: 10, x: 105, y: 155 },
          { id: 24, x: 185, y: 235 },
          { id: 25, x: 230, y: 165 },
          { id: 23, x: 315, y: 205 },
        ],
      },
      // slide-3 화장대: 불가리 맨·아쿠아·선데이즈드·모하비 고스트·집시 워터
      {
        src: asset("/assets/community/review-byredo/slide-3.jpg"),
        fit: "object-cover",
        tags: [
          { id: 10, x: 75, y: 140 },
          { id: 8, x: 150, y: 190 },
          { id: 25, x: 210, y: 160 },
          { id: 23, x: 280, y: 165 },
          { id: 24, x: 335, y: 175 },
        ],
      },
      // slide-4 욕실: 아쿠아·선데이즈드·모하비 고스트·집시 워터
      {
        src: asset("/assets/community/review-byredo/slide-4.jpg"),
        fit: "object-cover",
        tags: [
          { id: 8, x: 70, y: 200 },
          { id: 25, x: 170, y: 225 },
          { id: 23, x: 245, y: 185 },
          { id: 24, x: 320, y: 230 },
        ],
      },
      // slide-5 책 위: 불가리 맨·모하비 고스트
      {
        src: asset("/assets/community/review-byredo/slide-5.jpg"),
        fit: "object-cover",
        tags: [
          { id: 10, x: 120, y: 145 },
          { id: 23, x: 255, y: 160 },
        ],
      },
      // slide-6 책장 옆: 불가리 맨·아쿠아·집시 워터
      {
        src: asset("/assets/community/review-byredo/slide-6.jpg"),
        fit: "object-cover",
        tags: [
          { id: 10, x: 80, y: 142 },
          { id: 8, x: 205, y: 165 },
          { id: 24, x: 310, y: 220 },
        ],
      },
    ],
  },
] as const;

const commentThreads: Record<
  string,
  { author: string; avatar: string; text: string; likes: number }[]
> = {
  "review-1": [
    {
      author: "향기수집가",
      avatar: avatarHaesu,
      text: "베이지 룩이랑 향 조합이 정말 잘 어울려요!",
      likes: 18,
    },
    {
      author: "은은한하루",
      avatar: avatarYeeun,
      text: "오 로즈 레이어링 저도 따라 해볼게요.",
      likes: 9,
    },
  ],
  "review-2": [
    {
      author: "포근한잔향",
      avatar: avatarYeeun,
      text: "종이 향처럼 깨끗한 머스크라니 궁금해요.",
      likes: 24,
    },
    {
      author: "muskday",
      avatar: avatarHaesu,
      text: "출근할 때 뿌리기에도 부담 없을 것 같아요!",
      likes: 11,
    },
  ],
  "review-3": [
    {
      author: "비오는향",
      avatar: avatarHaesu,
      text: "습한 날 우디 향 조합 너무 좋아요.",
      likes: 15,
    },
    {
      author: "scent.zip",
      avatar: avatarYeeun,
      text: "잔향이 차분해서 가을에도 잘 어울리겠네요.",
      likes: 7,
    },
  ],
  "review-4": [
    {
      author: "바닐라구름",
      avatar: avatarYeeun,
      text: "니트 입는 날 꼭 시도해보고 싶어요.",
      likes: 21,
    },
    {
      author: "오늘의향",
      avatar: avatarHaesu,
      text: "달콤하지만 답답하지 않은 조합 같아요!",
      likes: 13,
    },
  ],
  "question-1": [
    {
      author: "과일향러버",
      avatar: avatarHaesu,
      text: "로에베 아구아 엘라 추천해요. 상큼하고 맑아요!",
      likes: 32,
    },
    {
      author: "향수초보",
      avatar: avatarYeeun,
      text: "올리브영에서 아쿠아 계열도 시향해보세요.",
      likes: 12,
    },
  ],
  "question-2": [
    {
      author: "office_scent",
      avatar: avatarYeeun,
      text: "클린 웜 코튼은 사무실에서도 부담 없었어요.",
      likes: 27,
    },
    {
      author: "잔향노트",
      avatar: avatarHaesu,
      text: "가볍게 한 번만 뿌리면 블랑쉬도 괜찮아요.",
      likes: 16,
    },
  ],
};

export function CommentSheet({
  onClose,
  threadId,
}: {
  onClose: () => void;
  threadId: string;
}) {
  const [message, setMessage] = useState("");
  const [comments, setComments] = useState(() =>
    (commentThreads[threadId] ?? []).map((comment, index) => ({
      ...comment,
      id: `${threadId}-${index}`,
      isLiked: false,
    })),
  );

  return (
    <div className="fixed inset-0 z-[80]" onClick={onClose}>
      <section
        aria-label="댓글"
        aria-modal="true"
        className="animate-[sheetUp_240ms_ease-out] absolute bottom-0 left-1/2 flex h-[560px] max-h-[85dvh] w-full max-w-[430px] -translate-x-1/2 flex-col overflow-hidden rounded-t-2xl bg-off-white shadow-[0_-3px_9.9px_rgba(0,0,0,0.1)]"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
      >
        <button
          aria-label="댓글창 닫기"
          className="mx-auto mt-3.5 h-4 w-16"
          onClick={onClose}
          type="button"
        >
          <span className="mx-auto block h-1 w-8 rounded-3xl bg-light-grey" />
        </button>

        <div className="mt-3 flex h-12 items-center border-b border-light-grey px-5">
          <h2 className="text-base font-medium tracking-[-0.02em]">댓글</h2>
        </div>

        <div className="flex-1 space-y-7 overflow-y-auto px-5 py-[30px]">
          {comments.map((comment) => (
            <article className="flex items-start gap-3.5" key={comment.id}>
              <img
                className="size-[26px] rounded-full object-cover"
                src={comment.avatar}
                alt=""
              />
              <div>
                <p className="text-sm tracking-[-0.02em] text-grey">
                  {comment.author}
                </p>
                <p className="mt-1 text-sm tracking-[-0.02em]">
                  {comment.text}
                </p>
                <div className="mt-[16px] flex items-center text-xs font-medium">
                  <button
                    aria-label={`${comment.text} 좋아요 ${comment.isLiked ? "취소" : "누르기"}`}
                    aria-pressed={comment.isLiked}
                    className={`flex items-center gap-1 ${comment.isLiked ? "text-point-orange" : "text-off-black"}`}
                    onClick={() =>
                      setComments((current) =>
                        current.map((item) =>
                          item.id === comment.id
                            ? {
                                ...item,
                                isLiked: !item.isLiked,
                                likes: item.likes + (item.isLiked ? -1 : 1),
                              }
                            : item,
                        ),
                      )
                    }
                    type="button"
                  >
                    <Heart
                      fill={comment.isLiked ? "currentColor" : "none"}
                      size={14}
                      strokeWidth={1.5}
                    />
                    {comment.likes}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <form
          className="flex items-end gap-2.5 border-t border-light-grey px-5 pb-[30px] pt-4"
          onSubmit={(event) => {
            event.preventDefault();
            const nextMessage = message.trim();
            if (!nextMessage) return;
            setComments((current) => [
              ...current,
              {
                id: crypto.randomUUID(),
                author: myProfile.name,
                avatar: myProfile.avatar,
                text: nextMessage,
                likes: 0,
                isLiked: false,
              },
            ]);
            setMessage("");
          }}
        >
          <input
            aria-label="댓글 입력"
            className="h-[42px] min-w-0 flex-1 rounded-[10px] border border-light-grey px-[18px] text-[13px] outline-none placeholder:text-grey focus:border-off-black"
            onChange={(event) => setMessage(event.target.value)}
            placeholder="댓글 작성하기"
            value={message}
          />
          <button
            aria-label="댓글 전송"
            className="flex size-[50px] shrink-0 items-center justify-center rounded-full bg-off-black text-white"
            type="submit"
          >
            <Send size={18} />
          </button>
        </form>
      </section>
    </div>
  );
}

// 사진 위 제품 태그 — 빨간 점을 누르면 라벨이 숨겨지고 다시 누르면 나타남
function ProductTag({
  tag,
  dotSrc,
}: {
  tag: { id: number; x: number; y: number };
  dotSrc: string;
}) {
  const [labelVisible, setLabelVisible] = useState(true);
  const tagged = perfumeById[tag.id];

  return (
    // (x, y) = 제품 끝(뚜껑) 지점 → 점을 찍고 라벨은 그 위에 표시
    // 앞쪽(아래=y가 큰) 제품의 태그가 위로 겹치도록 z-index를 y에 비례
    <div
      className="absolute flex -translate-x-1/2 -translate-y-full flex-col items-center"
      style={{ left: tag.x, top: tag.y, zIndex: Math.round(tag.y) }}
    >
      {labelVisible && (
        <div className="flex items-center gap-2 rounded-lg border-[0.8px] border-light-grey bg-white p-2">
          <span className="flex size-8 items-center justify-center overflow-hidden rounded-[6px] bg-[#ededed]">
            <img
              className="max-h-[30px] max-w-[30px] object-contain"
              src={tagged?.image ?? productOverlayThumbnail}
              alt=""
            />
          </span>
          <span className="flex flex-col gap-1 whitespace-nowrap text-xs leading-none tracking-[-0.02em]">
            <span className="font-medium text-[#888]">
              {tagged?.brand ?? "Jo Malone London"}
            </span>
            <span className="font-bold text-[#171717]">
              {tagged?.name ?? "블랙베리 앤 베이 코롱"}
            </span>
          </span>
        </div>
      )}
      <button
        aria-label={labelVisible ? "제품 태그 숨기기" : "제품 태그 보기"}
        aria-pressed={labelVisible}
        className="mt-1 flex size-3 items-center justify-center"
        onClick={() => setLabelVisible((visible) => !visible)}
        type="button"
      >
        <img aria-hidden="true" className="size-full" src={dotSrc} alt="" />
      </button>
    </div>
  );
}

export function Post({ index }: { index: number }) {
  const post = posts[index];
  const [activeSlide, setActiveSlide] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(42);
  const [isSaved, setIsSaved] = useState(false);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  // 데스크탑 마우스 드래그로 이미지 캐러셀 넘기기 (모바일은 기본 터치 스와이프)
  const carouselRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ isDown: false, startX: 0, scrollLeft: 0 });
  const actions = (
    <div className="flex h-6 w-full items-center justify-between">
      <div className="flex items-center gap-2.5 text-sm font-medium tracking-[-0.02em]">
        <span className="flex items-center gap-[5px]">
          <HeartButton
            aria-label={`${post.title} 좋아요 ${isLiked ? "취소" : "누르기"}`}
            className="flex size-6 items-center justify-center"
            isSelected={isLiked}
            onClick={() => {
              setLikeCount((count) => count + (isLiked ? -1 : 1));
              setIsLiked((liked) => !liked);
            }}
          />
          {likeCount}
        </span>
        <button
          aria-label={`${post.title} 댓글 보기`}
          className="flex items-center gap-[5px]"
          onClick={() => setIsCommentsOpen(true)}
          type="button"
        >
          <MessageCircle size={24} />8
        </button>
      </div>
      <button
        aria-label={`${post.title} ${isSaved ? "저장 취소" : "저장"}`}
        aria-pressed={isSaved}
        className={`flex size-6 items-center justify-center ${isSaved ? "text-point-orange" : "text-off-black"}`}
        onClick={() => setIsSaved((saved) => !saved)}
        type="button"
      >
        <Bookmark fill={isSaved ? "currentColor" : "none"} size={24} />
      </button>
    </div>
  );
  return (
    <article className="px-5" data-node-id={`community-post-${index + 1}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <img
            className="size-[42px] rounded-full object-cover"
            src={post.avatar}
            alt=""
          />
          <div>
            <p className="text-base font-medium tracking-[-0.02em]">
              {post.author}
            </p>
            <p className="text-xs font-medium tracking-[-0.02em] text-grey">
              {post.time}
            </p>
          </div>
        </div>
        <MoreHorizontal size={24} />
      </div>
      <div className="mt-6 flex flex-col items-center">
        <div
          className="no-scrollbar relative isolate h-[430px] w-full cursor-grab select-none snap-x snap-mandatory overflow-x-auto overflow-y-hidden rounded-lg active:cursor-grabbing"
          onPointerDown={(event) => {
            if (event.pointerType !== "mouse" || !carouselRef.current) return;
            // 태그 점(버튼) 위에서는 드래그를 시작하지 않아 클릭이 그대로 동작하게 함
            if ((event.target as HTMLElement).closest("button")) return;
            drag.current = {
              isDown: true,
              startX: event.clientX,
              scrollLeft: carouselRef.current.scrollLeft,
            };
            carouselRef.current.setPointerCapture(event.pointerId);
          }}
          onPointerMove={(event) => {
            if (!drag.current.isDown || !carouselRef.current) return;
            event.preventDefault();
            carouselRef.current.scrollLeft =
              drag.current.scrollLeft - (event.clientX - drag.current.startX);
          }}
          onPointerUp={(event) => {
            drag.current.isDown = false;
            carouselRef.current?.releasePointerCapture(event.pointerId);
          }}
          onScroll={(event) =>
            setActiveSlide(Math.round(event.currentTarget.scrollLeft / 400))
          }
          ref={carouselRef}
          style={{ scrollSnapType: drag.current.isDown ? "none" : undefined }}
        >
          <div className="flex h-full w-max gap-2.5">
            {post.images.map((image) => (
              <div
                className="relative h-full w-[390px] shrink-0 snap-start overflow-hidden rounded-lg"
                key={image.src}
              >
                <img
                  className={`h-full w-full ${image.fit}`}
                  draggable={false}
                  src={image.src}
                  alt="향수 커뮤니티 리뷰"
                />
                {/* 슬라이드마다 사진 속 향수 태그 + 점 (점 클릭 시 라벨 토글) */}
                {image.tags.map((tag) => (
                  <ProductTag
                    dotSrc={index === 1 ? plusImageTwo : plusImageOne}
                    key={tag.id}
                    tag={tag}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
        {post.images.length > 1 && (
          <div className="relative mt-3 h-0.5 w-[160px] bg-grey">
            <div
              className="absolute left-0 top-0 h-0.5 bg-off-black transition-transform duration-200"
              style={{
                width: `${160 / post.images.length}px`,
                transform: `translateX(${activeSlide * (160 / post.images.length)}px)`,
              }}
            />
          </div>
        )}
      </div>
      <div className="mt-6">{actions}</div>
      <div className="mt-6">
        <span className="inline-flex h-5 items-center rounded bg-[#ffede6] px-2 text-[10px] font-semibold tracking-[-0.04em] text-[#ff4800]">
          추천해요
        </span>
        <h3 className="mt-1.5 text-base font-semibold tracking-[-0.02em]">
          {post.title}
        </h3>
        <p className="mt-2.5 text-sm leading-normal tracking-[-0.02em] text-subtext">
          {post.body}
        </p>
        <div className="mt-3 flex gap-2.5 whitespace-nowrap text-sm tracking-[-0.02em] text-subtext">
          {post.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
      {isCommentsOpen && (
        <CommentSheet
          onClose={() => setIsCommentsOpen(false)}
          threadId={`review-${index + 1}`}
        />
      )}
    </article>
  );
}

export function CommunityPage() {
  return (
    <PageLayout
      title="커뮤니티"
      headerAction={<HeaderActions showSearch={false} showWrite />}
      headerTitleClassName="!text-xl !font-semibold !leading-[1.08] !tracking-[-0.03em]"
      contentClassName="gap-0"
    >
      <Tabs />
      <div className="mt-10 flex flex-col gap-16 pb-8">
        <HotReviews />
        {posts.map((post, index) => (
          <Post index={index} key={`${post.author}-${post.title}`} />
        ))}
      </div>
    </PageLayout>
  );
}
