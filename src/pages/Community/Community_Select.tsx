import { useState } from "react";
import { Bell, Briefcase, Check, ChevronDown, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import tagOne from "../../assets/community/figma/tag-one.png";
import tagThree from "../../assets/community/figma/tag-three.png";
import tagTwo from "../../assets/community/figma/tag-two.png";
import { BackHeader } from "../../components/common/BackHeader";

const perfumeItems = [
  {
    brand: "DIPTYQUE",
    name: "딥디크 오 로즈 오 드 퍼퓸 50ml",
    tags: ["#불가리아장미", "#베르가못", "#리치"],
    image: tagOne,
    imageClassName: "h-[86px] w-[58px]",
  },
  {
    brand: "BYREDO",
    name: "블랑쉬 오 드 퍼퓸",
    tags: ["#알데하이드", "#피오니", "#머스크"],
    image: tagTwo,
    imageClassName: "h-[86px] w-[60px]",
  },
  {
    brand: "JO MALONE",
    aliases: ["조말론", "조 말론"],
    name: "잉글리쉬 페어 & 프리지아 코롱",
    tags: ["#킹윌리엄페어", "#프리지아", "#파출리"],
    image: tagThree,
    imageClassName: "h-[86px] w-[59px]",
  },
];

const filters = ["전체", "브랜드", "향 계열/향기", "용량"];

function FilterChip({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full px-[14px] py-2 text-xs font-medium leading-none tracking-[-0.02em] ${
        active ? "bg-off-black text-off-white" : "border-[0.8px] border-light-grey bg-off-white text-grey"
      }`}
    >
      {label}
    </span>
  );
}

function PerfumeCard({
  brand,
  name,
  tags,
  image,
  imageClassName,
  selected,
  onSelect,
}: {
  brand: string;
  name: string;
  tags: string[];
  image: string;
  imageClassName: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      className="flex w-full items-start justify-between rounded-lg border-[0.8px] border-light-grey bg-off-white p-3 text-left"
      type="button"
      onClick={onSelect}
    >
      <div className="flex min-w-0 flex-1 items-start gap-5">
        <div className="flex size-[100px] shrink-0 items-center justify-center overflow-hidden rounded-lg bg-light2-grey">
          <img className={`${imageClassName} object-contain`} src={image} alt="" />
        </div>
        <div className="flex min-w-0 flex-1 flex-col justify-center gap-3 pt-0.5">
          <div className="flex min-w-0 flex-col gap-1">
            <p className="truncate text-xs font-normal leading-none tracking-[-0.02em] text-grey">{brand}</p>
            <h2 className="truncate text-base font-semibold leading-none tracking-[-0.02em] text-off-black">{name}</h2>
          </div>
          <div className="flex min-w-0 items-center gap-2 overflow-hidden">
            {tags.map((tag) => (
              <span className="shrink-0 text-center text-xs font-medium leading-none tracking-[-0.02em] text-grey" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      <span
        className={`flex size-5 shrink-0 items-center justify-center rounded-lg border-[0.8px] ${
          selected ? "border-point-orange bg-point-orange text-off-white" : "border-light-grey bg-off-white text-light-grey"
        }`}
      >
        <Check className="size-4" strokeWidth={1.8} />
      </span>
    </button>
  );
}

export default function CommunitySelect() {
  const navigate = useNavigate();
  const [selectedPerfume, setSelectedPerfume] = useState(perfumeItems[0].name);
  const [searchTerm, setSearchTerm] = useState("");
  const normalizedSearchTerm = searchTerm.trim().toLowerCase();
  const filteredPerfumes = normalizedSearchTerm
    ? perfumeItems.filter((item) =>
        [item.brand, item.name, ...item.tags, ...(item.aliases ?? [])]
          .join(" ")
          .toLowerCase()
          .includes(normalizedSearchTerm),
      )
    : perfumeItems;

  return (
    <main className="min-h-dvh bg-black max-[430px]:bg-off-white">
      <div className="mx-auto flex min-h-dvh w-full max-w-[430px] flex-col bg-off-white">
        <BackHeader title="향수 선택" />

        <div className="flex flex-1 flex-col gap-[30px] px-5 pt-[calc(var(--app-header-height)+24px)] pb-[132px]">
          <label className="flex w-full items-center rounded-full border-[0.6px] border-light-grey bg-off-white px-[14px] py-3">
            <div className="flex min-w-0 flex-1 items-center gap-4">
              <Search className="size-[18px] shrink-0 text-grey" strokeWidth={1.6} />
              <input
                className="min-w-0 flex-1 bg-transparent text-sm font-medium leading-normal tracking-[-0.02em] text-off-black outline-none placeholder:text-grey"
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="향수명, 브랜드를 검색해보세요"
              />
            </div>
          </label>

          <section className="flex flex-col gap-4">
            <div className="flex h-[30px] items-center justify-between">
              <div className="flex items-center gap-1.5">
                {filters.map((filter, index) => (
                  <FilterChip active={index === 0} key={filter} label={filter} />
                ))}
              </div>
              <button className="flex shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border-[0.8px] border-light-grey bg-off-white py-2 pl-[14px] pr-2.5 text-xs font-medium leading-none tracking-[-0.02em] text-grey" type="button">
                여성 인기순
                <ChevronDown className="size-3.5" strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {filteredPerfumes.length > 0 ? (
                filteredPerfumes.map((item) => (
                  <PerfumeCard
                    key={item.name}
                    {...item}
                    selected={selectedPerfume === item.name}
                    onSelect={() => setSelectedPerfume(item.name)}
                  />
                ))
              ) : (
                <div className="flex h-[140px] items-center justify-center rounded-lg border-[0.8px] border-light-grey text-sm font-medium tracking-[-0.02em] text-grey">
                  검색 결과가 없어요
                </div>
              )}
            </div>
          </section>
        </div>

        <div className="fixed bottom-[46px] left-1/2 z-50 w-full max-w-[430px] -translate-x-1/2 px-[18px]">
          <Link
            className="flex w-full items-start justify-center rounded-[32px] border border-off-black bg-off-black px-10 py-4 text-xl font-bold leading-none tracking-[-0.02em] text-off-white"
            to="/community/write"
          >
            선택하기
          </Link>
        </div>
      </div>
    </main>
  );
}
