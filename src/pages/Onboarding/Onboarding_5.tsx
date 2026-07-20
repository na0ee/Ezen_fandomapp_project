import { useState } from "react";
import { useNavigate } from "react-router-dom";
import arrowRight from "../../assets/onboarding/q5-arrow-right.svg";
import batteryEnd from "../../assets/onboarding/q5-battery-end.svg";
import batteryFill from "../../assets/onboarding/q5-battery-fill.svg";
import batteryOutline from "../../assets/onboarding/q5-battery-outline.svg";
import checkCircle from "../../assets/onboarding/q5-check-circle.svg";
import mobileSignal from "../../assets/onboarding/q5-mobile-signal.svg";
import wifi from "../../assets/onboarding/q5-wifi.svg";
import { CtaButton } from "../../components/ui/CtaButton";
import { completeOnboarding } from "./onboardingStorage";

type ApplicationMethod = "signature" | "layering";

const methods: Array<{
  id: ApplicationMethod;
  title: string;
  description: string;
}> = [
  {
    id: "signature",
    title: "시그니처",
    description: "한 가지 향을 온전히 지켜요",
  },
  {
    id: "layering",
    title: "레이어링",
    description: "여러 향을 겹쳐서 나만의 조합을 만들어요",
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

export default function Onboarding5() {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState<ApplicationMethod | null>(null);

  const finishOnboarding = () => {
    completeOnboarding();
    navigate("/", { replace: true });
  };

  const showLoading = () => {
    if (selectedMethod === null) {
      return;
    }

    navigate("/onboarding/loading");
  };

  return (
    <main className="min-h-dvh bg-off-white">
      <div className="relative mx-auto min-h-[932px] w-full max-w-[430px] overflow-hidden bg-off-white">
        <StatusBar />

        <section className="absolute inset-x-0 top-[77px] h-[855px] px-5 pb-[50px] pt-20">
          <header className="flex flex-col items-center gap-2.5 text-center">
            <h1 className="whitespace-nowrap text-2xl font-semibold leading-[1.08] tracking-[-0.03em] text-off-black">
              당신이 선호하는 방법은?
            </h1>
            <p className="whitespace-nowrap text-sm font-medium leading-[normal] tracking-[-0.02em] text-grey">
              평소에 향수를 어떻게 뿌리시나요?
            </p>
          </header>

          <div className="mt-[168px] flex w-full flex-col gap-5">
            {methods.map((method) => {
              const selected = selectedMethod === method.id;

              return (
                <button
                  aria-label={`${method.title}${selected ? " 선택됨" : ""}`}
                  aria-pressed={selected}
                  className={`relative flex h-[114px] w-full shrink-0 flex-col items-center justify-center gap-[19px] rounded-[15px] border bg-off-white ${
                    selected ? "border-point-orange" : "border-off-black"
                  }`}
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  type="button"
                >
                  <span className="w-full text-center text-lg font-normal leading-none tracking-[-0.02em] text-off-black">
                    {method.title}
                  </span>
                  <span className="whitespace-nowrap text-xs font-normal leading-[normal] tracking-[-0.02em] text-[#4d4d4d]">
                    {method.description}
                  </span>

                  {selected && (
                    <img
                      alt=""
                      aria-hidden="true"
                      className="pointer-events-none absolute right-[-2.54px] top-[-8.5px] h-9 w-9 max-w-none"
                      src={checkCircle}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="absolute bottom-[50px] left-5 right-5 flex flex-col items-center gap-5">
            <CtaButton
              className="h-[51px] shrink-0"
              disabled={selectedMethod === null}
              label="다음"
              onClick={showLoading}
            />
            <button
              className="flex h-[18px] items-center gap-1 text-center font-sans text-xs font-medium leading-[1.5] tracking-[-0.011em] text-off-black"
              onClick={finishOnboarding}
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
