import { NavLink } from "react-router-dom";

const navIconAssets = {
  inactive: {
    home: "/assets/figma/7c69e6c7-c491-4c9c-b71f-300a133a59f8.svg",
    event: "/assets/figma/f0e6261d-a93f-4fff-9532-54052cc93cde.svg",
    community: "/assets/figma/3355576b-0b12-449e-bd67-242fda15dd8c.svg",
    magazine: "/assets/figma/407ecd9c-ed02-4ff3-918b-9cfe4b88e676.svg",
    user: "/assets/figma/760de666-96a3-4740-9a48-22610d33c49c.svg",
    ai: "/assets/figma/39ad3e7b-2cc0-4c9b-aab8-6b82d57a8b79.svg",
  },
  active: {
    home: "/assets/figma/07593171-3527-4bbb-b7b6-a002ef5105a4.svg",
    event: "/assets/figma/94267218-c953-4be0-8681-7f9a1ebb8193.svg",
    community: "/assets/figma/b6f7f8a1-aec2-48e3-ad0c-182c5904c38f.svg",
    magazine: "/assets/figma/d9493cb7-f6ce-49f9-9099-b8eadf215c73.svg",
    user: "/assets/figma/08fcb06a-1062-48df-bea5-36c26212d941.svg",
    ai: "/assets/figma/243acacc-edec-4c65-af32-81383f21aa5a.svg",
  },
};

type NavIconKey = keyof typeof navIconAssets.inactive;

type NavigationItem = {
  label: string;
  href: string;
  iconKey: NavIconKey;
  end?: boolean;
};

const navigationItems: NavigationItem[] = [
  { label: "홈", href: "/", iconKey: "home", end: true },
  { label: "이벤트", href: "/event", iconKey: "event" },
  { label: "커뮤니티", href: "/community", iconKey: "community" },
  { label: "매거진", href: "/magazine", iconKey: "magazine" },
  { label: "마이", href: "/mypage", iconKey: "user" },
];

type BottomNavigationProps = {
  placement?: "sticky" | "frame" | "overlay" | "fixed";
};

export function BottomNavigation({ placement = "sticky" }: BottomNavigationProps) {
  const containerClassName =
    placement === "fixed"
      ? "fixed bottom-0 left-1/2 z-50 flex w-full max-w-[430px] -translate-x-1/2 gap-2.5 px-4 pt-3 pb-[max(12px,env(safe-area-inset-bottom))]"
      : placement === "overlay"
        ? "absolute inset-x-0 bottom-0 z-50 flex gap-2.5 px-4 pt-3 pb-[max(12px,env(safe-area-inset-bottom))]"
        : placement === "frame"
          ? "z-50 flex shrink-0 gap-2.5 px-4 pt-3 pb-[max(12px,env(safe-area-inset-bottom))]"
          : "sticky bottom-0 z-50 mt-16 flex gap-2.5 px-4 pt-3 pb-[max(12px,env(safe-area-inset-bottom))]";

  return (
    <div className={containerClassName} data-node-id="737:14605">
      <nav className="gnb flex h-[72px] min-w-0 flex-1 items-center justify-between rounded-nav border-[0.6px] border-light-grey bg-off-black px-[18px] py-[15px]">
        {navigationItems.map(({ label, href, iconKey, end }) => (
          <NavLink end={end} key={label} to={href}>
            {({ isActive }) => (
              <span
                className={`flex h-10 w-[38px] flex-col items-center justify-center gap-1 text-xs font-medium leading-none tracking-[-0.02em] ${
                  isActive ? "text-off-white" : "text-grey"
                }`}
              >
                <img
                  alt=""
                  className="size-6"
                  src={isActive ? navIconAssets.active[iconKey] : navIconAssets.inactive[iconKey]}
                />
                <span className="whitespace-nowrap">{label}</span>
              </span>
            )}
          </NavLink>
        ))}
      </nav>
      <NavLink
        aria-label="AI 향수 진단"
        className="flex h-[72px] w-[68px] shrink-0 flex-col items-center justify-center gap-1 rounded-full border-[0.6px] border-light-grey bg-off-black text-xs font-medium leading-none tracking-[-0.02em] text-off-white"
        to="/question"
      >
        <img alt="" className="size-6" src={navIconAssets.active.ai} />
        <span className="whitespace-nowrap">AI</span>
      </NavLink>
    </div>
  );
}
