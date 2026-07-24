import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import batteryEnd from "../../assets/onboarding/battery-end.svg";
import batteryFill from "../../assets/onboarding/battery-fill.svg";
import batteryOutline from "../../assets/onboarding/battery-outline.svg";
import mobileSignal from "../../assets/onboarding/mobile-signal.svg";
import checkCircle from "../../assets/onboarding/skip-check-circle.svg";
import wifi from "../../assets/onboarding/wifi.svg";
import { completeOnboarding } from "./onboardingStorage";

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

export default function OnboardingSkip() {
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      completeOnboarding();
      navigate("/", { replace: true });
    }, 2500);

    return () => window.clearTimeout(timeoutId);
  }, [navigate]);

  return (
    <main className="min-h-dvh bg-black max-[430px]:bg-off-white">
      <div className="relative mx-auto min-h-[932px] w-full max-w-[430px] overflow-hidden bg-off-white">
        <StatusBar />

        <div className="absolute inset-x-0 top-[300px] flex justify-center px-5 text-center">
          <p className="text-base font-medium leading-[1.4] tracking-[-0.02em] text-off-black">
            향수 유형 검사는
            <br />
            <span className="text-point-orange">마이페이지</span>에서 다시 할 수 있어요!
          </p>
        </div>

        <img
          alt=""
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 size-[60px] -translate-x-1/2 -translate-y-1/2"
          src={checkCircle}
        />

        <p
          aria-live="polite"
          className="absolute left-1/2 top-[calc(50%+42px)] -translate-x-1/2 whitespace-nowrap text-base font-medium leading-[1.4] tracking-[-0.02em] text-off-black"
          role="status"
        >
          로딩중...
        </p>
      </div>
    </main>
  );
}
