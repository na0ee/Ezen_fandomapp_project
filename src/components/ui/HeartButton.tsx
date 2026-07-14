import { Heart } from "lucide-react";
import type { ButtonHTMLAttributes } from "react";

type HeartButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isSelected: boolean;
};

export function HeartButton({ isSelected, ...props }: HeartButtonProps) {
  return (
    <button aria-label="찜하기" aria-pressed={isSelected} type="button" {...props}>
      <Heart
        aria-hidden="true"
        className={isSelected ? "fill-point-orange text-point-orange" : "text-off-black"}
        size={24}
      />
    </button>
  );
}
