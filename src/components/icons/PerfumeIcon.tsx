import perfumeIcon from "../../assets/magazine/perfume-icon.svg";

type PerfumeIconSize = "md" | "sm";

const frameClassBySize: Record<PerfumeIconSize, string> = {
  md: "size-7",
  sm: "size-6",
};

const iconClassBySize: Record<PerfumeIconSize, string> = {
  md: "size-6",
  sm: "size-[18px]",
};

type PerfumeIconProps = {
  className?: string;
  size?: PerfumeIconSize;
};

export function PerfumeIcon({ className = "", size = "md" }: PerfumeIconProps) {
  return (
    <span className={`flex ${frameClassBySize[size]} shrink-0 items-center justify-center overflow-hidden ${className}`}>
      <img
        alt=""
        aria-hidden="true"
        className={`${iconClassBySize[size]} max-w-none`}
        src={perfumeIcon}
      />
    </span>
  );
}
