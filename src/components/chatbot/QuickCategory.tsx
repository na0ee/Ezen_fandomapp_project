import type { ButtonHTMLAttributes } from "react";

type QuickCategoryVariant = "default" | "selected" | "under";

type QuickCategoryProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  variant?: QuickCategoryVariant;
};

const variantStyles: Record<QuickCategoryVariant, string> = {
  default: "border border-light-grey bg-off-white text-subtext",
  selected: "border border-off-black bg-off-black text-off-white",
  under: "border border-light-grey bg-light2-grey text-grey",
};

export function QuickCategory({ label, variant = "default", className = "", ...props }: QuickCategoryProps) {
  return (
    <button
      className={`flex h-[38px] items-center justify-center whitespace-nowrap rounded-[100px] px-4 font-geist text-sm font-normal leading-[14px] tracking-[-0.02em] ${variantStyles[variant]} ${className}`}
      data-chatbot-component="QuickCategory"
      type="button"
      {...props}
    >
      {label}
    </button>
  );
}
