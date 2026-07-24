import { useState } from "react";
import { useNavigate } from "react-router-dom";
import batteryEnd from "../../assets/onboarding/battery-end.svg";
import batteryFill from "../../assets/onboarding/battery-fill.svg";
import batteryOutline from "../../assets/onboarding/battery-outline.svg";
import mobileSignal from "../../assets/onboarding/mobile-signal.svg";
import addPhotoIcon from "../../assets/onboarding/profile-add-photo.svg";
import profileBottle from "../../assets/onboarding/profile-bottle.png";
import chevronRight from "../../assets/onboarding/results-chevron-right.svg";
import wifi from "../../assets/onboarding/wifi.svg";

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

export default function OnboardingProfile() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");

  const goToQuestions = () => {
    navigate("/onboarding/1");
  };

  const skipOnboarding = () => {
    navigate("/onboarding/skip");
  };

  return (
    <main className="min-h-dvh bg-black max-[430px]:bg-off-white">
      <div className="relative mx-auto min-h-[932px] w-full max-w-[430px] overflow-hidden bg-off-white">
        <StatusBar />

        <div className="absolute left-1/2 top-[65px] h-0.5 w-[430px] -translate-x-1/2 bg-[#d9d9d9]" />

        <button
          className="absolute right-5 top-[91px] flex items-center gap-1.5 text-sm font-medium leading-[normal] tracking-[-0.02em] text-grey"
          onClick={skipOnboarding}
          type="button"
        >
          <span>건너뛰기</span>
          <img alt="" className="h-[18px] w-[18px]" src={chevronRight} />
        </button>

        <header className="absolute inset-x-0 top-[142px] flex flex-col items-center gap-1.5 px-5 text-center">
          <p className="font-cormorant text-2xl font-bold leading-[normal] tracking-[-0.02em] text-off-black">
            Find my LAYER
          </p>
          <p className="text-base font-medium leading-[normal] tracking-[-0.02em] text-off-black">
            몇 가지 질문으로 당신만의 향 취향을 찾아드릴게요
          </p>
        </header>

        <div className="absolute left-1/2 top-[256px] flex size-20 -translate-x-1/2 items-center justify-center overflow-hidden rounded-full bg-light2-grey">
          <div className="relative h-[50px] w-[34px] overflow-hidden">
            <img
              alt=""
              className="absolute left-[-60.7%] top-[-21.26%] h-[147.6%] w-[220.96%] max-w-none"
              src={profileBottle}
            />
          </div>
        </div>

        <button
          className="absolute left-1/2 top-[348px] flex -translate-x-1/2 items-center gap-1 rounded-full bg-light-grey px-2 py-1"
          type="button"
        >
          <img alt="" className="h-2.5 w-2.5" src={addPhotoIcon} />
          <span className="whitespace-nowrap text-[10px] font-medium leading-[normal] tracking-[-0.02em] text-off-black">
            프로필 사진 추가하기
          </span>
        </button>

        <div className="absolute inset-x-0 top-[408px] flex items-center justify-center gap-6 px-5">
          <label
            className="shrink-0 whitespace-nowrap text-sm font-medium leading-[normal] tracking-[-0.02em] text-off-black"
            htmlFor="nickname"
          >
            닉네임
          </label>
          <input
            className="w-[236px] rounded-[24px] bg-light2-grey px-5 py-[7px] text-sm font-medium leading-[normal] tracking-[-0.02em] text-off-black placeholder:text-subtext"
            id="nickname"
            onChange={(event) => setNickname(event.target.value)}
            placeholder="사용할 이름을 입력해주세요"
            type="text"
            value={nickname}
          />
        </div>

        <button
          className="absolute bottom-[88px] left-5 right-5 flex h-[56px] items-center justify-center rounded-cta border border-off-black bg-off-black text-xl font-bold tracking-[-0.02em] text-off-white"
          onClick={goToQuestions}
          type="button"
        >
          내 향수 유형 알아보기
        </button>
      </div>
    </main>
  );
}
