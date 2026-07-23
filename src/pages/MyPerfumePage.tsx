import { ChevronRight, ChevronDown } from "lucide-react";

import { BottomNavigation } from "../components/common/BottomNavigation";
import { HeaderActions } from "../components/common/HeaderActions";
import { BackHeader } from "../components/common/BackHeader";
import { PerfumeIcon } from "../components/icons/PerfumeIcon";
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
    brand: "SANTA MARIA NOVELLA",
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
  return <BackHeader title={title} backTo="/mypage" action={<HeaderActions />} />;
}

function RegisterFab() {
  return (
    <div className="pointer-events-none fixed bottom-[108px] left-1/2 z-40 flex w-full max-w-[430px] -translate-x-1/2 justify-end px-side">
      <button
        aria-label="향수 등록하기"
        className="pointer-events-auto flex size-16 flex-col items-center justify-center gap-1 rounded-full bg-off-black p-2.5 text-off-white"
        type="button"
      >
        <PerfumeIcon className="invert" size="sm" />
        <span className="text-[12px] font-normal leading-none tracking-[-0.02em]">등록</span>
      </button>
    </div>
  );
}

function PerfumeRecordCard({ perfume }: { perfume: (typeof perfumes)[number] }) {
  return (
    <article className="flex items-start gap-2.5 rounded-card border-[0.8px] border-light-grey bg-off-white p-[14px]">
      <div className="flex size-[100px] shrink-0 items-center justify-center overflow-hidden rounded-lg bg-light2-grey">
        <img alt={perfume.name} className="size-full object-contain mix-blend-multiply" src={perfume.image} />
      </div>
      <div className="flex min-w-0 flex-1 flex-col pt-1">
        <p className="truncate text-[12px] font-normal leading-none tracking-[-0.02em] text-grey uppercase">{perfume.brand}</p>
        <h2 className="mt-1.5 truncate text-[16px] font-semibold leading-[1.2] tracking-[-0.02em] text-off-black">{perfume.name}</h2>
        <p className="mt-2 text-[12px] font-normal leading-none tracking-[-0.02em] text-grey">{perfume.status}</p>
        <div className="mt-[14px] flex h-[28px] w-full items-center rounded-[4px] bg-light2-grey px-2.5 text-[12px] font-normal tracking-[-0.02em] text-grey">
          {perfume.memo}
        </div>
      </div>
    </article>
  );
}

export default function MyPerfumePage() {
  return (
    <main className="mx-auto min-h-dvh w-full max-w-[430px] cursor-default select-none overflow-x-hidden bg-off-white text-off-black">
      <DetailHeader title="내 향수 관리하기" />

      <div className="wrap px-side pb-[112px] pt-[calc(var(--app-header-height)+24px)]">
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
            const bottleColor = isActive ? "text-off-black" : "text-light-grey";
            const innerTextColor = isActive ? "text-off-white" : isWeekend ? "text-point-orange" : "text-off-white";

            return (
              <div className="flex w-10 flex-col items-center gap-2" key={item.day}>
                <span className={`text-[12px] font-semibold leading-none tracking-[-0.02em] ${isWeekend ? "text-point-orange" : "text-grey"}`}>
                  {item.day}
                </span>
                <div className={`relative flex h-[38px] w-[26px] flex-col items-center ${bottleColor}`}>
                  <svg width="26" height="38" viewBox="0 0 26 38" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-0 left-0">
                    <path d="M8 0C7.44772 0 7 0.447715 7 1V7H19V1C19 0.447715 18.5523 0 18 0H8Z" fill="currentColor" />
                    <rect x="10" y="7" width="6" height="3" fill="currentColor" />
                    <path d="M0 13C0 11.3431 1.34315 10 3 10H23C24.6569 10 26 11.3431 26 13V35C26 36.6569 24.6569 38 23 38H3C1.34315 38 0 36.6569 0 35V13Z" fill="currentColor" />
                  </svg>
                  <span className={`absolute top-[16px] text-[13px] font-semibold tracking-[-0.02em] ${innerTextColor}`}>
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
                className={`cursor-pointer whitespace-nowrap rounded-full px-3.5 py-2 text-[13px] font-medium leading-none tracking-[-0.02em] ${index === 0 ? "bg-off-black text-off-white" : "border-[0.8px] border-light-grey bg-off-white text-grey"
                  }`}
                key={label}
                type="button"
              >
                {label}
              </button>
            ))}
          </div>
          <button className="flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full border-[0.8px] border-light-grey bg-off-white py-2 pl-3.5 pr-3 text-[13px] font-medium leading-none tracking-[-0.02em] text-grey" type="button">
            최신순
            <ChevronDown size={14} strokeWidth={1.5} />
          </button>
        </div>

        <section className="mt-[30px] flex flex-col gap-[10px]">
          {perfumes.map((perfume) => (
            <PerfumeRecordCard key={perfume.name} perfume={perfume} />
          ))}
        </section>
      </div>

      <RegisterFab />
      <BottomNavigation />
    </main>
  );
}
