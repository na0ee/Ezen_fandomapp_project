import type { PointerEvent as ReactPointerEvent, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { brands } from "../../data/brands";
import { fragranceFamilies } from "../../data/fragranceFamilies";
import { perfumeData } from "../../data/perfumeData";
import type { PerfumeEntry } from "../../data/perfumeData";
import { storeLocations } from "../../data/storeLocations";
import {
  BotTurn,
  CharacterLay,
  ChatBubble,
  ChatbotHeader,
  ChatbotIntro,
  ChatInput,
  ChatPerfumeCard,
  LocCard,
  QuickCategory,
} from "../../components/chatbot";

type Chip = { label: string; variant?: "default" | "selected" };

type Turn =
  | { id: string; kind: "user"; text: string }
  | {
      id: string;
      kind: "bot";
      lines: string[];
      chips?: Chip[];
      content?: ReactNode;
    }
  | { id: string; kind: "loading" };

type BotTurnInput = Omit<Extract<Turn, { kind: "bot" }>, "id">;

type Awaiting = "feedback" | "layering" | "gift" | null;
type LastPickFlow = "layering" | "gift" | null;
type QuizStage = "family" | "season" | "intensity" | null;

const TYPING_DELAY_MS = 800;

const FALLBACK_LABELS = [
  "오늘의 향수 추천받기",
  "피드백하기",
  "가까운 매장 찾기",
  "향수 레이어링 추천",
  "딱 맞는 향수 선물 고르기",
];

const MOOD_OPTIONS = [
  { label: "차분하게", familyId: "woody" },
  { label: "포근하게", familyId: "musk" },
  { label: "산뜻하게", familyId: "citrus" },
  { label: "시크하게", familyId: "spicy" },
  { label: "매력적으로", familyId: "oriental" },
];

const WEATHER_OPTIONS = [
  { label: "맑음", familyId: "citrus" },
  { label: "흐림", familyId: "powdery" },
  { label: "더움", familyId: "aquatic" },
  { label: "추움", familyId: "woody" },
  { label: "비옴", familyId: "green" },
];

const SEASON_OPTIONS = ["봄", "여름", "가을", "겨울", "사계절"];
const INTENSITY_OPTIONS = ["은은하게", "적당하게", "강렬하게"];

function normalize(text: string) {
  return text.trim().replace(/\s+/g, "").toLowerCase();
}

function textMatches(input: string, trigger: string) {
  const a = normalize(input);
  const b = normalize(trigger);
  if (!a || !b) return false;
  return a.includes(b) || b.includes(a);
}

function pickRandomPerfume(
  familyIds?: string[],
  season?: string,
): PerfumeEntry {
  let pool = perfumeData;
  if (familyIds && familyIds.length > 0) {
    const seasonFamilyIds = season
      ? fragranceFamilies
          .filter((family) => family.seasons.includes(season))
          .map((family) => family.id)
      : null;
    const narrowed = perfumeData.filter((entry) =>
      entry.perfume.familyIds.some(
        (id) =>
          familyIds.includes(id) &&
          (!seasonFamilyIds || seasonFamilyIds.includes(id)),
      ),
    );
    pool =
      narrowed.length > 0
        ? narrowed
        : perfumeData.filter((entry) =>
            entry.perfume.familyIds.some((id) => familyIds.includes(id)),
          );
    if (pool.length === 0) pool = perfumeData;
  }
  return pool[Math.floor(Math.random() * pool.length)];
}

function perfumeCardProps(entry: PerfumeEntry) {
  const brand = brands.find((b) => b.id === entry.perfume.brandId);
  const keywords = entry.perfume.familyIds
    .map((id) => fragranceFamilies.find((family) => family.id === id)?.keyword)
    .filter((keyword): keyword is string => Boolean(keyword));
  return {
    brand: brand?.nameEn ?? brand?.name ?? "",
    imageSrc: entry.perfume.image
      ? `${import.meta.env.BASE_URL}${entry.perfume.image.slice(1)}`
      : undefined,
    keywords,
    name: entry.perfume.name,
  };
}

const INTENT_LABELS: Record<string, string> = {
  recommend: "오늘의 향수 추천받기",
  gift: "딱 맞는 향수 선물 고르기",
};

export function ChatbotPage() {
  const [searchParams] = useSearchParams();
  const initialIntentHandled = useRef(false);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [awaiting, setAwaiting] = useState<Awaiting>(null);
  const [quizStage, setQuizStage] = useState<QuizStage>(null);
  const [quizFamilyId, setQuizFamilyId] = useState<string | null>(null);
  const [quizSeason, setQuizSeason] = useState<string | null>(null);
  const [lastPickFlow, setLastPickFlow] = useState<LastPickFlow>(null);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const quickBarRef = useRef<HTMLDivElement>(null);
  const quickBarDrag = useRef({
    down: false,
    dragging: false,
    startX: 0,
    scrollLeft: 0,
  });

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [turns]);

  useEffect(() => {
    if (initialIntentHandled.current) return;
    initialIntentHandled.current = true;
    const label = INTENT_LABELS[searchParams.get("intent") ?? ""];
    if (label) handleUserInput(label);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stopQuickBarDragging = (event: ReactPointerEvent<HTMLDivElement>) => {
    const element = quickBarRef.current;
    const state = quickBarDrag.current;
    if (!state.down || !element) return;
    state.down = false;
    state.dragging = false;
    element.classList.remove("is-dragging");
    if (element.hasPointerCapture(event.pointerId))
      element.releasePointerCapture(event.pointerId);
  };

  const handleQuickBarPointerDown = (
    event: ReactPointerEvent<HTMLDivElement>,
  ) => {
    if (
      event.pointerType !== "mouse" ||
      event.button !== 0 ||
      !quickBarRef.current
    )
      return;
    quickBarDrag.current = {
      down: true,
      dragging: false,
      startX: event.clientX,
      scrollLeft: quickBarRef.current.scrollLeft,
    };
  };

  const handleQuickBarPointerMove = (
    event: ReactPointerEvent<HTMLDivElement>,
  ) => {
    const state = quickBarDrag.current;
    if (!state.down || !quickBarRef.current) return;
    if (event.buttons !== 1) {
      stopQuickBarDragging(event);
      return;
    }
    const delta = event.clientX - state.startX;
    if (!state.dragging) {
      // Ignore tiny jitter so a plain click on a chip still fires its onClick normally.
      if (Math.abs(delta) < 5) return;
      state.dragging = true;
      quickBarRef.current.setPointerCapture(event.pointerId);
      quickBarRef.current.classList.add("is-dragging");
    }
    event.preventDefault();
    quickBarRef.current.scrollLeft = state.scrollLeft - delta;
  };

  function appendUserTurn(text: string) {
    setTurns((prev) => [
      ...prev,
      { id: crypto.randomUUID(), kind: "user", text },
    ]);
  }

  function appendBotTurns(items: BotTurnInput[]): Promise<void> {
    return new Promise((resolve) => {
      const loadingId = crypto.randomUUID();
      setTurns((prev) => [...prev, { id: loadingId, kind: "loading" }]);
      window.setTimeout(() => {
        setTurns((prev) => {
          const index = prev.findIndex((t) => t.id === loadingId);
          if (index === -1) return prev;
          const resolved: Turn[] = items.map((item) => ({
            id: crypto.randomUUID(),
            ...item,
          }));
          const next = [...prev];
          next.splice(index, 1, ...resolved);
          return next;
        });
        resolve();
      }, TYPING_DELAY_MS);
    });
  }

  function appendBotTurn(turn: BotTurnInput): Promise<void> {
    return appendBotTurns([turn]);
  }

  async function respondToRecommend() {
    await appendBotTurn({
      kind: "bot",
      lines: [
        "오늘의 향수를 고민하고 계시군요! ",
        "제가 가지고 있는 정보인 날씨 기반으로 추천해드릴까요?",
      ],
      chips: [
        { label: "코디 등록하기" },
        { label: "날씨 기반 추천받기", variant: "selected" },
        { label: "더 정확한 추천을 위한 문답 진행하기" },
      ],
    });
  }

  async function respondToWeatherAsk() {
    await appendBotTurn({
      kind: "bot",
      lines: ["오늘의 날씨를 선택해주세요."],
      chips: WEATHER_OPTIONS.map((weather) => ({ label: weather.label })),
    });
  }

  async function respondToWeather(weather: (typeof WEATHER_OPTIONS)[number]) {
    await appendBotTurn({
      kind: "bot",
      lines: [`${weather.label} 날씨에 어울리는 향수로 골라봤어요.`],
      content: (
        <ChatPerfumeCard
          {...perfumeCardProps(pickRandomPerfume([weather.familyId]))}
        />
      ),
    });
  }

  async function respondToStoreSearch() {
    await appendBotTurn({
      kind: "bot",
      lines: [
        "방문하고 싶은 브랜드나 방문 목적을 알려주시면 가장 적합한 매장을 추천해드릴게요.",
      ],
    });
  }

  async function respondToBrand(brand: (typeof brands)[number]) {
    const store = storeLocations[brand.id];
    await appendBotTurn({
      kind: "bot",
      lines: [
        `${brand.name} 매장을 방문하고 싶으시군요!`,
        "현재 위치에서는 이 매장이 가장 가까워요.",
      ],
      content: store ? <LocCard {...store} /> : undefined,
    });
  }

  async function respondToFeedbackAsk() {
    setAwaiting("feedback");
    await appendBotTurn({
      kind: "bot",
      lines: [
        "앱을 사용하면서 느낀 점을 들려주세요.",
        "불편했던 점이나 개선 아이디어를 자유롭게 남겨주세요.",
      ],
    });
    inputRef.current?.focus();
  }

  async function respondToFeedbackThanks() {
    await appendBotTurn({
      kind: "bot",
      lines: [
        "소중한 의견 감사합니다!",
        "남겨주신 내용은 더 나은 서비스를 만드는 데 꼼꼼히 참고할게요.",
      ],
    });
  }

  async function respondToLayeringAsk() {
    setAwaiting("layering");
    await appendBotTurn({
      kind: "bot",
      lines: [
        "함께 사용하고 싶은 향수가 있나요?",
        "향수 이름을 알려주시면 잘 어울리는 조합을 찾아드릴게요.",
      ],
    });
    inputRef.current?.focus();
  }

  async function respondToLayeringResult() {
    await appendBotTurns([
      {
        kind: "bot",
        lines: [
          "좋아요! 입력해 주신 향수의 향조와 분위기를 바탕으로 잘 어울리는 조합을 찾아볼게요.",
          "서로의 매력을 해치지 않으면서 새로운 분위기를 만들어주는 조합으로 골라봤어요.",
        ],
        content: <ChatPerfumeCard {...perfumeCardProps(pickRandomPerfume())} />,
      },
      {
        kind: "bot",
        lines: ["더 궁금한 조합이 있다면 아래 버튼을 눌러주세요!"],
        chips: [{ label: "다른 향수로 다시 찾기" }],
      },
    ]);
    setLastPickFlow("layering");
  }

  async function respondToGiftAsk() {
    setAwaiting("gift");
    await appendBotTurn({
      kind: "bot",
      lines: [
        "선물할 사람의 분위기와 취향을 알려주세요!",
        "상대에게 어울릴 만한 향수를 레이가 대신 골라드릴게요.",
      ],
    });
    inputRef.current?.focus();
  }

  async function respondToGiftResult() {
    await appendBotTurns([
      {
        kind: "bot",
        lines: [
          "좋아요! 알려주신 분위기와 취향을 바탕으로 선물하기 좋은 향수를 찾아볼게요.",
          "상대방의 이미지와 잘 어울리면서 선물로도 부담스럽지 않은 향수로 골라봤어요.",
        ],
        content: <ChatPerfumeCard {...perfumeCardProps(pickRandomPerfume())} />,
      },
      {
        kind: "bot",
        lines: ["다른 향수도 보고 싶다면 아래 버튼을 눌러주세요!"],
        chips: [{ label: "다른 향수로 다시 찾기" }],
      },
    ]);
    setLastPickFlow("gift");
  }

  async function respondToOutfitAsk() {
    await appendBotTurn({
      kind: "bot",
      lines: [
        "같은 코디라도 원하는 분위기에 따라 향수가 달라질 수 있어요.",
        "오늘 연출하고 싶은 분위기를 선택해 주세요.",
      ],
      chips: MOOD_OPTIONS.map((mood) => ({ label: mood.label })),
    });
  }

  async function respondToMood(mood: (typeof MOOD_OPTIONS)[number]) {
    await appendBotTurn({
      kind: "bot",
      lines: [`${mood.label} 어울리는 향수로 골라봤어요.`],
      content: (
        <ChatPerfumeCard
          {...perfumeCardProps(pickRandomPerfume([mood.familyId]))}
        />
      ),
    });
  }

  async function respondToQuizStart() {
    setQuizStage("family");
    setQuizFamilyId(null);
    setQuizSeason(null);
    await appendBotTurn({
      kind: "bot",
      lines: [
        "조금 더 정확한 추천을 위해 몇 가지 질문을 시작할게요.",
        "평소 취향에 가까운 답을 선택해 주세요.",
      ],
      chips: fragranceFamilies.map((family) => ({ label: family.keyword })),
    });
  }

  async function respondToQuizSeasonAsk() {
    await appendBotTurn({
      kind: "bot",
      lines: [
        "좋아요! 취향을 조금씩 알아가고 있어요.",
        "다음 질문도 가장 마음에 가까운 답을 선택해 주세요.",
      ],
      chips: SEASON_OPTIONS.map((season) => ({ label: season })),
    });
  }

  async function respondToQuizIntensityAsk() {
    await appendBotTurn({
      kind: "bot",
      lines: [
        "좋아요, 이제 취향의 윤곽이 보이기 시작했어요.",
        "조금만 더 알아볼게요!",
      ],
      chips: INTENSITY_OPTIONS.map((intensity) => ({ label: intensity })),
    });
  }

  async function respondToQuizResult() {
    await appendBotTurns([
      {
        kind: "bot",
        lines: [
          "모든 답변이 완료됐어요!",
          "지금까지의 선택을 바탕으로 잘 어울리는 향수를 찾아볼게요.",
        ],
      },
      {
        kind: "bot",
        lines: [
          "답변에서 나타난 취향과 선호하는 분위기를 바탕으로 가장 잘 맞는 향수를 골라봤어요.",
        ],
        content: (
          <ChatPerfumeCard
            {...perfumeCardProps(
              pickRandomPerfume(
                quizFamilyId ? [quizFamilyId] : undefined,
                quizSeason ?? undefined,
              ),
            )}
          />
        ),
      },
      {
        kind: "bot",
        lines: [
          "추천 결과가 마음에 드셨나요?",
          "다른 분위기의 향수를 찾고 싶다면 문답을 다시 진행할 수 있어요.",
        ],
        chips: [{ label: "문답 다시 진행하기" }],
      },
    ]);
  }

  async function respondFallback() {
    await appendBotTurn({
      kind: "bot",
      lines: [
        "죄송해요, 그건 제가 모르는 질문이에요. ",
        "대신 이런 건 답변해드릴 수 있어요.",
      ],
      chips: FALLBACK_LABELS.map((label) => ({ label })),
    });
  }

  function resetConversationState() {
    setAwaiting(null);
    setQuizStage(null);
  }

  function handleUserInput(rawText: string) {
    const text = rawText.trim();
    if (!text) return;

    setInputValue("");
    appendUserTurn(text);

    // Recognized options always win, even if a free-text "awaiting" flow is
    // active — clicking an old chip shouldn't get swallowed as an answer to
    // an unrelated question that's currently pending.
    if (quizStage === "family") {
      const family = fragranceFamilies.find((f) =>
        textMatches(text, f.keyword),
      );
      if (family) {
        setQuizFamilyId(family.id);
        setQuizStage("season");
        respondToQuizSeasonAsk();
        return;
      }
    }
    if (quizStage === "season") {
      const season = SEASON_OPTIONS.find((s) => textMatches(text, s));
      if (season) {
        setQuizSeason(season);
        setQuizStage("intensity");
        respondToQuizIntensityAsk();
        return;
      }
    }
    if (quizStage === "intensity") {
      const intensity = INTENSITY_OPTIONS.find((s) => textMatches(text, s));
      if (intensity) {
        setQuizStage(null);
        respondToQuizResult();
        return;
      }
    }

    if (textMatches(text, "날씨 기반 추천받기")) {
      resetConversationState();
      respondToWeatherAsk();
      return;
    }
    if (textMatches(text, "오늘의 향수 추천받기")) {
      resetConversationState();
      respondToRecommend();
      return;
    }
    if (textMatches(text, "가까운 매장 찾기")) {
      resetConversationState();
      respondToStoreSearch();
      return;
    }
    if (textMatches(text, "피드백하기")) {
      resetConversationState();
      respondToFeedbackAsk();
      return;
    }
    if (textMatches(text, "향수 레이어링 추천")) {
      resetConversationState();
      respondToLayeringAsk();
      return;
    }
    if (textMatches(text, "딱 맞는 향수 선물 고르기")) {
      resetConversationState();
      respondToGiftAsk();
      return;
    }
    if (textMatches(text, "코디 등록하기")) {
      resetConversationState();
      respondToOutfitAsk();
      return;
    }
    if (
      textMatches(text, "더 정확한 추천을 위한 문답 진행하기") ||
      textMatches(text, "문답 다시 진행하기")
    ) {
      resetConversationState();
      respondToQuizStart();
      return;
    }
    if (textMatches(text, "다른 향수로 다시 찾기")) {
      resetConversationState();
      if (lastPickFlow === "layering") {
        respondToLayeringResult();
        return;
      }
      if (lastPickFlow === "gift") {
        respondToGiftResult();
        return;
      }
      respondFallback();
      return;
    }

    const mood = MOOD_OPTIONS.find((m) => textMatches(text, m.label));
    if (mood) {
      resetConversationState();
      respondToMood(mood);
      return;
    }

    const weather = WEATHER_OPTIONS.find((w) => textMatches(text, w.label));
    if (weather) {
      resetConversationState();
      respondToWeather(weather);
      return;
    }

    const brand = brands.find(
      (b) => textMatches(text, b.name) || textMatches(text, b.nameEn),
    );
    if (brand) {
      resetConversationState();
      respondToBrand(brand);
      return;
    }

    // Nothing recognized matched — only now treat the text as the answer to
    // whichever free-text question is still pending, if any.
    if (awaiting === "feedback") {
      setAwaiting(null);
      respondToFeedbackThanks();
      return;
    }
    if (awaiting === "layering") {
      setAwaiting(null);
      respondToLayeringResult();
      return;
    }
    if (awaiting === "gift") {
      setAwaiting(null);
      respondToGiftResult();
      return;
    }

    respondFallback();
  }

  return (
    <main className="h-dvh bg-off-white text-off-black">
      <div className="mx-auto flex h-dvh w-full max-w-[430px] flex-col bg-off-white">
        <ChatbotHeader />
        <div
          className="flex flex-1 flex-col gap-10 overflow-y-auto px-5 pt-6 pb-6"
          ref={scrollRef}
        >
          <ChatbotIntro onChipClick={handleUserInput} />

          {turns.map((turn) => {
            if (turn.kind === "loading") {
              return (
                <div
                  className="flex w-full items-start gap-[12 px]"
                  key={turn.id}
                >
                  <CharacterLay />
                  <ChatBubble variant="loading" />
                </div>
              );
            }
            return turn.kind === "user" ? (
              <ChatBubble key={turn.id} variant="user">
                {turn.text}
              </ChatBubble>
            ) : (
              <BotTurn
                chips={turn.chips}
                key={turn.id}
                lines={turn.lines}
                onChipClick={handleUserInput}
              >
                {turn.content}
              </BotTurn>
            );
          })}
        </div>
        <div className="flex flex-col gap-2.5 px-5 pb-5">
          {turns.length > 0 && (
            <div
              className="horizontal-scroller no-scrollbar flex touch-pan-x gap-2 overflow-x-auto overscroll-x-contain"
              onDragStart={(event) => event.preventDefault()}
              onLostPointerCapture={() => {
                quickBarDrag.current.down = false;
                quickBarDrag.current.dragging = false;
                quickBarRef.current?.classList.remove("is-dragging");
              }}
              onPointerCancel={stopQuickBarDragging}
              onPointerDown={handleQuickBarPointerDown}
              onPointerMove={handleQuickBarPointerMove}
              onPointerUp={stopQuickBarDragging}
              ref={quickBarRef}
            >
              {FALLBACK_LABELS.map((label) => (
                <QuickCategory
                  className="shrink-0"
                  key={label}
                  label={label}
                  onClick={() => handleUserInput(label)}
                  variant="under"
                />
              ))}
            </div>
          )}
          <ChatInput
            aria-label="챗봇에게 질문하기"
            inputRef={inputRef}
            onChange={(event) => setInputValue(event.target.value)}
            onSend={() => handleUserInput(inputValue)}
            placeholder={
              awaiting ? "답변을 입력해 주세요" : "무엇이든지 물어보세요!"
            }
            value={inputValue}
          />
        </div>
      </div>
    </main>
  );
}
