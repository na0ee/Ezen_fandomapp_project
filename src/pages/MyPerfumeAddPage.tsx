import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BottomNavigation } from "../components/common/BottomNavigation";
import { BackHeader } from "../components/common/BackHeader";
import { CtaButton } from "../components/ui/CtaButton";
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
  const [selectedPerfumeImage, setSelectedPerfumeImage] = useState<string>("");
  const [errors, setErrors] = useState<{ brand?: string; name?: string }>({});
  const [openDropdown, setOpenDropdown] = useState<"brand" | "name" | null>(null);
  const [nameSearch, setNameSearch] = useState("");
  const [isCompleteOpen, setIsCompleteOpen] = useState(false);
  const brandDropdownRef = useRef<HTMLDivElement>(null);
  const nameDropdownRef = useRef<HTMLDivElement>(null);

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
    };

    console.log("향수 추가:", newPerfume);

    // sessionStorage에 저장 (새로고침하면 사라짐)
    const userPerfumes = JSON.parse(sessionStorage.getItem("userPerfumes") || "[]");
    userPerfumes.unshift(newPerfume);
    sessionStorage.setItem("userPerfumes", JSON.stringify(userPerfumes));

    setIsCompleteOpen(true);
  };

  const handleCompleteClose = () => {
    setIsCompleteOpen(false);
    setFormData({ brand: "", name: "", volume: "", fragranceType: "", memo: "" });
    setSelectedBrandId("");
    setSelectedVolume("");
    setSelectedFragrances([]);
    setSelectedPerfumeImage("");
    setNameSearch("");
    setErrors({});
    navigate("/mypage/perfumes");
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
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <main className="mx-auto min-h-dvh w-full max-w-[430px] bg-off-white">
      <BackHeader title="향수 추가하기" backTo="/mypage/perfumes" />

      <div className="wrap flex flex-col gap-8 px-5 pb-[112px] pt-[calc(var(--app-header-height,54px)+24px)]">
        {/* Brand Input */}
        <section className="space-y-2">
          <label className="flex items-center gap-1 text-sm font-medium leading-none tracking-[-0.02em] text-off-black">
            브랜드
            <span className="text-point-orange">*</span>
          </label>
          <div className="relative" ref={brandDropdownRef}>
            <div className="flex items-center gap-2 rounded-lg border-[0.8px] border-light-grey bg-off-white px-4 py-3">
              <input
                className="flex-1 bg-transparent text-sm tracking-[-0.02em] text-off-black outline-none placeholder:text-grey"
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
                      className="w-full px-4 py-2.5 text-left text-sm tracking-[-0.02em] text-off-black hover:bg-light2-grey transition-colors"
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        handleBrandSelect(brand.name, brand.id);
                      }}
                    >
                      {brand.name}
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-2.5 text-sm text-grey">검색 결과 없음</div>
                )}
              </div>
            )}
          </div>
          {errors.brand && <p className="text-xs font-medium tracking-[-0.02em] text-point-orange">{errors.brand}</p>}
        </section>

        {/* Perfume Name Input */}
        <section className="space-y-2">
          <label className="flex items-center gap-1 text-sm font-medium leading-none tracking-[-0.02em] text-off-black">
            향수명
            <span className="text-point-orange">*</span>
          </label>
          <div className="relative" ref={nameDropdownRef}>
            <div className="flex items-center gap-2 rounded-lg border-[0.8px] border-light-grey bg-off-white px-4 py-3">
              <input
                className="flex-1 bg-transparent text-sm tracking-[-0.02em] text-off-black outline-none placeholder:text-grey"
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
        </section>

        {/* Volume Selection */}
        <section className="space-y-3">
          <label className="block text-sm font-medium leading-none tracking-[-0.02em] text-off-black">용량</label>
          <div className="flex flex-wrap gap-1.5">
            {volumes.map((volume) => (
              <Chip
                key={volume}
                label={volume}
                variant={selectedVolume === volume ? "filled" : "outline"}
                size="sm"
                onClick={() => {
                  if (selectedVolume === volume) {
                    setSelectedVolume("");
                  } else {
                    setSelectedVolume(volume);
                  }
                }}
              />
            ))}
          </div>
        </section>

        {/* Fragrance Type Selection */}
        <section className="space-y-3">
          <label className="block text-sm font-medium leading-none tracking-[-0.02em] text-off-black">향 계열</label>
          <div className="flex flex-wrap gap-1.5">
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

        {/* Memo Input */}
        <section className="space-y-2">
          <label className="block text-sm font-medium leading-none tracking-[-0.02em] text-off-black">메모</label>
          <textarea
            className="w-full rounded-lg border-[0.8px] border-light-grey bg-off-white px-4 py-3 text-sm tracking-[-0.02em] text-off-black outline-none placeholder:text-grey focus:border-point-orange"
            maxLength={40}
            name="memo"
            onChange={handleTextAreaChange}
            placeholder="향수에 대한 메모를 남겨보세요 (40자 이내)"
            rows={2}
            value={formData.memo}
          />
          <p className="text-xs leading-none tracking-[-0.02em] text-grey">{formData.memo.length}/40</p>
        </section>

        {/* Submit Button */}
        <div className="pt-4">
          <CtaButton
            label="향수 추가하기"
            onClick={handleSubmit}
            className="cursor-pointer"
          />
        </div>
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

      <BottomNavigation />
    </main>
  );
}
