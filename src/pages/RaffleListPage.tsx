import { useMemo, useState } from "react";
import { BellRing, ChevronLeft, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { BottomNavigation } from "../components/common/BottomNavigation";
import { Chip } from "../components/ui/Chip";

const assets = Object.fromEntries(
  Object.entries({
    headerBell: "/assets/figma/f9ee5857-96be-4f4a-8990-a11893c44f8c.svg",
    headerPerfume: "/assets/figma/db67ca5c-7071-47f0-935e-5dbdd0fd409f.svg",
    product: "/assets/figma/raffle-product.png",
  }).map(([key, path]) => [key, `${import.meta.env.BASE_URL}${path.slice(1)}`]),
) as Record<string, string>;

const categoryTabs = ["전체", "진행중", "오픈 전", "종료"] as const;
type CategoryTab = (typeof categoryTabs)[number];

const raffleItems = [
  {
    id: "lazy-before-1",
    brand: "Maison Margiela Fragrances",
    name: "Lazy Sunday Morning",
    state: "before",
  },
  {
    id: "lazy-before-2",
    brand: "Maison Margiela Fragrances",
    name: "Lazy Sunday Morning",
    state: "before",
  },
  {
    id: "blackberry-1",
    brand: "Jo Malone London",
    name: "Blackberry & Bay Cologne",
    state: "now",
  },
  {
    id: "blackberry-2",
    brand: "Jo Malone London",
    name: "Blackberry & Bay Cologne",
    state: "now",
  },
  {
    id: "blackberry-3",
    brand: "Jo Malone London",
    name: "Blackberry & Bay Cologne",
    state: "now",
  },
  {
    id: "blackberry-4",
    brand: "Jo Malone London",
    name: "Blackberry & Bay Cologne",
    state: "now",
  },
] as const;

function RaffleHeader() {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-1/2 z-50 flex h-[54px] w-full max-w-[430px] -translate-x-1/2 items-center justify-between bg-off-white px-5">
      <div className="flex min-w-0 items-center">
        <button
          aria-label="이전 페이지로 돌아가기"
          className="-ml-1 flex size-[21px] shrink-0 items-center justify-center text-off-black"
          onClick={() => navigate(-1)}
          type="button"
        >
          <ChevronLeft aria-hidden="true" size={21} strokeWidth={1.7} />
        </button>
        <h1 className="ml-1 truncate text-2xl font-semibold leading-[1.08] tracking-[-0.03em] text-off-black">
          래플응모하기
        </h1>
      </div>
      <div className="flex shrink-0 items-center gap-5 text-off-black">
        <Link aria-label="검색" className="flex size-7 items-center justify-center" to="/search">
          <Search aria-hidden="true" size={27} strokeWidth={1.5} />
        </Link>
        <button aria-label="알림" className="flex size-7 items-center justify-center" type="button">
          <img alt="" aria-hidden="true" className="size-full" src={assets.headerBell} />
        </button>
        <Link aria-label="향수 카테고리" className="relative size-7 overflow-hidden" to="/category">
          <img alt="" aria-hidden="true" className="absolute inset-[12.5%] h-3/4 w-3/4 max-w-none" src={assets.headerPerfume} />
        </Link>
      </div>
    </header>
  );
}

function RaffleCard({
  isAlarmOn,
  item,
  onAlarmToggle,
  onOpen,
}: {
  isAlarmOn: boolean;
  item: (typeof raffleItems)[number];
  onAlarmToggle: () => void;
  onOpen?: () => void;
}) {
  const isBefore = item.state === "before";

  return (
    <article className="flex h-[108px] w-full max-w-[390px] items-center gap-4 overflow-hidden rounded-[16px] border border-light-grey bg-off-white p-2">
      <div className="relative size-[92px] shrink-0 overflow-hidden rounded-[12px] bg-light2-grey">
        <div className="absolute left-1/2 top-1/2 h-[92px] w-[85.206px] -translate-x-1/2 -translate-y-1/2">
          <img alt="" className="h-full w-full object-cover" src={assets.product} />
        </div>
        {isBefore && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/45 text-center text-off-white">
            <span className="text-xs font-bold leading-none tracking-[-0.02em]">오늘</span>
            <span className="mt-0.5 text-base font-bold leading-none tracking-[-0.02em]">20:00</span>
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1 overflow-hidden">
        <div className="flex flex-col">
          <p className="w-full truncate text-xs font-medium leading-none tracking-[-0.02em] text-grey">
            {item.brand}
          </p>
          <p className="mt-[2px] w-full truncate text-[15px] font-semibold leading-[1.25] tracking-[-0.02em] text-[#171717]">
            {item.name}
          </p>
        </div>
        <div className="mt-[14px] flex items-center gap-2">
          <Chip
            className="font-normal"
            disabled={isBefore}
            label="참여하기"
            onClick={isBefore ? undefined : onOpen}
            variant={isBefore ? "disabled" : "filled"}
          />
          <button
            aria-label={`${item.name} 알림 ${isAlarmOn ? "끄기" : "켜기"}`}
            aria-pressed={isAlarmOn}
            className={`flex size-5 items-center justify-center ${isAlarmOn ? "text-point-orange" : "text-off-black"}`}
            onClick={onAlarmToggle}
            type="button"
          >
            <BellRing aria-hidden="true" size={13} strokeWidth={1.8} />
          </button>
        </div>
      </div>
    </article>
  );
}

export function RaffleListPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<CategoryTab>("전체");
  const [alarmStates, setAlarmStates] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(raffleItems.map((item) => [item.id, item.state === "before"])),
  );

  const filteredItems = useMemo(() => {
    if (activeTab === "진행중") {
      return raffleItems.filter((item) => item.state === "now");
    }

    if (activeTab === "오픈 전") {
      return raffleItems.filter((item) => item.state === "before");
    }

    if (activeTab === "종료") {
      return [];
    }

    return raffleItems;
  }, [activeTab]);

  function handleAlarmToggle(id: string) {
    setAlarmStates((current) => ({
      ...current,
      [id]: !current[id],
    }));
  }

  return (
    <main className="min-h-dvh bg-off-white text-off-black" data-node-id="1034:13606">
      <div className="relative mx-auto min-h-dvh w-full max-w-[430px] overflow-x-hidden bg-off-white">
        <RaffleHeader />
        <section className="flex justify-center px-5 pb-[132px] pt-[calc(var(--app-header-height)+24px)]">
          <div className="mx-auto flex w-full max-w-[390px] flex-col gap-4">
            <div className="flex h-[30px] w-full items-start gap-2 overflow-hidden">
              {categoryTabs.map((tab) => {
                const isActive = tab === activeTab;

                return (
                  <button
                    aria-pressed={isActive}
                    className={`flex h-[30px] shrink-0 items-center justify-center rounded-[50px] px-3.5 py-2 text-xs font-medium leading-none tracking-[-0.02em] ${
                      isActive
                        ? "bg-off-black text-off-white"
                        : "border border-light-grey bg-off-white text-off-black"
                    }`}
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    type="button"
                  >
                    {tab}
                  </button>
                );
              })}
            </div>
            <div className="flex w-full flex-col gap-3">
              {filteredItems.map((item) => (
                <RaffleCard
                  isAlarmOn={Boolean(alarmStates[item.id])}
                  item={item}
                  key={item.id}
                  onAlarmToggle={() => handleAlarmToggle(item.id)}
                  onOpen={() => navigate(`/event/raffles/${item.id}`)}
                />
              ))}
            </div>
          </div>
        </section>
        <BottomNavigation />
      </div>
    </main>
  );
}
