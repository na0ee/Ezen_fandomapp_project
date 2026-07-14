import type { ReactNode } from "react";
import { LayerLogo } from "../icons/LayerLogo";

type HeaderProps = {
  title?: string;
  action?: ReactNode;
};

export function Header({ title, action }: HeaderProps) {
  return (
    <header className="header flex min-h-[54px] items-center justify-between px-5 pt-[env(safe-area-inset-top)]">
      {title ? (
        <h1 className="text-xl font-bold leading-none tracking-[-0.02em]">{title}</h1>
      ) : (
        <LayerLogo />
      )}
      {action && <div className="flex items-center">{action}</div>}
    </header>
  );
}
