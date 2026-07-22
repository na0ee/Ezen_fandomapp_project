import { PartyPopper } from "lucide-react";
import { BottomNavigation } from "../components/common/BottomNavigation";
import { BackHeader } from "../components/common/BackHeader";
import { HeaderActions } from "../components/common/HeaderActions";
import { Chip } from "../components/ui/Chip";

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
  },
  {
    title: "Gift with AI",
    description: "상대와 어울리는 향수, AI가 찾아드려요 · 참여 시 최대 95p!",
    images: [
      { src: assets.aiBase, className: "absolute inset-0 h-full w-full object-cover" },
      { src: assets.aiOverlay, className: "absolute inset-0 h-full w-full object-cover" },
    ],
  },
  {
    title: "My Layer",
    description: "첫 진단 100p, 취향 공유하면 추가 포인트까지!",
    images: [{ src: assets.myLayer, className: "absolute inset-0 h-full w-full object-cover" }],
    complete: true,
  },
];

function ChallengeHeader() {
  return <BackHeader title="챌린지" action={<HeaderActions />} />;
}

function ChallengeListCard({ item }: { item: (typeof challengeItems)[number] }) {
  return (
    <article className="relative h-[260px] w-full overflow-hidden rounded-[16px] shadow-[5px_4px_4px_rgba(0,0,0,0.06)]">
      {item.images.map((image) => (
        <img alt="" className={image.className} key={`${item.title}-${image.src}`} src={image.src} />
      ))}
      <div className="absolute inset-0 rounded-[16px] bg-gradient-to-t from-[rgba(26,26,26,0.5)] to-[rgba(26,26,26,0)]" />
      <div className="absolute inset-x-2.5 bottom-6 flex items-end justify-between">
        <div className="w-[294px] text-off-white">
          <h2 className="text-xl font-bold leading-none tracking-[-0.02em]">{item.title}</h2>
          <p className="mt-[7px] text-xs font-normal leading-none tracking-[-0.02em]">{item.description}</p>
        </div>
        <Chip className="shrink-0 font-normal" label="참여하기" variant="filled" />
      </div>
      {item.complete && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="relative flex flex-col items-center text-point-orange">
            <PartyPopper aria-hidden="true" size={36} strokeWidth={1.8} />
            <p className="mt-2 text-2xl font-semibold leading-[1.08] tracking-[-0.03em]">
              챌린지 완료!
            </p>
          </div>
        </div>
      )}
    </article>
  );
}

export function ChallengeListPage() {
  return (
    <main className="min-h-dvh bg-off-white text-off-black">
      <div className="relative mx-auto min-h-dvh w-full max-w-[430px] overflow-x-hidden bg-off-white">
        <ChallengeHeader />
        <section className="flex flex-col items-center pb-[132px] pt-[78px]">
          <div className="flex w-[390px] flex-col gap-[14px]">
            {challengeItems.map((item) => (
              <ChallengeListCard item={item} key={item.title} />
            ))}
          </div>
        </section>
        <BottomNavigation />
      </div>
    </main>
  );
}
