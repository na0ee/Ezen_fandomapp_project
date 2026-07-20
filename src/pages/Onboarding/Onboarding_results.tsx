import { useRef, type PointerEvent } from "react";
import { useNavigate } from "react-router-dom";
import batteryEnd from "../../assets/onboarding/results-battery-end.svg";
import batteryFill from "../../assets/onboarding/results-battery-fill.svg";
import batteryOutline from "../../assets/onboarding/results-battery-outline.svg";
import chevronLeft from "../../assets/onboarding/results-chevron-left.svg";
import chevronRight from "../../assets/onboarding/results-chevron-right.svg";
import heroImage from "../../assets/onboarding/results-hero.png";
import mobileSignal from "../../assets/onboarding/results-mobile-signal.svg";
import perfumeOne from "../../assets/onboarding/results-perfume-1.png";
import perfumeTwo from "../../assets/onboarding/results-perfume-2.png";
import perfumeThree from "../../assets/onboarding/results-perfume-3.png";
import boldScale from "../../assets/onboarding/results-scale-bold.svg";
import exploreScale from "../../assets/onboarding/results-scale-explore.svg";
import uploadIcon from "../../assets/onboarding/results-upload.svg";
import wifi from "../../assets/onboarding/results-wifi.svg";
import { completeOnboarding } from "./onboardingStorage";

const recommendedPerfumes = [
  {
    image: perfumeOne,
    name: "Blackberry & Bay Cologne",
    brand: "Jo Malone",
  },
  {
    image: perfumeTwo,
    name: "Orpheon",
    brand: "Diptyque",
  },
  {
    image: perfumeThree,
    name: "Myslf",
    brand: "Yves Saint Laurent",
  },
];

function StatusBar() {
  return (
    <div aria-hidden="true" className="absolute inset-x-0 top-0 flex h-[65px] items-start justify-center bg-off-white">
      <div className="flex h-full min-w-0 flex-1 flex-col items-center justify-center pb-[3.282px] pl-[10.941px]">
        <span className="flex h-[22.977px] w-[59.084px] items-center justify-center pt-px font-sans text-[19.15px] font-semibold leading-[25.14px] tracking-[-0.3501px] text-black">
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

function PreferenceScale({
  leftLabel,
  rightLabel,
  image,
}: {
  leftLabel: string;
  rightLabel: string;
  image: string;
}) {
  return (
    <div className="flex w-[394px] flex-col items-start gap-0.5">
      <div className="flex w-full items-center justify-between text-xs font-normal leading-[normal] tracking-[-0.02em] text-black">
        <span>{leftLabel}</span>
        <span className="text-right">{rightLabel}</span>
      </div>
      <div className="relative h-[15px] w-full">
        <img alt="" className="absolute left-[-2px] top-0 h-[15px] w-[398px] max-w-none" src={image} />
      </div>
    </div>
  );
}

function PerfumeCard({ image, name, brand }: (typeof recommendedPerfumes)[number]) {
  return (
    <article className="flex w-[156px] shrink-0 flex-col items-center justify-center gap-2.5">
      <div className="relative h-[156px] w-[156px] overflow-hidden rounded-lg bg-[#ededed]">
        <img alt="" className="absolute inset-0 h-full w-full max-w-none object-cover" src={image} />
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-1">
        <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-center text-sm font-normal leading-[normal] tracking-[-0.02em] text-off-black">
          {name}
        </p>
        <p className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-center text-xs font-medium leading-[normal] tracking-[-0.02em] text-grey">
          {brand}
        </p>
      </div>
    </article>
  );
}

export default function OnboardingResults() {
  const navigate = useNavigate();
  const recommendationsRef = useRef<HTMLDivElement>(null);
  const recommendationsDrag = useRef({ active: false, startX: 0, scrollLeft: 0 });

  const stopRecommendationsDrag = (event: PointerEvent<HTMLDivElement>) => {
    const scroller = recommendationsRef.current;

    if (!recommendationsDrag.current.active || !scroller) {
      return;
    }

    recommendationsDrag.current.active = false;
    scroller.classList.remove("is-dragging");

    if (scroller.hasPointerCapture(event.pointerId)) {
      scroller.releasePointerCapture(event.pointerId);
    }
  };

  const startRecommendationsDrag = (event: PointerEvent<HTMLDivElement>) => {
    const scroller = recommendationsRef.current;

    if (event.pointerType !== "mouse" || event.button !== 0 || !scroller) {
      return;
    }

    recommendationsDrag.current = {
      active: true,
      startX: event.clientX,
      scrollLeft: scroller.scrollLeft,
    };
    scroller.setPointerCapture(event.pointerId);
    scroller.classList.add("is-dragging");
  };

  const moveRecommendationsDrag = (event: PointerEvent<HTMLDivElement>) => {
    const scroller = recommendationsRef.current;

    if (!recommendationsDrag.current.active || !scroller) {
      return;
    }

    if (event.buttons !== 1) {
      stopRecommendationsDrag(event);
      return;
    }

    event.preventDefault();
    scroller.scrollLeft =
      recommendationsDrag.current.scrollLeft - (event.clientX - recommendationsDrag.current.startX);
  };

  const goToHome = () => {
    completeOnboarding();
    navigate("/", { replace: true });
  };

  const shareResults = async () => {
    const shareData = {
      title: "LAYER 향수 취향 결과",
      text: "나의 향수 취향은 Bold Signature예요.",
      url: window.location.href,
    };

    if (navigator.share) {
      await navigator.share(shareData).catch(() => undefined);
      return;
    }

    await navigator.clipboard?.writeText(shareData.url).catch(() => undefined);
  };

  return (
    <main className="min-h-dvh overflow-x-hidden bg-off-white">
      <div className="relative mx-auto h-[1392px] w-full max-w-[430px] overflow-x-hidden bg-off-white">
        <StatusBar />

        <header className="absolute left-0 top-[81px] flex w-[430px] items-end justify-between px-5 py-px">
          <button aria-label="이전 화면" className="relative h-6 w-6 shrink-0" onClick={() => navigate("/onboarding/5")} type="button">
            <img alt="" className="absolute inset-0 h-full w-full max-w-none" src={chevronLeft} />
          </button>
          <h1 className="absolute left-1/2 top-[-1px] w-[86px] -translate-x-1/2 text-center text-2xl font-semibold leading-[1.08] tracking-[-0.03em] text-off-black">
            유형 결과
          </h1>
          <button aria-label="결과 공유하기" className="relative h-6 w-6 shrink-0" onClick={shareResults} type="button">
            <img alt="" className="absolute inset-0 h-full w-full max-w-none" src={uploadIcon} />
          </button>
        </header>

        <div className="absolute left-[18px] top-[121px] h-[443px] w-[394px] overflow-hidden rounded-[15px]">
          <img alt="" className="h-full w-full max-w-none rounded-[15px] object-cover" src={heroImage} />
        </div>

        <section className="absolute left-[18px] top-[612px] w-[394px]">
          <p className="text-base font-medium leading-[normal] tracking-[-0.02em] text-off-black-70">
            강렬한 시그니처형
          </p>
          <p className="mt-[5px] w-[275px] whitespace-nowrap text-center font-cormorant text-[54px] font-semibold italic leading-[normal] tracking-[-0.02em] text-black">
            Bold Signature
          </p>

          <div className="mt-[5px] flex w-[263px] justify-center gap-[5px]">
            {["# 존재감", "# 자신감", "# 시그니처"].map((tag) => (
              <span
                className="rounded-[30px] bg-black px-2.5 py-[3px] font-geist text-[10px] font-normal leading-[normal] tracking-[-0.02em] text-white"
                key={tag}
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="mt-2.5 text-sm font-medium leading-[normal] tracking-[-0.02em] text-off-black-70">
            존재감 있는 향을 하나 자신 있게 밀고 가요
          </p>

          <div className="mt-[34px] flex flex-col gap-[33px]">
            <PreferenceScale image={boldScale} leftLabel="은은함" rightLabel="확실함" />
            <PreferenceScale image={exploreScale} leftLabel="한결같음" rightLabel="탐험적" />
          </div>
        </section>

        <section className="absolute left-0 top-[947px] w-[430px] overflow-hidden pl-5">
          <div className="flex w-[390px] items-start justify-between">
            <h2 className="text-2xl font-semibold leading-[1.08] tracking-[-0.03em] text-off-black">추천 향수</h2>
            <button className="flex items-center gap-1.5 text-sm font-medium leading-[normal] tracking-[-0.02em] text-grey" type="button">
              <span>더보기</span>
              <img alt="" className="h-[18px] w-[18px]" src={chevronRight} />
            </button>
          </div>

          <div
            className="horizontal-scroller scrollbar-hidden mt-5 w-full touch-pan-x overflow-x-auto overscroll-x-contain pr-5"
            onDragStart={(event) => event.preventDefault()}
            onLostPointerCapture={() => {
              recommendationsDrag.current.active = false;
              recommendationsRef.current?.classList.remove("is-dragging");
            }}
            onPointerCancel={stopRecommendationsDrag}
            onPointerDown={startRecommendationsDrag}
            onPointerMove={moveRecommendationsDrag}
            onPointerUp={stopRecommendationsDrag}
            ref={recommendationsRef}
          >
            <div className="flex h-[201px] w-[488px] items-center justify-between">
              {recommendedPerfumes.map((perfume) => (
                <PerfumeCard {...perfume} key={perfume.name} />
              ))}
            </div>
          </div>
        </section>

        <div className="absolute left-[18px] top-[1268px] flex w-[394px] flex-col gap-4">
          <button
            className="flex h-[50px] w-full items-center justify-center overflow-hidden rounded-[32px] border border-black bg-black px-10 py-4 text-white"
            onClick={goToHome}
            type="button"
          >
            <span className="font-cormorant text-xl font-medium leading-[1.5] tracking-[-0.011em]">LAYER</span>
            <span className="text-base font-medium leading-none tracking-[-0.02em]">에서 나만의 향수 찾기</span>
          </button>
          <button
            className="flex h-[50px] w-full items-center justify-center overflow-hidden rounded-[32px] border border-point-orange px-10 py-4 text-base font-medium leading-[normal] tracking-[-0.02em] text-point-orange"
            onClick={shareResults}
            type="button"
          >
            결과 공유하기
          </button>
        </div>
      </div>
    </main>
  );
}
