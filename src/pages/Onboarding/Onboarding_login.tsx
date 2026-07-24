import { useState } from "react";
import { useNavigate } from "react-router-dom";
import appleLogo from "../../assets/onboarding/login-apple.svg";
import batteryEnd from "../../assets/onboarding/login-battery-end.svg";
import batteryFill from "../../assets/onboarding/login-battery-fill.svg";
import batteryOutline from "../../assets/onboarding/login-battery-outline.svg";
import googleBase from "../../assets/onboarding/login-google-base.svg";
import googleG from "../../assets/onboarding/login-google-g.svg";
import kakaoLogo from "../../assets/onboarding/login-kakao.png";
import mobileSignal from "../../assets/onboarding/login-mobile-signal.svg";
import naverLogo from "../../assets/onboarding/login-naver.svg";
import wifi from "../../assets/onboarding/login-wifi.svg";

function StatusBar() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-x-0 top-0 flex h-[64.555px] items-end justify-center bg-off-black"
    >
      <div className="flex h-full min-w-0 flex-1 flex-col items-center justify-center pb-[3.282px] pl-[10.941px]">
        <span className="flex h-[22.977px] w-[59.084px] items-center justify-center pt-px font-sans text-[17.51px] font-semibold leading-[22.977px] tracking-[-0.32px] text-white">
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

export default function OnboardingLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const startOnboarding = () => {
    navigate("/onboarding/profile");
  };

  return (
    <main className="min-h-dvh bg-black">
      <div className="relative mx-auto min-h-[932px] w-full max-w-[430px] overflow-hidden bg-off-black">
        <StatusBar />

        <div className="absolute left-0 top-[65px] flex w-full flex-col items-center px-5 pt-[100px]">
          <header className="flex flex-col items-center gap-[18px] text-center text-white">
            <p className="font-cormorant text-[48px] font-medium leading-none tracking-[-0.96px]">
              LAYER
            </p>
            <p className="text-base font-normal leading-none tracking-[-0.32px]">
              향이 겹쳐, 취향이 되는 곳
            </p>
          </header>

          <div className="mt-[188px] flex w-full flex-col gap-4">
            <form
              className="flex w-full flex-col gap-6"
              noValidate
              onSubmit={(event) => {
                event.preventDefault();
                startOnboarding();
              }}
            >
              <div className="flex flex-col gap-[14px]">
                <input
                  autoComplete="email"
                  className="h-[46px] w-full rounded-[50px] border border-light-grey bg-off-white px-6 text-sm font-normal tracking-[-0.02em] text-off-black placeholder:text-subtext"
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="이메일을 입력하세요"
                  type="email"
                  value={email}
                />
                <input
                  autoComplete="current-password"
                  className="h-[46px] w-full rounded-[50px] border border-light-grey bg-off-white px-6 text-sm font-normal tracking-[-0.02em] text-off-black placeholder:text-subtext"
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="비밀번호를 입력하세요"
                  type="password"
                  value={password}
                />
              </div>

              <button
                className="flex h-[56px] w-full items-center justify-center rounded-cta bg-point-orange text-xl font-bold tracking-[-0.02em] text-off-white"
                type="submit"
              >
                로그인
              </button>
            </form>

            <div className="flex w-full flex-col items-center gap-6">
              <div className="flex items-center justify-center gap-8">
                <button
                  aria-label="구글로 로그인"
                  className="relative size-11 shrink-0 overflow-hidden rounded-full"
                  onClick={startOnboarding}
                  type="button"
                >
                  <img alt="" className="absolute inset-0 h-full w-full" src={googleBase} />
                  <img
                    alt=""
                    className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2"
                    src={googleG}
                  />
                </button>
                <button
                  aria-label="네이버로 로그인"
                  className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#03c75a]"
                  onClick={startOnboarding}
                  type="button"
                >
                  <img alt="" className="h-[16.296px] w-[16.296px] -scale-x-100" src={naverLogo} />
                </button>
                <button
                  aria-label="카카오로 로그인"
                  className="size-11 shrink-0 overflow-hidden rounded-full"
                  onClick={startOnboarding}
                  type="button"
                >
                  <img alt="" className="h-full w-full object-cover" src={kakaoLogo} />
                </button>
                <button
                  aria-label="애플로 로그인"
                  className="flex size-11 shrink-0 items-center justify-center rounded-full border border-[#bfbfbf] bg-white"
                  onClick={startOnboarding}
                  type="button"
                >
                  <img alt="" className="h-[30px] w-[25px]" src={appleLogo} />
                </button>
              </div>

              <div className="flex items-center gap-1 text-[10px] font-normal tracking-[-0.02em] text-white">
                <button type="button">이메일·비밀번호찾기</button>
                <span>|</span>
                <button onClick={startOnboarding} type="button">
                  회원가입
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
