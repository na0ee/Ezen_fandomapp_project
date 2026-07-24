import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BackHeader } from "../components/common/BackHeader";
import { Chip } from "../components/ui/Chip";
import { brands } from "../data/brands";
import { fragranceFamilies } from "../data/fragranceFamilies";
import { perfumeData } from "../data/perfumeData";

const volumes = ["30ml", "50ml", "100ml", "150ml", "200ml", "300ml"];

export default function MyPerfumeAddPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    brand: "",
    name: "",
    volume: "",
    fragranceType: "",
    memo: "",
  });

  const [selectedBrandId, setSelectedBrandId] = useState<string>("");
  const [selectedFragrances, setSelectedFragrances] = useState<string[]>([]);
  const [selectedVolume, setSelectedVolume] = useState<string>("");
  const [openDate, setOpenDate] = useState<string>("");
  const [expiryDate, setExpiryDate] = useState<string>("");
  const [selectedPerfumeImage, setSelectedPerfumeImage] = useState<string>("");
  const [errors, setErrors] = useState<{ brand?: string; name?: string }>({});
  const [openDropdown, setOpenDropdown] = useState<"brand" | "name" | "volume" | null>(null);
  const [nameSearch, setNameSearch] = useState("");
  const [isCompleteOpen, setIsCompleteOpen] = useState(false);
  const [isDraftSavedOpen, setIsDraftSavedOpen] = useState(false);
  const brandDropdownRef = useRef<HTMLDivElement>(null);
  const nameDropdownRef = useRef<HTMLDivElement>(null);
  const volumeDropdownRef = useRef<HTMLDivElement>(null);
  const pendingPerfumeRef = useRef<Record<string, unknown> | null>(null);

  // 브랜드 필터링
  const filteredBrands = (openDropdown === "brand"
    ? brands
    : brands.filter((brand) =>
        brand.name.toLowerCase().includes(formData.brand.toLowerCase())
      )
  ).sort((a, b) => a.name.localeCompare(b.name, "ko-KR"));

  // 선택된 브랜드에 해당하는 향수명만 필터링
  // 브랜드가 선택되지 않으면 전체 향수 목록 표시
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
    console.log("handleBrandSelect called with:", brandName, brandId);
    setFormData({ ...formData, brand: brandName, name: "" });
    setNameSearch("");
    setSelectedBrandId(brandId);
    setOpenDropdown(null);
    setErrors({ ...errors, brand: undefined, name: undefined });
  };

  const handleNameSelect = (perfumeName: string) => {
    console.log("handleNameSelect called with:", perfumeName);
    // 선택한 향수에서 해당 브랜드 정보 찾기
    const selectedPerfume = perfumeData.find((item) => item.perfume.name === perfumeName);

    if (selectedPerfume) {
      const brandInfo = brands.find((b) => b.id === selectedPerfume.perfume.brandId);
      if (brandInfo) {
        console.log("Setting formData to:", { name: perfumeName, brand: brandInfo.name });
        setFormData({ ...formData, name: perfumeName, brand: brandInfo.name });
        setSelectedBrandId(selectedPerfume.perfume.brandId);
        // 해당 향수의 향계열 자동 선택
        setSelectedFragrances(selectedPerfume.perfume.familyIds);
        // 향수 이미지 저장
        setSelectedPerfumeImage(selectedPerfume.perfume.image);
      }
    }

    setNameSearch("");
    setOpenDropdown(null);
    setErrors({ ...errors, name: undefined });
  };

  const handleVolumeSelect = (volume: string) => {
    setSelectedVolume(volume === selectedVolume ? "" : volume);
    setOpenDropdown(null);
  };

  const handleBrandInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, brand: e.target.value });
  };

  const handleNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameSearch(e.target.value);
    setFormData({ ...formData, name: e.target.value });
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, memo: e.target.value });
  };

  const handleSubmit = () => {
    const newErrors: { brand?: string; name?: string } = {};

    if (!formData.brand.trim()) {
      newErrors.brand = "브랜드를 선택해주세요";
    }
    if (!formData.name.trim()) {
      newErrors.name = "향수명을 선택해주세요";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // 브랜드의 영문명 가져오기
    const brandInfo = brands.find((b) => b.id === selectedBrandId);
    const brandNameEn = brandInfo?.nameEn.toUpperCase() || formData.brand;

    const newPerfume = {
      brandId: selectedBrandId,
      brand: brandNameEn,
      name: formData.name,
      status: "방금 추가",
      memo: "",
      savedMemo: formData.memo || "간단한 메모",
      image: selectedPerfumeImage,
      volume: selectedVolume,
      fragranceType: selectedFragrances,
      openDate,
      expiryDate,
    };

    pendingPerfumeRef.current = newPerfume;
    setIsCompleteOpen(true);
  };

  const handleSaveDraft = () => {
    const draft = {
      formData,
      selectedBrandId,
      selectedFragrances,
      selectedVolume,
      openDate,
      expiryDate,
    };

    sessionStorage.setItem("myPerfumeAddDraft", JSON.stringify(draft));
    setIsDraftSavedOpen(true);
  };

  const handleCompleteClose = () => {
    setIsCompleteOpen(false);
    setFormData({ brand: "", name: "", volume: "", fragranceType: "", memo: "" });
    setSelectedBrandId("");
    setSelectedVolume("");
    setSelectedFragrances([]);
    setSelectedPerfumeImage("");
    setOpenDate("");
    setExpiryDate("");
    setNameSearch("");
    setErrors({});
    navigate("/mypage/perfumes", { state: { newPerfume: pendingPerfumeRef.current } });
    pendingPerfumeRef.current = null;
  };

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        brandDropdownRef.current &&
        !brandDropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
      if (
        nameDropdownRef.current &&
        !nameDropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
      if (
        volumeDropdownRef.current &&
        !volumeDropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <main className="mx-auto min-h-dvh w-full max-w-[430px] bg-off-white">
      <BackHeader
        title="향수 등록하기"
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

      <div className="wrap flex flex-col gap-[30px] px-5 pb-[132px] pt-[calc(var(--app-header-height,54px)+24px)]">
        {/* Brand Input */}
        <section className="flex flex-col gap-4">
          <label className="flex items-center gap-1 text-base font-semibold leading-none tracking-[-0.02em] text-off-black">
            브랜드
            <span className="text-point-orange">*</span>
          </label>
          <div className="flex flex-col gap-1.5">
            <div className="relative" ref={brandDropdownRef}>
              <div className="flex items-center gap-2 rounded-lg border-[0.8px] border-light-grey bg-off-white p-4">
                <input
                  className="flex-1 bg-transparent text-sm tracking-[-0.02em] text-off-black outline-none placeholder:text-subtext"
                  onChange={handleBrandInputChange}
                  onFocus={() => setOpenDropdown("brand")}
                  placeholder="브랜드 입력"
                  value={formData.brand}
                />
                <button
                  type="button"
                  onClick={() => setOpenDropdown(openDropdown === "brand" ? null : "brand")}
                  className="flex items-center justify-center cursor-pointer"
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
                        <span className="text-sm font-medium leading-none tracking-[-0.02em] text-off-black">
                          {brand.name}
                        </span>
                        <span className="text-[11px] font-normal leading-none tracking-[-0.02em] text-grey uppercase">
                          {brand.nameEn}
                        </span>
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
        </section>

        {/* Perfume Name Input */}
        <section className="flex flex-col gap-4">
          <label className="flex items-center gap-1 text-base font-semibold leading-none tracking-[-0.02em] text-off-black">
            향수명
            <span className="text-point-orange">*</span>
          </label>
          <div className="flex flex-col gap-1.5">
            <div className="relative" ref={nameDropdownRef}>
              <div className="flex items-center gap-2 rounded-lg border-[0.8px] border-light-grey bg-off-white p-4">
                <input
                  className="flex-1 bg-transparent text-sm tracking-[-0.02em] text-off-black outline-none placeholder:text-subtext"
                  onChange={handleNameInputChange}
                  onFocus={() => {
                    setNameSearch("");
                    setOpenDropdown("name");
                  }}
                  placeholder="향수명 입력"
                  value={formData.name}
                />
                <button
                  type="button"
                  onClick={() => {
                    setNameSearch("");
                    setOpenDropdown(openDropdown === "name" ? null : "name");
                  }}
                  className="flex items-center justify-center cursor-pointer"
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
        </section>

        {/* Volume Selection */}
        <section className="space-y-4">
          <label className="block text-base font-semibold leading-none tracking-[-0.02em] text-off-black">용량</label>
          <div className="relative" ref={volumeDropdownRef}>
            <button
              className="flex w-full items-center justify-between gap-2 rounded-lg border-[0.8px] border-light-grey bg-off-white p-4 text-left cursor-pointer"
              onClick={() => setOpenDropdown(openDropdown === "volume" ? null : "volume")}
              type="button"
            >
              <span className={`text-sm tracking-[-0.02em] ${selectedVolume ? "text-off-black" : "text-subtext"}`}>
                {selectedVolume || "용량을 입력해주세요"}
              </span>
              <ChevronDown size={18} className="text-grey flex-shrink-0" />
            </button>

            {openDropdown === "volume" && (
              <div className="absolute top-full left-0 right-0 z-10 mt-1 max-h-[200px] overflow-y-auto rounded-lg border-[0.8px] border-light-grey bg-off-white shadow-lg">
                {volumes.map((volume) => (
                  <button
                    key={volume}
                    type="button"
                    className="w-full px-4 py-2.5 text-left text-sm tracking-[-0.02em] text-off-black hover:bg-light2-grey transition-colors"
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      handleVolumeSelect(volume);
                    }}
                  >
                    {volume}
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Fragrance Type Selection */}
        <section className="space-y-4">
          <label className="block text-base font-semibold leading-none tracking-[-0.02em] text-off-black">향 계열/향기</label>
          <div className="flex flex-wrap gap-x-1.5 gap-y-2">
            {fragranceFamilies.map((family) => (
              <Chip
                key={family.id}
                label={family.name}
                variant={selectedFragrances.includes(family.id) ? "filled" : "outline"}
                size="sm"
                onClick={() => {
                  if (selectedFragrances.includes(family.id)) {
                    setSelectedFragrances(selectedFragrances.filter((id) => id !== family.id));
                  } else {
                    setSelectedFragrances([...selectedFragrances, family.id]);
                  }
                }}
              />
            ))}
          </div>
        </section>

        {/* Open Date */}
        <section className="space-y-4">
          <label className="block text-base font-semibold leading-none tracking-[-0.02em] text-off-black">개봉일</label>
          <div className="relative flex items-center gap-2 rounded-lg border-[0.8px] border-light-grey bg-off-white p-4">
            <input
              className={`flex-1 cursor-pointer bg-transparent text-sm tracking-[-0.02em] outline-none [color-scheme:light] [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-45 ${openDate ? "text-off-black" : "text-subtext"}`}
              onChange={(e) => setOpenDate(e.target.value)}
              onClick={(e) => e.currentTarget.showPicker?.()}
              type="date"
              value={openDate}
            />
          </div>
        </section>

        {/* Expiry Date */}
        <section className="space-y-4">
          <label className="block text-base font-semibold leading-none tracking-[-0.02em] text-off-black">유통기한</label>
          <div className="relative flex items-center gap-2 rounded-lg border-[0.8px] border-light-grey bg-off-white p-4">
            <input
              className={`flex-1 cursor-pointer bg-transparent text-sm tracking-[-0.02em] outline-none [color-scheme:light] [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-45 ${expiryDate ? "text-off-black" : "text-subtext"}`}
              onChange={(e) => setExpiryDate(e.target.value)}
              onClick={(e) => e.currentTarget.showPicker?.()}
              type="date"
              value={expiryDate}
            />
          </div>
        </section>

        {/* Memo Input */}
        <section className="space-y-4">
          <label className="block text-base font-semibold leading-none tracking-[-0.02em] text-off-black">메모</label>
          <textarea
            className="w-full rounded-lg border-[0.8px] border-light-grey bg-off-white p-4 text-sm tracking-[-0.02em] text-off-black outline-none placeholder:text-subtext focus:border-point-orange"
            maxLength={40}
            name="memo"
            onChange={handleTextAreaChange}
            placeholder="향수에 대한 메모를 남겨보세요 (40자 이내)"
            rows={2}
            value={formData.memo}
          />
          <p className="text-xs leading-none tracking-[-0.02em] text-grey">{formData.memo.length}/40</p>
        </section>
      </div>

      <div className="fixed bottom-[39px] left-1/2 z-50 w-full max-w-[430px] -translate-x-1/2 px-[18px]">
        <button
          className="flex w-full items-start justify-center rounded-[32px] border border-off-black bg-off-black px-10 py-4 text-xl font-bold leading-none tracking-[-0.02em] text-off-white cursor-pointer"
          onClick={handleSubmit}
          type="button"
        >
          향수 추가하기
        </button>
      </div>

      {/* Complete Modal */}
      {isCompleteOpen && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/35 px-10" onClick={handleCompleteClose}>
          <section
            aria-label="향수 추가 완료"
            aria-modal="true"
            className="w-full max-w-[320px] rounded-[20px] bg-off-white px-6 py-7 text-center shadow-[0_18px_50px_rgba(0,0,0,0.22)]"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
          >
            <h2 className="text-xl font-bold tracking-[-0.02em]">향수 추가 완료</h2>
            <p className="mt-3 text-sm font-medium leading-[1.45] tracking-[-0.02em] text-grey">
              향수가 추가되었어요.
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
              향수 정보가 임시저장되었어요.
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
