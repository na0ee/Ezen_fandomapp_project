import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import dateImage from "../../assets/onboarding/date.png";
import exerciseImage from "../../assets/onboarding/exercise.png";
import exerciseBaseImage from "../../assets/onboarding/exercise-base.png";
import friendsImage from "../../assets/onboarding/friends.png";
import homeImage from "../../assets/onboarding/home.png";
import loadingDefaultMoment from "../../assets/onboarding/loading-default-moment.png";
import loadingDefaultMood from "../../assets/onboarding/loading-default-mood.png";
import loadingDefaultScent from "../../assets/onboarding/loading-default-scent.png";
import casualImage from "../../assets/onboarding/q4-casual.png";
import casualBaseImage from "../../assets/onboarding/q4-casual-base.png";
import feminineImage from "../../assets/onboarding/q4-feminine.png";
import feminineBaseImage from "../../assets/onboarding/q4-feminine-base.png";
import minimalImage from "../../assets/onboarding/q4-minimal.png";
import sharedImage from "../../assets/onboarding/q4-shared.png";
import streetImage from "../../assets/onboarding/q4-street.png";
import streetBaseImage from "../../assets/onboarding/q4-street-base.png";
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
import refreshImage from "../../assets/onboarding/refresh.png";
import sleepImage from "../../assets/onboarding/sleep.png";
import specialDayImage from "../../assets/onboarding/special-day.png";
import travelImage from "../../assets/onboarding/travel.png";
import workSchoolImage from "../../assets/onboarding/work-school.png";
import { getOnboardingSelections } from "./onboardingStorage";

type PreviewLayer = {
  image: string;
  className: string;
};

const fullCircleImage = "absolute inset-0 h-full w-full max-w-none rounded-full object-cover";

const momentPreviews: Record<string, PreviewLayer[]> = {
  travel: [{ image: travelImage, className: fullCircleImage }],
  sleep: [{ image: sleepImage, className: `${fullCircleImage} object-bottom` }],
  "special-day": [
    {
      image: specialDayImage,
      className: "absolute left-[-4.67%] top-[-24.81%] h-[154.24%] w-[115.72%] max-w-none",
    },
  ],
  exercise: [
    { image: exerciseBaseImage, className: `${fullCircleImage} object-bottom` },
    { image: exerciseImage, className: fullCircleImage },
  ],
  friends: [{ image: friendsImage, className: fullCircleImage }],
  home: [{ image: homeImage, className: fullCircleImage }],
  date: [{ image: dateImage, className: fullCircleImage }],
  "work-school": [
    {
      image: workSchoolImage,
      className: "absolute left-[-12.04%] top-[-29.48%] h-[140%] w-[112.04%] max-w-none",
    },
  ],
  refresh: [{ image: refreshImage, className: fullCircleImage }],
};

const scentPreviews: Record<string, PreviewLayer[]> = {
  floral: [{ image: floralImage, className: fullCircleImage }],
  woody: [
    { image: woodyBaseImage, className: `${fullCircleImage} object-bottom` },
    { image: woodyImage, className: fullCircleImage },
  ],
  aquatic: [{ image: aquaticImage, className: fullCircleImage }],
  citrus: [
    { image: citrusBaseImage, className: `${fullCircleImage} object-bottom` },
    { image: citrusImage, className: fullCircleImage },
  ],
  musk: [
    {
      image: muskBaseImage,
      className: "absolute left-[-4.67%] top-[-24.81%] h-[154.24%] w-[115.72%] max-w-none",
    },
    { image: muskImage, className: `${fullCircleImage} object-bottom` },
  ],
  oriental: [
    { image: orientalBaseImage, className: fullCircleImage },
    { image: orientalImage, className: fullCircleImage },
  ],
  powdery: [
    { image: powderyBaseImage, className: fullCircleImage },
    { image: powderyImage, className: fullCircleImage },
  ],
  spicy: [
    {
      image: spicyBaseImage,
      className: "absolute left-[-12.04%] top-[-29.48%] h-[140%] w-[112.04%] max-w-none",
    },
    { image: spicyImage, className: `${fullCircleImage} object-bottom` },
  ],
  green: [{ image: greenImage, className: fullCircleImage }],
};

const fullMoodImage = "absolute inset-0 h-full w-full max-w-none object-cover";

const moodPreviews: Record<string, PreviewLayer[]> = {
  minimal: [
    {
      image: sharedImage,
      className: "absolute left-[-100.47%] top-[-72.02%] h-[505.61%] w-[200.47%] max-w-none",
    },
    { image: minimalImage, className: fullMoodImage },
  ],
  street: [
    { image: streetBaseImage, className: `${fullMoodImage} object-bottom` },
    {
      image: sharedImage,
      className: "absolute left-[-100.47%] top-[-328.81%] h-[505.61%] w-[200.47%] max-w-none",
    },
    { image: streetImage, className: fullMoodImage },
  ],
  feminine: [
    {
      image: feminineBaseImage,
      className: "absolute left-0 top-[-72.48%] h-[266.58%] w-full max-w-none",
    },
    {
      image: sharedImage,
      className: "absolute left-0 top-[-325.43%] h-[505.61%] w-[200.47%] max-w-none",
    },
    { image: feminineImage, className: fullMoodImage },
  ],
  casual: [
    { image: casualBaseImage, className: `${fullMoodImage} object-bottom` },
    {
      image: sharedImage,
      className: "absolute left-[-6.43%] top-[-72.02%] h-[505.61%] w-[200.47%] max-w-none",
    },
    { image: casualImage, className: fullMoodImage },
  ],
};

function SelectionCircle({
  layers,
  mood = false,
  className = "",
}: {
  layers: PreviewLayer[];
  mood?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative h-[61px] w-[61px] shrink-0 overflow-hidden rounded-full bg-off-black ${className}`}>
      <div
        className={
          mood
            ? "absolute left-1/2 top-0 h-[61px] w-[91.5px] -translate-x-1/2"
            : "absolute inset-0"
        }
      >
        {layers.map((layer) => (
          <img alt="" className={layer.className} key={layer.image} src={layer.image} />
        ))}
      </div>
    </div>
  );
}

function DefaultFigmaCircles() {
  return (
    <div aria-hidden="true" className="absolute inset-0">
      <div className="absolute left-[238.28px] top-[346px] h-[61px] w-[61px]">
        <img alt="" className="h-full w-full max-w-none" src={loadingDefaultMood} />
      </div>
      <div className="absolute left-[131px] top-[346px] flex h-[61px] w-[55.741px] items-center justify-center">
        <div className="h-[61px] w-[55.741px] -scale-y-100 rotate-180">
          <img alt="" className="h-full w-full max-w-none" src={loadingDefaultMoment} />
        </div>
      </div>
      <div className="absolute left-[184.64px] top-[346px] flex h-[61px] w-[55.741px] items-center justify-center">
        <div className="h-[61px] w-[55.741px] -scale-y-100 rotate-180">
          <img alt="" className="h-full w-full max-w-none" src={loadingDefaultScent} />
        </div>
      </div>
    </div>
  );
}

export default function OnboardingLoading() {
  const navigate = useNavigate();
  const selections = getOnboardingSelections();
  const hasSavedSelections = Boolean(selections.moment || selections.scent || selections.mood);
  const momentLayers = momentPreviews[selections.moment ?? "home"] ?? momentPreviews.home;
  const scentLayers = scentPreviews[selections.scent ?? "oriental"] ?? scentPreviews.oriental;
  const moodLayers = moodPreviews[selections.mood ?? "feminine"] ?? moodPreviews.feminine;

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      navigate("/onboarding/results", { replace: true });
    }, 2500);

    return () => window.clearTimeout(timeoutId);
  }, [navigate]);

  return (
    <main className="min-h-dvh bg-black max-[430px]:bg-off-white">
      <div className="relative mx-auto min-h-[932px] w-full max-w-[430px] overflow-hidden bg-off-white">
        {hasSavedSelections ? (
          <div aria-label="선택한 취향 이미지" className="absolute left-[131px] top-[346px] flex h-[61px]">
            <SelectionCircle layers={momentLayers} />
            <SelectionCircle className="z-10 -ml-[7.36px] ring-2 ring-white" layers={scentLayers} />
            <SelectionCircle className="z-20 -ml-[7.36px] ring-2 ring-white" layers={moodLayers} mood />
          </div>
        ) : (
          <DefaultFigmaCircles />
        )}

        <p className="absolute left-[137px] top-[447px] whitespace-nowrap text-2xl font-semibold leading-[1.08] tracking-[-0.03em] text-black">
          취향이 멋지군요!
        </p>
      </div>
    </main>
  );
}
