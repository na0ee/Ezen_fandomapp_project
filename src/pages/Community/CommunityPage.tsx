import { useState } from "react";
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
import tagFour from "../../assets/community/figma/tag-four.png";
import tagOne from "../../assets/community/figma/tag-one.png";
import tagThree from "../../assets/community/figma/tag-three.png";
import tagTwo from "../../assets/community/figma/tag-two.png";
import { HeaderActions } from "../../components/common/HeaderActions";
import { myProfile } from "../../data/myProfile";

const carouselImages = [
  { src: postImageOne, fit: "object-bottom" },
  { src: carouselTwo, fit: "object-cover" },
  { src: carouselThree, fit: "object-cover" },
  { src: carouselFour, fit: "object-cover" },
];
const tagImagesOne = [
  { src: tagOne, className: "h-[69px] w-[52px]" },
  { src: tagTwo, className: "h-[55px] w-[38px]" },
  { src: tagThree, className: "h-[53px] w-[36px]" },
];
const tagImagesTwo = [{ src: tagFour, className: "h-[69px] w-[52px]" }];

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
    images: carouselImages,
    products: tagImagesOne,
  },
  {
    author: "최해수",
    time: "30분 전",
    avatar: avatarHaesu,
    title: "하얀 종이에 스며든 포근한 머스크 향",
    body: "처음엔 깨끗하고 보송한 느낌으로 시작하고 시간이 지날수록 피부에 은은하게 남는 머스크 향이 올라와요. 향이 강하게 튀기보다는 가까이 있을 때 부드럽게 느껴지는 향이라 데일리로 쓰기 좋아요.",
    tags: ["# 머스크향", "# 살냄새향수", "# 보송한향", "# 은은한향"],
    images: [
      { src: postImageTwo, fit: "object-cover" },
      ...carouselImages.slice(1),
    ],
    products: [tagImagesTwo[0], ...tagImagesOne.slice(1)],
  },
  {
    author: "향기로운하루",
    time: "1시간 전",
    avatar: avatarYeeun,
    title: "비 오는 날 더 생각나는 우디 향",
    body: "촉촉한 공기와 잘 어울리는 차분한 우디 향을 골라봤어요. 처음에는 싱그럽게 시작하지만 시간이 지나면 포근한 나무 향이 남아서 편안한 분위기를 만들어줘요.",
    tags: ["# 우디향", "# 비오는날", "# 차분한향", "# 데일리추천"],
    images: [
      carouselImages[2],
      carouselImages[3],
      carouselImages[0],
      carouselImages[1],
    ],
    products: tagImagesOne,
  },
  {
    author: "오늘의잔향",
    time: "2시간 전",
    avatar: avatarHaesu,
    title: "포근한 니트와 어울리는 달콤한 잔향",
    body: "부드러운 니트를 입은 날에는 은은하게 달콤한 향을 찾게 돼요. 부담스럽지 않은 바닐라와 깨끗한 머스크가 섞여 오래 머물러서 요즘 자주 손이 가는 조합이에요.",
    tags: ["# 바닐라향", "# 포근한향", "# 니트룩", "# 겨울향수"],
    images: [
      carouselImages[3],
      carouselImages[1],
      { src: postImageTwo, fit: "object-cover" },
      carouselImages[2],
    ],
    products: [tagImagesTwo[0], tagImagesOne[0], tagImagesOne[2]],
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

export function Post({ index }: { index: number }) {
  const post = posts[index];
  const [activeSlide, setActiveSlide] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(42);
  const [isSaved, setIsSaved] = useState(false);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const overlayPositions = [
    [
      { x: 51, y: 33 },
      { x: 206, y: 95 },
      { x: 146, y: 184 },
    ],
    [{ x: 179, y: 93 }],
    [{ x: 122, y: 74 }],
    [{ x: 64, y: 94 }],
  ][index];
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
          className="no-scrollbar relative h-[430px] w-full snap-x snap-mandatory overflow-x-auto overflow-y-hidden rounded-lg"
          onScroll={(event) =>
            setActiveSlide(Math.round(event.currentTarget.scrollLeft / 400))
          }
        >
          <div className="flex h-full w-max gap-2.5">
            {post.images.map(({ src, fit }) => (
              <img
                className={`h-full w-[390px] shrink-0 snap-start rounded-lg ${fit}`}
                src={src}
                alt="향수 커뮤니티 리뷰"
                key={src}
              />
            ))}
          </div>
          {overlayPositions.map((position, overlayIndex) => (
            <div
              className="absolute z-10"
              key={overlayIndex}
              style={{ left: position.x, top: position.y }}
            >
              <div className="flex items-center gap-2 rounded-lg border-[0.8px] border-light-grey bg-white p-2">
                <span className="flex size-8 items-center justify-center overflow-hidden rounded-[6px] bg-[#ededed]">
                  <img
                    className="max-h-[30px] max-w-[30px] object-contain"
                    src={productOverlayThumbnail}
                    alt=""
                  />
                </span>
                <span className="flex flex-col gap-1 whitespace-nowrap text-xs leading-none tracking-[-0.02em]">
                  <span className="font-medium text-[#888]">
                    Jo Malone London
                  </span>
                  <span className="font-bold text-[#171717]">
                    블랙베리 앤 베이 코롱
                  </span>
                </span>
              </div>
              <img
                aria-hidden="true"
                className="absolute left-1/2 top-full size-3 -translate-x-1/2 -translate-y-1/2"
                src={index === 1 ? plusImageTwo : plusImageOne}
                alt=""
              />
            </div>
          ))}
        </div>
        <div className="relative mt-3 h-0.5 w-[160px] bg-grey">
          <div
            className="absolute left-0 top-0 h-0.5 w-10 bg-off-black transition-transform duration-200"
            style={{ transform: `translateX(${activeSlide * 40}px)` }}
          />
        </div>
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
      <div className="mt-6 flex h-[70px] items-center justify-between overflow-hidden">
        <div className="flex gap-3">
          {post.products.map(({ src }) => (
            <div
              className="flex size-[68px] items-center justify-center rounded-lg border border-light-grey bg-white"
              key={src}
            >
              <img
                className="h-[46px] w-[32px] object-contain"
                src={src}
                alt="향수"
              />
            </div>
          ))}
        </div>
        <ChevronRight size={18} className="text-grey" />
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
      headerTitleClassName="!text-2xl !font-semibold !leading-[1.08] !tracking-[-0.03em]"
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
