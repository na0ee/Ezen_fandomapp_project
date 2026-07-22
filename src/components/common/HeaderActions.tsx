import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import headerBell from "../../assets/community/figma/header-bell.svg";

export function HeaderActions() {
  return (
    <div className="flex items-center gap-5">
      <Link aria-label="향수 카테고리" className="flex size-7 items-center justify-center" to="/category">
        <Search aria-hidden="true" size={27} strokeWidth={1.5} />
      </Link>
      <img alt="" aria-hidden="true" className="size-7" src={headerBell} />
    </div>
  );
}
