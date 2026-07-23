import { Link } from "react-router-dom";
import headerBell from "../../assets/community/figma/header-bell.svg";
import headerSearch from "../../assets/community/figma/header-search.svg";
import headerWrite from "../../assets/community/figma/header-write.svg";

type HeaderActionsProps = {
  className?: string;
  iconClassName?: string;
  writeTo?: string;
  /** 검색(향수 카테고리) 아이콘 노출 여부 */
  showSearch?: boolean;
  /** 커뮤니티 글쓰기 아이콘 노출 여부 */
  showWrite?: boolean;
};

export function HeaderActions({
  className = "",
  iconClassName = "",
  writeTo = "/community/write",
  showSearch = true,
  showWrite = false,
}: HeaderActionsProps) {
  return (
    <div className={`flex shrink-0 items-center gap-5 ${className}`}>
      {showWrite && (
        <Link aria-label="글쓰기" className={`size-6 ${iconClassName}`} to={writeTo}>
          <img alt="" aria-hidden="true" className="size-full" src={headerWrite} />
        </Link>
      )}
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
