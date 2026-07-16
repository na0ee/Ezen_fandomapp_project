import { ChevronDown, ChevronUp, Plus, X } from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import tagOne from "../../assets/community/figma/tag-one.png";
import tagThree from "../../assets/community/figma/tag-three.png";
import tagTwo from "../../assets/community/figma/tag-two.png";

const selectedPerfumes = [
  {
    image: tagOne,
    imageClassName: "h-[46px] w-[31px]",
    listImageClassName: "h-[26px] w-[17px]",
    name: "딥디크 오 로즈 오 드 퍼퓸",
    detail: "50ml · 231,000원",
  },
  {
    image: tagTwo,
    imageClassName: "h-[46px] w-[32px]",
    listImageClassName: "h-[26px] w-[18px]",
    name: "바이레도 블랑쉬 오 드 퍼퓸",
    detail: "50ml · 260,000원",
  },
  {
    image: tagThree,
    imageClassName: "h-[46px] w-[32px]",
    listImageClassName: "h-[26px] w-[17px]",
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

function Chip({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full px-[14px] py-2 text-xs font-medium leading-none tracking-[-0.02em] ${
        active ? "bg-off-black text-off-white" : "border-[0.8px] border-light-grey text-grey"
      }`}
    >
      {label}
    </span>
  );
}

function ChipRows({ rows, activeCount = 1 }: { rows: string[][]; activeCount?: number }) {
  let chipIndex = 0;

  return (
    <div className="flex flex-col gap-2">
      {rows.map((row) => (
        <div className="flex flex-wrap items-center gap-1.5" key={row.join("-")}>
          {row.map((label) => {
            const active = chipIndex < activeCount;
            chipIndex += 1;

            return <Chip active={active} key={`${label}-${chipIndex}`} label={label} />;
          })}
        </div>
      ))}
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex w-full flex-col gap-4">
      <h2 className="text-base font-semibold leading-none tracking-[-0.02em] text-off-black">{title}</h2>
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
      <div className="w-full rounded-lg border-[0.8px] border-light-grey p-4 text-sm font-normal leading-[1.4] tracking-[-0.02em] text-[#4d4d4d]">
        {children}
      </div>
      <span className="w-full text-right text-[10px] font-normal leading-normal tracking-[-0.02em] text-grey">{count}</span>
    </div>
  );
}

function PerfumeReviewCard({
  image,
  listImageClassName,
  name,
  detail,
  open,
  onToggle,
}: {
  image: string;
  listImageClassName: string;
  name: string;
  detail: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <article className={`w-full rounded-lg border-[0.8px] border-light-grey p-4 ${open ? "flex flex-col gap-4" : "flex items-center justify-between"}`}>
      <div className="flex w-full items-center justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex size-[38px] shrink-0 items-center justify-center rounded-lg bg-light2-grey">
            <img className={`${listImageClassName} object-contain`} src={image} alt="" />
          </div>
          <div className="flex min-w-0 flex-col justify-center gap-1">
            <p className="max-w-[260px] truncate text-sm font-normal leading-normal tracking-[-0.02em] text-off-black">
              {name}
            </p>
            <p className="text-xs font-normal leading-normal tracking-[-0.02em] text-grey">{detail}</p>
          </div>
        </div>
        <button aria-label={`${name} 상세 후기 ${open ? "접기" : "펼치기"}`} className="flex size-[18px] shrink-0 items-center justify-center text-grey" type="button" onClick={onToggle}>
          {open ? <ChevronUp className="size-[18px]" strokeWidth={1.5} /> : <ChevronDown className="size-[18px]" strokeWidth={1.5} />}
        </button>
      </div>

      {open && (
        <>
          <div className="flex w-full flex-col gap-4">
            <h3 className="text-base font-semibold leading-normal tracking-[-0.02em] text-off-black">가장 많이 느껴진 향</h3>
            <ChipRows rows={scentRows} activeCount={3} />
          </div>
          <div className="h-px w-full bg-light-grey" />
          <div className="flex w-full flex-col gap-4">
            <h3 className="text-base font-semibold leading-normal tracking-[-0.02em] text-off-black">지속력</h3>
            <div className="flex flex-wrap items-center gap-1.5">
              {longevityOptions.map((label, index) => (
                <Chip active={index === 0} key={label} label={label} />
              ))}
            </div>
          </div>
          <div className="h-px w-full bg-light-grey" />
          <div className="flex w-full flex-col gap-4">
            <h3 className="text-base font-semibold leading-normal tracking-[-0.02em] text-off-black">구입처</h3>
            <ChipRows rows={purchaseRows} />
          </div>
          <div className="h-px w-full bg-light-grey" />
          <div className="flex w-full flex-col gap-4">
            <h3 className="text-base font-semibold leading-normal tracking-[-0.02em] text-off-black">이 향수를 고른 이유</h3>
            <ChipRows rows={reasonRows} />
          </div>
        </>
      )}
    </article>
  );
}

function WriteCompleteDialog({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/35 px-10" onClick={onClose}>
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

export default function CommunityWrite() {
  const navigate = useNavigate();
  const [perfumes, setPerfumes] = useState(selectedPerfumes);
  const [openPerfume, setOpenPerfume] = useState<string | null>(null);
  const [isCompleteOpen, setIsCompleteOpen] = useState(false);

  const removePerfume = (name: string) => {
    setPerfumes((currentPerfumes) => currentPerfumes.filter((perfume) => perfume.name !== name));
    setOpenPerfume((currentOpenPerfume) => (currentOpenPerfume === name ? null : currentOpenPerfume));
  };

  return (
    <main className="min-h-dvh bg-off-white">
      <div className="mx-auto flex min-h-dvh w-full max-w-[430px] flex-col bg-off-white">
        <header className="fixed top-0 left-1/2 z-50 flex h-[54px] w-full max-w-[430px] -translate-x-1/2 items-center justify-between bg-off-white px-5">
          <button aria-label="닫기" className="flex size-6 items-center justify-center" type="button" onClick={() => navigate(-1)}>
            <X className="size-6" strokeWidth={1.2} />
          </button>
          <button className="rounded-full bg-off-black px-[14px] py-2 text-xs font-medium leading-none tracking-[-0.02em] text-off-white" type="button">
            임시저장
          </button>
        </header>

        <div className="flex flex-1 flex-col gap-[30px] px-5 pt-[78px] pb-[132px]">
          <Section title="향수 선택">
            <div className="flex items-center gap-4">
              <Link className="flex size-[68px] shrink-0 flex-col items-center justify-center gap-1.5 rounded-lg border-[0.8px] border-light-grey text-grey" to="/community/select">
                <Plus className="size-4" strokeWidth={1.4} />
                <span className="text-xs font-medium leading-none tracking-[-0.02em]">향수 추가</span>
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

          <Section title="제목">
            <MessageField count="23/40">
              <p className="leading-none">햇살 좋은 날의 베이지 룩과 향수 조합 ☁</p>
            </MessageField>
          </Section>

          <Section title="본문">
            <MessageField count="103/40">
              <p>따뜻한 햇살엔 부드럽고 깨끗한 향이 잘 어울리는 것 같아요</p>
              <p>블랑쉬로 포근하게 시작해서 오 로즈로 기분 전환해주고 마지막엔 잉글리수 페어로 잔향을 남겨줘요</p>
              <p>하루 종일 기분이 좋아지는 조합이에요</p>
            </MessageField>
          </Section>

          <Section title="오늘의 무드">
            <div className="flex flex-col gap-2">
              {moodRows.map((row, rowIndex) => (
                <div className="flex flex-wrap items-center gap-1.5" key={row.join("-")}>
                  {row.map((label, index) => (
                    <Chip active={rowIndex === 0 && index === 0} key={label} label={label} />
                  ))}
                </div>
              ))}
            </div>
          </Section>

          <Section title="사용 상황">
            <div className="flex flex-col gap-2">
              {situationRows.map((row, rowIndex) => (
                <div className="flex flex-wrap items-center gap-1.5" key={row.join("-")}>
                  {row.map((label, index) => (
                    <Chip active={rowIndex === 0 && index === 0} key={label} label={label} />
                  ))}
                </div>
              ))}
            </div>
          </Section>

          <Section title="해시태그">
            <div className="flex flex-wrap items-center gap-1.5">
              {hashtags.map((label, index) => (
                <Chip key={`${label}-${index}`} label={label} />
              ))}
            </div>
          </Section>

          <Section title="태그한 향수의 상세 후기를 작성해주세요">
            <div className="flex flex-col gap-[13px]">
              {perfumes.map((perfume) => (
                <PerfumeReviewCard
                  key={perfume.name}
                  {...perfume}
                  open={openPerfume === perfume.name}
                  onToggle={() => setOpenPerfume((currentOpenPerfume) => (currentOpenPerfume === perfume.name ? null : perfume.name))}
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
        <WriteCompleteDialog isOpen={isCompleteOpen} onClose={() => navigate("/community")} />
      </div>
    </main>
  );
}
