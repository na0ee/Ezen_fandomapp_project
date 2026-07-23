export type AxisAResult = "은은함" | "균형" | "확실함";
export type AxisBResult = "한결같음" | "탐험적";

export type DiagnosisAnswers = {
  q1?: string;
  q2?: string[];
  q3?: string[];
  q4?: string;
  q5?: string;
};

type AxisScore = { axisA: number; axisB: number };

export type DiagnosisResult = {
  id: number;
  key: string;
  axisA: AxisAResult;
  axisB: AxisBResult;
  nameEn: string;
  nameKo: string;
  description: string;
  hashtags: string[];
};

export type DiagnosisCalculation = {
  axisAScore: number;
  axisBScore: number;
  axisAResult: AxisAResult;
  axisBResult: AxisBResult;
  resultKey: string;
  result: DiagnosisResult;
};

const scores: Record<keyof DiagnosisAnswers, Record<string, AxisScore>> = {
  q1: {
    "아직 없어요": { axisA: 0, axisB: -2 },
    "1~2개": { axisA: 0, axisB: -1 },
    "3~5개": { axisA: 0, axisB: 0 },
    "6~10개": { axisA: 0, axisB: 1 },
    "10개 이상": { axisA: 0, axisB: 2 },
  },
  q2: {
    "work-school": { axisA: 0, axisB: 0 },
    date: { axisA: 1, axisB: 0 },
    friends: { axisA: 0, axisB: 0 },
    "special-day": { axisA: 2, axisB: 0 },
    travel: { axisA: 0, axisB: 1 },
    sleep: { axisA: -1, axisB: 0 },
    refresh: { axisA: 0, axisB: 1 },
    exercise: { axisA: -1, axisB: 0 },
    home: { axisA: -1, axisB: -1 },
  },
  q3: {
    floral: { axisA: 0, axisB: 0 },
    woody: { axisA: 1, axisB: 0 },
    musk: { axisA: -1, axisB: 0 },
    citrus: { axisA: 0, axisB: 0 },
    aquatic: { axisA: -1, axisB: 0 },
    oriental: { axisA: 2, axisB: 0 },
    powdery: { axisA: -1, axisB: 0 },
    spicy: { axisA: 1, axisB: 1 },
    green: { axisA: -1, axisB: 0 },
  },
  q4: {
    minimal: { axisA: -1, axisB: -1 },
    casual: { axisA: -1, axisB: 0 },
    street: { axisA: 2, axisB: 1 },
    feminine: { axisA: 0, axisB: 1 },
  },
  q5: {
    signature: { axisA: 0, axisB: -3 },
    layering: { axisA: 0, axisB: 3 },
  },
};

export const diagnosisResults: Record<string, DiagnosisResult> = {
  "은은함|한결같음": { id: 1, key: "은은함|한결같음", axisA: "은은함", axisB: "한결같음", nameEn: "Quiet Signature", nameKo: "조용한 시그니처형", description: "한 가지 향을 은은하게, 나만 아는 방식으로 오래 지켜요", hashtags: ["# 은은한", "# 한결같은", "# 데일리"] },
  "균형|한결같음": { id: 2, key: "균형|한결같음", axisA: "균형", axisB: "한결같음", nameEn: "Daily Basic", nameKo: "데일리 베이직형", description: "부담 없이 매일 쓸 수 있는 무난한 향을 꾸준히 선택해요", hashtags: ["# 무난한", "# 데일리", "# 꾸준함"] },
  "확실함|한결같음": { id: 3, key: "확실함|한결같음", axisA: "확실함", axisB: "한결같음", nameEn: "Bold Signature", nameKo: "강렬한 시그니처형", description: "존재감 있는 향 하나를 자신 있게 밀고 가요", hashtags: ["# 존재감", "# 자신감", "# 시그니처"] },
  "은은함|탐험적": { id: 4, key: "은은함|탐험적", axisA: "은은함", axisB: "탐험적", nameEn: "Soft Explorer", nameKo: "부드러운 탐험가형", description: "은은한 향들을 여러 개 시도하며 취향을 넓혀가요", hashtags: ["# 은은한", "# 다양함", "# 호기심"] },
  "균형|탐험적": { id: 5, key: "균형|탐험적", axisA: "균형", axisB: "탐험적", nameEn: "Mood Shifter", nameKo: "무드 셰프터형", description: "그날 기분에 따라 여러 무드의 향을 자유롭게 바꿔 써요", hashtags: ["# 기분전환", "# 다양함", "# 자유로운"] },
  "확실함|탐험적": { id: 6, key: "확실함|탐험적", axisA: "확실함", axisB: "탐험적", nameEn: "Layer Maximalist", nameKo: "레이어 맥시멀리스트형", description: "여러 향을 적극적으로 겹쳐 나만의 조합을 실험해요", hashtags: ["# 레이어링", "# 존재감", "# 실험적"] },
};

export function calculateDiagnosis(answers: DiagnosisAnswers): DiagnosisCalculation {
  let axisA = 0;
  let axisB = 0;
  const add = (score?: AxisScore) => {
    axisA += score?.axisA ?? 0;
    axisB += score?.axisB ?? 0;
  };

  add(answers.q1 ? scores.q1[answers.q1] : undefined);
  answers.q2?.forEach((answer) => add(scores.q2[answer]));
  answers.q3?.forEach((answer) => add(scores.q3[answer]));
  add(answers.q4 ? scores.q4[answers.q4] : undefined);
  add(answers.q5 ? scores.q5[answers.q5] : undefined);

  const axisAResult: AxisAResult = axisA <= -2 ? "은은함" : axisA >= 2 ? "확실함" : "균형";
  const axisBResult: AxisBResult = axisB >= 0 ? "탐험적" : "한결같음";
  const resultKey = `${axisAResult}|${axisBResult}`;

  return { axisAScore: axisA, axisBScore: axisB, axisAResult, axisBResult, resultKey, result: diagnosisResults[resultKey] };
}
