import type { ReactNode } from "react";
import { ChevronLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

type BackHeaderProps = {
  title: string;
  backTo?: string;
  action?: ReactNode;
};

export function BackHeader({ title, backTo, action }: BackHeaderProps) {
  const navigate = useNavigate();

  const backButtonClassName = "-ml-1 flex size-[21px] shrink-0 items-center justify-center";

  return (
    <header className="fixed top-0 left-1/2 z-50 flex h-[54px] w-full max-w-[430px] -translate-x-1/2 items-center justify-between bg-off-white px-5 text-off-black">
      <div className="flex min-w-0 items-center">
        {backTo ? (
          <Link aria-label="이전 페이지로 돌아가기" className={backButtonClassName} to={backTo}>
            <ChevronLeft aria-hidden="true" size={21} strokeWidth={1.7} />
          </Link>
        ) : (
          <button
            aria-label="이전 페이지로 돌아가기"
            className={backButtonClassName}
            onClick={() => navigate(-1)}
            type="button"
          >
            <ChevronLeft aria-hidden="true" size={21} strokeWidth={1.7} />
          </button>
        )}
        <h1 className="ml-1 truncate text-xl font-medium leading-[normal] tracking-[-0.02em]">{title}</h1>
      </div>
      {action}
    </header>
  );
}
