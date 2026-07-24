import { useState } from "react";
import { BackHeader } from "../components/common/BackHeader";
import { BottomNavigation } from "../components/common/BottomNavigation";
import { HeaderActions } from "../components/common/HeaderActions";
import { myProfile } from "../data/myProfile";
import badgeNewbie from "../assets/mypage/badge-newbie.png";
import badgeBronze from "../assets/mypage/badge-bronze.png";
import badgeSilver from "../assets/mypage/badge-silver.png";
import badgeGold from "../assets/mypage/badge-gold.png";
import badgeVip from "../assets/mypage/badge-vip.png";
import badgeGrey from "../assets/mypage/badge-grey.png";
import badgeVipGrey from "../assets/mypage/badge-vip-grey.png";

const nextTierLabel = "BRONZE";
const nextTierPoints = "800P";

const pointBenefit = "포인트가 모이면 래플 응모권으로 교환할 수 있어요";

const tiers = [
  {
    key: "NEWBIE",
    icon: badgeNewbie,
    inactiveIcon: badgeGrey,
    height: 62,
    criteria: "2,000포인트 미만",
    benefit: pointBenefit,
  },
  {
    key: "BRONZE",
    icon: badgeBronze,
    inactiveIcon: badgeGrey,
    height: 72,
    criteria: "2,000포인트 이상",
    benefit: pointBenefit,
  },
  {
    key: "SILVER",
    icon: badgeSilver,
    inactiveIcon: badgeGrey,
    height: 82,
    criteria: "3,000포인트 이상",
    benefit: pointBenefit,
  },
  {
    key: "GOLD",
    icon: badgeGold,
    inactiveIcon: badgeGrey,
    height: 92,
    criteria: "4,000포인트 이상",
    benefit: pointBenefit,
  },
  {
    key: "VIP",
    icon: badgeVip,
    inactiveIcon: badgeVipGrey,
    height: 102,
    criteria: "5,000포인트 이상",
    benefit: pointBenefit,
  },
];

export default function MyMembershipPage() {
  const [selectedTier, setSelectedTier] = useState(tiers[0].key);
  const activeTier = tiers.find((tier) => tier.key === selectedTier) ?? tiers[0];

  return (
    <main className="mx-auto min-h-dvh w-full max-w-[430px] bg-off-white">
      <BackHeader title="멤버십 등급 안내" backTo="/mypage" action={<HeaderActions />} />

      <div className="wrap flex flex-col gap-16 px-5 pb-[112px] pt-[calc(var(--app-header-height,54px)+24px)]">
        {/* 나의 멤버십 등급 */}
        <section className="flex flex-col gap-4">
          <label className="text-base font-semibold leading-none tracking-[-0.02em] text-off-black">
            나의 멤버십 등급
          </label>
          <div className="flex w-full flex-col gap-4 rounded-lg border-[0.8px] border-light-grey bg-off-white p-4">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-3">
                <img alt="" className="h-[59px] w-[60px] object-contain" src={badgeNewbie} />
                <div className="flex w-[82px] flex-col">
                  <p className="text-xl font-semibold leading-none tracking-[-0.02em] text-off-black">
                    {myProfile.badge}
                  </p>
                  <div className="mt-1 flex items-center gap-1">
                    <span className="text-sm leading-none tracking-[-0.02em] text-grey">포인트</span>
                    <span className="text-sm font-medium leading-none tracking-[-0.02em] text-point-orange">
                      {myProfile.points}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-[6px] w-full rounded-full bg-gradient-to-r from-[#f7f0bc] to-point-orange" />
            <p className="pl-1.5 text-sm leading-[1.4] tracking-[-0.02em] text-grey">
              <span className="text-base font-semibold text-off-black">{nextTierPoints}</span> 더 쌓으면{" "}
              <span className="text-base font-semibold text-off-black">{nextTierLabel}</span> 등급 달성!
            </p>
          </div>
        </section>

        {/* 멤버십 등급 단계 */}
        <section className="flex flex-col gap-4">
          <label className="text-base font-semibold leading-none tracking-[-0.02em] text-off-black">
            멤버십 등급 단계
          </label>
          <div className="flex w-full flex-col gap-6 rounded-lg border-[0.8px] border-light-grey p-4">
            <div className="flex w-full items-end justify-between">
              {tiers.map((tier) => {
                const isActive = tier.key === selectedTier;
                return (
                  <button
                    className={`flex w-14 cursor-pointer flex-col items-center justify-end gap-2 rounded-t-lg border-[0.8px] bg-off-white pb-1.5 ${
                      isActive ? "border-point-orange" : "border-light-grey"
                    }`}
                    key={tier.key}
                    onClick={() => setSelectedTier(tier.key)}
                    style={{ height: tier.height }}
                    type="button"
                  >
                    <img alt="" className="size-6" src={isActive ? tier.icon : tier.inactiveIcon} />
                    <span
                      className={`text-[12px] leading-none tracking-[-0.02em] ${
                        isActive ? "font-medium text-off-black" : "font-medium text-subtext"
                      }`}
                    >
                      {tier.key}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex w-full flex-col gap-4">
              <p className="text-base font-semibold leading-none tracking-[-0.02em] text-off-black">
                {activeTier.key}
              </p>
              <div className="flex flex-col gap-2">
                <div className="flex w-full items-center gap-4">
                  <p className="shrink-0 text-sm font-semibold leading-none tracking-[-0.02em] text-off-black">
                    기준
                  </p>
                  <p className="text-sm font-medium leading-none tracking-[-0.02em] text-off-black">
                    {activeTier.criteria}
                  </p>
                </div>
                <div className="flex w-full items-center gap-4">
                  <p className="shrink-0 text-sm font-semibold leading-none tracking-[-0.02em] text-off-black">
                    포인트 혜택
                  </p>
                  <p className="text-sm font-medium leading-none tracking-[-0.02em] text-off-black">
                    {activeTier.benefit}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <BottomNavigation />
    </main>
  );
}
