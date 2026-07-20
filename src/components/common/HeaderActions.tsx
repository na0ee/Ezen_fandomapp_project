import { Bell, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { PerfumeIcon } from "../icons/PerfumeIcon";

type HeaderActionsProps = {
  className?: string;
  iconClassName?: string;
  showSearch?: boolean;
};

export function HeaderActions({ className = "", iconClassName = "", showSearch = true }: HeaderActionsProps) {
  return (
    <div className={`flex shrink-0 items-center gap-5 ${className}`}>
      {showSearch && (
        <Link aria-label="검색" className={`flex size-7 items-center justify-center ${iconClassName}`} to="/search">
          <Search aria-hidden="true" size={28} strokeWidth={1.5} />
        </Link>
      )}
      <button aria-label="알림" className={`flex size-7 items-center justify-center ${iconClassName}`} type="button">
        <Bell aria-hidden="true" size={28} strokeWidth={1.5} />
      </button>
      <Link aria-label="향수 카테고리" className={`flex size-7 items-center justify-center ${iconClassName}`} to="/search?tab=전체">
        <PerfumeIcon />
      </Link>
    </div>
  );
}
