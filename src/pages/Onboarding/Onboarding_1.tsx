import { useState } from "react";
import { useNavigate } from "react-router-dom";
import arrowRight from "../../assets/onboarding/q1-arrow-right.svg";
import batteryEnd from "../../assets/onboarding/q1-battery-end.svg";
import batteryFill from "../../assets/onboarding/q1-battery-fill.svg";
import batteryOutline from "../../assets/onboarding/q1-battery-outline.svg";
import checkCircle from "../../assets/onboarding/q1-check-circle.svg";
import mobileSignal from "../../assets/onboarding/q1-mobile-signal.svg";
import wifi from "../../assets/onboarding/q1-wifi.svg";
import { CtaButton } from "../../components/ui/CtaButton";
import { completeOnboarding } from "./onboardingStorage";

const perfumeCounts = ["아직 없어요", "1~2개", "3~5개", "6~10개", "10개 이상"] as const;

type PerfumeCount = (typeof perfumeCounts)[number];

function StatusBar() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-x-0 top-0 flex h-[64.555px] items-end justify-center bg-off-white"
    >
      <div className="flex h-full min-w-0 flex-1 flex-col items-center justify-center pb-[3.282px] pl-[10.941px]">
        <span className="flex h-[22.977px] w-[59.084px] items-center justify-center pt-px font-sans text-[17.51px] font-semibold leading-[22.977px] tracking-[-0.32px] text-black">
          9:41
        </span>
      </div>

      <div className="flex h-full shrink-0 items-center justify-center">
        <div className="h-[40.483px] w-[136.768px] rounded-full bg-black" />
      </div>

      <div className="flex h-full min-w-0 flex-1 items-center justify-center pr-[12.036px]">
        <div className="flex items-start gap-[8.753px]">
          <img alt="" className="h-[13.13px] w-[19.695px]" src={mobileSignal} />
          <img alt="" className="h-[12.948px] w-[18.601px]" src={wifi} />
          <div className="relative h-[14.224px] w-[29.981px]">
            <img alt="" className="absolute inset-y-0 left-0 h-full w-[27.351px]" src={batteryOutline} />
            <img
              alt=""
              className="absolute right-0 top-[calc(50%+0.67px)] h-[4.618px] w-[1.533px] -translate-y-1/2"
              src={batteryEnd}
            />
            <img
              alt=""
              className="absolute left-[2.19px] top-1/2 h-[9.847px] w-[22.971px] -translate-y-1/2"
              src={batteryFill}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Onboarding1() {
  const navigate = useNavigate();
  const [selectedCount, setSelectedCount] = useState<PerfumeCount | null>(null);

  const skipOnboarding = () => {
    completeOnboarding();
    navigate("/", { replace: true });
  };

  return (
    <main className="min-h-dvh bg-off-white">
      <div className="relative mx-auto min-h-[932px] w-full max-w-[430px] overflow-hidden bg-off-white">
        <StatusBar />

        <section className="absolute inset-x-0 top-[77px] flex h-[855px] flex-col items-center justify-between px-5 pb-[50px] pt-20">
          <header className="flex flex-col items-center gap-2.5 whitespace-nowrap text-center text-off-black">
            <p className="font-cormorant text-[26px] font-bold leading-[1.5] tracking-[-0.011em]">Q1.</p>
            <h1 className="text-2xl font-medium leading-[1.08] tracking-[-0.03em]">
              현재 보유한 향수는 몇 병인가요?
            </h1>
          </header>

          <div className="flex w-full flex-col items-start gap-2.5">
            {perfumeCounts.map((count) => {
              const selected = selectedCount === count;

              return (
                <button
                  aria-label={`${count}${selected ? " 선택됨" : ""}`}
                  aria-pressed={selected}
                  className={`relative flex h-[50px] w-[394px] shrink-0 items-start justify-center overflow-hidden rounded-[32px] border px-10 py-4 text-lg font-normal leading-none tracking-[-0.02em] ${
                    selected ? "border-point-orange text-point-orange" : "border-off-black text-off-black"
                  }`}
                  key={count}
                  onClick={() => setSelectedCount(count)}
                  type="button"
                >
                  <span className="whitespace-nowrap">{count}</span>
                  {selected && (
                    <img
                      alt=""
                      aria-hidden="true"
                      className="pointer-events-none absolute right-[21px] top-[16.5px] h-[18px] w-[17px] max-w-none"
                      src={checkCircle}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex w-full flex-col items-center gap-5">
            <CtaButton
              className="h-[51px] shrink-0"
              disabled={selectedCount === null}
              label="다음"
              onClick={() => navigate("/onboarding/2")}
            />
            <button
              className="flex h-[18px] items-center gap-1 text-center font-sans text-xs font-medium leading-[1.5] tracking-[-0.011em] text-off-black"
              onClick={skipOnboarding}
              type="button"
            >
              <span>건너뛰기</span>
              <img alt="" className="h-[18px] w-[18px]" src={arrowRight} />
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
