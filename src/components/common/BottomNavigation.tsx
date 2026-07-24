import {
  BookOpen,
  Gift,
  Home,
  MessageCircle,
  Sparkles,
  User,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const navigationItems = [
  { label: "홈", href: "/", Icon: Home },
  { label: "이벤트", href: "/event", Icon: Gift },
  { label: "커뮤니티", href: "/community", Icon: MessageCircle },
  { label: "매거진", href: "/magazine", Icon: BookOpen },
  { label: "마이", href: "/mypage", Icon: User },
];

type BottomNavigationProps = {
  placement?: "sticky" | "frame" | "overlay" | "fixed";
};

export function BottomNavigation({
  placement = "sticky",
}: BottomNavigationProps) {
  const containerClassName =
    placement === "overlay"
      ? "absolute inset-x-0 bottom-0 z-50 flex gap-2.5 px-4 pt-3 pb-[max(12px,env(safe-area-inset-bottom))]"
      : placement === "frame"
        ? "relative z-40 mx-auto flex w-full max-w-[430px] gap-2.5 px-4 pt-3 pb-[max(12px,env(safe-area-inset-bottom))]"
        : "fixed bottom-0 left-1/2 z-50 flex w-full max-w-[430px] -translate-x-1/2 gap-2.5 px-4 pt-3 pb-[max(12px,env(safe-area-inset-bottom))]";

  return (
    <div className={containerClassName}>
      <div className="grid h-[72px] w-full grid-cols-[minmax(0,320px)_minmax(58px,68px)] gap-2.5">
        <nav className="flex h-[72px] min-w-0 flex-col items-start rounded-nav bg-off-black py-[14px]">
          <div className="flex w-full items-center justify-between px-[18px]">
            {navigationItems.map(({ label, href, Icon }) => (
              <NavLink
                className="flex h-10 w-[38px] shrink-0 flex-col items-center justify-center gap-1 text-xs font-medium leading-none tracking-[-0.02em]"
                end={href === "/"}
                key={label}
                to={href}
              >
                {({ isActive }) => {
                  return (
                    <span
                      className={`flex flex-col items-center gap-1 ${isActive ? "text-off-white" : "text-grey"}`}
                    >
                      <Icon
                        aria-hidden="true"
                        className="size-6 shrink-0"
                        strokeWidth={1.6}
                      />
                      <span className="w-full whitespace-nowrap text-center">
                        {label}
                      </span>
                    </span>
                  );
                }}
              </NavLink>
            ))}
          </div>
        </nav>
        <NavLink
          aria-label="AI 향수 진단"
          className="flex h-[72px] min-w-0 flex-col items-start rounded-[200px] border-[0.6px] border-light2-grey bg-off-black py-[15px] text-xs font-medium leading-none tracking-[-0.02em]"
          to="/chatbot"
        >
          <div className="flex w-full items-center justify-center px-[18px]">
            <div className="flex h-10 w-[38px] shrink-0 flex-col items-center justify-center gap-1">
              <Sparkles
                aria-hidden="true"
                className="size-6 shrink-0 fill-point-orange text-point-orange"
                strokeWidth={1.5}
              />
              <span className="whitespace-nowrap text-center text-off-white">
                AI
              </span>
            </div>
          </div>
        </NavLink>
      </div>
    </div>
  );
}
