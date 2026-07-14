import type { ButtonHTMLAttributes } from "react";

type CtaButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  variant?: "default" | "outline";
};

export function CtaButton({ label, variant = "default", disabled, className = "", ...props }: CtaButtonProps) {
  const isKorean = /[가-힣]/.test(label);
  const variantClass = disabled
    ? "border-transparent bg-grey text-off-white"
    : variant === "outline"
      ? "border-point-orange bg-off-white text-point-orange"
      : "border-off-black bg-off-black text-off-white";

  return (
    <button
      className={`h-[50px] w-full rounded-cta border px-10 disabled:cursor-not-allowed ${variantClass} ${
        isKorean
          ? "font-pretendard text-base font-semibold tracking-[-0.02em]"
          : "font-cormorant text-lg font-bold tracking-[-0.02em]"
      } ${className}`}
      disabled={disabled}
      type="button"
      {...props}
    >
      {label}
    </button>
  );
}
