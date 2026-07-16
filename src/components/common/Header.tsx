import type { ReactNode } from "react";
import { LayerLogo } from "../icons/LayerLogo";

type HeaderProps = {
  title?: string;
  action?: ReactNode;
};

export function Header({ title, action }: HeaderProps) {
  return (
    <header className="header fixed left-1/2 top-0 z-50 flex h-[calc(54px+env(safe-area-inset-top))] w-full max-w-[430px] -translate-x-1/2 items-center justify-between bg-off-white px-5 pt-[env(safe-area-inset-top)]">
      {title ? (
        <h1 className="text-2xl font-semibold leading-[1.08] tracking-[-0.02em]">{title}</h1>
      ) : (
        <LayerLogo />
      )}
      {action && <div className="flex items-center">{action}</div>}
    </header>
  );
}
