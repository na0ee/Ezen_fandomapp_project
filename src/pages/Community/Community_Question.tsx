import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { PageLayout } from "../../components/common/PageLayout";
import { HeartButton } from "../../components/ui/HeartButton";
import { CommentSheet } from "./CommunityPage";
import avatarYeeun from "../../assets/community/figma/avatar-yeeun.png";

import { HeaderActions } from "../../components/common/HeaderActions";

type PostProfile = {
  avatar: string;
  name: string;
  time: string;
};

const questionCards = [
  {
    category: "free",
    threadId: "question-1",
    title: "향수 추천해주세요",
    description:
      "사과향이나 오렌지같은 약간 청순하면서 발랄한? 그런 과일향이 필요해요!! 아시는 분 추천해주세요 ㅜㅜ 최소 3만원 이하로 해주시면 감사하겠습니다! 청순발랄한 향이라면 과일이 아니어도 상관 없어요!",
    likes: 42,
    replies: 8,
    profile: null,
  },
  {
    category: "free",
    threadId: "question-2",
    title: "회사에서 뿌려도 부담 없는 향수 있을까요?",
    description:
      "회사 가는데 비싼거 뿌리기엔 아깝고 싼거 뿌리기엔 기분이 안 나고 적당한거 찾기가 너무 어려워요 ㅠㅠ",
    likes: 32,
    replies: 12,
    profile: {
      avatar: avatarYeeun,
      name: "예은티비",
      time: "5분 전",
    },
  },
];

type BoardFilter = "all" | "qna" | "free";

function CommunityTabs() {
  return (
    <div className="border-b-[0.8px] border-light-grey bg-off-white px-5">
      <nav className="flex items-start gap-6 pt-4" aria-label="커뮤니티 메뉴">
        <Link
          className="flex h-[30px] items-start justify-center"
          to="/community"
        >
          <span className="whitespace-nowrap text-base font-medium leading-normal tracking-[-0.02em] text-grey">
            후기 · 리뷰
          </span>
        </Link>
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center justify-center">
            <span className="whitespace-nowrap text-base font-medium leading-normal tracking-[-0.02em] text-off-black">
              질문 게시판
            </span>
          </div>
          <span className="h-0.5 w-full bg-point-orange" aria-hidden="true" />
        </div>
      </nav>
    </div>
  );
}

function FilterTabs({
  activeFilter,
  onChange,
}: {
  activeFilter: BoardFilter;
  onChange: (filter: BoardFilter) => void;
}) {
  const filters: { id: BoardFilter; label: string }[] = [
    { id: "all", label: "모아보기" },
    { id: "qna", label: "Q&A" },
    { id: "free", label: "자유게시판" },
  ];

  return (
    <div className="flex items-center gap-1.5">
      {filters.map((filter) => {
        const isActive = activeFilter === filter.id;
        return (
          <button
            aria-pressed={isActive}
            className={`rounded-full px-[14px] py-2 text-xs font-medium tracking-[-0.02em] ${
              isActive
                ? "bg-off-black text-off-white"
                : "border-[0.8px] border-light-grey text-grey"
            }`}
            key={filter.id}
            onClick={() => onChange(filter.id)}
            type="button"
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}

function QuestionCard({
  title,
  description,
  likes,
  replies,
  threadId,
  profile,
}: {
  title: string;
  description: string;
  likes: number;
  replies: number;
  threadId: string;
  profile: PostProfile | null;
}) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);

  return (
    <article className="flex w-full flex-col items-end justify-center gap-5 rounded-[16px] border-[0.5px] border-light-grey bg-off-white p-4">
      {profile && (
        <div className="flex w-full items-center gap-2.5">
          <img
            className="size-[42px] rounded-full object-cover"
            src={profile.avatar}
            alt=""
          />
          <div className="flex flex-col">
            <span className="text-base font-medium leading-normal tracking-[-0.02em] text-off-black">
              {profile.name}
            </span>
            <span className="text-xs leading-normal tracking-[-0.02em] text-grey">
              {profile.time}
            </span>
          </div>
        </div>
      )}
      <div className="flex w-full flex-col gap-1.5">
        <h2 className="text-base font-semibold leading-normal tracking-[-0.02em] text-off-black">
          {title}
        </h2>
        <p className="text-sm leading-[1.4] tracking-[-0.02em] text-subtext">
          {description}
        </p>
      </div>
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1 text-xs font-medium tracking-[-0.02em] text-off-black">
          <HeartButton
            aria-label={`${title} 좋아요 ${isLiked ? "취소" : "누르기"}`}
            className="flex size-3.5 items-center justify-center"
            iconSize={14}
            isSelected={isLiked}
            onClick={() => {
              setLikeCount((count) => count + (isLiked ? -1 : 1));
              setIsLiked((liked) => !liked);
            }}
          />
          {likeCount}
        </span>
        <button
          aria-label={`${title} 댓글 보기`}
          className="flex items-center gap-1 text-xs font-medium tracking-[-0.02em] text-off-black"
          onClick={() => setIsCommentsOpen(true)}
          type="button"
        >
          <MessageCircle className="size-3.5" strokeWidth={1.6} />
          {replies}
        </button>
      </div>
      {isCommentsOpen && (
        <CommentSheet
          onClose={() => setIsCommentsOpen(false)}
          threadId={threadId}
        />
      )}
    </article>
  );
}

function PollOption({
  label,
  percent,
  progress,
  active = false,
  onSelect,
}: {
  label: string;
  percent: number;
  progress: number;
  active?: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      aria-pressed={active}
      className={`relative h-[52px] w-full overflow-hidden rounded-lg border-[0.8px] ${
        active ? "border-point-orange" : "border-light2-grey"
      }`}
      onClick={onSelect}
      type="button"
    >
      <div
        className={`absolute inset-y-0 left-0 rounded-lg ${active ? "bg-[#ffede6]" : "bg-light2-grey"}`}
        style={{ width: `${percent * progress}%` }}
      />
      <div className="relative z-10 flex h-full items-center justify-between px-4">
        <span
          className={`whitespace-nowrap text-sm font-medium leading-[1.4] tracking-[-0.02em] ${
            active ? "text-off-black" : "text-grey"
          }`}
        >
          {label}
        </span>
        <span
          className={`whitespace-nowrap text-sm font-medium leading-[1.4] tracking-[-0.02em] ${
            active ? "text-point-orange" : "text-grey"
          }`}
        >
          {Math.round(percent * progress)}%
        </span>
      </div>
    </button>
  );
}

function PollChoice({
  label,
  onSelect,
}: {
  label: string;
  onSelect: () => void;
}) {
  return (
    <button
      className="flex h-[52px] w-full items-center rounded-lg border-[0.8px] border-light-grey p-4 text-left text-sm font-medium leading-[1.4] tracking-[-0.02em] text-off-black"
      type="button"
      onClick={onSelect}
    >
      {label}
    </button>
  );
}

function PollCard({
  showProfile = false,
  title,
  options,
}: {
  showProfile?: boolean;
  title: string;
  options: [string, string];
}) {
  const [selectedPoll, setSelectedPoll] = useState<string | null>(null);
  const [pollProgress, setPollProgress] = useState(0);

  useEffect(() => {
    if (!selectedPoll) return;

    setPollProgress(0);
    const duration = 750;
    const start = performance.now();
    let animationFrame = 0;

    const animate = (now: number) => {
      const elapsed = Math.min((now - start) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - elapsed, 3);
      setPollProgress(easedProgress);
      if (elapsed < 1) animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [selectedPoll]);

  return (
    <section className="rounded-lg border-[0.8px] border-[#f0f0f0] bg-off-white p-4">
      <div className="flex flex-col gap-4">
        <span className="flex h-5 w-fit items-center justify-center rounded px-2 text-[10px] font-semibold tracking-[-0.04em] text-point-orange bg-[#ffede6]">
          향수 Q&A
        </span>
        {showProfile ? (
          <div className="flex items-center gap-2.5">
            <img
              className="size-[42px] rounded-full object-cover"
              src={avatarYeeun}
              alt=""
            />
            <div className="flex flex-col">
              <span className="text-base font-medium leading-normal tracking-[-0.02em] text-off-black">
                예은티비
              </span>
              <span className="text-xs leading-normal tracking-[-0.02em] text-grey">
                5분 전
              </span>
            </div>
          </div>
        ) : (
          <p className="text-sm leading-[1.4] tracking-[-0.02em] text-subtext">
            익명의 향덕
          </p>
        )}
        <h2 className="text-lg font-semibold leading-normal tracking-[-0.02em] text-off-black">
          {title}
        </h2>
      </div>
      <div className="mt-6 flex flex-col gap-4">
        {selectedPoll ? (
          <>
            <PollOption
              label={options[0]}
              percent={60}
              progress={pollProgress}
              active={selectedPoll === options[0]}
              onSelect={() => setSelectedPoll(options[0])}
            />
            <PollOption
              label={options[1]}
              percent={40}
              progress={pollProgress}
              active={selectedPoll === options[1]}
              onSelect={() => setSelectedPoll(options[1])}
            />
          </>
        ) : (
          <>
            <PollChoice
              label={options[0]}
              onSelect={() => setSelectedPoll(options[0])}
            />
            <PollChoice
              label={options[1]}
              onSelect={() => setSelectedPoll(options[1])}
            />
          </>
        )}
      </div>
    </section>
  );
}

export default function CommunityQuestion() {
  const [activeFilter, setActiveFilter] = useState<BoardFilter>("all");
  const visibleCards =
    activeFilter === "all"
      ? questionCards
      : questionCards.filter((card) => card.category === activeFilter);

  return (
    <PageLayout
      title="커뮤니티"
      headerAction={
        <HeaderActions
          showSearch={false}
          showWrite
          writeTo="/community/question/write"
        />
      }
      headerTitleClassName="!text-2xl !font-semibold !leading-[1.08] !tracking-[-0.03em]"
      contentClassName="gap-0"
    >
      <CommunityTabs />
      <div className="px-5 pt-6 pb-8">
        <section className="flex flex-col gap-4">
          <FilterTabs activeFilter={activeFilter} onChange={setActiveFilter} />
          {visibleCards.length > 0 && (
            <div className="flex flex-col gap-3">
              {visibleCards.map((card) => (
                <QuestionCard key={card.title} {...card} />
              ))}
            </div>
          )}
        </section>
        {activeFilter !== "free" && (
          <div className={activeFilter === "qna" ? "mt-4" : "mt-16"}>
            <div className="flex flex-col gap-3">
              <PollCard
                showProfile
                title="출근할 때 뿌릴 향수, 어떤 게 더 좋을까요?"
                options={[
                  "메종 마르지엘라 레이지 선데이 모닝",
                  "바이레도 블랑쉬",
                ]}
              />
              <PollCard
                title="여름용 데일리 향수, 어떤 게 더 좋을까요?"
                options={["조말론 우드 세이지 앤 씨솔트", "딥디크 오 데 썽"]}
              />
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
