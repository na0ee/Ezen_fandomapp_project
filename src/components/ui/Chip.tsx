import type { ButtonHTMLAttributes } from "react";

type ChipProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  variant?: "filled" | "outline" | "disabled";
};

export function Chip({ label, variant = "outline", className = "", ...props }: ChipProps) {
  const styles = {
    filled: "bg-off-black text-off-white",
    outline: "border border-off-black bg-off-white text-off-black",
    disabled: "bg-light-grey text-off-white",
  };

  return (
    <button
      className={`rounded-chip px-3.5 py-[5px] text-xs leading-none tracking-[-0.02em] ${styles[variant]} ${className}`}
      type="button"
      {...props}
    >
      {label}
    </button>
  );
}
