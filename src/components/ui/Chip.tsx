import type { ButtonHTMLAttributes } from "react";

type ChipProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  variant?: "filled" | "outline" | "disabled";
  size?: "sm" | "md";
};

export function Chip({ label, variant = "outline", size = "md", className = "", ...props }: ChipProps) {
  const sizeStyles = {
    sm: "rounded-full px-3.5 py-2 text-[13px] font-medium border-[0.8px]",
    md: "rounded-chip px-3.5 py-[5px] text-xs font-normal",
  };

  const outlineVariant = {
    sm: "border-light-grey bg-off-white text-grey",
    md: "border border-off-black bg-off-white text-off-black",
  };

  const styles = {
    filled: "bg-off-black text-off-white",
    outline: outlineVariant[size],
    disabled: "bg-light-grey text-off-white",
  };

  return (
    <button
      className={`cursor-pointer ${sizeStyles[size]} leading-none tracking-[-0.02em] ${styles[variant]} ${className}`}
      type="button"
      {...props}
    >
      {label}
    </button>
  );
}
