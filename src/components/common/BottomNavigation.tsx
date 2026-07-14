import { NavLink } from "react-router-dom";
import aiSparklesIcon from "../../assets/navigation/ai-sparkles.svg";
import communityIcon from "../../assets/navigation/community.svg";
import giftIcon from "../../assets/navigation/gift.svg";
import homeSelectedIcon from "../../assets/navigation/home-selected.svg";
import magazineIcon from "../../assets/navigation/magazine.svg";
import userIcon from "../../assets/navigation/user.svg";

const navigationItems = [
  { label: "홈", href: "/", icon: homeSelectedIcon, isSelected: true },
  { label: "이벤트", href: "/event", icon: giftIcon, isSelected: false },
  { label: "커뮤니티", href: "/community", icon: communityIcon, isSelected: false },
  { label: "매거진", href: "/magazine", icon: magazineIcon, isSelected: false },
  { label: "마이", href: "/mypage", icon: userIcon, isSelected: false },
];

export function BottomNavigation() {
  return (
    <div className="sticky bottom-0 z-50 mx-auto mt-auto w-full max-w-[430px] bg-off-white px-4 pt-3 pb-[max(12px,env(safe-area-inset-bottom))]">
      <div className="grid h-[72px] w-full grid-cols-[minmax(0,320px)_minmax(58px,68px)] gap-2.5">
        <nav className="gnb flex h-[72px] min-w-0 flex-col items-start rounded-nav border-[0.6px] border-light-grey bg-off-black py-[15px]">
          <div className="flex w-full items-center justify-between px-[18px]">
            {navigationItems.map(({ label, href, icon, isSelected }) => (
              <NavLink
                key={label}
                className={`flex h-10 w-[38px] shrink-0 flex-col items-center justify-center gap-1 text-xs font-medium leading-normal tracking-[-0.02em] ${isSelected ? "text-off-white" : "text-light-grey"}`}
                to={href}
              >
                <img alt="" aria-hidden="true" className="size-6 shrink-0" src={icon} />
                <span className="w-full whitespace-nowrap text-center">{label}</span>
              </NavLink>
            ))}
          </div>
        </nav>
        <NavLink
          aria-label="AI 향수 진단"
          className="flex h-[72px] min-w-0 flex-col items-start rounded-[200px] border-[0.6px] border-light2-grey bg-off-black py-[15px] text-xs font-medium leading-normal tracking-[-0.02em] text-off-white"
          to="/question"
        >
          <div className="flex w-full items-center justify-center px-[18px]">
            <div className="flex h-10 w-[38px] shrink-0 flex-col items-center justify-center gap-1">
              <img alt="" aria-hidden="true" className="size-6 shrink-0" src={aiSparklesIcon} />
              <span className="whitespace-nowrap text-center">AI</span>
            </div>
          </div>
        </NavLink>
      </div>
    </div>
  );
}
