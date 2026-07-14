import { CalendarDays, Home, MessageCircle, Sparkles, UserRound, BookOpen } from "lucide-react";
import { NavLink } from "react-router-dom";

const navigationItems = [
  { label: "홈", href: "/", icon: Home },
  { label: "이벤트", href: "/event", icon: CalendarDays },
  { label: "커뮤니티", href: "/community", icon: MessageCircle },
  { label: "매거진", href: "/magazine", icon: BookOpen },
  { label: "마이", href: "/mypage", icon: UserRound },
];

export function BottomNavigation() {
  return (
    <div className="sticky bottom-0 z-50 mt-auto flex gap-2.5 bg-off-white/90 px-5 pt-3 pb-[max(12px,env(safe-area-inset-bottom))] backdrop-blur-md">
      <nav className="gnb flex min-w-0 flex-1 items-center justify-between rounded-nav border-[0.6px] border-light-grey bg-off-black px-[18px] py-[15px]">
        {navigationItems.map(({ label, href, icon: Icon }) => (
          <NavLink
            key={label}
            className={({ isActive }) =>
              `flex w-[38px] flex-col items-center gap-1 text-xs font-medium leading-none tracking-[-0.02em] ${isActive ? "text-off-white" : "text-light-grey"}`
            }
            to={href}
          >
            <Icon aria-hidden="true" size={24} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
      <NavLink
        aria-label="AI 향수 진단"
        className="flex w-[58px] shrink-0 flex-col items-center justify-center gap-1 rounded-full bg-off-black text-xs font-medium leading-none text-off-white"
        to="/question"
      >
        <Sparkles aria-hidden="true" size={24} />
        <span>AI</span>
      </NavLink>
    </div>
  );
}
