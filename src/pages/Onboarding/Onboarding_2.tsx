import { useState } from "react";
import { useNavigate } from "react-router-dom";
import arrowRight from "../../assets/onboarding/arrow-right.svg";
import batteryEnd from "../../assets/onboarding/battery-end.svg";
import batteryFill from "../../assets/onboarding/battery-fill.svg";
import batteryOutline from "../../assets/onboarding/battery-outline.svg";
import checkCircle from "../../assets/onboarding/check-circle.svg";
import dateImage from "../../assets/onboarding/date.png";
import exerciseImage from "../../assets/onboarding/exercise.png";
import exerciseBaseImage from "../../assets/onboarding/exercise-base.png";
import friendsImage from "../../assets/onboarding/friends.png";
import homeImage from "../../assets/onboarding/home.png";
import mobileSignal from "../../assets/onboarding/mobile-signal.svg";
import refreshImage from "../../assets/onboarding/refresh.png";
import sleepImage from "../../assets/onboarding/sleep.png";
import specialDayImage from "../../assets/onboarding/special-day.png";
import travelImage from "../../assets/onboarding/travel.png";
import wifi from "../../assets/onboarding/wifi.svg";
import workSchoolImage from "../../assets/onboarding/work-school.png";
import { CtaButton } from "../../components/ui/CtaButton";
import { completeOnboarding, saveOnboardingSelection } from "./onboardingStorage";

type Moment = {
  id: string;
  label: string;
  image: string;
  imageClassName?: string;
  backgroundImage?: string;
};

const moments: Moment[] = [
  { id: "travel", label: "여행", image: travelImage, imageClassName: "object-cover" },
  { id: "sleep", label: "잠들기 전Zzz...", image: sleepImage, imageClassName: "object-bottom" },
  {
    id: "special-day",
    label: "특별한 날",
    image: specialDayImage,
    imageClassName: "h-[154.24%] w-[115.72%] left-[-4.67%] top-[-24.81%]",
  },
  {
    id: "exercise",
    label: "운동 후",
    image: exerciseImage,
    backgroundImage: exerciseBaseImage,
    imageClassName: "object-cover",
  },
  { id: "friends", label: "친구", image: friendsImage, imageClassName: "object-cover" },
  { id: "home", label: "집에서", image: homeImage, imageClassName: "object-cover" },
  { id: "date", label: "데이트", image: dateImage, imageClassName: "object-cover" },
  {
    id: "work-school",
    label: "출근 / 학교",
    image: workSchoolImage,
    imageClassName: "h-[140%] w-[112.04%] left-[-12.04%] top-[-29.48%]",
  },
  { id: "refresh", label: "기분 전환", image: refreshImage, imageClassName: "object-cover" },
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
            <img alt="" className="absolute inset-y-0 left-0 right-[2.63px] h-full w-[27.351px]" src={batteryOutline} />
            <img
              alt=""
              className="absolute right-0 top-[calc(50%+0.67px)] h-[4.618px] w-[1.533px] -translate-y-1/2"
              src={batteryEnd}
            />
            <img
              alt=""
              className="absolute left-[2.19px] right-[4.82px] top-1/2 h-[9.847px] -translate-y-1/2"
              src={batteryFill}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Onboarding2() {
  const navigate = useNavigate();
  const [primaryMoment, setPrimaryMoment] = useState<string | null>(null);
  const [selectedMoments, setSelectedMoments] = useState(() => new Set<string>());

  const toggleMoment = (id: string) => {
    const next = new Set(selectedMoments);

    if (next.has(id)) {
      next.delete(id);

      if (primaryMoment === id) {
        setPrimaryMoment(next.values().next().value ?? null);
      }
    } else {
      next.add(id);
      setPrimaryMoment(id);
    }

    setSelectedMoments(next);
  };

  const goToNextStep = () => {
    if (primaryMoment === null) {
      return;
    }

    saveOnboardingSelection("moment", primaryMoment);
    saveOnboardingSelection("moments", [...selectedMoments]);
    navigate("/onboarding/3");
  };

  const skipOnboarding = () => {
    completeOnboarding();
    navigate("/", { replace: true });
  };

  return (
    <main className="min-h-dvh bg-black max-[430px]:bg-off-white">
      <div className="relative mx-auto min-h-[932px] w-full max-w-[430px] overflow-hidden bg-off-white">
        <StatusBar />

        <section className="absolute inset-x-0 top-[77px] flex flex-col items-center px-[19px] pb-10 pt-[75px]">
          <header className="flex flex-col items-center gap-2.5 text-center">
            <h1 className="text-2xl font-semibold leading-[1.08] tracking-[-0.03em] text-off-black">
              어떤 순간에 향수를 뿌리시나요?
            </h1>
            <p className="whitespace-nowrap text-sm font-normal leading-[normal] tracking-[-0.02em] text-grey">
              향을 더하는 그 순간을 알려주세요 (중복 선택 가능)
            </p>
          </header>

          <div className="mt-[60px] grid w-full max-w-[392px] grid-cols-3 gap-x-4 gap-y-6">
            {moments.map((moment) => {
              const selected = selectedMoments.has(moment.id);

              return (
                <button
                  aria-label={`${moment.label}${selected ? " 선택됨" : ""}`}
                  aria-pressed={selected}
                  className="flex min-w-0 flex-col items-center gap-2.5"
                  key={moment.id}
                  onClick={() => toggleMoment(moment.id)}
                  type="button"
                >
                  <span
                    className={`relative block aspect-square w-full overflow-visible rounded-full bg-off-black ${
                      selected ? "border border-point-orange" : ""
                    }`}
                  >
                    <span className="absolute inset-0 overflow-hidden rounded-full">
                      {moment.backgroundImage && (
                        <img alt="" className="absolute inset-0 h-full w-full object-bottom" src={moment.backgroundImage} />
                      )}
                      <img
                        alt=""
                        className={`absolute max-w-none rounded-full ${moment.imageClassName ?? "object-cover"} ${
                          moment.imageClassName?.includes("h-[") ? "" : "inset-0 h-full w-full"
                        }`}
                        src={moment.image}
                      />
                    </span>
                    {selected && (
                      <img
                        alt=""
                        className="absolute right-0 top-2 z-10 h-9 w-9 max-w-none"
                        src={checkCircle}
                      />
                    )}
                  </span>
                  <span className="w-full text-center text-xs font-bold leading-[normal] tracking-[-0.02em] text-off-black">
                    {moment.label}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <div className="absolute bottom-5 left-5 right-5 flex flex-col items-center gap-5">
          <CtaButton
            className="h-[51px] shrink-0"
            disabled={selectedMoments.size === 0}
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
