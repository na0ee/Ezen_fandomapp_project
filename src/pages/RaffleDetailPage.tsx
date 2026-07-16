import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { HeaderActions } from "../components/common/HeaderActions";
import { CtaButton } from "../components/ui/CtaButton";

const assets = Object.fromEntries(
  Object.entries({
    hero: "/assets/figma/raffle-detail-hero.png",
    contentOne: "/assets/figma/raffle-detail-content-1.png",
    contentTwo: "/assets/figma/raffle-detail-content-2.png",
  }).map(([key, path]) => [key, `${import.meta.env.BASE_URL}${path.slice(1)}`]),
) as Record<string, string>;

const detailRows = [
  ["모집 기간", "26.07.07 (화) ~ 26.07.09 (목)"],
  ["모집 현황", "123명"],
  ["당첨발표", "26.07.13 (월) 예정"],
  ["당첨인원", "10명"],
];

function RaffleDetailHeader() {
  const navigate = useNavigate();

  return (
    <header className="header fixed top-0 left-1/2 z-50 flex h-[var(--app-header-height)] w-full max-w-[430px] -translate-x-1/2 items-center justify-between bg-off-white px-5 pt-[var(--app-safe-top)]">
      <div className="flex min-w-0 items-center">
        <button
          aria-label="이전 페이지로 돌아가기"
          className="-ml-1 flex size-[21px] shrink-0 items-center justify-center text-off-black"
          onClick={() => navigate(-1)}
          type="button"
        >
          <ChevronLeft aria-hidden="true" size={21} strokeWidth={1.7} />
        </button>
        <h1 className="ml-1 truncate text-2xl font-semibold leading-[1.08] tracking-[-0.02em] text-off-black">
          래플 상세페이지
        </h1>
      </div>
      <HeaderActions />
    </header>
  );
}

export function RaffleDetailPage() {
  return (
    <main className="min-h-dvh bg-off-white text-off-black" data-node-id="1034:13631">
      <div className="relative mx-auto min-h-dvh w-full max-w-[430px] overflow-x-hidden bg-off-white">
        <RaffleDetailHeader />
        <div className="wrap flex flex-col items-center px-5 pb-[124px] pt-[calc(var(--app-header-height)+65px)]">
          <section className="flex w-full max-w-[390px] flex-col gap-3">
            <div className="h-[338px] w-full overflow-hidden">
              <img alt="" className="h-full w-full object-cover" src={assets.hero} />
            </div>
            <div className="flex flex-col gap-8">
              <div className="relative flex flex-col items-center gap-8">
                <div className="flex flex-col items-center gap-2 text-center">
                  <h2 className="text-2xl font-semibold leading-[1.08] tracking-[-0.02em] text-off-black">
                    Lazy Sunday Morning
                  </h2>
                  <p className="text-sm font-medium leading-none tracking-[-0.02em] text-off-black-70">
                    Maison Margiela Fragrances
                  </p>
                </div>
                <span className="absolute right-0 top-[55px] flex h-5 items-center justify-center rounded-badge bg-point-orange-40 px-2 text-[10px] font-semibold leading-none tracking-[-0.02em] text-point-orange">
                  D-1
                </span>
                <div className="relative h-[3px] w-full bg-light-grey">
                  <div className="h-full w-[82%] bg-point-orange" />
                </div>
              </div>
              <dl className="flex flex-col gap-2 text-black">
                {detailRows.map(([label, value]) => (
                  <div className="grid grid-cols-[51px_1fr] items-center gap-[46px]" key={label}>
                    <dt className="text-sm font-medium leading-none tracking-[-0.02em]">{label}</dt>
                    <dd className="text-xs font-normal leading-none tracking-[-0.02em]">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>
          <section className="mt-16 flex w-full max-w-[398px] flex-col gap-6">
            <div className="h-px w-full bg-light-grey" />
            <div className="flex w-full max-w-[390px] flex-col">
              <img alt="" className="h-[338px] w-full object-cover" src={assets.contentOne} />
              <div className="relative h-[338px] w-full overflow-hidden">
                <img alt="" className="h-full w-full object-cover" src={assets.contentTwo} />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent from-[55%] to-off-white" />
              </div>
            </div>
          </section>
        </div>
        <div className="fixed bottom-[max(20px,env(safe-area-inset-bottom))] left-1/2 z-50 w-full max-w-[430px] -translate-x-1/2 px-[18px]">
          <CtaButton label="응모하기" />
        </div>
      </div>
    </main>
  );
}
