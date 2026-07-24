
import { useState } from "react";
import { useParams } from "react-router-dom";
import { HeaderActions } from "../components/common/HeaderActions";
import { BackHeader } from "../components/common/BackHeader";
import { CtaButton } from "../components/ui/CtaButton";
import { applyRaffle, useRaffleApplied } from "../store/raffleStore";

const assets = Object.fromEntries(
  Object.entries({
    hero: "/assets/figma/raffle-detail-hero.png",
    contentOne: "/assets/figma/raffle-detail-content-1.png",
    contentTwo: "/assets/figma/raffle-detail-content-2.png",
  }).map(([key, path]) => [key, `${import.meta.env.BASE_URL}${path.slice(1)}`]),
) as Record<string, string>;

const detailRows = [
  ["모집 기간", "26.07.07 (화) ~ 26.07.09 (목)"],
  ["모집 현황", "123명"],
  ["당첨발표", "26.07.13 (월) 예정"],
  ["당첨인원", "10명"],
];

const raffleDetails = {
  "lazy-before-1": {
    brand: "MAISON MARGIELA FRAGRANCES",
    name: "Lazy Sunday Morning",
    nameKo: "레이지 선데이 모닝",
  },
  "fireplace-before": {
    brand: "MAISON MARGIELA FRAGRANCES",
    name: "By the Fireplace",
    nameKo: "바이 더 파이어플레이스",
  },
  "english-pear-freesia": {
    brand: "JO MALONE LONDON",
    name: "English Pear & Freesia",
    nameKo: "잉글리쉬 페어 앤 프리지아",
  },
  "diptyque-do-son": {
    brand: "DIPTYQUE",
    name: "Do Son",
    nameKo: "도 손",
  },
  "byredo-mojave-ghost": {
    brand: "BYREDO",
    name: "Mojave Ghost",
    nameKo: "모하비 고스트",
  },
  "chanel-chance-tendre": {
    brand: "CHANEL",
    name: "Chance Eau Tendre",
    nameKo: "샹스 오 땅드르",
  },
} as const;

type RaffleDetailId = keyof typeof raffleDetails;

function RaffleDetailHeader() {
  return <BackHeader action={<HeaderActions />} />;
}

function RaffleApplyConfirmDialog({
  isOpen,
  onCancel,
  onConfirm,
}: {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/35 px-10" onClick={onCancel}>
      <section
        aria-label="래플 응모 확인"
        aria-modal="true"
        className="w-full max-w-[320px] rounded-[20px] bg-off-white px-6 py-7 text-center shadow-[0_18px_50px_rgba(0,0,0,0.22)]"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
      >
        <p className="text-base font-semibold leading-[1.45] tracking-[-0.02em]">
          해당 래플 응모를 하시겠습니까?
        </p>
        <div className="mt-6 flex gap-2">
          <button
            className="h-12 w-full rounded-[32px] border border-light-grey bg-off-white text-base font-bold tracking-[-0.02em] text-off-black"
            onClick={onCancel}
            type="button"
          >
            아니오
          </button>
          <button
            className="h-12 w-full rounded-[32px] bg-off-black text-base font-bold tracking-[-0.02em] text-off-white"
            onClick={onConfirm}
            type="button"
          >
            예
          </button>
        </div>
      </section>
    </div>
  );
}

function RaffleApplyCompleteDialog({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/35 px-10" onClick={onClose}>
      <section
        aria-label="래플 응모 완료"
        aria-modal="true"
        className="w-full max-w-[320px] rounded-[20px] bg-off-white px-6 py-7 text-center shadow-[0_18px_50px_rgba(0,0,0,0.22)]"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
      >
        <h2 className="text-xl font-bold tracking-[-0.02em]">응모 완료되었습니다</h2>
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

export function RaffleDetailPage() {
  const { raffleId } = useParams();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isCompleteOpen, setIsCompleteOpen] = useState(false);
  const isApplied = useRaffleApplied(raffleId);
  const detail =
    raffleId && raffleId in raffleDetails
      ? raffleDetails[raffleId as RaffleDetailId]
      : raffleDetails["lazy-before-1"];

  return (
    <main className="min-h-dvh bg-black max-[430px]:bg-off-white text-off-black" data-node-id="1034:13631">
      <div className="relative mx-auto min-h-dvh w-full max-w-[430px] overflow-x-hidden bg-off-white">
        <RaffleDetailHeader />
        <div className="wrap flex flex-col items-center px-5 pb-[124px] pt-[calc(var(--app-header-height)+65px)]">
          <section className="flex w-full max-w-[390px] flex-col gap-3">
            <div className="h-[338px] w-full overflow-hidden">
              <img alt="" className="h-full w-full object-cover" src={assets.hero} />
            </div>
            <div className="flex flex-col gap-8">
              <div className="relative flex flex-col items-center gap-8">
                <div className="flex flex-col items-center gap-2 text-center">
                  <h2 className="text-2xl font-semibold leading-[1.08] tracking-[-0.02em] text-off-black">
                    {detail.nameKo}
                  </h2>
                  <p className="text-sm font-medium leading-tight tracking-[-0.02em] text-off-black-70">
                    {detail.brand}
                  </p>
                </div>
                <span className="absolute right-0 top-[55px] flex h-5 items-center justify-center rounded-badge bg-point-orange-40 px-2 text-[10px] font-semibold leading-none tracking-[-0.02em] text-point-orange">
                  D-1
                </span>
                <div className="relative h-[3px] w-full bg-light-grey">
                  <div className="h-full w-[82%] bg-point-orange" />
                </div>
              </div>
              <dl className="flex flex-col gap-2 text-off-black">
                {detailRows.map(([label, value]) => (
                  <div className="grid grid-cols-[51px_1fr] items-center gap-[46px]" key={label}>
                    <dt className="text-sm font-medium leading-none tracking-[-0.02em]">{label}</dt>
                    <dd className="text-xs font-normal leading-none tracking-[-0.02em]">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>
          <section className="mt-16 flex w-full max-w-[398px] flex-col gap-6">
            <div className="h-px w-full bg-light-grey" />
            <div className="flex w-full max-w-[390px] flex-col">
              <img alt="" className="h-[338px] w-full object-cover" src={assets.contentOne} />
              <div className="relative h-[338px] w-full overflow-hidden">
                <img alt="" className="h-full w-full object-cover" src={assets.contentTwo} />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent from-[55%] to-off-white" />
              </div>
            </div>
          </section>
        </div>
        <div className="fixed bottom-[max(20px,env(safe-area-inset-bottom))] left-1/2 z-50 w-full max-w-[430px] -translate-x-1/2 px-[18px]">
          <CtaButton
            disabled={isApplied}
            label={isApplied ? "응모완료" : "응모하기"}
            onClick={() => setIsConfirmOpen(true)}
          />
        </div>
      </div>
      <RaffleApplyConfirmDialog
        isOpen={isConfirmOpen}
        onCancel={() => setIsConfirmOpen(false)}
        onConfirm={() => {
          setIsConfirmOpen(false);
          if (raffleId) {
            applyRaffle(raffleId);
          }
          setIsCompleteOpen(true);
        }}
      />
      <RaffleApplyCompleteDialog isOpen={isCompleteOpen} onClose={() => setIsCompleteOpen(false)} />
    </main>
  );
}
