import { useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BackHeader } from "../components/common/BackHeader";
import { HeaderActions } from "../components/common/HeaderActions";
import { HeartButton } from "../components/ui/HeartButton";
import { brands } from "../data/brands";
import { fragranceFamilies } from "../data/fragranceFamilies";
import { perfumeData, type PerfumeEntry } from "../data/perfumeData";

type DetailTab = "detail" | "review";

// familyId → 한글 계열 이름
function familyName(familyId: string) {
  return (
    fragranceFamilies.find((family) => family.id === familyId)?.name ?? familyId
  );
}

// 노트 컬러 병 그래픽 — 제품 누끼 이미지를 마스크로 써서 실제 병 실루엣 안을
// 탑 2 : 미들 3 : 베이스 5 비율의 색 띠로 채운다.
function NoteBottle({
  colors,
  image,
}: {
  colors: { top: string; middle: string; base: string };
  image: string;
}) {
  const maskStyle: React.CSSProperties = {
    background: `linear-gradient(to bottom, ${colors.top} 0%, ${colors.top} 20%, ${colors.middle} 20%, ${colors.middle} 50%, ${colors.base} 50%, ${colors.base} 100%)`,
    WebkitMaskImage: `url(${image})`,
    maskImage: `url(${image})`,
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskSize: "100% 100%",
    maskSize: "100% 100%",
  };

  return (
    // 투명 여백을 잘라낸 누끼 이미지라 캔버스 = 병 외곽선.
    // 기본은 높이 160px, 폭이 넓은 병은 최대 폭(110px)에 맞춰 비율 유지하며 축소
    // → 오른쪽 노트 텍스트가 항상 보이도록 보장.
    <div aria-hidden="true" className="relative w-fit max-w-[110px] shrink-0">
      <img
        alt=""
        className="h-auto max-h-[160px] w-auto max-w-full opacity-0"
        src={image}
      />
      <div className="absolute inset-0" style={maskStyle} />
    </div>
  );
}

// 노트 단계(TOP/MIDDLE/BASE) 한 줄
function NoteRow({ label, notes }: { label: string; notes: string[] }) {
  return (
    <div className="flex w-full flex-col gap-1">
      <p className="text-sm leading-[normal] tracking-[-0.02em] text-off-black">
        {label}
      </p>
      <div className="flex flex-wrap gap-x-2 gap-y-1">
        {notes.map((note) => (
          <span
            className="whitespace-nowrap text-xs font-medium leading-[normal] tracking-[-0.02em] text-grey"
            key={note}
          >
            #{note.replace(/\s+/g, "")}
          </span>
        ))}
      </div>
    </div>
  );
}

// 가로 스크롤 행 — 터치는 기본 스크롤, 데스크탑 마우스는 잡아끌어서 스크롤
function DragScrollRow({ children }: { children: React.ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ isDown: false, startX: 0, scrollLeft: 0, moved: false });

  return (
    <div
      className="scrollbar-hidden flex w-full cursor-grab gap-4 overflow-x-auto px-side active:cursor-grabbing"
      onClickCapture={(event) => {
        // 드래그 직후 카드 클릭(상세 이동)이 실행되는 것을 방지
        if (drag.current.moved) {
          event.preventDefault();
          event.stopPropagation();
          drag.current.moved = false;
        }
      }}
      onPointerDown={(event) => {
        if (event.pointerType !== "mouse" || !scrollRef.current) return;
        drag.current = {
          isDown: true,
          startX: event.clientX,
          scrollLeft: scrollRef.current.scrollLeft,
          moved: false,
        };
      }}
      onPointerLeave={() => {
        drag.current.isDown = false;
      }}
      onPointerMove={(event) => {
        if (!drag.current.isDown || !scrollRef.current) return;
        const deltaX = event.clientX - drag.current.startX;
        if (Math.abs(deltaX) > 5) drag.current.moved = true;
        scrollRef.current.scrollLeft = drag.current.scrollLeft - deltaX;
      }}
      onPointerUp={() => {
        drag.current.isDown = false;
      }}
      ref={scrollRef}
    >
      {children}
    </div>
  );
}

// 관련 향수 카드 (가로 스크롤)
function RelatedCard({ entry }: { entry: PerfumeEntry }) {
  const navigate = useNavigate();
  const brand = brands.find((b) => b.id === entry.perfume.brandId);

  return (
    <button
      className="flex w-[241px] shrink-0 flex-col items-center gap-[30px] rounded-card border-[0.8px] border-light-grey bg-off-white px-3 py-[30px] text-left"
      onClick={() => navigate(`/perfume/${entry.id}`)}
      type="button"
    >
      <span className="flex size-[150px] items-center justify-center overflow-hidden rounded-card">
        <img
          alt={entry.perfume.name}
          className="max-h-[120px] max-w-[120px] object-contain"
          src={entry.perfume.image}
        />
      </span>
      <span className="flex w-full flex-col gap-3">
        <span className="flex flex-col gap-1">
          <span className="truncate text-xs leading-[normal] tracking-[-0.02em] text-grey">
            {brand?.nameEn.toUpperCase() ?? entry.perfume.brandId}
          </span>
          <span className="truncate text-base font-semibold leading-[normal] tracking-[-0.02em] text-off-black">
            {entry.perfume.name}
          </span>
        </span>
        <span className="flex gap-2 overflow-hidden">
          {entry.perfume.familyIds.map((familyId) => (
            <span
              className="shrink-0 text-xs font-medium leading-[normal] tracking-[-0.02em] text-grey"
              key={familyId}
            >
              #{familyName(familyId)}
            </span>
          ))}
        </span>
      </span>
    </button>
  );
}

export default function PerfumeDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<DetailTab>("detail");
  const [isLiked, setIsLiked] = useState(false);

  const entry = perfumeData.find((item) => String(item.id) === id);

  if (!entry) {
    return (
      <main className="min-h-dvh text-off-black">
        <div className="mx-auto flex min-h-dvh w-full max-w-[430px] flex-col items-center justify-center gap-4 bg-off-white px-side">
          <p className="text-sm text-grey">향수를 찾을 수 없어요.</p>
          <button
            className="rounded-chip bg-off-black px-4 py-2 text-xs text-off-white"
            onClick={() => navigate(-1)}
            type="button"
          >
            돌아가기
          </button>
        </div>
      </main>
    );
  }

  const { perfume } = entry;
  const primaryFamilyName = familyName(perfume.familyIds[0]);
  // 같은 향 계열을 공유하는 다른 향수 (최대 6개)
  const relatedPerfumes = perfumeData
    .filter(
      (item) =>
        item.id !== entry.id &&
        item.perfume.familyIds.some((familyId) =>
          perfume.familyIds.includes(familyId),
        ),
    )
    .slice(0, 6);

  return (
    <main className="min-h-dvh text-off-black">
      <div className="mx-auto flex min-h-dvh w-full max-w-[430px] flex-col overflow-x-hidden bg-off-white pb-[110px]">
        <BackHeader action={<HeaderActions />} title="향수보기" />

        <div className="flex w-full flex-col pt-[var(--app-header-height)]">
          {/* 히어로 이미지 */}
          <div className="flex h-[338px] w-full items-center justify-center bg-off-white">
            <img
              alt={perfume.name}
              className="max-h-[300px] max-w-[70%] object-contain"
              src={perfume.image}
            />
          </div>

          {/* 기본 정보 */}
          <div className="flex w-full flex-col gap-1.5 px-side pt-1.5">
            <div className="flex w-full items-start justify-between">
              <div className="flex min-w-0 flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <p className="text-xs font-medium leading-[normal] tracking-[-0.02em] text-subtext">
                    {perfume.brandId}
                  </p>
                  <h1 className="text-2xl font-semibold leading-[1.08] tracking-[-0.03em]">
                    {perfume.name}
                  </h1>
                </div>
                <p className="text-sm font-medium leading-[normal] tracking-[-0.02em] text-off-black-70">
                  {perfume.description}
                </p>
              </div>
              <HeartButton
                className="mt-1 size-6 shrink-0"
                isSelected={isLiked}
                onClick={() => setIsLiked((selected) => !selected)}
              />
            </div>
            <div className="flex gap-2">
              {perfume.familyIds.map((familyId) => (
                <span
                  className="text-xs font-medium leading-[normal] tracking-[-0.02em] text-grey"
                  key={familyId}
                >
                  #{familyName(familyId)}
                </span>
              ))}
            </div>
          </div>

          {/* 상세페이지 / 리뷰 탭 */}
          <div className="mt-[30px] w-full border-b-[0.8px] border-light-grey px-side">
            <div className="flex gap-6 pt-4">
              <button
                className={`flex h-[30px] items-start text-base font-medium leading-[normal] tracking-[-0.02em] ${
                  activeTab === "detail"
                    ? "border-b-2 border-point-orange text-off-black"
                    : "text-grey"
                }`}
                onClick={() => setActiveTab("detail")}
                type="button"
              >
                상세페이지
              </button>
              <button
                className={`flex h-[30px] items-start text-base font-medium leading-[normal] tracking-[-0.02em] ${
                  activeTab === "review"
                    ? "border-b-2 border-point-orange text-off-black"
                    : "text-grey"
                }`}
                onClick={() => setActiveTab("review")}
                type="button"
              >
                리뷰
              </button>
            </div>
          </div>

          {activeTab === "detail" ? (
            <div className="flex w-full flex-col gap-10 pt-[30px]">
              {/* 상세 설명 */}
              <div className="flex w-full flex-col gap-2 px-side">
                <h2 className="text-xl font-semibold leading-[normal] tracking-[-0.02em]">
                  {perfume.detailTitle}
                </h2>
                <p className="whitespace-pre-line text-sm leading-[1.4] tracking-[-0.02em]">
                  {perfume.detailDescription}
                </p>
              </div>

              {/* 노트 구성 박스 */}
              <div className="mx-side flex items-center justify-between gap-6 rounded-card border border-light-grey px-[48px] py-5">
                <NoteBottle colors={perfume.noteColors} image={perfume.image} />
                <div className="flex min-w-0 flex-col gap-6">
                  <NoteRow label="TOP" notes={perfume.notes.top} />
                  <NoteRow label="MIDDLE" notes={perfume.notes.middle} />
                  <NoteRow label="BASE" notes={perfume.notes.base} />
                </div>
              </div>

              {/* 상세 이미지 */}
              <div className="flex w-full items-center justify-center bg-light2-grey py-10">
                <img
                  alt=""
                  aria-hidden="true"
                  className="max-h-[258px] max-w-[60%] object-contain"
                  src={perfume.image}
                />
              </div>

              {/* 관련 향수 */}
              {relatedPerfumes.length > 0 && (
                <section className="flex w-full flex-col gap-[30px]">
                  <div className="flex w-full items-center justify-between px-side">
                    <h2 className="text-xl font-semibold leading-[normal] tracking-[-0.02em]">
                      관련 향수
                    </h2>
                    <Link
                      className="flex items-center gap-1.5 text-sm font-medium leading-none tracking-[-0.02em] text-grey"
                      to={`/search-results?q=${encodeURIComponent(primaryFamilyName)}`}
                    >
                      전체보기
                    </Link>
                  </div>
                  <DragScrollRow>
                    {relatedPerfumes.map((related) => (
                      <RelatedCard entry={related} key={related.id} />
                    ))}
                  </DragScrollRow>
                </section>
              )}
            </div>
          ) : (
            /* 리뷰 탭 — AI 리뷰 요약 표시 */
            <div className="flex w-full flex-col gap-2 px-side pt-[30px]">
              <h2 className="text-xl font-semibold leading-[normal] tracking-[-0.02em]">
                AI 리뷰 요약
              </h2>
              <p className="text-sm leading-[1.4] tracking-[-0.02em]">
                {perfume.aiReview}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 구매하기 CTA */}
      <div className="fixed bottom-5 left-1/2 z-50 w-full max-w-[430px] -translate-x-1/2 px-[18px]">
        <button
          className="flex h-[58px] w-full items-center justify-center rounded-cta border border-off-black bg-off-black font-pretendard text-xl font-bold leading-[normal] tracking-[-0.02em] text-off-white"
          type="button"
        >
          구매하기
        </button>
      </div>
    </main>
  );
}
