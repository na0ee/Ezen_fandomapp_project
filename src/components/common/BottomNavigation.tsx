import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { NavLink, useLocation } from "react-router-dom";
import communityActive from "../../assets/navigation/figma/community-active.svg";
import communityInactive from "../../assets/navigation/figma/community-inactive.svg";
import eventActive from "../../assets/navigation/figma/event-active.svg";
import eventInactive from "../../assets/navigation/figma/event-inactive.svg";
import homeActive from "../../assets/navigation/figma/home-active.svg";
import homeInactive from "../../assets/navigation/figma/home-inactive.svg";
import magazineActive from "../../assets/navigation/figma/magazine-active.svg";
import magazineInactive from "../../assets/navigation/figma/magazine-inactive.svg";
import mypageActive from "../../assets/navigation/figma/mypage-active.svg";
import mypageInactive from "../../assets/navigation/figma/mypage-inactive.svg";
import { CharacterLay } from "../chatbot/CharacterLay";

const navigationItems = [
  { activeIcon: homeActive, inactiveIcon: homeInactive, label: "홈", href: "/" },
  { activeIcon: eventActive, inactiveIcon: eventInactive, label: "이벤트", href: "/event" },
  { activeIcon: communityActive, inactiveIcon: communityInactive, label: "커뮤니티", href: "/community" },
  { activeIcon: magazineActive, inactiveIcon: magazineInactive, label: "매거진", href: "/magazine" },
  { activeIcon: mypageActive, inactiveIcon: mypageInactive, label: "마이", href: "/mypage" },
];

let previousActiveIndex: number | null = null;

type BottomNavigationProps = {
  placement?: "sticky" | "frame" | "overlay" | "fixed";
};

export function BottomNavigation({
  placement = "sticky",
}: BottomNavigationProps) {
  const { pathname } = useLocation();
  const activeIndex = navigationItems.findIndex(({ href }) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href),
  );
  const [indicatorIndex, setIndicatorIndex] = useState(() => previousActiveIndex ?? Math.max(activeIndex, 0));

  useEffect(() => {
    const animationFrame = requestAnimationFrame(() => {
      setIndicatorIndex(Math.max(activeIndex, 0));
      previousActiveIndex = activeIndex >= 0 ? activeIndex : null;
    });

    return () => cancelAnimationFrame(animationFrame);
  }, [activeIndex]);

  const containerClassName =
    placement === "overlay"
      ? "absolute inset-x-0 bottom-5 z-50 mx-auto flex w-[calc(100%_-_40px)] max-w-[390px] flex-col gap-3"
      : placement === "frame"
        ? "relative z-40 mx-auto mb-5 flex w-[calc(100%_-_40px)] max-w-[390px] flex-col gap-3"
        : "fixed bottom-5 left-1/2 z-50 flex w-[calc(100%_-_40px)] max-w-[390px] -translate-x-1/2 flex-col gap-3";

  const glassClassName =
    "border border-white/35 bg-black/70 shadow-[0_10px_30px_rgba(0,0,0,0.24),inset_0_1.5px_1px_rgba(255,255,255,0.28),inset_0_-2px_4px_rgba(0,0,0,0.28)] backdrop-blur-[24px] backdrop-brightness-75 backdrop-saturate-150";

  const navigation = (
    <div className={containerClassName}>
      <div className="flex w-full justify-end">
        <NavLink
          aria-label="AI 향수 진단"
          className={`relative flex size-[72px] items-center justify-center overflow-hidden rounded-full ${glassClassName}`}
          to="/chatbot"
        >
          <CharacterLay animated className="h-[50px] w-[34px]" />
        </NavLink>
      </div>

      <nav className={`flex h-[72px] w-full items-center rounded-nav p-2 ${glassClassName}`}>
        <div className="relative grid h-full w-full grid-cols-5 items-center">
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-y-0 left-0 w-1/5 rounded-[30px] bg-white/25 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),inset_0_-1px_2px_rgba(0,0,0,0.16)] transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:duration-0 ${
              activeIndex < 0 ? "opacity-0" : "opacity-100"
            }`}
            style={{ transform: `translateX(${indicatorIndex * 100}%)` }}
          />
          {navigationItems.map(({ activeIcon, inactiveIcon, label, href }) => (
            <NavLink
              className="relative z-10 flex h-full min-w-0 items-center justify-center"
              end={href === "/"}
              key={label}
              to={href}
            >
              {({ isActive }) => (
                <span
                  className={`flex h-10 w-[38px] flex-col items-center justify-center gap-1 text-xs font-medium leading-none tracking-[-0.02em] ${
                    isActive ? "text-off-white" : "text-grey"
                  }`}
                >
                  <img
                    alt=""
                    aria-hidden="true"
                    className="size-6 shrink-0"
                    src={isActive ? activeIcon : inactiveIcon}
                  />
                  <span className="w-full whitespace-nowrap text-center">{label}</span>
                </span>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );

  if (placement === "frame" || placement === "overlay") {
    return navigation;
  }

  return createPortal(navigation, document.body);
}
