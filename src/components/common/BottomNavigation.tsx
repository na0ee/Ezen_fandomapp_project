import { NavLink } from "react-router-dom";
import aiIcon from "../../assets/navigation/figma/ai.svg";
import communityActiveIcon from "../../assets/navigation/figma/community-active.svg";
import communityInactiveIcon from "../../assets/navigation/figma/community-inactive.svg";
import eventActiveIcon from "../../assets/navigation/figma/event-active.svg";
import eventInactiveIcon from "../../assets/navigation/figma/event-inactive.svg";
import homeActiveIcon from "../../assets/navigation/figma/home-active.svg";
import homeInactiveIcon from "../../assets/navigation/figma/home-inactive.svg";
import magazineActiveIcon from "../../assets/navigation/figma/magazine-active.svg";
import magazineInactiveIcon from "../../assets/navigation/figma/magazine-inactive.svg";
import mypageActiveIcon from "../../assets/navigation/figma/mypage-active.svg";
import mypageInactiveIcon from "../../assets/navigation/figma/mypage-inactive.svg";

const navigationItems = [
  { label: "홈", href: "/", activeIcon: homeActiveIcon, inactiveIcon: homeInactiveIcon },
  { label: "이벤트", href: "/event", activeIcon: eventActiveIcon, inactiveIcon: eventInactiveIcon },
  { label: "커뮤니티", href: "/community", activeIcon: communityActiveIcon, inactiveIcon: communityInactiveIcon },
  { label: "매거진", href: "/magazine", activeIcon: magazineActiveIcon, inactiveIcon: magazineInactiveIcon },
  { label: "마이", href: "/mypage", activeIcon: mypageActiveIcon, inactiveIcon: mypageInactiveIcon },
];

type BottomNavigationProps = {
  placement?: "sticky" | "frame" | "overlay" | "fixed";
};

export function BottomNavigation({ placement = "sticky" }: BottomNavigationProps) {
  const containerClassName =
    placement === "overlay"
      ? "absolute inset-x-0 bottom-0 z-50 flex gap-2.5 px-4 pt-3 pb-[max(12px,env(safe-area-inset-bottom))]"
      : placement === "frame"
        ? "relative z-40 mx-auto flex w-full max-w-[430px] gap-2.5 px-4 pt-3 pb-[max(12px,env(safe-area-inset-bottom))]"
      : "fixed bottom-0 left-1/2 z-50 flex w-full max-w-[430px] -translate-x-1/2 gap-2.5 px-4 pt-3 pb-[max(12px,env(safe-area-inset-bottom))]";

  return (
    <div className={containerClassName}>
      <div className="grid h-[72px] w-full grid-cols-[minmax(0,320px)_minmax(58px,68px)] gap-2.5">
        <nav className="flex h-[72px] min-w-0 flex-col items-start rounded-nav border-[0.6px] border-light-grey bg-off-black py-[15px]">
          <div className="flex w-full items-center justify-between px-[18px]">
            {navigationItems.map(({ label, href, activeIcon, inactiveIcon }) => (
              <NavLink
                className="flex h-10 w-[38px] shrink-0 flex-col items-center justify-center gap-1 text-xs font-medium leading-none tracking-[-0.02em]"
                end={href === "/"}
                key={label}
                to={href}
              >
                {({ isActive }) => {
                  const color = isActive ? "#FFFFFF" : "#8A8A8A";

                  return (
                    <>
                      <img
                        alt=""
                        aria-hidden="true"
                        className="size-6 shrink-0"
                        src={isActive ? activeIcon : inactiveIcon}
                      />
                      <span className="w-full whitespace-nowrap text-center" style={{ color }}>
                        {label}
                      </span>
                    </>
                  );
                }}
              </NavLink>
            ))}
          </div>
        </nav>
        <NavLink
          aria-label="AI 향수 진단"
          className="flex h-[72px] min-w-0 flex-col items-start rounded-[200px] border-[0.6px] border-light2-grey bg-off-black py-[15px] text-xs font-medium leading-none tracking-[-0.02em]"
          to="/question"
        >
          <div className="flex w-full items-center justify-center px-[18px]">
            <div className="flex h-10 w-[38px] shrink-0 flex-col items-center justify-center gap-1">
              <img alt="" aria-hidden="true" className="size-6 shrink-0" src={aiIcon} />
              <span className="whitespace-nowrap text-center text-off-white">AI</span>
            </div>
          </div>
        </NavLink>
      </div>
    </div>
  );
}
