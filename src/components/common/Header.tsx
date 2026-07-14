import type { ReactNode } from "react";
import { LayerLogo } from "../icons/LayerLogo";

type HeaderProps = {
  title?: string;
  action?: ReactNode;
};

export function Header({ title, action }: HeaderProps) {
  return (
    <header className="header fixed top-0 left-1/2 z-50 flex min-h-[54px] w-full max-w-[430px] -translate-x-1/2 items-center justify-between bg-off-white px-5 pt-[env(safe-area-inset-top)]">
      {title ? (
        <h1 className="text-xl font-bold leading-none tracking-[-0.02em]">{title}</h1>
      ) : (
        <LayerLogo />
      )}
      {action && <div className="flex items-center">{action}</div>}
    </header>
  );
}
