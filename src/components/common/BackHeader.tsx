import type { ReactNode } from "react";
import { ChevronLeft, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

type BackHeaderProps = {
  title?: string;
  /** 지정하면 해당 경로로 이동, 없으면 history back */
  backTo?: string;
  action?: ReactNode;
  /** back: 뒤로가기 화살표(기본값), close: 닫기 X 아이콘 */
  icon?: "back" | "close";
};

export function BackHeader({ title, backTo, action, icon = "back" }: BackHeaderProps) {
  const navigate = useNavigate();
  const backButtonClassName = "-ml-1 flex size-[21px] shrink-0 items-center justify-center text-off-black";
  const IconComponent = icon === "close" ? X : ChevronLeft;
  const ariaLabel = icon === "close" ? "닫기" : "이전 페이지로 돌아가기";

  return (
    <header className="header fixed left-1/2 top-0 z-50 flex w-full max-w-[430px] -translate-x-1/2 items-center justify-between bg-off-white px-5 py-[13px] text-off-black">
      <div className="flex min-w-0 items-center">
        {backTo ? (
          <Link aria-label={ariaLabel} className={backButtonClassName} to={backTo}>
            <IconComponent aria-hidden="true" size={21} strokeWidth={1.7} />
          </Link>
        ) : (
          <button
            aria-label={ariaLabel}
            className={backButtonClassName}
            onClick={() => navigate(-1)}
            type="button"
          >
            <IconComponent aria-hidden="true" size={21} strokeWidth={1.7} />
          </button>
        )}
        {title && (
          <h1 className="ml-1 truncate text-xl font-medium leading-[normal] tracking-[-0.02em]">
            {title}
          </h1>
        )}
      </div>
      {action}
    </header>
  );
}
