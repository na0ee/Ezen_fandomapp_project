import { Gift } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CHALLENGE_LIST_PATH,
  getPendingChallengeReward,
} from "../../store/challengeReward";

export function ChallengeRewardCTA() {
  const location = useLocation();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const hasReward = Boolean(getPendingChallengeReward());
    const onListPage = location.pathname === CHALLENGE_LIST_PATH;

    setVisible(hasReward && !onListPage);
  }, [location.pathname]);

  useEffect(() => {
    if (!visible) {
      setEntered(false);
      return;
    }

    const frame = window.requestAnimationFrame(() => setEntered(true));

    return () => window.cancelAnimationFrame(frame);
  }, [visible]);

  if (!visible) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed bottom-[calc(104px+env(safe-area-inset-bottom))] left-1/2 z-[70] flex w-full max-w-[430px] -translate-x-1/2 justify-center px-5">
      <button
        className={`pointer-events-auto flex h-[54px] w-full items-center justify-center gap-2 rounded-cta bg-point-orange text-base font-bold tracking-[-0.02em] text-off-white transition-all duration-300 ease-out ${
          entered ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
        }`}
        onClick={() => navigate(CHALLENGE_LIST_PATH)}
        type="button"
      >
        <Gift aria-hidden="true" size={20} strokeWidth={1.8} />
        포인트 받으러 가기
      </button>
    </div>
  );
}
