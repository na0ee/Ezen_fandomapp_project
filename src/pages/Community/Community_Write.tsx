import { Camera, ChevronDown, ChevronUp, Plus, X } from "lucide-react";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import { useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import tagOne from "../../assets/community/figma/tag-one.png";
import tagThree from "../../assets/community/figma/tag-three.png";
import tagTwo from "../../assets/community/figma/tag-two.png";

const selectedPerfumes = [
  {
    image: tagOne,
    imageClassName: "h-[46px] w-[31px]",
    name: "딥디크 오 로즈 오 드 퍼퓸",
    detail: "50ml · 231,000원",
  },
  {
    image: tagTwo,
    imageClassName: "h-[46px] w-[32px]",
    name: "바이레도 블랑쉬 오 드 퍼퓸",
    detail: "50ml · 260,000원",
  },
  {
    image: tagThree,
    imageClassName: "h-[46px] w-[32px]",
    name: "조 말론 런던 잉글리쉬 페어 & 프리지아 코롱",
    detail: "50ml · 260,000원",
  },
];

const moodRows = [
  ["깔끔한", "포근한", "상큼한", "우아한", "고급스러운"],
  ["관능적인", "중성적인", "개성있는", "기타"],
];

const situationRows = [
  ["데일리", "여행", "특별한 날", "운동 후", "친구", "데이트"],
  ["집에서", "출근/학교", "기분 전환", "잠들기 전"],
];

const hashtags = ["#데일리향수", "#ㅁㅁ", "#ㅁㅁ", "#ㅁㅁ"];
const scentRows = [
  ["장미", "리치", "비누", "파우더리", "고급스러운"],
  ["관능적인", "중성적인", "개성있는", "기타"],
];
const longevityOptions = ["1시간 이하", "2~3시간", "4~5시간", "6시간 이상"];
const purchaseRows = [
  ["공식홈페이지", "플래그십스토어", "백화점", "면세점"],
  ["편집샵", "선물", "기타", "개성있는", "기타"],
];
const reasonRows = [
  ["포근한 무드", "깨끗한 느낌", "포은트 주기 좋음", "잔향이 좋음"],
  ["기타"],
];

const defaultTitle = "햇살 좋은 날의 베이지 룩과 향수 조합 ☁";

const defaultBody = `따뜻한 햇살엔 부드럽고 깨끗한 향이 잘 어울리는 것 같아요
블랑쉬로 포근하게 시작해서 오 로즈로 기분 전환해주고 마지막엔 잉글리수 페어로 잔향을 남겨줘요
하루 종일 기분이 좋아지는 조합이에요`;

function Chip({
  label,
  active = false,
  onClick,
}: {
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      aria-pressed={onClick ? active : undefined}
      className={`flex shrink-0 items-center justify-center rounded-full px-[14px] py-2 text-xs font-medium leading-none tracking-[-0.02em] ${
        active
          ? "bg-off-black text-off-white"
          : "border-[0.8px] border-light-grey text-grey"
      }`}
      onClick={onClick}
      type="button"
    >
      {label}
    </button>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex w-full flex-col gap-4">
      <h2 className="text-base font-semibold leading-none tracking-[-0.02em] text-off-black">
        {title}
      </h2>
      {children}
    </section>
  );
}

function PerfumeThumb({
  image,
  className,
  name,
  onRemove,
}: {
  image: string;
  className: string;
  name: string;
  onRemove: () => void;
}) {
  return (
    <div className="relative flex size-[68px] shrink-0 items-center justify-center rounded-lg border-[0.8px] border-light-grey">
      <img className={`${className} object-contain`} src={image} alt="" />
      <button
        aria-label={`${name} 삭제`}
        className="absolute right-[-6.8px] top-[-6.8px] flex size-4 items-center justify-center rounded-full bg-grey text-off-white"
        type="button"
        onClick={onRemove}
      >
        <X className="size-3" strokeWidth={2} />
      </button>
    </div>
  );
}

function MessageField({
  children,
  count,
}: {
  children: ReactNode;
  count: string;
}) {
  return (
    <div className="flex w-full flex-col items-end gap-1.5">
      <div className="w-full rounded-lg border-[0.8px] border-light-grey p-4 text-sm font-normal leading-[1.4] tracking-[-0.02em] text-subtext">
        {children}
      </div>
      <span className="w-full text-right text-[10px] font-normal leading-normal tracking-[-0.02em] text-grey">
        {count}
      </span>
    </div>
  );
}

function PerfumeReviewCard({
  image,
  name,
  detail,
  open,
  onToggle,
}: {
  image: string;
  name: string;
  detail: string;
  open: boolean;
  onToggle: () => void;
}) {
  const [selectedScents, setSelectedScents] = useState<string[]>([
    "장미",
    "리치",
    "비누",
  ]);
  const [selectedLongevity, setSelectedLongevity] = useState("1시간 이하");
  const [selectedPurchases, setSelectedPurchases] = useState<string[]>([
    "공식홈페이지",
  ]);
  const [selectedReasons, setSelectedReasons] = useState<string[]>([
    "포근한 무드",
  ]);

  const toggleSelection = (
    label: string,
    setter: Dispatch<SetStateAction<string[]>>,
  ) => {
    setter((selected) =>
      selected.includes(label)
        ? selected.filter((item) => item !== label)
        : [...selected, label],
    );
  };

  return (
    <article
      className={`w-full rounded-lg border-[0.8px] border-light-grey p-4 ${open ? "flex flex-col gap-4" : "flex items-center justify-between"}`}
    >
      <button
        aria-expanded={open}
        aria-label={`${name} 상세 후기 ${open ? "접기" : "펼치기"}`}
        className="flex w-full cursor-pointer items-center justify-between"
        onClick={onToggle}
        type="button"
      >
        <div className="flex min-w-0 items-start gap-3 text-left">
          <div className="flex size-[50px] shrink-0 items-center justify-center overflow-hidden rounded-[8px] border-[0.8px] border-light-grey">
            <img alt="" className="size-full object-contain mix-blend-multiply" src={image} />
          </div>
          <div className="flex min-w-0 flex-col items-start gap-1.5">
            <p className="truncate text-[12px] font-normal leading-none tracking-[-0.02em] text-grey uppercase">
              {detail}
            </p>
            <h2 className="truncate text-[14px] font-normal leading-[1.2] tracking-[-0.02em] text-off-black">
              {name}
            </h2>
          </div>
        </div>
        <span className="flex size-[18px] shrink-0 items-center justify-center text-grey">
          {open ? (
            <ChevronUp className="size-[18px]" strokeWidth={1.5} />
          ) : (
            <ChevronDown className="size-[18px]" strokeWidth={1.5} />
          )}
        </span>
      </button>

      {open && (
        <>
          <div className="flex w-full flex-col gap-4">
            <h3 className="text-base font-semibold leading-normal tracking-[-0.02em] text-off-black">
              가장 많이 느껴진 향
            </h3>
            <div className="flex flex-col gap-2">
              {scentRows.map((row) => (
                <div
                  className="flex flex-wrap items-center gap-1.5"
                  key={row.join("-")}
                >
                  {row.map((label) => (
                    <Chip
                      active={selectedScents.includes(label)}
                      key={label}
                      label={label}
                      onClick={() => toggleSelection(label, setSelectedScents)}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="h-px w-full bg-light-grey" />
          <div className="flex w-full flex-col gap-4">
            <h3 className="text-base font-semibold leading-normal tracking-[-0.02em] text-off-black">
              지속력
            </h3>
            <div className="flex flex-wrap items-center gap-1.5">
              {longevityOptions.map((label) => (
                <Chip
                  active={selectedLongevity === label}
                  key={label}
                  label={label}
                  onClick={() => setSelectedLongevity(label)}
                />
              ))}
            </div>
          </div>
          <div className="h-px w-full bg-light-grey" />
          <div className="flex w-full flex-col gap-4">
            <h3 className="text-base font-semibold leading-normal tracking-[-0.02em] text-off-black">
              구입처
            </h3>
            <div className="flex flex-col gap-2">
              {purchaseRows.map((row) => (
                <div
                  className="flex flex-wrap items-center gap-1.5"
                  key={row.join("-")}
                >
                  {row.map((label, index) => (
                    <Chip
                      active={selectedPurchases.includes(label)}
                      key={`${label}-${index}`}
                      label={label}
                      onClick={() =>
                        toggleSelection(label, setSelectedPurchases)
                      }
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="h-px w-full bg-light-grey" />
          <div className="flex w-full flex-col gap-4">
            <h3 className="text-base font-semibold leading-normal tracking-[-0.02em] text-off-black">
              이 향수를 고른 이유
            </h3>
            <div className="flex flex-col gap-2">
              {reasonRows.map((row) => (
                <div
                  className="flex flex-wrap items-center gap-1.5"
                  key={row.join("-")}
                >
                  {row.map((label) => (
                    <Chip
                      active={selectedReasons.includes(label)}
                      key={label}
                      label={label}
                      onClick={() => toggleSelection(label, setSelectedReasons)}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </article>
  );
}

function WriteCompleteDialog({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/35 px-10"
      onClick={onClose}
    >
      <section
        aria-label="글쓰기 완료"
        aria-modal="true"
        className="w-full max-w-[320px] rounded-[20px] bg-off-white px-6 py-7 text-center shadow-[0_18px_50px_rgba(0,0,0,0.22)]"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
      >
        <h2 className="text-xl font-bold tracking-[-0.02em]">글쓰기 완료</h2>
        <p className="mt-3 text-sm font-medium leading-[1.45] tracking-[-0.02em] text-grey">
          커뮤니티에 글이 올라갔어요.
        </p>
        <button
          className="mt-6 h-12 w-full rounded-[32px] bg-off-black text-base font-bold tracking-[-0.02em] text-off-white"
          onClick={onClose}
          type="button"
        >
          확인
        </button>
      </section>
    </div>
  );
}

type TaggedPerfume = { image: string; brand: string; name: string };

export default function CommunityWrite() {
  const navigate = useNavigate();
  const location = useLocation();
  const taggedPerfume = (location.state as { perfume?: TaggedPerfume } | null)?.perfume;
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [perfumes, setPerfumes] = useState(() =>
    taggedPerfume
      ? [
          {
            image: taggedPerfume.image,
            imageClassName: "h-[46px] w-auto",
            name: taggedPerfume.name,
            detail: taggedPerfume.brand,
          },
        ]
      : selectedPerfumes,
  );
  const [uploadedImages, setUploadedImages] = useState<
    { id: string; name: string; src: string }[]
  >([]);
  const [openPerfume, setOpenPerfume] = useState<string | null>(null);
  const [isCompleteOpen, setIsCompleteOpen] = useState(false);
  const [title, setTitle] = useState(taggedPerfume ? "" : defaultTitle);
  const [body, setBody] = useState(taggedPerfume ? "" : defaultBody);
  const [selectedMoods, setSelectedMoods] = useState<string[]>(taggedPerfume ? [] : ["깔끔한"]);
  const [selectedSituations, setSelectedSituations] = useState<string[]>(
    taggedPerfume ? [] : ["데일리"],
  );
  const [selectedHashtags, setSelectedHashtags] = useState<string[]>([]);

  const removePerfume = (name: string) => {
    setPerfumes((currentPerfumes) =>
      currentPerfumes.filter((perfume) => perfume.name !== name),
    );
    setOpenPerfume((currentOpenPerfume) =>
      currentOpenPerfume === name ? null : currentOpenPerfume,
    );
  };

  return (
    <main className="min-h-dvh bg-black max-[430px]:bg-off-white">
      <div className="mx-auto flex min-h-dvh w-full max-w-[430px] flex-col bg-off-white">
        <header className="fixed top-0 left-1/2 z-50 flex h-[54px] w-full max-w-[430px] -translate-x-1/2 items-center justify-between bg-off-white px-5">
          <button
            aria-label="닫기"
            className="flex size-6 items-center justify-center"
            type="button"
            onClick={() => navigate(-1)}
          >
            <X className="size-6" strokeWidth={1.2} />
          </button>
          <button
            className="rounded-full bg-off-black px-[14px] py-2 text-xs font-medium leading-none tracking-[-0.02em] text-off-white"
            type="button"
          >
            임시저장
          </button>
        </header>

        <div className="flex flex-1 flex-col gap-[30px] px-5 pt-[calc(var(--app-header-height)+24px)] pb-[132px]">
          <Section title="향수 선택">
            <div className="flex items-center gap-4">
              <Link
                className="flex size-[68px] shrink-0 flex-col items-center justify-center gap-1.5 rounded-lg border-[0.8px] border-light-grey text-grey"
                to="/community/select"
              >
                <Plus className="size-4" strokeWidth={1.4} />
                <span className="text-xs font-medium leading-none tracking-[-0.02em]">
                  향수 추가
                </span>
              </Link>
              {perfumes.map((perfume) => (
                <PerfumeThumb
                  className={perfume.imageClassName}
                  image={perfume.image}
                  key={perfume.name}
                  name={perfume.name}
                  onRemove={() => removePerfume(perfume.name)}
                />
              ))}
            </div>
          </Section>

          <Section title="사진">
            <div className="flex flex-col gap-2.5">
              <div className="no-scrollbar flex gap-3 overflow-x-auto py-1 pr-1">
                {uploadedImages.length < 4 && (
                  <button
                    className="flex size-[92px] shrink-0 flex-col items-center justify-center gap-2 rounded-lg border-[0.8px] border-light-grey text-grey"
                    onClick={() => imageInputRef.current?.click()}
                    type="button"
                  >
                    <Camera className="size-5" strokeWidth={1.4} />
                    <span className="text-xs font-medium tracking-[-0.02em]">
                      {uploadedImages.length}/4
                    </span>
                  </button>
                )}
                {uploadedImages.map((image) => (
                  <div className="relative size-[92px] shrink-0" key={image.id}>
                    <img
                      className="size-full rounded-lg object-cover"
                      src={image.src}
                      alt={image.name}
                    />
                    <button
                      aria-label={`${image.name} 삭제`}
                      className="absolute -right-1.5 -top-1.5 flex size-5 items-center justify-center rounded-full bg-off-black text-white"
                      onClick={() =>
                        setUploadedImages((images) =>
                          images.filter((item) => item.id !== image.id),
                        )
                      }
                      type="button"
                    >
                      <X className="size-3.5" />
                    </button>
                  </div>
                ))}
              </div>
              <p className="text-xs tracking-[-0.02em] text-grey">
                최대 4장까지 등록할 수 있어요.
              </p>
              <input
                accept="image/*"
                className="hidden"
                multiple
                onChange={(event) => {
                  const files = Array.from(event.target.files ?? []).slice(
                    0,
                    4 - uploadedImages.length,
                  );
                  files.forEach((file) => {
                    const reader = new FileReader();
                    reader.onload = () => {
                      if (typeof reader.result !== "string") return;
                      const imageSrc = reader.result;
                      setUploadedImages((images) =>
                        [
                          ...images,
                          {
                            id: `${file.name}-${file.lastModified}-${crypto.randomUUID()}`,
                            name: file.name,
                            src: imageSrc,
                          },
                        ].slice(0, 4),
                      );
                    };
                    reader.readAsDataURL(file);
                  });
                  event.target.value = "";
                }}
                ref={imageInputRef}
                type="file"
              />
            </div>
          </Section>

          <Section title="제목">
            <MessageField count={`${title.length}/40`}>
              <input
                className="w-full bg-transparent leading-none outline-none placeholder:text-grey"
                maxLength={40}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="제목을 입력해주세요"
                value={title}
              />
            </MessageField>
          </Section>

          <Section title="본문">
            <div className="flex w-full flex-col items-end gap-1.5">
              <textarea
                className="min-h-[108px] w-full resize-none rounded-lg border-[0.8px] border-light-grey p-4 text-sm font-normal leading-[1.4] tracking-[-0.02em] text-subtext outline-none placeholder:text-grey focus:border-off-black"
                maxLength={400}
                onChange={(event) => setBody(event.target.value)}
                placeholder="향수에 대한 이야기를 자유롭게 남겨보세요"
                value={body}
              />
              <span className="w-full text-right text-[10px] font-normal leading-normal tracking-[-0.02em] text-grey">
                {body.length}/400
              </span>
            </div>
          </Section>

          <Section title="오늘의 무드">
            <div className="flex flex-col gap-2">
              {moodRows.map((row) => (
                <div
                  className="flex flex-wrap items-center gap-1.5"
                  key={row.join("-")}
                >
                  {row.map((label) => (
                    <Chip
                      active={selectedMoods.includes(label)}
                      key={label}
                      label={label}
                      onClick={() =>
                        setSelectedMoods((selected) =>
                          selected.includes(label)
                            ? selected.filter((item) => item !== label)
                            : [...selected, label],
                        )
                      }
                    />
                  ))}
                </div>
              ))}
            </div>
          </Section>

          <Section title="사용 상황">
            <div className="flex flex-col gap-2">
              {situationRows.map((row) => (
                <div
                  className="flex flex-wrap items-center gap-1.5"
                  key={row.join("-")}
                >
                  {row.map((label) => (
                    <Chip
                      active={selectedSituations.includes(label)}
                      key={label}
                      label={label}
                      onClick={() =>
                        setSelectedSituations((selected) =>
                          selected.includes(label)
                            ? selected.filter((item) => item !== label)
                            : [...selected, label],
                        )
                      }
                    />
                  ))}
                </div>
              ))}
            </div>
          </Section>

          <Section title="해시태그">
            <div className="flex flex-wrap items-center gap-1.5">
              {hashtags.map((label, index) => (
                <Chip
                  active={selectedHashtags.includes(`${label}-${index}`)}
                  key={`${label}-${index}`}
                  label={label}
                  onClick={() => {
                    const hashtagId = `${label}-${index}`;
                    setSelectedHashtags((selected) =>
                      selected.includes(hashtagId)
                        ? selected.filter((item) => item !== hashtagId)
                        : [...selected, hashtagId],
                    );
                  }}
                />
              ))}
            </div>
          </Section>

          <Section title="태그한 향수의 상세 후기를 작성해주세요">
            <div className="flex flex-col gap-[12px]">
              {perfumes.map((perfume) => (
                <PerfumeReviewCard
                  key={perfume.name}
                  {...perfume}
                  open={openPerfume === perfume.name}
                  onToggle={() =>
                    setOpenPerfume((currentOpenPerfume) =>
                      currentOpenPerfume === perfume.name ? null : perfume.name,
                    )
                  }
                />
              ))}
            </div>
          </Section>
        </div>

        <div className="fixed bottom-[39px] left-1/2 z-50 w-full max-w-[430px] -translate-x-1/2 px-[18px]">
          <button
            className="flex w-full items-start justify-center rounded-[32px] border border-off-black bg-off-black px-10 py-4 text-xl font-bold leading-none tracking-[-0.02em] text-off-white"
            type="button"
            onClick={() => setIsCompleteOpen(true)}
          >
            글 올리기
          </button>
        </div>
        <WriteCompleteDialog
          isOpen={isCompleteOpen}
          onClose={() => navigate("/community")}
        />
      </div>
    </main>
  );
}
