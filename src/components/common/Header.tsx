import type { ReactNode } from "react";
import { LayerLogo } from "../icons/LayerLogo";

type HeaderProps = {
  title?: string;
  action?: ReactNode;
  titleClassName?: string;
};

export function Header({ title, action, titleClassName = "" }: HeaderProps) {
  return (
    <header className="header fixed left-1/2 top-0 z-50 flex w-full max-w-[430px] -translate-x-1/2 items-center justify-between bg-off-white px-5 py-[13px] pt-[calc(var(--app-safe-top)+13px)]">
      {title ? (
        <h1 className={`truncate text-xl font-medium leading-[normal] tracking-[-0.02em] ${titleClassName}`}>{title}</h1>
      ) : (
        <LayerLogo />
      )}
      {action && <div className="flex items-center">{action}</div>}
    </header>
  );
}
