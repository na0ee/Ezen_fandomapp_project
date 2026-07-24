import { useState } from "react";
import { useNavigate } from "react-router-dom";
import arrowRight from "../../assets/onboarding/arrow-right.svg";
import batteryEnd from "../../assets/onboarding/battery-end.svg";
import batteryFill from "../../assets/onboarding/battery-fill.svg";
import batteryOutline from "../../assets/onboarding/battery-outline.svg";
import mobileSignal from "../../assets/onboarding/mobile-signal.svg";
import casualImage from "../../assets/onboarding/q4-casual.png";
import casualBaseImage from "../../assets/onboarding/q4-casual-base.png";
import checkCircle from "../../assets/onboarding/q4-check-circle.svg";
import feminineImage from "../../assets/onboarding/q4-feminine.png";
import feminineBaseImage from "../../assets/onboarding/q4-feminine-base.png";
import minimalImage from "../../assets/onboarding/q4-minimal.png";
import sharedImage from "../../assets/onboarding/q4-shared.png";
import streetImage from "../../assets/onboarding/q4-street.png";
import streetBaseImage from "../../assets/onboarding/q4-street-base.png";
import wifi from "../../assets/onboarding/wifi.svg";
import { CtaButton } from "../../components/ui/CtaButton";
import { completeOnboarding, saveOnboardingSelection } from "./onboardingStorage";

type Mood = {
  id: string;
  label: string;
  layers: Array<{
    image: string;
    className: string;
  }>;
};

const fullImageClassName = "absolute inset-0 h-full w-full max-w-none rounded-[15px] object-cover";

const moods: Mood[] = [
  {
    id: "minimal",
    label: "미니멀 · 모던",
    layers: [
      {
        image: sharedImage,
        className: "absolute left-[-100.47%] top-[-72.02%] h-[505.61%] w-[200.47%] max-w-none",
      },
      { image: minimalImage, className: fullImageClassName },
    ],
  },
  {
    id: "street",
    label: "스트릿 · 시크",
    layers: [
      { image: streetBaseImage, className: "absolute inset-0 h-full w-full max-w-none rounded-[15px] object-bottom" },
      {
        image: sharedImage,
        className: "absolute left-[-100.47%] top-[-328.81%] h-[505.61%] w-[200.47%] max-w-none",
      },
      { image: streetImage, className: fullImageClassName },
    ],
  },
  {
    id: "feminine",
    label: "페미닌 · 로맨틱",
    layers: [
      {
        image: feminineBaseImage,
        className: "absolute left-0 top-[-72.48%] h-[266.58%] w-full max-w-none",
      },
      {
        image: sharedImage,
        className: "absolute left-0 top-[-325.43%] h-[505.61%] w-[200.47%] max-w-none",
      },
      { image: feminineImage, className: fullImageClassName },
    ],
  },
  {
    id: "casual",
    label: "캐주얼 · 데일리",
    layers: [
      { image: casualBaseImage, className: "absolute inset-0 h-full w-full max-w-none rounded-[15px] object-bottom" },
      {
        image: sharedImage,
        className: "absolute left-[-6.43%] top-[-72.02%] h-[505.61%] w-[200.47%] max-w-none",
      },
      { image: casualImage, className: fullImageClassName },
    ],
  },
];

function StatusBar() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-x-0 top-0 flex h-[64.555px] items-end justify-center bg-off-white"
    >
      <div className="flex h-full min-w-0 flex-1 flex-col items-center justify-center pb-[3.282px] pl-[10.941px]">
        <span className="flex h-[22.977px] w-[59.084px] items-center justify-center pt-px font-sans text-[17.51px] font-semibold leading-[22.977px] tracking-[-0.32px] text-off-black">
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

export default function Onboarding4() {
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const goToNextStep = () => {
    if (selectedMood === null) {
      return;
    }

    saveOnboardingSelection("mood", selectedMood);
    navigate("/onboarding/5");
  };

  const skipOnboarding = () => {
    completeOnboarding();
    navigate("/", { replace: true });
  };

  return (
    <main className="min-h-dvh bg-black max-[430px]:bg-off-white">
      <div className="relative mx-auto min-h-[932px] w-full max-w-[430px] overflow-hidden bg-off-white">
        <StatusBar />

        <section className="absolute inset-x-0 top-[77px] flex h-[855px] flex-col items-center justify-between px-5 pb-[50px] pt-20">
          <header className="flex flex-col items-center gap-2.5 text-center">
            <h1 className="text-2xl font-semibold leading-[1.08] tracking-[-0.03em] text-off-black">
              당신을 표현하는 무드는?
            </h1>
            <p className="whitespace-nowrap text-sm font-medium leading-[normal] tracking-[-0.02em] text-grey">
              평소 스타일을 떠올리며 골라주세요
            </p>
          </header>

          <div className="grid h-[268px] grid-cols-2 grid-rows-2 gap-x-2.5 gap-y-4">
            {moods.map((mood) => {
              const selected = selectedMood === mood.id;

              return (
                <button
                  aria-label={`${mood.label}${selected ? " 선택됨" : ""}`}
                  aria-pressed={selected}
                  className="relative flex w-[150px] flex-col items-center gap-2"
                  key={mood.id}
                  onClick={() => setSelectedMood(mood.id)}
                  type="button"
                >
                  <span
                    className={`relative block h-[100px] w-[150px] overflow-hidden rounded-[15px] ${
                      selected ? "border border-point-orange" : ""
                    }`}
                  >
                    {mood.layers.map((layer) => (
                      <img alt="" className={layer.className} key={layer.image} src={layer.image} />
                    ))}
                  </span>
                  {selected && (
                    <img
                      alt=""
                      aria-hidden="true"
                      className="pointer-events-none absolute right-[-3px] top-[-8px] z-10 h-[26px] w-[26px] max-w-none"
                      src={checkCircle}
                    />
                  )}
                  <span className="w-full text-center text-sm font-normal leading-[normal] tracking-[-0.02em] text-off-black">
                    {mood.label}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex w-full flex-col items-center gap-5">
            <CtaButton
              className="h-[51px] shrink-0"
              disabled={selectedMood === null}
              label="다음"
              onClick={goToNextStep}
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
