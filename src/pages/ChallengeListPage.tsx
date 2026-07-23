import { PartyPopper } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BottomNavigation } from "../components/common/BottomNavigation";
import { HeaderActions } from "../components/common/HeaderActions";
import { BackHeader } from "../components/common/BackHeader";
import { Chip } from "../components/ui/Chip";

const CHALLENGE_REWARD_STORAGE_KEY = "layer:pendingChallengeReward";
const COMPLETED_CHALLENGES_STORAGE_KEY = "layer:completedChallenges";

type PendingChallengeReward = {
  message: string;
  title: string;
};

function extractPoints(description: string): number | null {
  const matches = [...description.matchAll(/(\d+)p/g)].map((match) => Number(match[1]));

  if (matches.length === 0) {
    return null;
  }

  return Math.max(...matches);
}

function buildRewardMessage(title: string, description: string): string {
  const points = extractPoints(description);

  return points
    ? `${title} 참여로 ${points}p가 적립되었습니다!`
    : `${title} 참여로 포인트가 적립되었습니다!`;
}

function buildRewardPayload(title: string, description: string): string {
  return JSON.stringify({
    message: buildRewardMessage(title, description),
    title,
  });
}

function getStoredCompletedChallengeTitles(): string[] {
  const storedTitles = sessionStorage.getItem(COMPLETED_CHALLENGES_STORAGE_KEY);

  if (!storedTitles) {
    return [];
  }

  try {
    const titles = JSON.parse(storedTitles);

    return Array.isArray(titles) ? titles.filter((title) => typeof title === "string") : [];
  } catch {
    return [];
  }
}

function isPageReload() {
  const navigationEntry = performance.getEntriesByType("navigation")[0] as
    | PerformanceNavigationTiming
    | undefined;

  return navigationEntry?.type === "reload";
}

const assets = Object.fromEntries(
  Object.entries({
    community: "/assets/figma/challenge-list-community.png",
    register: "/assets/figma/challenge-list-register.png",
    recommend: "/assets/figma/challenge-list-recommend.png",
    aiBase: "/assets/figma/challenge-list-ai-base.png",
    aiOverlay: "/assets/figma/challenge-list-ai-overlay.png",
    myLayer: "/assets/figma/challenge-list-mylayer.png",
  }).map(([key, path]) => [key, `${import.meta.env.BASE_URL}${path.slice(1)}`]),
) as Record<string, string>;

const challengeItems = [
  {
    title: "커뮤니티 이용하기",
    description: "질문·답변·리뷰 남기고 최대 75p까지",
    images: [{ src: assets.community, className: "absolute inset-0 h-full w-full object-cover" }],
    to: "/community",
  },
  {
    title: "내 향수 등록하기",
    description: "내 보유향수 첫 등록 시 30p, 등록할 때 마다 5p씩",
    images: [{ src: assets.register, className: "absolute inset-0 h-full w-full object-cover" }],
  },
  {
    title: "향수 추천하기",
    description: "다른 유저에게 어울리는 향을 찾아주고, 포인트 받자!",
    images: [{ src: assets.recommend, className: "absolute inset-0 h-full w-full object-cover" }],
    to: "/event/recommend-feed",
  },
  {
    title: "Gift with AI",
    description: "상대와 어울리는 향수, AI가 찾아드려요 · 참여 시 최대 95p!",
    images: [
      { src: assets.aiBase, className: "absolute inset-0 h-full w-full object-cover" },
      { src: assets.aiOverlay, className: "absolute inset-0 h-full w-full object-cover" },
    ],
    to: "/chatbot?intent=gift",
  },
  {
    title: "My Layer",
    description: "첫 진단 100p, 취향 공유하면 추가 포인트까지!",
    images: [{ src: assets.myLayer, className: "absolute inset-0 h-full w-full object-cover" }],
    to: "/onboarding/1",
  },
];

function ChallengeHeader() {
  return <BackHeader title="챌린지" action={<HeaderActions />} />;
}

function ChallengeListCard({
  completed,
  item,
}: {
  completed: boolean;
  item: (typeof challengeItems)[number];
}) {
  const cardClassName =
    "relative block h-[260px] w-full overflow-hidden rounded-[16px] shadow-[5px_4px_4px_rgba(0,0,0,0.06)]";

  const content = (
    <>
      {item.images.map((image) => (
        <img alt="" className={image.className} key={`${item.title}-${image.src}`} src={image.src} />
      ))}
      <div className="absolute inset-0 rounded-[16px] bg-gradient-to-t from-[rgba(26,26,26,0.5)] to-[rgba(26,26,26,0)]" />
      <div className="absolute inset-x-2.5 bottom-6 flex items-end justify-between">
        <div className="w-[294px] text-off-white">
          <h2 className="text-xl font-bold leading-none tracking-[-0.02em]">{item.title}</h2>
          <p className="mt-[7px] text-xs font-normal leading-none tracking-[-0.02em]">{item.description}</p>
        </div>
        {item.to ? (
          <Link
            className="shrink-0 rounded-chip bg-off-black px-3.5 py-[5px] text-xs font-normal leading-none tracking-[-0.02em] text-off-white"
            onClick={() =>
              sessionStorage.setItem(
                CHALLENGE_REWARD_STORAGE_KEY,
                buildRewardPayload(item.title, item.description),
              )
            }
            to={item.to}
          >
            참여하기
          </Link>
        ) : (
          <Chip className="shrink-0 font-normal" label="참여하기" variant="filled" />
        )}
      </div>
      {completed && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="relative flex flex-col items-center text-off-white">
            <PartyPopper aria-hidden="true" size={36} strokeWidth={1.8} />
            <p className="mt-2 text-2xl font-semibold leading-[1.08] tracking-[-0.02em]">
              챌린지 완료!
            </p>
          </div>
        </div>
      )}
    </>
  );

  return <article className={cardClassName}>{content}</article>;
}

function RewardDialog({ message, onClose }: { message: string | null; onClose: () => void }) {
  if (!message) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/35 px-10" onClick={onClose}>
      <section
        aria-label="포인트 지급"
        aria-modal="true"
        className="w-full max-w-[320px] rounded-[20px] bg-off-white px-6 py-7 text-center shadow-[0_18px_50px_rgba(0,0,0,0.22)]"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
      >
        <PartyPopper aria-hidden="true" className="mx-auto text-point-orange" size={32} strokeWidth={1.8} />
        <h2 className="mt-3 text-xl font-bold tracking-[-0.02em]">포인트 지급 완료</h2>
        <p className="mt-3 text-sm font-medium leading-[1.45] tracking-[-0.02em] text-grey">{message}</p>
        <button
          className="mt-6 h-12 w-full rounded-[32px] bg-off-black text-base font-bold tracking-[-0.02em] text-off-white"
          onClick={onClose}
          type="button"
        >
          확인
        </button>
      </section>
    </div>
  );
}

export function ChallengeListPage() {
  const [completedChallengeTitles, setCompletedChallengeTitles] = useState<string[]>(() =>
    isPageReload() ? [] : getStoredCompletedChallengeTitles(),
  );
  const [rewardMessage, setRewardMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isPageReload()) {
      sessionStorage.removeItem(CHALLENGE_REWARD_STORAGE_KEY);
      sessionStorage.removeItem(COMPLETED_CHALLENGES_STORAGE_KEY);
      setCompletedChallengeTitles([]);
      return;
    }

    const pendingReward = sessionStorage.getItem(CHALLENGE_REWARD_STORAGE_KEY);

    if (pendingReward) {
      sessionStorage.removeItem(CHALLENGE_REWARD_STORAGE_KEY);

      try {
        const reward = JSON.parse(pendingReward) as PendingChallengeReward;

        setRewardMessage(reward.message);
        setCompletedChallengeTitles((titles) => {
          const nextTitles = titles.includes(reward.title) ? titles : [...titles, reward.title];

          sessionStorage.setItem(COMPLETED_CHALLENGES_STORAGE_KEY, JSON.stringify(nextTitles));

          return nextTitles;
        });
      } catch {
        setRewardMessage(pendingReward);
      }
    }
  }, []);

  return (
    <main className="min-h-dvh bg-off-white text-off-black">
      <div className="relative mx-auto min-h-dvh w-full max-w-[430px] overflow-x-hidden bg-off-white">
        <ChallengeHeader />
        <section className="wrap flex flex-col items-center px-5 pb-[132px] pt-[calc(var(--app-header-height)+24px)]">
          <div className="flex w-full flex-col gap-[10px]">
            {challengeItems.map((item) => (
              <ChallengeListCard
                completed={completedChallengeTitles.includes(item.title)}
                item={item}
                key={item.title}
              />
            ))}
          </div>
        </section>
        <BottomNavigation />
      </div>
      <RewardDialog message={rewardMessage} onClose={() => setRewardMessage(null)} />
    </main>
  );
}
