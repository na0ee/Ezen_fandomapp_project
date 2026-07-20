import { useLocation } from "react-router-dom";

export function OnboardingProgress() {
  const { pathname } = useLocation();
  const match = pathname.match(/^\/onboarding\/([1-5])\/?$/);

  if (!match) {
    return null;
  }

  const currentStep = Number(match[1]);

  return (
    <div
      aria-label={`온보딩 진행률 ${currentStep}/5`}
      className="pointer-events-none absolute left-1/2 top-[75px] z-20 h-0.5 -translate-x-1/2 overflow-hidden bg-[#d9d9d9]"
      role="progressbar"
      style={{ width: "min(calc(100vw - 30px), 400px)" }}
    >
      <div
        className="h-full bg-off-black transition-[width] duration-300 ease-out"
        style={{ width: `${currentStep * 20}%` }}
      />
    </div>
  );
}
