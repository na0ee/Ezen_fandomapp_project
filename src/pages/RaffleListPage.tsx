import { useMemo, useState } from "react";
import { BellRing } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BottomNavigation } from "../components/common/BottomNavigation";
import { HeaderActions } from "../components/common/HeaderActions";
import { BackHeader } from "../components/common/BackHeader";
import { Chip } from "../components/ui/Chip";
import { Tab } from "../components/ui/Tab";
import { useAppliedRaffleIds, useRaffleApplied } from "../store/raffleStore";

const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

const categoryTabs = ["전체", "진행중", "오픈 전", "응모완료"] as const;
type CategoryTab = (typeof categoryTabs)[number];

const raffleItems = [
  {
    id: "lazy-before-1",
    brand: "MAISON MARGIELA FRAGRANCES",
    name: "Lazy Sunday Morning",
    nameKo: "레이지 선데이 모닝",
    image: asset("/assets/perfume/maison-margiela/lazy-sunday-morning.png"),
    state: "before",
  },
  {
    id: "fireplace-before",
    brand: "MAISON MARGIELA FRAGRANCES",
    name: "By the Fireplace",
    nameKo: "바이 더 파이어플레이스",
    image: asset("/assets/perfume/maison-margiela/by-the-fireplace.png"),
    state: "before",
  },
  {
    id: "english-pear-freesia",
    brand: "JO MALONE LONDON",
    name: "English Pear & Freesia",
    nameKo: "잉글리쉬 페어 앤 프리지아",
    image: asset("/assets/perfume/jo-malone/english-pear-freesia.jpg"),
    state: "now",
  },
  {
    id: "diptyque-do-son",
    brand: "DIPTYQUE",
    name: "Do Son",
    nameKo: "도 손",
    image: asset("/assets/perfume/diptyque/do-son.jpg"),
    state: "now",
  },
  {
    id: "byredo-mojave-ghost",
    brand: "BYREDO",
    name: "Mojave Ghost",
    nameKo: "모하비 고스트",
    image: asset("/assets/perfume/byredo/mojave-ghost.jpg"),
    state: "now",
  },
  {
    id: "chanel-chance-tendre",
    brand: "CHANEL",
    name: "Chance Eau Tendre",
    nameKo: "샹스 오 땅드르",
    image: asset("/assets/perfume/chanel/chance-eau-tendre.jpg"),
    state: "now",
  },
] as const;

function RaffleHeader() {
  return <BackHeader title="래플" action={<HeaderActions />} />;
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
  const isApplied = useRaffleApplied(item.id);
  const displayName = item.nameKo;

  return (
    <article className="flex h-[108px] w-full max-w-[390px] items-center gap-4 overflow-hidden rounded-[16px] border border-light-grey bg-off-white p-2">
      <div className="relative size-[92px] shrink-0 overflow-hidden rounded-[12px] bg-light2-grey">
        <div className="absolute left-1/2 top-1/2 h-[92px] w-[85.206px] -translate-x-1/2 -translate-y-1/2">
          <img alt="" className="h-full w-full object-cover" src={item.image} />
        </div>
        {isBefore && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/45 text-center text-off-white">
            <span className="text-xs font-bold leading-none tracking-[-0.02em]">오늘</span>
            <span className="mt-0.5 text-base font-bold leading-none tracking-[-0.02em]">20:00</span>
          </div>
        )}
        {!isBefore && isApplied && <div className="absolute inset-0 bg-black/45" />}
      </div>
      <div className="min-w-0 flex-1 overflow-hidden">
        <div className="flex flex-col">
          <p className="w-full truncate text-xs font-medium leading-tight tracking-[-0.02em] text-grey">
            {item.brand}
          </p>
          <p className="mt-[2px] w-full truncate text-[15px] font-semibold leading-[1.25] tracking-[-0.02em] text-off-black">
            {displayName}
          </p>
        </div>
        <div className="mt-[14px] flex items-center gap-2">
          <Chip
            className="font-normal"
            disabled={isBefore}
            label={isApplied ? "응모완료" : "참여하기"}
            onClick={isBefore ? undefined : onOpen}
            variant={isBefore || isApplied ? "disabled" : "filled"}
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
  const appliedRaffleIds = useAppliedRaffleIds();

  const filteredItems = useMemo(() => {
    if (activeTab === "진행중") {
      return raffleItems.filter((item) => item.state === "now");
    }

    if (activeTab === "오픈 전") {
      return [...raffleItems.filter((item) => item.state === "before")].sort(
        (a, b) => Number(Boolean(alarmStates[b.id])) - Number(Boolean(alarmStates[a.id])),
      );
    }

    if (activeTab === "응모완료") {
      return raffleItems.filter((item) => appliedRaffleIds.has(item.id));
    }

    return raffleItems;
  }, [activeTab, alarmStates, appliedRaffleIds]);

  function handleAlarmToggle(id: string) {
    setAlarmStates((current) => ({
      ...current,
      [id]: !current[id],
    }));
  }

  return (
    <main className="min-h-dvh bg-black max-[430px]:bg-off-white text-off-black" data-node-id="1034:13606">
      <div className="relative mx-auto min-h-dvh w-full max-w-[430px] overflow-x-hidden bg-off-white">
        <RaffleHeader />
        <section className="wrap flex justify-center px-5 pb-[132px] pt-[calc(var(--app-header-height)+24px)]">
          <div className="mx-auto flex w-full max-w-[390px] flex-col gap-[30px]">
            <div className="flex h-[30px] w-full items-start gap-2 overflow-hidden">
              {categoryTabs.map((tab) => {
                const isActive = tab === activeTab;

                return (
                  <Tab
                    className="h-[30px] py-0"
                    isActive={isActive}
                    key={tab}
                    label={tab}
                    onClick={() => setActiveTab(tab)}
                  />
                );
              })}
            </div>
            <div className="flex w-full flex-col gap-[10px]">
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
