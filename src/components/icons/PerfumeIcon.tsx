import perfumeIcon from "../../assets/magazine/perfume-icon.svg";

type PerfumeIconProps = {
  className?: string;
};

export function PerfumeIcon({ className = "" }: PerfumeIconProps) {
  return (
    <span className={`flex size-7 shrink-0 items-center justify-center overflow-hidden ${className}`}>
      <img
        alt=""
        aria-hidden="true"
        className="size-6 max-w-none"
        src={perfumeIcon}
      />
    </span>
  );
}
