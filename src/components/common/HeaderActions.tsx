import { Link } from "react-router-dom";
import headerBell from "../../assets/community/figma/header-bell.svg";
import headerSearch from "../../assets/community/figma/header-search.svg";

type HeaderActionsProps = {
  className?: string;
  iconClassName?: string;
  /** 검색(향수 카테고리) 아이콘 노출 여부 */
  showSearch?: boolean;
};

export function HeaderActions({ className = "", iconClassName = "", showSearch = true }: HeaderActionsProps) {
  return (
    <div className={`flex shrink-0 items-center gap-5 ${className}`}>
      {showSearch && (
        <Link aria-label="향수 검색" className={`size-7 ${iconClassName}`} to="/category">
          <img alt="" aria-hidden="true" className="size-full" src={headerSearch} />
        </Link>
      )}
      <Link aria-label="알림" className={`size-7 ${iconClassName}`} to="/notifications">
        <img alt="" aria-hidden="true" className="size-full" src={headerBell} />
      </Link>
    </div>
  );
}
