import { useState } from "react";
import { useNavigate } from "react-router-dom";
import arrowRight from "../../assets/onboarding/arrow-right.svg";
import batteryEnd from "../../assets/onboarding/battery-end.svg";
import batteryFill from "../../assets/onboarding/battery-fill.svg";
import batteryOutline from "../../assets/onboarding/battery-outline.svg";
import checkCircle from "../../assets/onboarding/check-circle.svg";
import mobileSignal from "../../assets/onboarding/mobile-signal.svg";
import aquaticImage from "../../assets/onboarding/q3-aquatic.png";
import citrusImage from "../../assets/onboarding/q3-citrus.png";
import citrusBaseImage from "../../assets/onboarding/q3-citrus-base.png";
import floralImage from "../../assets/onboarding/q3-floral.png";
import greenImage from "../../assets/onboarding/q3-green.png";
import muskImage from "../../assets/onboarding/q3-musk.png";
import muskBaseImage from "../../assets/onboarding/q3-musk-base.png";
import orientalImage from "../../assets/onboarding/q3-oriental.png";
import orientalBaseImage from "../../assets/onboarding/q3-oriental-base.png";
import powderyImage from "../../assets/onboarding/q3-powdery.png";
import powderyBaseImage from "../../assets/onboarding/q3-powdery-base.png";
import spicyImage from "../../assets/onboarding/q3-spicy.png";
import spicyBaseImage from "../../assets/onboarding/q3-spicy-base.png";
import woodyImage from "../../assets/onboarding/q3-woody.png";
import woodyBaseImage from "../../assets/onboarding/q3-woody-base.png";
import wifi from "../../assets/onboarding/wifi.svg";
import { CtaButton } from "../../components/ui/CtaButton";
import { completeOnboarding, saveOnboardingSelection } from "./onboardingStorage";

type Scent = {
  id: string;
  label: string;
  layers: Array<{
    image: string;
    className: string;
  }>;
};

const fullImageClassName = "absolute inset-0 h-full w-full max-w-none rounded-full object-cover";

const scents: Scent[] = [
  {
    id: "floral",
    label: "플로럴",
    layers: [{ image: floralImage, className: fullImageClassName }],
  },
  {
    id: "woody",
    label: "우디",
    layers: [
      { image: woodyBaseImage, className: "absolute inset-0 h-full w-full max-w-none rounded-full object-bottom" },
      { image: woodyImage, className: fullImageClassName },
    ],
  },
  {
    id: "aquatic",
    label: "아쿠아틱",
    layers: [{ image: aquaticImage, className: fullImageClassName }],
  },
  {
    id: "citrus",
    label: "시트러스",
    layers: [
      { image: citrusBaseImage, className: "absolute inset-0 h-full w-full max-w-none rounded-full object-bottom" },
      { image: citrusImage, className: fullImageClassName },
    ],
  },
  {
    id: "musk",
    label: "머스크",
    layers: [
      {
        image: muskBaseImage,
        className: "absolute left-[-4.67%] top-[-24.81%] h-[154.24%] w-[115.72%] max-w-none",
      },
      { image: muskImage, className: "absolute inset-0 h-full w-full max-w-none rounded-full object-bottom" },
    ],
  },
  {
    id: "oriental",
    label: "오리엔탈",
    layers: [
      { image: orientalBaseImage, className: fullImageClassName },
      { image: orientalImage, className: fullImageClassName },
    ],
  },
  {
    id: "powdery",
    label: "파우더리",
    layers: [
      { image: powderyBaseImage, className: fullImageClassName },
      { image: powderyImage, className: fullImageClassName },
    ],
  },
  {
    id: "spicy",
    label: "스파이시",
    layers: [
      {
        image: spicyBaseImage,
        className: "absolute left-[-12.04%] top-[-29.48%] h-[140%] w-[112.04%] max-w-none",
      },
      { image: spicyImage, className: "absolute inset-0 h-full w-full max-w-none rounded-full object-bottom" },
    ],
  },
  {
    id: "green",
    label: "그린",
    layers: [{ image: greenImage, className: fullImageClassName }],
  },
];

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

export default function Onboarding3() {
  const navigate = useNavigate();
  const [primaryScent, setPrimaryScent] = useState<string | null>(null);
  const [selectedScents, setSelectedScents] = useState(() => new Set<string>());

  const toggleScent = (id: string) => {
    const next = new Set(selectedScents);

    if (next.has(id)) {
      next.delete(id);

      if (primaryScent === id) {
        setPrimaryScent(next.values().next().value ?? null);
      }
    } else {
      next.add(id);
      setPrimaryScent(id);
    }

    setSelectedScents(next);
  };

  const goToNextStep = () => {
    if (primaryScent === null) {
      return;
    }

    saveOnboardingSelection("scent", primaryScent);
    navigate("/onboarding/4");
  };

  const skipOnboarding = () => {
    completeOnboarding();
    navigate("/", { replace: true });
  };

  return (
    <main className="min-h-dvh bg-black max-[430px]:bg-off-white">
      <div className="relative mx-auto min-h-[932px] w-full max-w-[430px] overflow-hidden bg-off-white">
        <StatusBar />

        <section className="absolute inset-x-0 top-[77px] flex flex-col items-center px-[19px] pb-[50px] pt-[75px]">
          <header className="flex flex-col items-center gap-2.5 text-center">
            <h1 className="text-2xl font-semibold leading-[1.08] tracking-[-0.03em] text-off-black">
              어떤 향에 끌리시나요?
            </h1>
            <p className="whitespace-nowrap text-sm font-medium leading-[normal] tracking-[-0.02em] text-grey">
              평소 좋았던 향을 떠올려보세요 (중복 선택 가능)
            </p>
          </header>

          <div className="mt-[60px] grid w-full max-w-[392px] grid-cols-3 gap-x-4 gap-y-6">
            {scents.map((scent) => {
              const selected = selectedScents.has(scent.id);

              return (
                <button
                  aria-label={`${scent.label}${selected ? " 선택됨" : ""}`}
                  aria-pressed={selected}
                  className="flex min-w-0 flex-col items-center gap-2.5"
                  key={scent.id}
                  onClick={() => toggleScent(scent.id)}
                  type="button"
                >
                  <span
                    className={`relative block aspect-square w-full overflow-visible rounded-full bg-off-black ${
                      selected ? "border border-point-orange" : ""
                    }`}
                  >
                    <span className="absolute inset-0 overflow-hidden rounded-full">
                      {scent.layers.map((layer) => (
                        <img alt="" className={layer.className} key={layer.image} src={layer.image} />
                      ))}
                    </span>
                    {selected && (
                      <img alt="" className="absolute right-0 top-2 z-10 h-9 w-9 max-w-none" src={checkCircle} />
                    )}
                  </span>
                  <span className="w-full text-center text-xs font-bold leading-[normal] tracking-[-0.02em] text-off-black">
                    {scent.label}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <div className="absolute bottom-5 left-5 right-5 flex flex-col items-center gap-5">
          <CtaButton
            className="h-[51px] shrink-0"
            disabled={selectedScents.size === 0}
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
      </div>
    </main>
  );
}
