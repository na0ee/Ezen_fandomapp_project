import type { ButtonHTMLAttributes } from "react";

type TabProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  isActive?: boolean;
};

export function Tab({ label, isActive = false, className = "", ...props }: TabProps) {
  return (
    <button
      aria-pressed={isActive}
      className={`rounded-full px-3.5 py-2 text-xs font-medium leading-none tracking-[-0.02em] ${
        isActive
          ? "bg-off-black text-off-white"
          : "border-[0.8px] border-light-grey bg-off-white text-grey"
      } ${className}`}
      type="button"
      {...props}
    >
      {label}
    </button>
  );
}
