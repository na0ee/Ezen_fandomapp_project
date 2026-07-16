import { ChevronLeft, ChevronRight, ChevronDown, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { BottomNavigation } from "../components/common/BottomNavigation";
import { PerfumeIcon } from "../components/icons/PerfumeIcon";
import headerBell from "../assets/community/figma/header-bell.svg";
import perfumeLoewe from "../assets/mypage/perfume-loewe.png";
import perfumeSanta from "../assets/mypage/perfume-santa.png";
import reviewProductThree from "../assets/mypage/review-product-3.png";

const weekDays = [
  { day: "Mon", date: "6", active: true },
  { day: "Tue", date: "7", active: true },
  { day: "Wed", date: "8", active: true },
  { day: "Thu", date: "9", active: true },
  { day: "Fri", date: "10", active: false },
  { day: "Sat", date: "11", active: true },
  { day: "Sun", date: "12", active: false, weekend: true },
];

const perfumes = [
  {
    brand: "Santa Maria Novella",
    name: "엔젤 디 피렌체 오드코롱 100ml",
    status: "2일 전 사용",
    memo: "간단한 메모",
    image: perfumeSanta,
  },
  {
    brand: "LOEWE PERFUMES",
    name: "로에베 아이레 수틸레사 오 드 뚜왈렛 50ml",
    status: "3일 전 사용",
    memo: "간단한 메모",
    image: perfumeLoewe,
  },
  {
    brand: "MATIERE PREMIERE",
    name: "마티에 프리미에르 메탈 라벤더 오 드 퍼퓸 50ml",
    status: "3일 전 사용",
    memo: "간단한 메모",
    image: reviewProductThree,
  },
];

function DetailHeader({ title }: { title: string }) {
  return (
    <header className="fixed left-1/2 top-0 z-50 flex h-[54px] w-full max-w-[430px] -translate-x-1/2 items-center justify-between bg-off-white px-side">
      <div className="flex min-w-0 items-center">
        <Link aria-label="마이페이지로 돌아가기" className="-ml-1 flex size-7 items-center justify-center" to="/mypage">
          <ChevronLeft aria-hidden="true" size={24} strokeWidth={1.6} />
        </Link>
        <h1 className="truncate text-2xl font-semibold leading-[1.08] tracking-[-0.03em]">{title}</h1>
      </div>
      <div className="flex items-center gap-5">
        <Link aria-label="검색" className="flex size-7 items-center justify-center" to="/search">
          <Search aria-hidden="true" size={28} strokeWidth={1.6} />
        </Link>
        <img alt="알림" className="size-7" src={headerBell} />
        <Link aria-label="향수 카테고리" className="flex size-7 items-center justify-center" to="/category">
          <PerfumeIcon />
        </Link>
      </div>
    </header>
  );
}

function PerfumeRecordCard({ perfume }: { perfume: (typeof perfumes)[number] }) {
  return (
    <article className="flex items-start gap-[14px] rounded-[12px] border-[0.8px] border-light-grey bg-white p-[14px]">
      <div className="flex size-[100px] shrink-0 items-center justify-center overflow-hidden rounded-[8px] bg-[#F5F5F5]">
        <img alt={perfume.name} className="size-full object-contain mix-blend-multiply" src={perfume.image} />
      </div>
      <div className="flex min-w-0 flex-1 flex-col pt-1">
        <p className="truncate text-[12px] font-normal leading-none tracking-[-0.02em] text-grey uppercase">{perfume.brand}</p>
        <h2 className="mt-1.5 truncate text-[16px] font-semibold leading-[1.2] tracking-[-0.02em] text-off-black">{perfume.name}</h2>
        <p className="mt-2 text-[12px] font-normal leading-none tracking-[-0.02em] text-grey">{perfume.status}</p>
        <div className="mt-[14px] flex h-[28px] w-full items-center rounded-[4px] bg-[#F5F5F5] px-2.5 text-[12px] font-normal tracking-[-0.02em] text-grey">
          {perfume.memo}
        </div>
      </div>
    </article>
  );
}

export default function MyPerfumePage() {
  return (
    <main className="mx-auto min-h-dvh w-full max-w-[430px] overflow-x-hidden bg-off-white text-off-black">
      <DetailHeader title="내 향수 관리하기" />

      <div className="px-side pb-[112px] pt-[calc(var(--app-header-height)+24px)]">
        <div className="flex items-center justify-between">
          <p className="text-sm font-normal leading-none tracking-[-0.02em] text-grey">
            이번 주 <span className="text-off-black">5일</span> 기록했어요
          </p>
          <button className="flex items-center gap-1 text-xs font-medium leading-none tracking-[-0.02em] text-grey" type="button">
            전체보기
            <ChevronRight aria-hidden="true" size={14} strokeWidth={1.5} />
          </button>
        </div>

        <section className="mt-[22px] flex items-start justify-between border-b-[0.8px] border-light-grey pb-[18px]">
          {weekDays.map((item) => {
            const isWeekend = item.weekend;
            const isActive = item.active;
            const bottleFill = isActive ? "#1A1A1A" : "#E5E5E5";
            const innerTextColor = isActive ? "text-off-white" : isWeekend ? "text-point-orange" : "text-white";

            return (
              <div className="flex w-10 flex-col items-center gap-2" key={item.day}>
                <span className={`text-[12px] font-semibold leading-none tracking-[-0.02em] ${isWeekend ? "text-point-orange" : "text-grey"}`}>
                  {item.day}
                </span>
                <div className="relative flex h-[38px] w-[26px] flex-col items-center">
                  <svg width="26" height="38" viewBox="0 0 26 38" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-0 left-0">
                    <path d="M8 0C7.44772 0 7 0.447715 7 1V7H19V1C19 0.447715 18.5523 0 18 0H8Z" fill={bottleFill} />
                    <rect x="10" y="7" width="6" height="3" fill={bottleFill} />
                    <path d="M0 13C0 11.3431 1.34315 10 3 10H23C24.6569 10 26 11.3431 26 13V35C26 36.6569 24.6569 38 23 38H3C1.34315 38 0 36.6569 0 35V13Z" fill={bottleFill} />
                  </svg>
                  <span className={`absolute top-[16px] text-[13px] font-bold tracking-[-0.02em] ${innerTextColor}`}>
                    {item.date}
                  </span>
                </div>
              </div>
            );
          })}
        </section>

        <div className="mt-5 flex items-center justify-between gap-2">
          <div className="flex gap-1.5 overflow-x-auto [&::-webkit-scrollbar]:hidden">
            {["전체", "브랜드", "향 계열/향기", "용량"].map((label, index) => (
              <button
                aria-pressed={index === 0}
                className={`whitespace-nowrap rounded-full px-3.5 py-2 text-[13px] font-medium leading-none tracking-[-0.02em] ${index === 0 ? "bg-off-black text-off-white" : "border-[0.8px] border-light-grey bg-white text-grey"
                  }`}
                key={label}
                type="button"
              >
                {label}
              </button>
            ))}
          </div>
          <button className="flex shrink-0 items-center gap-1 rounded-full border-[0.8px] border-light-grey bg-white px-3 py-1.5 text-[12px] font-medium leading-none tracking-[-0.02em] text-grey" type="button">
            최신순
            <ChevronDown size={14} strokeWidth={1.5} />
          </button>
        </div>

        <section className="mt-4 flex flex-col gap-3">
          {perfumes.map((perfume) => (
            <PerfumeRecordCard key={perfume.name} perfume={perfume} />
          ))}
        </section>
      </div>

      <BottomNavigation />
    </main>
  );
}
