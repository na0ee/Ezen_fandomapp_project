import perfumeIcon from "../../assets/magazine/perfume-icon.svg";

type PerfumeIconProps = {
  className?: string;
};

export function PerfumeIcon({ className = "" }: PerfumeIconProps) {
  return (
    <span className={`relative block size-7 shrink-0 overflow-hidden ${className}`}>
      <img
        alt=""
        aria-hidden="true"
        className="absolute inset-[12.5%] h-[75%] w-[75%]"
        src={perfumeIcon}
      />
    </span>
  );
}
