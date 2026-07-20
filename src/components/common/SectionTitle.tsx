import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

type SectionTitleProps = {
  title: string;
  subtitle?: string;
  moreHref?: string;
  moreLabel?: string;
  showMore?: boolean;
  variant?: "english" | "detail";
};

export function SectionTitle({
  title,
  subtitle,
  moreHref,
  moreLabel = "전체보기",
  showMore = false,
  variant = "english",
}: SectionTitleProps) {
  return (
    <div className="section-title flex items-end justify-between gap-4">
      <div className="flex min-w-0 flex-col gap-1.5">
        <h2
          className={
            variant === "english"
              ? "font-cormorant text-[28px] font-bold leading-none tracking-[-0.02em]"
              : "text-2xl font-semibold leading-[1.08] tracking-[-0.02em]"
          }
        >
          {title}
        </h2>
        {subtitle && (
          <p className="text-base font-medium leading-none tracking-[-0.02em]">{subtitle}</p>
        )}
      </div>
      {(showMore || moreHref) &&
        (moreHref ? (
          <Link
            className="flex shrink-0 items-center gap-1.5 text-sm font-medium leading-none tracking-[-0.02em] text-grey"
            to={moreHref}
          >
            {moreLabel}
            <ChevronRight aria-hidden="true" size={18} />
          </Link>
        ) : (
          <span className="flex shrink-0 items-center gap-1.5 text-sm font-medium leading-none tracking-[-0.02em] text-grey">
            {moreLabel}
            <ChevronRight aria-hidden="true" size={18} />
          </span>
        ))}
    </div>
  );
}
