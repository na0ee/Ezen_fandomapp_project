import type { ReactNode } from "react";
import { BottomNavigation } from "./BottomNavigation";
import { Header } from "./Header";

type PageLayoutProps = {
  children: ReactNode;
  title?: string;
  headerAction?: ReactNode;
  showNavigation?: boolean;
  contentClassName?: string;
};

export function PageLayout({
  children,
  title,
  headerAction,
  showNavigation = true,
  contentClassName = "gap-16 px-5",
}: PageLayoutProps) {
  return (
    <main className="min-h-dvh bg-off-white">
      <div className="mx-auto flex min-h-dvh w-full max-w-[430px] flex-col bg-off-white">
        <Header title={title} action={headerAction} />
        <div className={`wrap flex flex-1 flex-col pt-[var(--app-header-height)] pb-[112px] ${contentClassName}`}>{children}</div>
        {showNavigation && <BottomNavigation />}
      </div>
    </main>
  );
}
