import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BackHeader } from "../components/common/BackHeader";
import { brands } from "../data/brands";
import { perfumeData } from "../data/perfumeData";
import bottleByredo from "../assets/mypage/bottle-byredo.svg";
import bottleDiptyque from "../assets/mypage/bottle-diptyque.svg";
import bottleMissdior from "../assets/mypage/bottle-missdior.svg";
import bottleNormalBlack from "../assets/mypage/bottle-normal-black.svg";
import bottleTomford from "../assets/mypage/bottle-tomford.svg";
import perfumeSanta from "../assets/mypage/perfume-santa.png";
import perfumeLoewe from "../assets/mypage/perfume-loewe.png";
import perfumeMatiere from "../assets/mypage/perfume-MATIERE.png";
import perfumeTomford from "../assets/mypage/perfume-tomford.png";
import perfumeMissdior from "../assets/mypage/perfume-missdior.png";

const initialYear = 2026;
const initialMonth = 7;
const todayDate = 12;
const weekDayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const recordedInfoByMonth: Record<string, Record<number, { brand: string; name: string; image: string }>> = {
  "2026-7": {
    6: { brand: "TOM FORD", name: "토바코 바닐 EDP", image: perfumeTomford },
    7: { brand: "BYREDO", name: "블랑쉬 오 드 퍼퓸", image: "/assets/perfume/byredo/blanche.png" },
    8: { brand: "BYREDO", name: "선데이즈드 오 드 퍼퓸", image: "/assets/perfume/byredo/sundazed.png" },
    9: { brand: "DIPTYQUE", name: "오 데 상스 오 드 뚜왈렛", image: "/assets/perfume/diptyque/eau-des-sens.png" },
    11: { brand: "DIOR", name: "미스 디올 블루밍 부케", image: perfumeMissdior },
  },
};

/** 등록된 svg가 있는 브랜드(톰포드/바이레도/딥티크/디올) 외에는 기본 병 아이콘으로 표시 */
function getBottleIcon(brand: string) {
  const normalized = brand.toUpperCase();
  if (normalized.includes("TOM FORD")) return bottleTomford;
  if (normalized.includes("BYREDO")) return bottleByredo;
  if (normalized.includes("DIPTYQUE")) return bottleDiptyque;
  if (normalized.includes("DIOR")) return bottleMissdior;
  return bottleNormalBlack;
}

const recordedDaysByMonth: Record<string, Record<number, string>> = Object.fromEntries(
  Object.entries(recordedInfoByMonth).map(([monthKey, days]) => [
    monthKey,
    Object.fromEntries(Object.entries(days).map(([day, info]) => [day, getBottleIcon(info.brand)])),
  ]),
);

function getCalendarWeeks(year: number, month: number) {
  const daysInMonth = new Date(year, month, 0).getDate();
  const firstWeekday = new Date(year, month - 1, 1).getDay();
  const leadingBlanks = (firstWeekday + 6) % 7;
  const totalCells = leadingBlanks + daysInMonth;
  const totalWeeks = Math.ceil(totalCells / 7);

  return Array.from({ length: totalWeeks }, (_, weekIndex) =>
    Array.from({ length: 7 }, (_, dayIndex) => {
      const cellIndex = weekIndex * 7 + dayIndex;
      const day = cellIndex - leadingBlanks + 1;
      return day >= 1 && day <= daysInMonth ? day : null;
    }),
  );
}

function getBrandKeywords(brandId: string) {
  const entry = perfumeData.find((item) => item.perfume.brandId === brandId);
  if (!entry) return [];

  const { top, middle } = entry.perfume.notes;
  return [...top, ...middle].slice(0, 3).map((note) => `#${note}`);
}

const perfumeRecords = [
  {
    brandId: "santa-maria-novella",
    brand: "SANTA MARIA NOVELLA",
    brandKo: "산타 마리아 노벨라",
    name: "엔젤 디 피렌체 오드코롱 100ml",
    image: perfumeSanta,
    keywords: getBrandKeywords("santa-maria-novella"),
  },
  {
    brandId: "",
    brand: "LOEWE PERFUMES",
    brandKo: "로에베",
    name: "로에베 아이레 수틸레사 오 드 뚜왈렛 50ml",
    image: perfumeLoewe,
    keywords: ["#페어", "#뮤게", "#자스민"],
  },
  {
    brandId: "",
    brand: "MATIERE PREMIERE",
    brandKo: "마티에 프리미에르",
    name: "마티에 프리미에르 메탈 라벤더 오 드 퍼퓸 50ml",
    image: perfumeMatiere,
    keywords: ["#메탈릭", "#플로럴", "#머스크"],
  },
];


const defaultSelectedDate = { year: initialYear, month: initialMonth, day: todayDate };

export default function MyPerfumeRecordPage() {
  const navigate = useNavigate();
  const perfumes = perfumeRecords;
  const [formData, setFormData] = useState({ brand: "", name: "" });
  const [selectedBrandId, setSelectedBrandId] = useState<string>("");
  const [selectedPerfumeImage, setSelectedPerfumeImage] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<{ year: number; month: number; day: number } | null>(
    defaultSelectedDate,
  );
  const [viewYear, setViewYear] = useState(initialYear);
  const [viewMonth, setViewMonth] = useState(initialMonth);
  const [openDropdown, setOpenDropdown] = useState<"brand" | "name" | null>(null);
  const [nameSearch, setNameSearch] = useState("");
  const [errors, setErrors] = useState<{ brand?: string; name?: string; date?: string }>({});
  const [isCompleteOpen, setIsCompleteOpen] = useState(false);
  const [isDraftSavedOpen, setIsDraftSavedOpen] = useState(false);
  const [selectedInfoDay, setSelectedInfoDay] = useState<number | null>(null);
  const brandDropdownRef = useRef<HTMLDivElement>(null);
  const nameDropdownRef = useRef<HTMLDivElement>(null);
  const pendingPerfumeRef = useRef<Record<string, unknown> | null>(null);

  const monthLabel = `${viewYear}년 ${viewMonth}월`;
  const calendarWeeks = getCalendarWeeks(viewYear, viewMonth);
  const recordedDays = recordedDaysByMonth[`${viewYear}-${viewMonth}`] ?? {};
  const recordedInfo = recordedInfoByMonth[`${viewYear}-${viewMonth}`] ?? {};
  const isCurrentViewMonth = viewYear === initialYear && viewMonth === initialMonth;
  const isTodaySelected =
    selectedDate?.year === initialYear && selectedDate?.month === initialMonth && selectedDate?.day === todayDate;
  const isTodayHighlighted = !selectedDate || isTodaySelected;
  const today = new Date(initialYear, initialMonth - 1, todayDate);

  const handleDateSelect = (day: number) => {
    const clickedDate = new Date(viewYear, viewMonth - 1, day);

    if (clickedDate > today) {
      setErrors((current) => ({ ...current, date: "오늘 이후 날짜는 선택할 수 없어요" }));
      return;
    }

    setErrors((current) => ({ ...current, date: undefined }));
    setSelectedInfoDay(null);
    setSelectedDate((current) =>
      current?.year === viewYear && current?.month === viewMonth && current?.day === day
        ? null
        : { year: viewYear, month: viewMonth, day },
    );
  };

  const handleBottleDayClick = (day: number) => {
    setErrors((current) => ({ ...current, date: undefined }));
    setSelectedInfoDay((current) => (current === day ? null : day));
  };

  const goToPrevMonth = () => {
    setViewYear((year) => (viewMonth === 1 ? year - 1 : year));
    setViewMonth((month) => (month === 1 ? 12 : month - 1));
  };

  const goToNextMonth = () => {
    setViewYear((year) => (viewMonth === 12 ? year + 1 : year));
    setViewMonth((month) => (month === 12 ? 1 : month + 1));
  };

  const filteredBrands = (openDropdown === "brand"
    ? brands
    : brands.filter((brand) => brand.name.toLowerCase().includes(formData.brand.toLowerCase()))
  ).sort((a, b) => a.name.localeCompare(b.name, "ko-KR"));

  const brandPerfumes = selectedBrandId
    ? perfumeData.filter((item) => item.perfume.brandId === selectedBrandId)
    : perfumeData;

  const filteredNames = ((openDropdown === "name" && nameSearch === "" && !selectedBrandId)
    ? perfumeData.map((item) => item.perfume.name)
    : brandPerfumes
        .map((item) => item.perfume.name)
        .filter((name) => name.toLowerCase().includes(nameSearch.toLowerCase()))
  ).sort((a, b) => a.localeCompare(b, "ko-KR"));

  const handleBrandSelect = (brandName: string, brandId: string) => {
    setFormData({ ...formData, brand: brandName, name: "" });
    setNameSearch("");
    setSelectedBrandId(brandId);
    setOpenDropdown(null);
  };

  const handleNameSelect = (perfumeName: string) => {
    const selectedPerfume = perfumeData.find((item) => item.perfume.name === perfumeName);

    if (selectedPerfume) {
      const brandInfo = brands.find((b) => b.id === selectedPerfume.perfume.brandId);
      if (brandInfo) {
        setFormData({ ...formData, name: perfumeName, brand: brandInfo.name });
        setSelectedBrandId(selectedPerfume.perfume.brandId);
      }
    }

    setNameSearch("");
    setOpenDropdown(null);
  };

  const handleSaveDraft = () => {
    const draft = {
      formData,
      selectedBrandId,
      selectedPerfumeImage,
      selectedDate,
    };

    sessionStorage.setItem("myPerfumeRecordDraft", JSON.stringify(draft));
    setIsDraftSavedOpen(true);
  };

  const handleSelectPerfume = (perfume: (typeof perfumeRecords)[number]) => {
    setFormData({ brand: perfume.brandKo, name: perfume.name });
    setSelectedBrandId(perfume.brandId);
    setSelectedPerfumeImage(perfume.image);
    setNameSearch("");
    setErrors((current) => ({ ...current, brand: undefined, name: undefined }));
  };

  const handleSubmit = () => {
    const newErrors: { brand?: string; name?: string; date?: string } = {};

    if (!formData.brand.trim()) {
      newErrors.brand = "브랜드를 선택해주세요";
    }
    if (!formData.name.trim()) {
      newErrors.name = "향수명을 선택해주세요";
    }
    if (!selectedDate) {
      newErrors.date = "날짜를 선택해주세요";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newPerfume = {
      brandId: selectedBrandId,
      brand: formData.brand,
      name: formData.name,
      status: "방금 기록",
      memo: "",
      savedMemo: "간단한 메모",
      image: selectedPerfumeImage,
      date: selectedDate,
    };

    pendingPerfumeRef.current = newPerfume;

    setErrors({});
    setIsCompleteOpen(true);
  };

  const handleCompleteClose = () => {
    setIsCompleteOpen(false);
    setFormData({ brand: "", name: "" });
    setSelectedBrandId("");
    setSelectedPerfumeImage("");
    setSelectedDate(defaultSelectedDate);
    setSelectedInfoDay(null);
    setNameSearch("");
    setErrors({});
    navigate("/mypage/perfumes", { state: { newPerfume: pendingPerfumeRef.current } });
    pendingPerfumeRef.current = null;
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (brandDropdownRef.current && !brandDropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
      if (nameDropdownRef.current && !nameDropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <main className="mx-auto min-h-dvh w-full max-w-[430px] bg-off-white">
      <BackHeader
        title="향수 기록하기"
        backTo="/mypage/perfumes"
        icon="close"
        action={
          <button
            className="cursor-pointer rounded-full bg-off-black px-[14px] py-2 text-xs font-medium leading-none tracking-[-0.02em] text-off-white"
            onClick={handleSaveDraft}
            type="button"
          >
            임시저장
          </button>
        }
      />

      <div className="wrap flex flex-col gap-16 px-5 pb-[132px] pt-[calc(var(--app-header-height,54px)+24px)]">
        {/* Calendar Section */}
        <section className="rounded-lg border-[0.8px] border-light-grey bg-off-white p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold leading-none tracking-[-0.02em] text-off-black">{monthLabel}</h2>
            <div className="flex gap-6">
              <button
                className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center"
                onClick={goToPrevMonth}
                type="button"
              >
                <ChevronUp size={20} className="text-grey" />
              </button>
              <button
                className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center"
                onClick={goToNextMonth}
                type="button"
              >
                <ChevronDown size={20} className="text-grey" />
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="mt-6 flex items-start justify-between">
            {weekDayLabels.map((day) => (
              <div key={day} className="flex w-10 flex-col items-center">
                <span className="text-sm font-medium leading-none tracking-[-0.02em] text-off-black">{day}</span>
              </div>
            ))}
          </div>

          {calendarWeeks.map((week, weekIndex) => (
            <div className="mt-2 flex items-start justify-between" key={weekIndex}>
              {week.map((day, dayIndex) => {
                if (day == null) {
                  return <div className="w-10" key={dayIndex} />;
                }

                const bottle = recordedDays[day];
                const isToday = isCurrentViewMonth && day === todayDate && isTodayHighlighted;
                const isSelected =
                  selectedDate?.year === viewYear && selectedDate?.month === viewMonth && selectedDate?.day === day;

                return (
                  <button
                    className="flex w-10 cursor-pointer flex-col items-center"
                    key={dayIndex}
                    onClick={() => (bottle ? handleBottleDayClick(day) : handleDateSelect(day))}
                    type="button"
                  >
                    <div
                      className={`relative flex h-[40px] w-[40px] items-center justify-center rounded-full ${
                        isSelected ? "bg-point-orange" : ""
                      }`}
                    >
                      {!isSelected && bottle && (
                        <img alt="" className="absolute left-0 right-0 top-[-6px] size-full object-contain" src={bottle} />
                      )}
                      <span
                        className={`relative text-sm leading-none tracking-[-0.02em] ${
                          isSelected
                            ? "font-bold text-off-white"
                            : bottle
                              ? "font-bold text-off-white"
                              : isToday
                                ? "font-bold text-point-orange"
                                : "font-medium text-off-black"
                        }`}
                      >
                        {day}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          ))}
          {errors.date && <p className="mt-3 text-xs font-medium tracking-[-0.02em] text-point-orange">{errors.date}</p>}

          {selectedInfoDay && recordedInfo[selectedInfoDay] && (
            <article className="mt-4 flex items-end justify-end gap-5 rounded-lg border-[0.8px] border-light-grey bg-off-white p-3">
              <div className="flex flex-1 items-start gap-5 min-w-0">
                <div className="flex size-[100px] shrink-0 items-center justify-center overflow-hidden rounded-lg bg-light2-grey">
                  <img
                    alt={recordedInfo[selectedInfoDay].name || recordedInfo[selectedInfoDay].brand}
                    className={`object-contain mix-blend-multiply ${
                      ["TOM FORD", "DIOR"].includes(recordedInfo[selectedInfoDay].brand) ? "size-full" : "size-[70%]"
                    }`}
                    src={recordedInfo[selectedInfoDay].image}
                  />
                </div>
                <div className="flex flex-1 flex-col gap-3 min-w-0">
                  <div className="min-w-0">
                    <p className="truncate text-[12px] font-normal leading-none tracking-[-0.02em] text-grey uppercase">
                      {recordedInfo[selectedInfoDay].brand}
                    </p>
                    {recordedInfo[selectedInfoDay].name && (
                      <h3 className="mt-1 truncate text-[16px] font-semibold leading-[1.2] tracking-[-0.02em] text-off-black">
                        {recordedInfo[selectedInfoDay].name}
                      </h3>
                    )}
                  </div>
                </div>
              </div>
            </article>
          )}
        </section>

        {/* Brand / Perfume Name Search */}
        <section className="flex flex-col gap-[30px]">
          <div className="flex flex-col gap-4">
            <label className="flex items-center gap-1 text-base font-semibold leading-none tracking-[-0.02em] text-off-black">
              브랜드
              <span className="text-point-orange">*</span>
            </label>
            <div className="flex flex-col gap-1.5">
              <div className="relative" ref={brandDropdownRef}>
                <div className="flex items-center gap-2 rounded-lg border-[0.8px] border-light-grey bg-off-white p-4">
                  <input
                    className="flex-1 bg-transparent text-sm tracking-[-0.02em] text-off-black outline-none placeholder:text-subtext"
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    onFocus={() => setOpenDropdown("brand")}
                    placeholder="브랜드명을 입력해주세요"
                    value={formData.brand}
                  />
                  <button
                    type="button"
                    onClick={() => setOpenDropdown(openDropdown === "brand" ? null : "brand")}
                    className="flex cursor-pointer items-center justify-center"
                  >
                    <ChevronDown size={18} className="text-grey flex-shrink-0" />
                  </button>
                </div>

                {openDropdown === "brand" && (
                  <div className="absolute top-full left-0 right-0 z-10 mt-1 max-h-[200px] overflow-y-auto rounded-lg border-[0.8px] border-light-grey bg-off-white shadow-lg">
                    {filteredBrands.length > 0 ? (
                      filteredBrands.map((brand) => (
                        <button
                          key={brand.id}
                          type="button"
                          className="flex w-full flex-col gap-1.5 px-4 py-2.5 text-left hover:bg-light2-grey transition-colors"
                          onMouseDown={(e) => {
                            e.stopPropagation();
                            handleBrandSelect(brand.name, brand.id);
                          }}
                        >
                          <span className="text-sm font-medium leading-none tracking-[-0.02em] text-off-black">{brand.name}</span>
                          <span className="text-[11px] font-normal leading-none tracking-[-0.02em] text-grey uppercase">{brand.nameEn}</span>
                        </button>
                      ))
                    ) : (
                      <div className="px-4 py-2.5 text-sm text-grey">검색 결과 없음</div>
                    )}
                  </div>
                )}
              </div>
              {errors.brand && <p className="text-xs font-medium tracking-[-0.02em] text-point-orange">{errors.brand}</p>}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <label className="flex items-center gap-1 text-base font-semibold leading-none tracking-[-0.02em] text-off-black">
              향수명
              <span className="text-point-orange">*</span>
            </label>
            <div className="flex flex-col gap-1.5">
              <div className="relative" ref={nameDropdownRef}>
                <div className="flex items-center gap-2 rounded-lg border-[0.8px] border-light-grey bg-off-white p-4">
                  <input
                    className="flex-1 bg-transparent text-sm tracking-[-0.02em] text-off-black outline-none placeholder:text-subtext"
                    onChange={(e) => {
                      setNameSearch(e.target.value);
                      setFormData({ ...formData, name: e.target.value });
                    }}
                    onFocus={() => {
                      setNameSearch("");
                      setOpenDropdown("name");
                    }}
                    placeholder="향수명을 입력해주세요"
                    value={formData.name}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setNameSearch("");
                      setOpenDropdown(openDropdown === "name" ? null : "name");
                    }}
                    className="flex cursor-pointer items-center justify-center"
                  >
                    <ChevronDown size={18} className="text-grey flex-shrink-0" />
                  </button>
                </div>

                {openDropdown === "name" && (
                  <div className="absolute top-full left-0 right-0 z-10 mt-1 max-h-[200px] overflow-y-auto rounded-lg border-[0.8px] border-light-grey bg-off-white shadow-lg">
                    {filteredNames.length > 0 ? (
                      filteredNames.map((name) => (
                        <button
                          key={name}
                          type="button"
                          className="w-full px-4 py-2.5 text-left text-sm tracking-[-0.02em] text-off-black hover:bg-light2-grey transition-colors"
                          onMouseDown={(e) => {
                            e.stopPropagation();
                            handleNameSelect(name);
                          }}
                        >
                          {name}
                        </button>
                      ))
                    ) : (
                      <div className="px-4 py-2.5 text-sm text-grey">검색 결과 없음</div>
                    )}
                  </div>
                )}
              </div>
              {errors.name && <p className="text-xs font-medium tracking-[-0.02em] text-point-orange">{errors.name}</p>}
            </div>
          </div>
        </section>

        {/* Perfume Records List */}
        <section className="flex flex-col gap-4">
          <label className="flex items-center gap-1 text-base font-semibold leading-none tracking-[-0.02em] text-off-black">
            내 향수
          </label>
          {perfumes.map((perfume) => (
            <article
              key={perfume.name}
              className="flex items-end justify-end gap-5 rounded-lg border-[0.8px] border-light-grey bg-off-white p-3"
            >
              <button
                className="flex min-w-0 flex-1 cursor-pointer items-start gap-5 text-left"
                onClick={() => handleSelectPerfume(perfume)}
                type="button"
              >
                <div className="flex size-[100px] shrink-0 items-center justify-center overflow-hidden rounded-lg bg-light2-grey">
                  <img alt={perfume.name} className="size-full object-contain mix-blend-multiply" src={perfume.image} />
                </div>
                <div className="flex flex-1 flex-col gap-3 min-w-0">
                  <div className="min-w-0">
                    <p className="truncate text-[12px] font-normal leading-none tracking-[-0.02em] text-grey uppercase">
                      {perfume.brand}
                    </p>
                    <h3 className="mt-1 truncate text-[16px] font-semibold leading-[1.2] tracking-[-0.02em] text-off-black">
                      {perfume.name}
                    </h3>
                  </div>
                  {perfume.keywords.length > 0 && (
                    <div className="flex items-center gap-2">
                      {perfume.keywords.map((keyword) => (
                        <span
                          key={keyword}
                          className="text-xs font-medium leading-none tracking-[-0.02em] text-grey"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </button>
            </article>
          ))}
        </section>
      </div>

      <div className="fixed bottom-[39px] left-1/2 z-50 w-full max-w-[430px] -translate-x-1/2 px-[18px]">
        <button
          className="flex w-full items-start justify-center rounded-[32px] border border-off-black bg-off-black px-10 py-4 text-xl font-bold leading-none tracking-[-0.02em] text-off-white cursor-pointer"
          onClick={handleSubmit}
          type="button"
        >
          향수 기록하기
        </button>
      </div>

      {/* Complete Modal */}
      {isCompleteOpen && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/35 px-10" onClick={handleCompleteClose}>
          <section
            aria-label="향수 기록 완료"
            aria-modal="true"
            className="w-full max-w-[320px] rounded-[20px] bg-off-white px-6 py-7 text-center shadow-[0_18px_50px_rgba(0,0,0,0.22)]"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
          >
            <h2 className="text-xl font-bold tracking-[-0.02em]">향수 기록 완료</h2>
            <p className="mt-3 text-sm font-medium leading-[1.45] tracking-[-0.02em] text-grey">
              향수 사용이 기록되었어요.
            </p>
            <button
              className="mt-6 h-12 w-full rounded-[32px] bg-off-black text-base font-bold tracking-[-0.02em] text-off-white cursor-pointer"
              onClick={handleCompleteClose}
              type="button"
            >
              확인
            </button>
          </section>
        </div>
      )}

      {/* Draft Saved Modal */}
      {isDraftSavedOpen && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/35 px-10" onClick={() => setIsDraftSavedOpen(false)}>
          <section
            aria-label="임시저장 완료"
            aria-modal="true"
            className="w-full max-w-[320px] rounded-[20px] bg-off-white px-6 py-7 text-center shadow-[0_18px_50px_rgba(0,0,0,0.22)]"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
          >
            <h2 className="text-xl font-bold tracking-[-0.02em]">임시저장 완료</h2>
            <p className="mt-3 text-sm font-medium leading-[1.45] tracking-[-0.02em] text-grey">
              향수 기록 정보가 임시저장되었어요.
            </p>
            <button
              className="mt-6 h-12 w-full rounded-[32px] bg-off-black text-base font-bold tracking-[-0.02em] text-off-white cursor-pointer"
              onClick={() => setIsDraftSavedOpen(false)}
              type="button"
            >
              확인
            </button>
          </section>
        </div>
      )}
    </main>
  );
}
