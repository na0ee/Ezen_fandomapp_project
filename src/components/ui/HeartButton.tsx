import type { ButtonHTMLAttributes } from "react";

type HeartButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  iconSize?: number;
  isSelected: boolean;
  tone?: "dark" | "light";
};

export function HeartButton({ iconSize = 24, isSelected, tone = "dark", ...props }: HeartButtonProps) {
  const color = isSelected ? "#FF4800" : tone === "light" ? "#DDDDDD" : "#4D4D4D";

  return (
    <button aria-label="찜하기" aria-pressed={isSelected} type="button" {...props}>
      <svg
        aria-hidden="true"
        className="block size-full"
        fill={isSelected ? "currentColor" : "none"}
        height={iconSize}
        style={{ color }}
        viewBox="0 0 24 24"
        width={iconSize}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.2857 3C15.4745 2.99955 14.6725 3.17087 13.9334 3.50251C13.1943 3.83414 12.5351 4.31844 12 4.92301C11.2325 4.06009 10.2183 3.44929 9.09229 3.17183C7.96623 2.89437 6.78168 2.96341 5.69615 3.36975C4.61063 3.7761 3.67557 4.50051 3.01533 5.44663C2.35508 6.39276 2.00094 7.51577 2 8.66633C2 15.133 10.9786 19.659 11.3607 19.8502C11.5592 19.9487 11.7781 20 12 20C12.2219 20 12.4408 19.9487 12.6393 19.8502C13.0214 19.659 22 15.133 22 8.66633C22 7.16353 21.398 5.72227 20.3263 4.65963C19.2547 3.59699 17.8012 3 16.2857 3Z"
          stroke={isSelected ? "none" : "currentColor"}
          strokeLinejoin="round"
          strokeWidth={isSelected ? 0 : 2}
        />
      </svg>
    </button>
  );
}
