import { Plus, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import closeIcon from "../../assets/search/figma/close.svg";

const defaultTitle = "햇살 좋은 날의 베이지 룩과 향수 조합 ☁";
const defaultBody = `따뜻한 햇살엔 부드럽고 깨끗한 향이 잘 어울리는 것 같아요
블랑쉬로 포근하게 시작해서 오 로즈로 기분 전환해주고 마지막엔 잉글리수 페어로 잔향을 남겨줘요
하루 종일 기분이 좋아지는 조합이에요`;
const defaultOptions = ["딥디크 오 데 썽", "조 말론 우드 세이지 앤 씨 솔트"];
type WriteMode = "free" | "question";

export default function CommunityQuestionWrite() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<WriteMode>("question");
  const [freeTitle, setFreeTitle] = useState(defaultTitle);
  const [questionTitle, setQuestionTitle] = useState(defaultTitle);
  const [body, setBody] = useState(defaultBody);
  const [options, setOptions] = useState(defaultOptions);
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [saved, setSaved] = useState(false);
  const activeTitle = mode === "free" ? freeTitle : questionTitle;

  const saveDraft = () => {
    localStorage.setItem(
      `community-${mode}-draft`,
      JSON.stringify(mode === "free"
        ? { title: freeTitle, body, isAnonymous }
        : { title: questionTitle, options, isAnonymous }),
    );
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1600);
  };

  return (
    <main className="min-h-dvh bg-black max-[430px]:bg-off-white">
      <div className="mx-auto flex min-h-dvh w-full max-w-[430px] flex-col bg-off-white">
        <header className="fixed left-1/2 top-0 z-50 flex h-[54px] w-full max-w-[430px] -translate-x-1/2 items-center justify-between bg-off-white px-5">
          <button
            aria-label="닫기"
            className="flex size-6 items-center justify-center"
            onClick={() => navigate(-1)}
            type="button"
          >
            <img alt="" aria-hidden="true" className="size-3" src={closeIcon} />
          </button>
          <button
            className="rounded-full bg-off-black px-[14px] py-2 text-xs font-medium leading-none tracking-[-0.02em] text-off-white"
            onClick={saveDraft}
            type="button"
          >
            {saved ? "저장완료" : "임시저장"}
          </button>
        </header>

        <nav className="fixed left-1/2 top-[54px] z-40 flex h-[65px] w-full max-w-[430px] -translate-x-1/2 items-end gap-6 border-b-[0.8px] border-light-grey bg-off-white px-5">
          {([
            ["free", "자유게시글"],
            ["question", "질문하기"],
          ] as const).map(([tabMode, label]) => (
            <button
              className={`flex h-[46px] flex-col items-center justify-between pt-4 text-base font-medium tracking-[-0.02em] ${
                mode === tabMode ? "text-off-black" : "text-grey"
              }`}
              key={tabMode}
              onClick={() => setMode(tabMode)}
              type="button"
            >
              {label}
              {mode === tabMode && <span className="h-0.5 w-full bg-point-orange" />}
            </button>
          ))}
        </nav>

        <div className={`flex flex-1 flex-col px-5 pb-[132px] pt-[159px] ${mode === "free" ? "gap-[30px]" : "gap-4"}`}>
          <section className="flex flex-col gap-4">
            <h1 className="text-base font-semibold leading-none tracking-[-0.02em] text-off-black">제목</h1>
            <div className="flex flex-col items-end gap-1.5">
              <input
                aria-label="질문 제목"
                className="h-[46px] w-full rounded-lg border-[0.8px] border-light-grey px-4 text-sm tracking-[-0.02em] text-[#4d4d4d] outline-none focus:border-off-black"
                maxLength={40}
                onChange={(event) => {
                  if (mode === "free") setFreeTitle(event.target.value);
                  else setQuestionTitle(event.target.value);
                }}
                value={activeTitle}
              />
              <span className="text-[10px] tracking-[-0.02em] text-grey">{activeTitle.length}/40</span>
            </div>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-base font-semibold leading-none tracking-[-0.02em] text-off-black">본문</h2>
            {mode === "free" ? (
              <div className="flex flex-col items-end gap-1.5">
                <textarea
                  aria-label="자유게시글 본문"
                  className="min-h-[112px] w-full resize-none rounded-lg border-[0.8px] border-light-grey p-4 text-sm leading-[1.4] tracking-[-0.02em] text-[#4d4d4d] outline-none focus:border-off-black"
                  maxLength={400}
                  onChange={(event) => setBody(event.target.value)}
                  value={body}
                />
                <span className="text-[10px] tracking-[-0.02em] text-grey">{body.length}/400</span>
              </div>
            ) : (
              <div className="flex flex-col gap-4 rounded-lg border-[0.8px] border-light2-grey p-4">
                {options.map((option, index) => (
                  <div className="relative" key={index}>
                    <input
                      aria-label={`선택지 ${index + 1}`}
                      className="h-[52px] w-full rounded-lg border-[0.8px] border-light2-grey px-4 pr-10 text-sm font-medium tracking-[-0.02em] text-grey outline-none focus:border-off-black focus:text-off-black"
                      maxLength={40}
                      onChange={(event) => setOptions((current) => current.map((item, itemIndex) => itemIndex === index ? event.target.value : item))}
                      value={option}
                    />
                    {index >= 2 && (
                      <button
                        aria-label={`선택지 ${index + 1} 삭제`}
                        className="absolute right-2 top-2 flex size-5 items-center justify-center text-grey"
                        onClick={() => setOptions((current) => current.filter((_, itemIndex) => itemIndex !== index))}
                        type="button"
                      >
                        <X aria-hidden="true" className="size-3" strokeWidth={1.4} />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  className="flex h-[52px] w-full items-center justify-center gap-2 rounded-lg border-[0.8px] border-light2-grey text-sm font-medium tracking-[-0.02em] text-grey"
                  onClick={() => setOptions((current) => [...current, ""])}
                  type="button"
                >
                  <Plus className="size-5" strokeWidth={1} />
                  추가하기
                </button>
              </div>
            )}
          </section>

          <button
            aria-pressed={isAnonymous}
            className={`w-fit rounded-full px-[14px] py-2 text-xs font-medium leading-none tracking-[-0.02em] ${
              isAnonymous ? "bg-point-orange text-off-white" : "border-[0.8px] border-light-grey text-grey"
            }`}
            onClick={() => setIsAnonymous((current) => !current)}
            type="button"
          >
            익명
          </button>
        </div>

        <div className="fixed bottom-[39px] left-1/2 z-50 w-full max-w-[430px] -translate-x-1/2 px-[18px]">
          <button
            className="flex w-full justify-center rounded-[32px] border border-off-black bg-off-black px-10 py-4 text-xl font-bold leading-none tracking-[-0.02em] text-off-white disabled:opacity-40"
            disabled={!activeTitle.trim() || (mode === "free" ? !body.trim() : options.some((option) => !option.trim()))}
            onClick={() => navigate(mode === "free" ? "/community" : "/community/question")}
            type="button"
          >
            글 올리기
          </button>
        </div>
      </div>
    </main>
  );
}
