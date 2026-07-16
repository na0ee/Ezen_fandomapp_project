import { useState } from "react";
import { MessageCircle, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { PageLayout } from "../../components/common/PageLayout";
import { HeartButton } from "../../components/ui/HeartButton";
import headerBell from "../../assets/community/figma/header-bell.svg";
import headerPerfume from "../../assets/community/figma/header-perfume.svg";
import headerSearch from "../../assets/community/figma/header-search.svg";

const questionCards = [
  {
    title: "향수 추천해주세요",
    description:
      "사과향이나 오렌지같은 약간 청순하면서 발랄한? 그런 과일향이 필요해요!! 아시는 분 추천해주세요 ㅜㅜ 최소 3만원 이하로 해주시면 감사하겠습니다! 청순발랄한 향이라면 과일이 아니어도 상관 없어요!",
    likes: 42,
    replies: 8,
  },
  {
    title: "회사에서 뿌려도 부담 없는 향수 있을까요?",
    description:
      "회사 가는데 비싼거 뿌리기엔 아깝고 싼거 뿌리기엔 기분이 안 나고 적당한거 찾기가 너무 어려워요 ㅠㅠ",
    likes: 32,
    replies: 12,
  },
];

function HeaderActions() {
  return (
    <div className="flex items-start justify-end gap-5">
      <Link aria-label="검색" className="h-7 w-7" to="/search">
        <img className="size-full" src={headerSearch} alt="" />
      </Link>
      <img className="h-7 w-7" src={headerBell} alt="알림" />
      <Link aria-label="향수 카테고리" className="relative size-7 overflow-hidden" to="/category">
        <img className="absolute inset-[12.5%] h-3/4 w-3/4 max-w-none" src={headerPerfume} alt="향수" />
      </Link>
    </div>
  );
}

function CommunityTabs() {
  return (
    <div className="border-b-[0.8px] border-light-grey bg-off-white px-5">
      <nav className="flex items-start gap-6 pt-4" aria-label="커뮤니티 메뉴">
        <Link className="flex h-[30px] items-start justify-center" to="/community">
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

function FilterTabs() {
  return (
    <div className="flex items-center gap-1.5">
      <span className="rounded-full bg-off-black px-[14px] py-2 text-xs font-medium tracking-[-0.02em] text-off-white">
        모아보기
      </span>
      <span className="rounded-full border-[0.8px] border-light-grey px-[14px] py-2 text-xs font-medium tracking-[-0.02em] text-grey">
        Q&A
      </span>
      <span className="rounded-full border-[0.8px] border-light-grey px-[14px] py-2 text-xs font-medium tracking-[-0.02em] text-grey">
        자유게시판
      </span>
    </div>
  );
}

function QuestionCard({
  title,
  description,
  likes,
  replies,
}: {
  title: string;
  description: string;
  likes: number;
  replies: number;
}) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <article className="flex w-full flex-col items-end justify-center gap-5 rounded-[16px] border-[0.5px] border-light-grey bg-off-white p-4">
      <div className="flex w-full flex-col gap-1.5">
        <h2 className="text-base font-semibold leading-normal tracking-[-0.02em] text-off-black">{title}</h2>
        <p className="text-sm leading-[1.4] tracking-[-0.02em] text-[#4d4d4d]">{description}</p>
      </div>
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1 text-xs font-medium tracking-[-0.02em] text-off-black">
          <HeartButton
            aria-label={`${title} 좋아요 ${isLiked ? "취소" : "누르기"}`}
            className="flex size-3.5 items-center justify-center"
            iconSize={14}
            isSelected={isLiked}
            onClick={() => setIsLiked((liked) => !liked)}
          />
          {likes}
        </span>
        <span className="flex items-center gap-1 text-xs font-medium tracking-[-0.02em] text-off-black">
          <MessageCircle className="size-3.5" strokeWidth={1.6} />
          {replies}
        </span>
      </div>
    </article>
  );
}

function PollOption({
  label,
  percent,
  width,
  active = false,
}: {
  label: string;
  percent: string;
  width: string;
  active?: boolean;
}) {
  return (
    <div
      className={`relative h-[52px] w-full overflow-hidden rounded-lg border-[0.8px] ${
        active ? "border-point-orange" : "border-light2-grey"
      }`}
    >
      <div
        className={`absolute inset-y-0 left-0 rounded-lg ${active ? "bg-[#ffede6]" : "bg-light2-grey"}`}
        style={{ width }}
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
          {percent}
        </span>
      </div>
    </div>
  );
}

function PollChoice({ label, onSelect }: { label: string; onSelect: () => void }) {
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

function PollCard() {
  const [selectedPoll, setSelectedPoll] = useState<string | null>(null);

  return (
    <section className="rounded-lg border-[0.8px] border-[#f0f0f0] bg-off-white p-4">
      <div className="flex flex-col gap-4">
        <span className="flex h-5 w-fit items-center justify-center rounded px-2 text-[10px] font-semibold tracking-[-0.04em] text-point-orange bg-[#ffede6]">
          향수 Q&A
        </span>
        <div className="flex flex-col gap-1">
          <p className="text-sm leading-[1.4] tracking-[-0.02em] text-[#4d4d4d]">익명의 향덕님이 하나 골라달래요</p>
          <h2 className="text-lg font-semibold leading-normal tracking-[-0.02em] text-off-black">
            여름용 데일리 향수, 어떤 게 더 좋을까요?
          </h2>
        </div>
      </div>
      <div className="mt-6 flex flex-col gap-4">
        {selectedPoll ? (
          <>
            <PollOption
              label="조말론 우드 세이지 앤 씨솔트"
              percent="60%"
              width="60%"
              active={selectedPoll === "조말론 우드 세이지 앤 씨솔트"}
            />
            <PollOption
              label="딥디크 오 데 썽"
              percent="40%"
              width="40%"
              active={selectedPoll === "딥디크 오 데 썽"}
            />
          </>
        ) : (
          <>
            <PollChoice label="조말론 우드 세이지 앤 씨솔트" onSelect={() => setSelectedPoll("조말론 우드 세이지 앤 씨솔트")} />
            <PollChoice label="딥디크 오 데 썽" onSelect={() => setSelectedPoll("딥디크 오 데 썽")} />
          </>
        )}
      </div>
    </section>
  );
}

function WriteButton() {
  return (
    <Link
      className="fixed bottom-[104px] left-[calc(50%+117px)] z-40 flex items-center justify-center gap-1 rounded-full bg-off-black py-2 pl-2.5 pr-3.5 text-sm font-medium tracking-[-0.02em] text-off-white"
      to="/community/write"
    >
      <Plus className="size-3.5" strokeWidth={2} />
      글쓰기
    </Link>
  );
}

export default function CommunityQuestion() {
  return (
    <PageLayout title="커뮤니티" headerAction={<HeaderActions />} contentClassName="gap-0">
      <CommunityTabs />
      <div className="px-5 pt-6 pb-8">
        <section className="flex flex-col gap-4">
          <FilterTabs />
          <div className="flex flex-col gap-[13px]">
            {questionCards.map((card) => (
              <QuestionCard key={card.title} {...card} />
            ))}
          </div>
        </section>
        <div className="mt-16">
          <PollCard />
        </div>
      </div>
      <WriteButton />
    </PageLayout>
  );
}
