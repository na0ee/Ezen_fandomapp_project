import { Link } from "react-router-dom";
import headerBell from "../../assets/community/figma/header-bell.svg";
import headerPerfume from "../../assets/community/figma/header-perfume.svg";
import headerSearch from "../../assets/community/figma/header-search.svg";

type HeaderActionsProps = {
  className?: string;
  iconClassName?: string;
  showSearch?: boolean;
};

export function HeaderActions({ className = "", iconClassName = "", showSearch = true }: HeaderActionsProps) {
  return (
    <div className={`flex shrink-0 items-center gap-5 ${className}`}>
      {showSearch && (
        <Link aria-label="검색" className={`size-7 ${iconClassName}`} to="/search">
          <img alt="" aria-hidden="true" className="size-full" src={headerSearch} />
        </Link>
      )}
      <Link aria-label="알림" className={`size-7 ${iconClassName}`} to="/notifications">
        <img alt="" aria-hidden="true" className="size-full" src={headerBell} />
      </Link>
      <Link aria-label="향수 카테고리" className={`relative size-7 overflow-hidden ${iconClassName}`} to="/category">
        <img
          alt=""
          aria-hidden="true"
          className="absolute inset-[12.5%] h-3/4 w-3/4 max-w-none"
          src={headerPerfume}
        />
      </Link>
    </div>
  );
}
